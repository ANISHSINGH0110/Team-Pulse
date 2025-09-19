// src/redux/slices/membersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialMembers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    status: 'Working',
    avatar: null,
    tasks: [
      { 
        id: 1, 
        title: 'Complete login feature', 
        description: 'Implement OAuth and JWT authentication system',
        dueDate: '2025-01-25', 
        progress: 60, 
        completed: false,
        priority: 'High',
        category: 'Development',
        estimatedHours: 8,
        actualHours: 4.5,
        assignedBy: 'Sarah Wilson',
        assignedAt: '2025-01-20T10:00:00Z',
        tags: ['authentication', 'backend', 'security'],
        comments: [
          {
            id: 1,
            author: 'John Doe',
            message: 'Started working on OAuth integration, making good progress',
            timestamp: '2025-01-22T14:30:00Z'
          }
        ]
      },
      { 
        id: 2, 
        title: 'Fix responsive layout', 
        description: 'Fix mobile responsive issues on dashboard',
        dueDate: '2025-01-28', 
        progress: 100, 
        completed: true,
        priority: 'Medium',
        category: 'Design',
        estimatedHours: 4,
        actualHours: 3.5,
        assignedBy: 'Sarah Wilson',
        assignedAt: '2025-01-18T09:00:00Z',
        tags: ['css', 'mobile', 'responsive'],
        comments: []
      }
    ]
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'Meeting',
    avatar: null,
    tasks: [
      { 
        id: 3, 
        title: 'Database optimization', 
        description: 'Optimize database queries for better performance',
        dueDate: '2025-01-30', 
        progress: 40, 
        completed: false,
        priority: 'High',
        category: 'Development',
        estimatedHours: 12,
        actualHours: 6,
        assignedBy: 'Sarah Wilson',
        assignedAt: '2025-01-19T11:00:00Z',
        tags: ['database', 'performance', 'sql'],
        comments: [
          {
            id: 2,
            author: 'Jane Smith',
            message: 'Identified slow queries, working on optimization',
            timestamp: '2025-01-23T16:45:00Z'
          }
        ]
      }
    ]
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    status: 'Break',
    avatar: null,
    tasks: [
      { 
        id: 4, 
        title: 'API documentation', 
        description: 'Create comprehensive API documentation using Swagger',
        dueDate: '2025-01-26', 
        progress: 80, 
        completed: false,
        priority: 'Medium',
        category: 'Documentation',
        estimatedHours: 6,
        actualHours: 5,
        assignedBy: 'Sarah Wilson',
        assignedAt: '2025-01-17T14:00:00Z',
        tags: ['documentation', 'api', 'swagger'],
        comments: []
      },
      { 
        id: 5, 
        title: 'Unit tests implementation', 
        description: 'Write unit tests for user authentication module',
        dueDate: '2025-02-01', 
        progress: 20, 
        completed: false,
        priority: 'Low',
        category: 'Testing',
        estimatedHours: 10,
        actualHours: 2,
        assignedBy: 'Sarah Wilson',
        assignedAt: '2025-01-21T08:00:00Z',
        tags: ['testing', 'jest', 'unit-tests'],
        comments: [
          {
            id: 3,
            author: 'Mike Johnson',
            message: 'Setting up testing environment, will start implementation tomorrow',
            timestamp: '2025-01-23T17:00:00Z'
          }
        ]
      }
    ]
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    status: 'Working',
    avatar: null,
    tasks: [
      {
        id: 6,
        title: 'Team performance review',
        description: 'Conduct quarterly performance reviews for all team members',
        dueDate: '2025-02-15',
        progress: 30,
        completed: false,
        priority: 'High',
        category: 'Management',
        estimatedHours: 16,
        actualHours: 5,
        assignedBy: 'Sarah Wilson',
        assignedAt: '2025-01-15T12:00:00Z',
        tags: ['hr', 'performance', 'review'],
        comments: []
      }
    ]
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david@example.com',
    status: 'Offline',
    avatar: null,
    tasks: [
      { 
        id: 7, 
        title: 'Security audit', 
        description: 'Perform comprehensive security audit of the application',
        dueDate: '2025-02-05', 
        progress: 10, 
        completed: false,
        priority: 'High',
        category: 'Security',
        estimatedHours: 20,
        actualHours: 2,
        assignedBy: 'Sarah Wilson',
        assignedAt: '2025-01-16T15:00:00Z',
        tags: ['security', 'audit', 'vulnerability'],
        comments: []
      }
    ]
  }
];

const membersSlice = createSlice({
  name: 'members',
  initialState: {
    teamMembers: initialMembers,
    statusFilter: 'all',
    priorityFilter: 'all',
    categoryFilter: 'all',
    loading: false,
    error: null
  },
  reducers: {
    fetchTeamMembers: (state) => {
      state.loading = false;
      // In a real app, this would be an async thunk
    },
    
    updateMemberStatus: (state, action) => {
      const { memberId, status } = action.payload;
      const member = state.teamMembers.find(m => m.id === parseInt(memberId));
      if (member) {
        member.status = status;
      }
    },
    
    assignTask: (state, action) => {
      const { memberId, task } = action.payload;
      const member = state.teamMembers.find(m => m.id === parseInt(memberId));
      if (member) {
        const newTask = {
          id: Date.now(),
          title: task.title,
          description: task.description || '',
          dueDate: task.dueDate,
          progress: 0,
          completed: false,
          priority: task.priority || 'Medium',
          category: task.category || 'Development',
          estimatedHours: task.estimatedHours || 8,
          actualHours: 0,
          assignedBy: task.assignedBy || 'Team Lead',
          assignedAt: new Date().toISOString(),
          tags: task.tags || [],
          comments: []
        };
        member.tasks.push(newTask);
      }
    },
    
    updateTaskProgress: (state, action) => {
      const { memberId, taskId, progress } = action.payload;
      const member = state.teamMembers.find(m => m.id === memberId);
      if (member) {
        const task = member.tasks.find(t => t.id === taskId);
        if (task) {
          task.progress = Math.max(0, Math.min(100, progress));
          if (task.progress === 100) {
            task.completed = true;
          } else if (task.completed && task.progress < 100) {
            task.completed = false;
          }
        }
      }
    },
    
    completeTask: (state, action) => {
      const { memberId, taskId } = action.payload;
      const member = state.teamMembers.find(m => m.id === memberId);
      if (member) {
        const task = member.tasks.find(t => t.id === taskId);
        if (task) {
          task.progress = 100;
          task.completed = true;
        }
      }
    },
    
    updateTaskPriority: (state, action) => {
      const { memberId, taskId, priority } = action.payload;
      const member = state.teamMembers.find(m => m.id === memberId);
      if (member) {
        const task = member.tasks.find(t => t.id === taskId);
        if (task) {
          task.priority = priority;
        }
      }
    },
    
    updateTaskCategory: (state, action) => {
      const { memberId, taskId, category } = action.payload;
      const member = state.teamMembers.find(m => m.id === memberId);
      if (member) {
        const task = member.tasks.find(t => t.id === taskId);
        if (task) {
          task.category = category;
        }
      }
    },
    
    addTaskComment: (state, action) => {
      const { memberId, taskId, comment } = action.payload;
      const member = state.teamMembers.find(m => m.id === memberId);
      if (member) {
        const task = member.tasks.find(t => t.id === taskId);
        if (task) {
          const newComment = {
            id: Date.now(),
            author: comment.author,
            message: comment.message,
            timestamp: new Date().toISOString()
          };
          task.comments.push(newComment);
        }
      }
    },
    
    updateTaskHours: (state, action) => {
      const { memberId, taskId, actualHours } = action.payload;
      const member = state.teamMembers.find(m => m.id === memberId);
      if (member) {
        const task = member.tasks.find(t => t.id === taskId);
        if (task) {
          task.actualHours = Math.max(0, actualHours);
        }
      }
    },
    
    addTaskTag: (state, action) => {
      const { memberId, taskId, tag } = action.payload;
      const member = state.teamMembers.find(m => m.id === memberId);
      if (member) {
        const task = member.tasks.find(t => t.id === taskId);
        if (task && !task.tags.includes(tag)) {
          task.tags.push(tag);
        }
      }
    },
    
    removeTaskTag: (state, action) => {
      const { memberId, taskId, tag } = action.payload;
      const member = state.teamMembers.find(m => m.id === memberId);
      if (member) {
        const task = member.tasks.find(t => t.id === taskId);
        if (task) {
          task.tags = task.tags.filter(t => t !== tag);
        }
      }
    },
    
    deleteTask: (state, action) => {
      const { memberId, taskId } = action.payload;
      const member = state.teamMembers.find(m => m.id === memberId);
      if (member) {
        member.tasks = member.tasks.filter(task => task.id !== taskId);
      }
    },
    
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
    },
    
    setPriorityFilter: (state, action) => {
      state.priorityFilter = action.payload;
    },
    
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;
    },
    
    // Bulk operations
    bulkUpdateTaskPriority: (state, action) => {
      const { taskIds, priority } = action.payload;
      state.teamMembers.forEach(member => {
        member.tasks.forEach(task => {
          if (taskIds.includes(task.id)) {
            task.priority = priority;
          }
        });
      });
    },
    
    bulkCompleteTask: (state, action) => {
      const { taskIds } = action.payload;
      state.teamMembers.forEach(member => {
        member.tasks.forEach(task => {
          if (taskIds.includes(task.id)) {
            task.progress = 100;
            task.completed = true;
          }
        });
      });
    },
    
    // Analytics helpers
    updateTaskAnalytics: (state, action) => {
      // This could be used to track task completion times, etc.
      const { taskId, analytics } = action.payload;
      state.teamMembers.forEach(member => {
        const task = member.tasks.find(t => t.id === taskId);
        if (task) {
          task.analytics = { ...task.analytics, ...analytics };
        }
      });
    }
  }
});

export const { 
  fetchTeamMembers,
  updateMemberStatus, 
  assignTask, 
  updateTaskProgress, 
  completeTask,
  updateTaskPriority,
  updateTaskCategory,
  addTaskComment,
  updateTaskHours,
  addTaskTag,
  removeTaskTag,
  deleteTask,
  setStatusFilter,
  setPriorityFilter,
  setCategoryFilter,
  bulkUpdateTaskPriority,
  bulkCompleteTask,
  updateTaskAnalytics
} = membersSlice.actions;

export default membersSlice.reducer;