import React from 'react';

const TaskPrioritySelector = ({ priority, onChange, disabled = false }) => {
  const priorities = [
    { value: 'High', color: 'bg-red-100 text-red-800 border-red-200', icon: '🔴' },
    { value: 'Medium', color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: '🟡' },
    { value: 'Low', color: 'bg-green-100 text-green-800 border-green-200', icon: '🟢' }
  ];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Priority Level
      </label>
      <div className="flex space-x-2">
        {priorities.map(p => (
          <button
            key={p.value}
            type="button"
            disabled={disabled}
            onClick={() => onChange(p.value)}
            className={`px-3 py-2 text-sm font-medium rounded-lg border transition-all ${
              priority === p.value 
                ? p.color + ' ring-2 ring-offset-1 ring-gray-400' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <span className="mr-1">{p.icon}</span>
            {p.value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskPrioritySelector;