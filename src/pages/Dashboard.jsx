// src/pages/Dashboard.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import TeamMembersList from '../components/TeamMembersList';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import StatusSelector from '../components/StatusSelector';
import StatusSummary from '../components/StatusSummary';
import { fetchTeamMembers } from '../redux/slices/membersSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { currentRole, currentUser } = useSelector(state => state.role);
  const { teamMembers, loading } = useSelector(state => state.members);

  useEffect(() => {
    dispatch(fetchTeamMembers());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading team data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Team Pulse Dashboard</h1>
          <p className="text-gray-600">
            Welcome back, {currentUser}! 
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {currentRole === 'lead' ? '👨‍💼 Team Lead' : '👤 Team Member'}
            </span>
          </p>
        </div>

        {currentRole === 'lead' ? (
          // Team Lead View
          <div className="space-y-6">
            <StatusSummary />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  📋 Assign New Task
                </h2>
                <TaskForm />
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  👥 Team Members
                </h2>
                <TeamMembersList />
              </div>
            </div>
          </div>
        ) : (
          // Team Member View
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                🎯 Update Your Status
              </h2>
              <StatusSelector currentUser={currentUser} />
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                📝 Your Tasks
              </h2>
              <TaskList currentUser={currentUser} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;