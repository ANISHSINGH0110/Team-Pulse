// src/components/StatusSelector.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateMemberStatus } from '../redux/slices/membersSlice';

const StatusSelector = ({ currentUser }) => {
  const dispatch = useDispatch();
  const { teamMembers } = useSelector(state => state.members);
  
  const currentMember = teamMembers.find(member => member.name === currentUser);
  const currentStatus = currentMember?.status || 'Offline';

  const statusOptions = [
    { value: 'Working', label: 'Working', color: 'bg-green-600 hover:bg-green-700', activeColor: 'bg-green-600' },
    { value: 'Break', label: 'Break', color: 'bg-yellow-600 hover:bg-yellow-700', activeColor: 'bg-yellow-600' },
    { value: 'Meeting', label: 'Meeting', color: 'bg-blue-600 hover:bg-blue-700', activeColor: 'bg-blue-600' },
    { value: 'Offline', label: 'Offline', color: 'bg-gray-600 hover:bg-gray-700', activeColor: 'bg-gray-600' }
  ];

  const handleStatusChange = (status) => {
    if (currentMember) {
      dispatch(updateMemberStatus({
        memberId: currentMember.id,
        status
      }));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <span className="text-sm text-gray-600">Current Status:</span>
        <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${statusOptions.find(s => s.value === currentStatus)?.activeColor}`}>
          {currentStatus}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {statusOptions.map(option => (
          <button
            key={option.value}
            onClick={() => handleStatusChange(option.value)}
            className={`px-4 py-3 rounded-lg text-white font-medium transition-colors ${
              currentStatus === option.value 
                ? option.activeColor + ' ring-2 ring-offset-2 ring-gray-400' 
                : option.color
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-500 mt-4">
        Click on any status to update your current status. Your team lead will be able to see this information.
      </p>
    </div>
  );
};

export default StatusSelector;