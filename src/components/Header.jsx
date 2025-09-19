// src/components/Header.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { switchRole } from '../redux/slices/roleSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { currentRole, currentUser } = useSelector(state => state.role);

  const handleRoleSwitch = () => {
    dispatch(switchRole(currentRole === 'lead' ? 'member' : 'lead'));
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TP</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-blue-600">Team Pulse</h1>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
                {currentRole === 'lead' ? 'Team Lead' : 'Team Member'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-sm font-medium">
                  {currentUser.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <span className="text-gray-600">Welcome, {currentUser}</span>
            </div>
            
            <button
              onClick={handleRoleSwitch}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Switch to {currentRole === 'lead' ? 'Member' : 'Lead'} View
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;