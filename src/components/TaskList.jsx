// src/components/TaskList.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTaskProgress, completeTask } from '../redux/slices/membersSlice';

const TaskList = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.role);
  const { teamMembers } = useSelector((state) => state.members);

  // Find current user's tasks
  const currentMember = teamMembers.find(member => member.name === currentUser);
  const tasks = currentMember?.tasks || [];

  const handleProgressChange = (taskId, change) => {
    const task = tasks.find(t => t.id === taskId);
    const newProgress = Math.max(0, Math.min(100, task.progress + change));
    
    if (newProgress === 100) {
      dispatch(completeTask({ memberId: currentMember.id, taskId }));
    } else {
      dispatch(updateTaskProgress({ 
        memberId: currentMember.id, 
        taskId, 
        progress: newProgress 
      }));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return 'bg-green-500';
    if (progress >= 70) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
        <p className="text-gray-500">No tasks assigned yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium text-lg">{task.title}</h3>
                <p className="text-sm text-gray-500">
                  Due: {formatDate(task.dueDate)}
                </p>
              </div>
              {task.completed && (
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  Completed
                </span>
              )}
            </div>
            
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{task.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(task.progress)}`}
                  style={{ width: `${task.progress}%` }}
                ></div>
              </div>
            </div>
            
            {!task.completed && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleProgressChange(task.id, -10)}
                  disabled={task.progress === 0}
                  className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  -10%
                </button>
                <button
                  onClick={() => handleProgressChange(task.id, 10)}
                  disabled={task.progress === 100}
                  className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  +10%
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;