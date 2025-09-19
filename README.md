# Team Pulse Dashboard

A modern, responsive team productivity monitoring application built with React and Redux Toolkit for seamless team management and task tracking.

## Live Demo
🔗 **[View Live Application](https://team-pulse-mu.vercel.app/)**

## Features

### Role-Based Interface
- **Team Lead View**: Comprehensive dashboard with team oversight, task assignment, and analytics
- **Team Member View**: Personal status management and task tracking interface
- One-click role switching for demonstration purposes

### Team Status Management
- Real-time status tracking (Working, Break, Meeting, Offline)
- Visual status distribution with interactive pie charts
- Team member filtering and search capabilities
- Status update notifications and history

### Advanced Task Management
- Rich task creation with priority levels, categories, and tags
- Time estimation and tracking
- Task dependencies and relationships
- Progress tracking with visual indicators
- Bulk task operations
- Comment system for task collaboration

### Data Visualization
- Interactive charts powered by Recharts
- Team productivity metrics
- Status distribution analytics
- Task completion trends
- Workload distribution insights

### User Experience
- Responsive design for all device sizes
- Keyboard shortcuts for power users
- Smooth animations and transitions
- Custom scrollbars and hover effects
- Accessibility-focused design

## Technology Stack

### Frontend
- **React 19** - Latest React with concurrent features
- **Redux Toolkit** - Modern Redux with RTK Query
- **React Redux** - Official React bindings for Redux
- **Tailwind CSS** - Utility-first CSS framework

### Data Visualization
- **Recharts** - Composable charting library for React
- **D3 utilities** - For advanced data manipulation

### Development Tools
- **Vite** - Next-generation frontend build tool
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS processing and optimization
- **Autoprefixer** - CSS vendor prefix automation

### Deployment
- **Vercel** - Serverless deployment platform

## Project Structure

```
team-pulse/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Header.jsx       # Navigation and role switching
│   │   ├── TaskForm.jsx     # Advanced task creation
│   │   ├── TaskList.jsx     # Task management interface
│   │   ├── StatusChart.jsx  # Data visualization
│   │   └── ...
│   ├── pages/
│   │   ├── Dashboard.jsx         # Basic dashboard layout
│   │   └── EnhancedDashboard.jsx # Advanced dashboard with metrics
│   ├── redux/
│   │   ├── store.js         # Redux store configuration
│   │   └── slices/          # Redux Toolkit slices
│   │       ├── membersSlice.js   # Team and task management
│   │       └── roleSlice.js      # Role switching logic
│   ├── hooks/
│   │   └── useKeyboardShortcuts.js # Custom keyboard shortcuts
│   └── styles/
│       └── index.css        # Global styles and Tailwind imports
├── public/
├── package.json
└── ...
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/team-pulse.git
cd team-pulse
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## Usage

### For Team Leads
1. **Dashboard Overview**: View team status distribution and metrics
2. **Task Assignment**: Create detailed tasks with priorities, deadlines, and assignments
3. **Team Monitoring**: Track member status and workload distribution
4. **Analytics**: Review productivity trends and completion rates

### For Team Members
1. **Status Updates**: Keep your status current (Working, Break, Meeting, Offline)
2. **Task Management**: View assigned tasks and update progress
3. **Time Tracking**: Monitor time spent and task completion

### Keyboard Shortcuts
- `Ctrl/Cmd + R` - Switch roles (demo feature)
- `Ctrl/Cmd + 1` - Set status to Working
- `Ctrl/Cmd + 2` - Set status to Break
- `Ctrl/Cmd + 3` - Set status to Meeting
- `Ctrl/Cmd + 4` - Set status to Offline

## Key Components

### State Management
The application uses Redux Toolkit for predictable state management:
- **membersSlice**: Manages team data, tasks, and status updates
- **roleSlice**: Handles role switching and user context

### Task Management Features
- Priority levels (High, Medium, Low) with visual indicators
- Categories (Development, Design, Testing, Documentation, Management, Security)
- Tag system for flexible organization
- Dependency tracking
- Time estimation vs actual tracking
- Comment system for collaboration

### Data Visualization
- Real-time status distribution pie charts
- Team productivity metrics
- Interactive tooltips and legends
- Responsive chart sizing

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Performance Considerations

- React 19 concurrent rendering for smooth UX
- Memoized components to prevent unnecessary re-renders
- Efficient Redux selectors to minimize state subscriptions
- Lazy loading for improved initial load times
- Optimized bundle size with Vite's tree shaking

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- ES2020+ JavaScript features

## Future Enhancements

- Real-time collaboration with WebSocket integration
- Advanced reporting and export capabilities
- Calendar integration for task scheduling
- Team communication features
- Mobile app development
- API integration for external project management tools

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React team for the amazing framework
- Redux team for state management solutions
- Tailwind CSS for the utility-first styling approach
- Recharts team for excellent data visualization components
- Vercel for seamless deployment platform
