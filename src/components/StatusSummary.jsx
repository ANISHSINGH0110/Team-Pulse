// src/components/StatusSummary.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import StatusChart from './StatusChart';

const StatusSummary = () => {
  const { teamMembers } = useSelector(state => state.members);

  const statusCounts = teamMembers.reduce((acc, member) => {
    acc[member.status] = (acc[member.status] || 0) + 1;
    return acc;
  }, {});

  const statusColors = {
    'Working': 'bg-green-100 text-green-800 border-green-200',
    'Break': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Meeting': 'bg-blue-100 text-blue-800 border-blue-200',
    'Offline': 'bg-gray-100 text-gray-800 border-gray-200'
  };

  const statusIcons = {
    'Working': '💼',
    'Break': '☕',
    'Meeting': '👥',
    'Offline': '📴'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        📊 Team Status Overview
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Cards */}
        <div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div key={status} className="text-center">
                <div className={`inline-flex items-center px-4 py-3 rounded-lg text-sm font-medium border-2 ${statusColors[status] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
                  <span className="mr-2 text-lg">{statusIcons[status]}</span>
                  <div>
                    <div className="font-bold text-lg">{count}</div>
                    <div className="text-xs">{status}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Total Members:</span>
                <span className="font-semibold">{teamMembers.length}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>Active Members:</span>
                <span className="font-semibold text-green-600">
                  {(statusCounts['Working'] || 0) + (statusCounts['Meeting'] || 0)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Chart */}
        <div>
          <h3 className="text-lg font-medium mb-3 text-center">Status Distribution</h3>
          <StatusChart />
        </div>
      </div>
    </div>
  );
};

export default StatusSummary;