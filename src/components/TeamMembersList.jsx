// src/components/TeamMembersList.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setStatusFilter } from '../redux/slices/membersSlice';
import MemberCard from './MemberCard';

const TeamMembersList = () => {
  const dispatch = useDispatch();
  const { teamMembers, statusFilter } = useSelector(state => state.members);

  const filteredMembers = statusFilter === 'all' 
    ? teamMembers 
    : teamMembers.filter(member => member.status === statusFilter);

  const sortedMembers = [...filteredMembers].sort((a, b) => {
    const aActiveTasks = a.tasks.filter(task => !task.completed).length;
    const bActiveTasks = b.tasks.filter(task => !task.completed).length;
    return bActiveTasks - aActiveTasks; // Sort by most active tasks first
  });

  const handleFilterChange = (e) => {
    dispatch(setStatusFilter(e.target.value));
  };

  return (
    <div className="space-y-4">
      {/* Filter Controls */}
      <div className="flex items-center space-x-4">
        <label className="text-sm font-medium text-gray-700">Filter by status:</label>
        <select
          value={statusFilter}
          onChange={handleFilterChange}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Members</option>
          <option value="Working">Working</option>
          <option value="Break">Break</option>
          <option value="Meeting">Meeting</option>
          <option value="Offline">Offline</option>
        </select>
      </div>

      {/* Members List */}
      <div className="space-y-3">
        {sortedMembers.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No members match the selected filter.</p>
        ) : (
          sortedMembers.map(member => (
            <MemberCard key={member.id} member={member} />
          ))
        )}
      </div>
    </div>
  );
};

export default TeamMembersList;