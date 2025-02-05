import {
    AttachMoney,
    Dashboard,
    Description,
    Event,
    Folder,
    Gavel,
    People,
    Settings,
    Group as GroupIcon,
    LocalLibrary as LibraryIcon,
    Task as TaskIcon,
} from '@mui/icons-material';

export const navigationConfig = [
  {
    title: 'Dashboard',
    path: '/',
    icon: Dashboard,
  },
  {
    title: 'Matters',
    path: '/matters',
    icon: Folder,
    children: [
      {
        title: 'All Matters',
        path: '/matters',
      },
      {
        title: 'New Matter',
        path: '/matters/new',
      },
      {
        title: 'Matter Templates',
        path: '/matters/templates',
      },
      {
        title: 'Matter Timeline',
        path: '/matters/timeline',
      },
    ],
  },
  {
    title: 'Tasks & Assignments',
    path: '/tasks',
    icon: TaskIcon,
    children: [
      {
        title: 'Task Dashboard',
        path: '/tasks',
      },
      {
        title: 'My Tasks',
        path: '/tasks/my-tasks',
      },
      {
        title: 'Team Tasks',
        path: '/tasks/team',
      },
      {
        title: 'Task Timeline',
        path: '/tasks/timeline',
      },
    ],
  },
  {
    title: 'Legal Research',
    path: '/research',
    icon: LibraryIcon,
    children: [
      {
        title: 'Case Law Search',
        path: '/research/case-law',
      },
      {
        title: 'Document Analysis',
        path: '/research/analysis',
      },
      {
        title: 'Legal Templates',
        path: '/research/templates',
      },
    ],
  },
  {
    title: 'Client Portal',
    path: '/clients',
    icon: GroupIcon,
    children: [
      {
        title: 'Client List',
        path: '/clients',
      },
      {
        title: 'Messages',
        path: '/clients/messages',
      },
      {
        title: 'Document Sharing',
        path: '/clients/documents',
      },
      {
        title: 'Client Timeline',
        path: '/clients/timeline',
      },
    ],
  },
  {
    title: 'Calendar',
    path: '/calendar',
    icon: Event,
    children: [
      {
        title: 'My Calendar',
        path: '/calendar',
      },
      {
        title: 'Team Calendar',
        path: '/calendar/team',
      },
      {
        title: 'Court Dates',
        path: '/calendar/court',
      },
      {
        title: 'Deadlines',
        path: '/calendar/deadlines',
      },
    ],
  },
  {
    title: 'Time & Billing',
    path: '/billing',
    icon: AttachMoney,
    children: [
      {
        title: 'Time Tracking',
        path: '/billing/time-tracking',
      },
      {
        title: 'Invoices',
        path: '/billing/invoices',
      },
      {
        title: 'Expenses',
        path: '/billing/expenses',
      },
      {
        title: 'Reports',
        path: '/billing/reports',
      },
    ],
  },
  {
    title: 'Documents',
    path: '/documents',
    icon: Description,
    children: [
      {
        title: 'All Documents',
        path: '/documents',
      },
      {
        title: 'Templates',
        path: '/documents/templates',
      },
      {
        title: 'E-Signatures',
        path: '/documents/signatures',
      },
      {
        title: 'Document Timeline',
        path: '/documents/timeline',
      },
    ],
  },
  {
    title: 'Team',
    path: '/team',
    icon: People,
    children: [
      {
        title: 'Team Members',
        path: '/team',
      },
      {
        title: 'Roles & Permissions',
        path: '/team/roles',
      },
      {
        title: 'Work Allocation',
        path: '/team/allocation',
      },
      {
        title: 'Performance',
        path: '/team/performance',
      },
    ],
  },
  {
    title: 'Court',
    path: '/court',
    icon: Gavel,
    children: [
      {
        title: 'Court Calendar',
        path: '/court/calendar',
      },
      {
        title: 'Court Documents',
        path: '/court/documents',
      },
      {
        title: 'E-Filing',
        path: '/court/e-filing',
      },
      {
        title: 'Case Timeline',
        path: '/court/timeline',
      },
    ],
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: Settings,
    children: [
      {
        title: 'Profile',
        path: '/settings/profile',
      },
      {
        title: 'Preferences',
        path: '/settings/preferences',
      },
      {
        title: 'Billing Settings',
        path: '/settings/billing',
      },
      {
        title: 'Team Settings',
        path: '/settings/team',
      },
    ],
  },
]; 