// src/components/EnhancedDashboard.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { fetchTeamMembers, setStatusFilter } from '../redux/slices/membersSlice';
import { switchRole } from '../redux/slices/roleSlice';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import StatusSelector from '../components/StatusSelector';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

const Dashboard = () => {
  useKeyboardShortcuts();

  const dispatch = useDispatch();
  const { currentRole, currentUser } = useSelector(state => state.role);
  const { teamMembers, loading, statusFilter } = useSelector(state => state.members);

  useEffect(() => {
    dispatch(fetchTeamMembers());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading team data...</div>
      </div>
    );
  }

  const statusCounts = teamMembers.reduce((acc, member) => {
    acc[member.status] = (acc[member.status] || 0) + 1;
    return acc;
  }, {});

  const totalTasks = teamMembers.reduce((sum, member) => sum + member.tasks.length, 0);
  const completedTasks = teamMembers.reduce((sum, member) => 
    sum + member.tasks.filter(task => task.completed).length, 0);
  const activeTasks = totalTasks - completedTasks;

  const statusChartData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status,
    value: count
  }));

  const COLORS = {
    'Working': '#10B981',
    'Break': '#F59E0B', 
    'Meeting': '#3B82F6',
    'Offline': '#6B7280'
  };

  const handleRoleSwitch = () => {
    dispatch(switchRole(currentRole === 'lead' ? 'member' : 'lead'));
  };

  const handleFilterChange = (e) => {
    dispatch(setStatusFilter(e.target.value));
  };

  const filteredMembers = statusFilter === 'all' 
    ? teamMembers 
    : teamMembers.filter(member => member.status === statusFilter);

  const MetricCard = ({ title, value, subtitle, color, icon }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-2xl md:text-3xl font-bold ${color} mb-1`}>{value}</p>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${color.replace('text-', 'bg-').replace('-600', '-100')} flex items-center justify-center text-xl md:text-2xl`}>
          {icon}
        </div>
      </div>
    </div>
  );

  const StatusBadge = ({ status, count }) => {
    const colors = {
      'Working': 'bg-green-100 text-green-800 border-green-200',
      'Break': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Meeting': 'bg-blue-100 text-blue-800 border-blue-200',
      'Offline': 'bg-gray-100 text-gray-800 border-gray-200'
    };

    const icons = {
      'Working': '💼',
      'Break': '☕',
      'Meeting': '👥',
      'Offline': '🔴'
    };

    return (
      <div className={`inline-flex items-center px-2 py-1 md:px-3 md:py-2 rounded-lg text-xs md:text-sm font-medium border ${colors[status]}`}>
        <span className="mr-1 md:mr-2">{icons[status]}</span>
        {count && <span className="font-bold mr-1">{count}</span>}
        <span>{status}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header - Responsive */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-4 sm:h-16">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TP</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Team Pulse</h1>
                <p className="text-xs text-gray-500">Dashboard</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-sm font-medium">
                    {currentUser.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{currentUser}</p>
                  <p className="text-xs text-gray-500">
                    {currentRole === 'lead' ? 'Team Lead' : 'Team Member'}
                  </p>
                </div>
              </div>
              
              <button 
                onClick={handleRoleSwitch}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors w-full sm:w-auto"
              >
                Switch to {currentRole === 'lead' ? 'Member' : 'Lead'} View
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {currentRole === 'lead' ? (
          // TEAM LEAD VIEW - Responsive
          <>
            {/* Top Metrics - Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
              <MetricCard
                title="Total Members"
                value={teamMembers.length}
                subtitle="Active team size"
                color="text-blue-600"
                icon="👥"
              />
              <MetricCard
                title="Active Tasks"
                value={activeTasks}
                subtitle={`${completedTasks} completed`}
                color="text-green-600"
                icon="📋"
              />
              <MetricCard
                title="Working Now"
                value={statusCounts['Working'] || 0}
                subtitle="Currently active"
                color="text-emerald-600"
                icon="💼"
              />
              <MetricCard
                title="In Meetings"
                value={statusCounts['Meeting'] || 0}
                subtitle="Currently busy"
                color="text-purple-600"
                icon="👥"
              />
            </div>

            {/* Status Overview Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 mb-6 md:mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Team Status Overview</h2>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {Object.entries(statusCounts).map(([status, count]) => (
                  <StatusBadge key={status} status={status} count={count} />
                ))}
              </div>
            </div>

            {/* Charts and Task Assignment - Responsive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Status Distribution Chart */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Distribution</h3>
                <div className="h-64 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusChartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                      >
                        {statusChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name) => [`${value} members`, name]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Color Legend */}
                <div className="pt-4 border-t border-gray-200">
                  {Object.entries(COLORS).map(([status, color]) => (
                    <div key={status} className="flex items-center space-x-3 mb-2">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: color }}
                      ></div>
                      <span className="text-sm text-gray-600">{status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Task Assignment Form */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Assign New Task</h3>
                <TaskForm />
              </div>
            </div>

            {/* Team Members List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
                <select 
                  value={statusFilter}
                  onChange={handleFilterChange}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
                >
                  <option value="all">All Status</option>
                  <option value="Working">Working</option>
                  <option value="Meeting">Meeting</option>
                  <option value="Break">Break</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>
              
              <div className="space-y-3">
                {filteredMembers.map(member => {
                  const activeTasks = member.tasks.filter(task => !task.completed).length;
                  const completedTasks = member.tasks.filter(task => task.completed).length;
                  
                  return (
                    <div key={member.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors gap-4 sm:gap-0">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {member.name}
                            {member.name === currentUser && (
                              <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">You</span>
                            )}
                          </p>
                          <p className="text-sm text-gray-500">{member.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                        <StatusBadge status={member.status} />
                        <div className="text-right text-sm">
                          <div className="text-gray-900 font-medium">{activeTasks} active</div>
                          <div className="text-gray-500">{completedTasks} completed</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          // TEAM MEMBER VIEW - Responsive
          <>
            {/* Member Status Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 mb-6 md:mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">🎯 Update Your Status</h2>
              <StatusSelector currentUser={currentUser} />
            </div>

            {/* Member Tasks */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">📝 Your Tasks</h2>
              <TaskList currentUser={currentUser} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;