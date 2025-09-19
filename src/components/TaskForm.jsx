// src/components/TaskForm.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { assignTask } from '../redux/slices/membersSlice';
import TaskPrioritySelector from './TaskPrioritySelector';

const TaskForm = () => {
  const dispatch = useDispatch();
  const { teamMembers } = useSelector(state => state.members);
  const { currentUser } = useSelector(state => state.role);
  
  const [formData, setFormData] = useState({
    memberId: '',
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
    category: 'Development',
    estimatedHours: 8,
    tags: [],
    dependencies: []
  });
  
  const [tagInput, setTagInput] = useState('');
  const [dependencyInput, setDependencyInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const categories = [
    { value: 'Development', icon: '💻', color: 'bg-blue-100 text-blue-800' },
    { value: 'Design', icon: '🎨', color: 'bg-purple-100 text-purple-800' },
    { value: 'Testing', icon: '🧪', color: 'bg-green-100 text-green-800' },
    { value: 'Documentation', icon: '📚', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'Management', icon: '💼', color: 'bg-gray-100 text-gray-800' },
    { value: 'Security', icon: '🔒', color: 'bg-red-100 text-red-800' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePriorityChange = (priority) => {
    setFormData(prev => ({ ...prev, priority }));
  };

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !formData.tags.includes(tag) && formData.tags.length < 10) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addDependency = () => {
    const dep = dependencyInput.trim();
    if (dep && !formData.dependencies.includes(dep)) {
      setFormData(prev => ({
        ...prev,
        dependencies: [...prev.dependencies, dep]
      }));
      setDependencyInput('');
    }
  };

  const removeDependency = (depToRemove) => {
    setFormData(prev => ({
      ...prev,
      dependencies: prev.dependencies.filter(dep => dep !== depToRemove)
    }));
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.memberId) errors.memberId = 'Please select a team member';
    if (!formData.title.trim()) errors.title = 'Task title is required';
    if (formData.title.length > 100) errors.title = 'Title must be under 100 characters';
    if (!formData.dueDate) errors.dueDate = 'Due date is required';
    if (formData.estimatedHours <= 0 || formData.estimatedHours > 200) {
      errors.estimatedHours = 'Estimated hours must be between 0.5 and 200';
    }
    
    // Check if due date is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(formData.dueDate);
    
    if (dueDate < today) {
      errors.dueDate = 'Due date cannot be in the past';
    }
    
    // Check if due date is too far in future (1 year)
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    if (dueDate > maxDate) {
      errors.dueDate = 'Due date cannot be more than 1 year from now';
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      console.log('Please fix the form errors before submitting');
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedMember = teamMembers.find(member => member.id === parseInt(formData.memberId));
      
      const taskData = {
        ...formData,
        assignedBy: currentUser,
        assignedDate: new Date().toISOString(),
        estimatedHours: parseFloat(formData.estimatedHours),
        actualHours: 0,
        comments: [],
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      dispatch(assignTask({
        memberId: formData.memberId,
        task: taskData
      }));

      console.log(`Task "${formData.title}" assigned to ${selectedMember.name}`);

      // Clear form
      const resetForm = {
        memberId: '',
        title: '',
        description: '',
        dueDate: '',
        priority: 'Medium',
        category: 'Development',
        estimatedHours: 8,
        tags: [],
        dependencies: []
      };
      
      setFormData(resetForm);
      setTagInput('');
      setDependencyInput('');
      setValidationErrors({});

    } catch (error) {
      console.log('Failed to assign task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSelectedCategory = () => {
    return categories.find(cat => cat.value === formData.category) || categories[0];
  };

  const getMemberWorkload = (memberId) => {
    const member = teamMembers.find(m => m.id === parseInt(memberId));
    if (!member) return { activeTasks: 0, totalHours: 0 };
    
    const activeTasks = member.tasks.filter(t => !t.completed).length;
    const totalHours = member.tasks
      .filter(t => !t.completed)
      .reduce((sum, t) => sum + (t.estimatedHours || 0), 0);
    
    return { activeTasks, totalHours };
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Member Selection with Workload Info */}
        <div>
          <label htmlFor="memberId" className="block text-sm font-medium text-gray-700 mb-2">
            Assign to Team Member *
          </label>
          <select
            id="memberId"
            name="memberId"
            value={formData.memberId}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              validationErrors.memberId ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          >
            <option value="">Select a team member</option>
            {teamMembers.map(member => {
              const workload = getMemberWorkload(member.id);
              return (
                <option key={member.id} value={member.id}>
                  {member.name} ({workload.activeTasks} tasks, {workload.totalHours}h)
                </option>
              );
            })}
          </select>
          {validationErrors.memberId && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.memberId}</p>
          )}
        </div>

        {/* Task Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Task Title * ({formData.title.length}/100)
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter a clear, concise task title"
            maxLength={100}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              validationErrors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          />
          {validationErrors.title && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.title}</p>
          )}
        </div>

        {/* Task Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide detailed instructions and context for this task..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            Add acceptance criteria, technical requirements, or any special instructions
          </p>
        </div>

        {/* Priority Selector */}
        <TaskPrioritySelector 
          priority={formData.priority}
          onChange={handlePriorityChange}
        />

        {/* Category & Due Date Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.icon} {category.value}
                </option>
              ))}
            </select>
            <div className="mt-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSelectedCategory().color}`}>
                <span className="mr-1">{getSelectedCategory().icon}</span>
                {formData.category}
              </span>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
              Due Date *
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              max={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                validationErrors.dueDate ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {validationErrors.dueDate && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.dueDate}</p>
            )}
          </div>
        </div>

        {/* Estimated Hours */}
        <div>
          <label htmlFor="estimatedHours" className="block text-sm font-medium text-gray-700 mb-2">
            Estimated Hours
          </label>
          <div className="relative">
            <input
              type="number"
              id="estimatedHours"
              name="estimatedHours"
              value={formData.estimatedHours}
              onChange={handleChange}
              min="0.5"
              max="200"
              step="0.5"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                validationErrors.estimatedHours ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <span className="absolute right-3 top-2 text-gray-500 text-sm">hours</span>
          </div>
          {validationErrors.estimatedHours && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.estimatedHours}</p>
          )}
          <div className="mt-2 text-xs text-gray-500">
            <div className="flex justify-between">
              <span>Quick estimates:</span>
              <div className="space-x-2">
                {[2, 4, 8, 16, 24].map(hours => (
                  <button
                    key={hours}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, estimatedHours: hours }))}
                    className="px-2 py-1 bg-gray-100 rounded text-xs hover:bg-gray-200 transition-colors"
                  >
                    {hours}h
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags ({formData.tags.length}/10)
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none"
                  aria-label={`Remove tag ${tag}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              placeholder="Add tags (press Enter)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              disabled={formData.tags.length >= 10}
            />
            <button
              type="button"
              onClick={addTag}
              disabled={!tagInput.trim() || formData.tags.length >= 10}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-r-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Add
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Use tags to categorize and filter tasks (e.g., urgent, frontend, api)
          </p>
        </div>

        {/* Dependencies */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dependencies
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.dependencies.map(dep => (
              <span
                key={dep}
                className="inline-flex items-center px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full"
              >
                {dep}
                <button
                  type="button"
                  onClick={() => removeDependency(dep)}
                  className="ml-1 text-orange-600 hover:text-orange-800 focus:outline-none"
                  aria-label={`Remove dependency ${dep}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={dependencyInput}
              onChange={(e) => setDependencyInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDependency())}
              placeholder="Add task dependencies"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
            <button
              type="button"
              onClick={addDependency}
              disabled={!dependencyInput.trim()}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-r-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Add
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            List other tasks or requirements that must be completed first
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            isSubmitting
              ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Assigning Task...
            </span>
          ) : (
            '📋 Assign Task'
          )}
        </button>

        {/* Form Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">💡 Pro Tips:</h4>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Use clear, action-oriented task titles</li>
            <li>• Add relevant tags for better organization and filtering</li>
            <li>• Set realistic time estimates based on task complexity</li>
            <li>• Higher priority tasks will be highlighted for assignees</li>
            <li>• Include dependencies to help with task scheduling</li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;