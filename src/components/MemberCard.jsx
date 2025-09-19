// src/components/MemberCard.jsx
import React from 'react';

const MemberCard = ({ member }) => {
  const statusColors = {
    'Working': 'bg-green-100 text-green-800 border-green-200',
    'Break': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Meeting': 'bg-blue-100 text-blue-800 border-blue-200',
    'Offline': 'bg-gray-100 text-gray-800 border-gray-200'
  };

  const activeTasks = member.tasks.filter(task => !task.completed).length;
  const completedTasks = member.tasks.filter(task => task.completed).length;

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {member.avatar ? (
            <img 
              src={member.avatar} 
              alt={member.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-medium">
              {member.name.split(' ').map(n => n[0]).join('')}
            </div>
          )}
          
          <div>
            <h3 className="font-medium text-gray-900">{member.name}</h3>
            <p className="text-sm text-gray-500">{member.email}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[member.status] || statusColors['Offline']}`}>
            {member.status}
          </span>
          
          <div className="text-right text-sm">
            <div className="text-gray-900 font-medium">{activeTasks} active</div>
            <div className="text-gray-500">{completedTasks} completed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;