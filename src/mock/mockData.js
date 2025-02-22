// Mock data for the entire application
export const mockData = {
  // Dashboard Statistics
  dashboardStats: {
    activeCases: 24,
    pendingTasks: 45,
    upcomingDeadlines: 12,
    billableHours: 156,
    revenueThisMonth: 'R 245,000',
    outstandingPayments: 'R 78,500',
    documentsProcessed: 89,
    clientMeetings: 15,
  },

  // Legal Templates
  legalTemplates: [
    {
      id: 1,
      name: 'South African Service Agreement',
      category: 'Contracts',
      lastModified: '2024-03-15',
      author: 'Jane Smith',
      tags: ['contract', 'agreement', 'legal'],
      content: 'Standard South African service agreement template...',
      version: '2.1',
      jurisdiction: 'South Africa',
      applicableLaw: 'South African Contract Law',
    },
    {
      id: 2,
      name: 'Power of Attorney (SA)',
      category: 'Legal Documents',
      lastModified: '2024-03-14',
      author: 'John Doe',
      tags: ['power of attorney', 'legal'],
      content: 'South African power of attorney template...',
      version: '1.0',
      jurisdiction: 'South Africa',
      applicableLaw: 'South African Power of Attorney Act',
    },
    {
      id: 3,
      name: 'Non-Disclosure Agreement (POPIA Compliant)',
      category: 'Contracts',
      lastModified: '2024-03-13',
      author: 'Sarah Johnson',
      tags: ['nda', 'confidentiality', 'legal', 'POPIA'],
      content: 'POPIA-compliant NDA template...',
      version: '3.2',
      jurisdiction: 'South Africa',
      applicableLaw: 'POPIA',
    },
  ],

  // Document Templates
  documentTemplates: [
    {
      id: 1,
      name: 'Client Intake Form',
      category: 'Forms',
      lastModified: '2024-03-15',
      author: 'Sarah Johnson',
      tags: ['intake', 'client', 'form'],
      fields: ['name', 'contact', 'case_details'],
    },
    {
      id: 2,
      name: 'Case Summary Template',
      category: 'Legal Documents',
      lastModified: '2024-03-14',
      author: 'Mike Wilson',
      tags: ['summary', 'case', 'legal'],
      fields: ['case_number', 'parties', 'summary'],
    },
    {
      id: 3,
      name: 'Legal Brief Template',
      category: 'Court Documents',
      lastModified: '2024-03-13',
      author: 'Jane Smith',
      tags: ['brief', 'court', 'legal'],
      fields: ['title', 'arguments', 'citations'],
    },
  ],

  // Matter Templates
  matterTemplates: [
    {
      id: 1,
      name: 'Company Registration (CIPC)',
      category: 'Corporate',
      lastModified: '2024-03-15',
      author: 'Mike Wilson',
      steps: [
        'Initial Consultation',
        'CIPC Documentation',
        'Name Reservation',
        'Registration Filing',
        'Tax Registration',
        'B-BBEE Certification',
        'Bank Account Setup',
      ],
      documents: [
        'CIPC Forms',
        'Memorandum of Incorporation',
        'Share Certificates',
        'Directors Appointments',
      ],
      timeline: '21-30 days',
      fees: 'R 8,500 - R 12,000',
    },
    {
      id: 2,
      name: 'High Court Litigation',
      category: 'Litigation',
      lastModified: '2024-03-14',
      author: 'Jane Smith',
      steps: [
        'Case Assessment',
        'Letter of Demand',
        'Summons Drafting',
        'Pleadings',
        'Discovery',
        'Pre-Trial Conference',
        'Trial Preparation',
        'Trial',
        'Judgment',
        'Possible Appeal',
      ],
      documents: [
        'Summons',
        'Pleadings',
        'Discovery Documents',
        'Expert Reports',
        'Witness Statements',
      ],
      timeline: '12-24 months',
      fees: 'Based on High Court tariffs',
    },
    {
      id: 3,
      name: 'Property Transfer',
      category: 'Property Law',
      lastModified: '2024-03-13',
      author: 'John Doe',
      steps: [
        'Deed of Sale Review',
        'FICA Compliance',
        'Transfer Duty Payment',
        'Municipal Clearance',
        'Deeds Office Filing',
        'Registration',
      ],
      documents: [
        'Deed of Sale',
        'Transfer Documents',
        'FICA Documents',
        'Municipal Clearance Certificate',
        'Transfer Duty Receipt',
      ],
      timeline: '2-3 months',
      fees: 'Based on property value',
    },
  ],

  // Tasks
  tasks: [
    {
      id: 1,
      title: 'Review POPIA Compliance',
      description: 'Review and update client\'s POPIA compliance documentation',
      assignedTo: 'Jane Smith',
      dueDate: '2024-03-20',
      priority: 'High',
      status: 'In Progress',
      matter: 'ABC Corporation Compliance',
      billableHours: 4.5,
      rate: 'R 2,500/hour',
      comments: [
        {
          id: 1,
          user: 'John Doe',
          text: 'Information Officer details need updating',
          timestamp: '2024-03-15T10:30:00',
        },
        {
          id: 2,
          user: 'Sarah Johnson',
          text: 'Added new consent forms',
          timestamp: '2024-03-15T11:45:00',
        },
      ],
      attachments: [
        {
          id: 1,
          name: 'POPIA_Manual_v1.pdf',
          uploadedBy: 'Jane Smith',
          uploadDate: '2024-03-15',
          size: '2.5MB',
        },
      ],
      checklist: [
        { id: 1, text: 'Review current policy', completed: true },
        { id: 2, text: 'Update consent forms', completed: false },
        { id: 3, text: 'Check compliance with regulations', completed: false },
      ],
    },
    {
      id: 2,
      title: 'Draft High Court Motion',
      description: 'Prepare motion application for urgent interdict',
      assignedTo: 'John Doe',
      dueDate: '2024-03-25',
      priority: 'High',
      status: 'Not Started',
      matter: 'XYZ Urgent Application',
      billableHours: 0,
      rate: 'R 3,000/hour',
      comments: [],
      attachments: [],
      checklist: [
        { id: 1, text: 'Research similar cases', completed: false },
        { id: 2, text: 'Draft founding affidavit', completed: false },
        { id: 3, text: 'Prepare notice of motion', completed: false },
      ],
    },
  ],

  // Team Tasks
  teamTasks: [
    {
      id: 1,
      title: 'Monthly Team Meeting',
      description: 'Review case progress and assign new matters',
      assignedTo: ['Jane Smith', 'John Doe', 'Sarah Johnson'],
      dueDate: '2024-03-28',
      priority: 'Medium',
      status: 'Scheduled',
      location: 'Conference Room A',
      duration: '2 hours',
      agenda: [
        'Case Updates',
        'New Matter Assignments',
        'Performance Review',
        'Training Needs',
      ],
    },
    {
      id: 2,
      title: 'Client File Audit',
      description: 'Quarterly audit of all active client files',
      assignedTo: ['Sarah Johnson', 'Mike Wilson'],
      dueDate: '2024-04-15',
      priority: 'High',
      status: 'Not Started',
      checklist: [
        { id: 1, text: 'Review FICA compliance', completed: false },
        { id: 2, text: 'Check file organization', completed: false },
        { id: 3, text: 'Update client contact details', completed: false },
      ],
    },
  ],

  // Document Analysis Data
  documentAnalysis: {
    recentAnalyses: [
      {
        id: 1,
        documentName: 'Commercial Lease Agreement.pdf',
        analysisDate: '2024-03-15',
        findings: [
          'Missing force majeure clause',
          'Rental escalation clause needs revision',
          'POPIA compliance issues identified',
        ],
        riskLevel: 'High',
        recommendations: [
          'Add comprehensive force majeure clause',
          'Update rental escalation as per CPI',
          'Include POPIA compliance provisions',
        ],
      },
      {
        id: 2,
        documentName: 'Employment Contract.pdf',
        analysisDate: '2024-03-14',
        findings: [
          'Compliant with Basic Conditions of Employment Act',
          'Leave policy needs updating',
          'Missing workplace safety provisions',
        ],
        riskLevel: 'Medium',
        recommendations: [
          'Update leave policy as per latest legislation',
          'Add detailed workplace safety section',
        ],
      },
    ],
    analysisTemplates: [
      {
        id: 1,
        name: 'Contract Risk Assessment',
        type: 'Legal Analysis',
        checkpoints: [
          'Jurisdiction clause',
          'Liability provisions',
          'Termination conditions',
          'Force majeure',
          'Dispute resolution',
        ],
      },
      {
        id: 2,
        name: 'Compliance Review',
        type: 'Regulatory',
        checkpoints: [
          'POPIA compliance',
          'B-BBEE requirements',
          'Employment equity',
          'Tax compliance',
          'Industry-specific regulations',
        ],
      },
    ],
  },

  // Expenses
  expenses: {
    categories: [
      'Court Fees',
      'Filing Fees',
      'Travel',
      'Printing & Copying',
      'Expert Witnesses',
      'Research',
    ],
    records: [
      {
        id: 1,
        date: '2024-03-15',
        category: 'Court Fees',
        description: 'High Court Filing Fee',
        amount: 'R 2,500',
        matter: 'Smith vs Johnson',
        billable: true,
        status: 'Pending Approval',
        receipt: 'receipt_001.pdf',
      },
      {
        id: 2,
        date: '2024-03-14',
        category: 'Travel',
        description: 'Client Meeting - Cape Town',
        amount: 'R 4,800',
        matter: 'ABC Corporation',
        billable: true,
        status: 'Approved',
        receipt: 'receipt_002.pdf',
      },
    ],
    summaries: {
      monthlyTotal: 'R 45,000',
      billableAmount: 'R 38,500',
      pendingApproval: 'R 12,000',
      reimbursed: 'R 25,000',
    },
  },

  // Team Settings
  teamSettings: {
    roles: [
      {
        id: 1,
        name: 'Senior Partner',
        permissions: [
          'manage_team',
          'approve_expenses',
          'view_financials',
          'edit_matters',
          'manage_clients',
          'approve_documents',
        ],
        billableRate: 'R 3,500/hour',
        description: 'Full access to all system features and management capabilities',
      },
      {
        id: 2,
        name: 'Associate',
        permissions: [
          'edit_documents',
          'view_matters',
          'track_time',
          'manage_tasks',
        ],
        billableRate: 'R 2,500/hour',
        description: 'Access to matter-related features and document management',
      },
      {
        id: 3,
        name: 'Paralegal',
        permissions: [
          'view_documents',
          'track_time',
          'manage_tasks',
        ],
        billableRate: 'R 1,500/hour',
        description: 'Limited access to support legal work',
      },
    ],
    workAllocation: {
      capacityThresholds: {
        maximum: 45,
        warning: 35,
        optimal: 25,
      },
      allocationRules: [
        'Based on expertise',
        'Consider current workload',
        'Match matter complexity',
        'Consider deadline constraints',
      ],
    },
  },

  // Billing Settings
  billingSettings: {
    rateCards: [
      {
        id: 1,
        name: 'Standard Rates',
        rates: [
          { role: 'Senior Partner', rate: 'R 3,500/hour' },
          { role: 'Partner', rate: 'R 3,000/hour' },
          { role: 'Senior Associate', rate: 'R 2,800/hour' },
          { role: 'Associate', rate: 'R 2,500/hour' },
          { role: 'Candidate Attorney', rate: 'R 1,800/hour' },
          { role: 'Paralegal', rate: 'R 1,500/hour' },
        ],
      },
      {
        id: 2,
        name: 'Pro Bono Rates',
        rates: [
          { role: 'All Roles', rate: 'R 0/hour' },
        ],
      },
    ],
    invoiceSettings: {
      frequency: 'Monthly',
      termsOfPayment: '30 days',
      lateFees: '2% per month',
      taxRate: '15% VAT',
      currency: 'ZAR',
    },
    expenseMarkups: {
      courtFees: '0%',
      travel: '10%',
      copying: '15%',
      research: '10%',
    },
  },

  // Team Calendar Events
  calendarEvents: [
    {
      id: 1,
      title: 'Client Meeting',
      start: '2024-03-20T09:00:00',
      end: '2024-03-20T10:00:00',
      description: 'Initial consultation with new client',
      attendees: ['Jane Smith', 'John Doe'],
      location: 'Conference Room A',
      type: 'meeting',
      color: '#FF69B4',
    },
    {
      id: 2,
      title: 'Court Hearing',
      start: '2024-03-21T14:00:00',
      end: '2024-03-21T16:00:00',
      description: 'Motion hearing for Smith vs. Johnson',
      attendees: ['Sarah Johnson'],
      location: 'County Courthouse',
      type: 'court',
      color: '#9370DB',
    },
    {
      id: 3,
      title: 'Document Review',
      start: '2024-03-22T11:00:00',
      end: '2024-03-22T12:30:00',
      description: 'Team review of case documents',
      attendees: ['Jane Smith', 'John Doe', 'Sarah Johnson'],
      location: 'Virtual',
      type: 'internal',
      color: '#87CEEB',
    },
    {
      id: 4,
      title: '',
      start: new Date(),
      end: null,
      description: null,
      attendees: [],
      location: undefined,
      type: 'other',
      color: '#CCCCCC',
    },
    {
      id: 5,
      title: 'All Day Event',
      start: '2024-03-25',
      end: '2024-03-26',
      description: 'Test all-day event',
      attendees: ['Jane Smith'],
      location: 'Office',
      type: 'meeting',
      color: '#FF69B4',
      allDay: true,
    }
  ],

  // Documents
  documents: [
    {
      id: 1,
      name: 'Client Agreement.pdf',
      category: 'Contracts',
      matter: 'Smith vs. Johnson',
      uploadedBy: 'Jane Smith',
      uploadDate: '2024-03-15',
      status: 'Final',
      size: '2.5MB',
      type: 'application/pdf',
      path: '/documents/contracts/',
      signatures: [
        {
          id: 1,
          name: 'John Smith',
          date: '2024-03-15',
          status: 'Signed',
          method: 'Digital',
        },
        {
          id: 2,
          name: 'Jane Doe',
          date: '2024-03-15',
          status: 'Pending',
          method: 'Digital',
        },
      ],
      timeline: [
        {
          id: 1,
          action: 'Created',
          user: 'Jane Smith',
          date: '2024-03-14',
          details: 'Initial draft created',
        },
        {
          id: 2,
          action: 'Reviewed',
          user: 'John Doe',
          date: '2024-03-15',
          details: 'Approved with minor changes',
        },
        {
          id: 3,
          action: 'Signed',
          user: 'John Smith',
          date: '2024-03-15',
          details: 'Digitally signed',
        },
      ],
      tags: ['agreement', 'final', 'signed'],
      access: ['Jane Smith', 'John Doe', 'Sarah Johnson'],
    },
    {
      id: 2,
      name: 'Case Brief.docx',
      category: 'Legal Documents',
      matter: 'Brown vs. State',
      uploadedBy: 'John Doe',
      uploadDate: '2024-03-14',
      status: 'Draft',
      size: '1.8MB',
      type: 'application/docx',
      path: '/documents/legal/',
      signatures: [],
      timeline: [
        {
          id: 1,
          action: 'Created',
          user: 'John Doe',
          date: '2024-03-14',
          details: 'Initial draft created',
        },
      ],
      tags: ['brief', 'draft'],
      access: ['John Doe', 'Sarah Johnson'],
    },
    {
      id: 3,
      name: 'Meeting Minutes.pdf',
      category: 'Internal',
      matter: 'Corporate Merger A',
      uploadedBy: 'Sarah Johnson',
      uploadDate: '2024-03-13',
      status: 'Draft',
      size: '1.2MB',
      type: 'application/pdf',
      path: '/documents/internal/',
      signatures: [
        {
          id: 1,
          name: 'Sarah Johnson',
          date: '2024-03-13',
          status: 'Signed',
          method: 'Digital',
        },
        {
          id: 2,
          name: 'Mike Wilson',
          date: null,
          status: 'Pending',
          method: 'Digital',
        },
        {
          id: 3,
          name: 'John Doe',
          date: null,
          status: 'Declined',
          method: 'Digital',
        }
      ],
      timeline: [
        {
          id: 1,
          action: 'Created',
          user: 'Sarah Johnson',
          date: '2024-03-13',
          details: 'Document created from template',
        }
      ],
      tags: ['minutes', 'draft', 'internal'],
      access: ['Sarah Johnson', 'Mike Wilson', 'John Doe'],
    },
    {
      id: 4,
      name: 'Error Test.pdf',
      category: undefined,
      matter: null,
      uploadedBy: 'System',
      uploadDate: 'invalid-date',
      status: 'Unknown',
      size: '0B',
      type: 'application/pdf',
      path: '/documents/test/',
      signatures: null,
      timeline: [],
      tags: undefined,
      access: [],
    }
  ],

  // Team Management
  team: {
    members: [
      {
        id: 1,
        name: 'Jane Smith',
        role: 'Senior Attorney',
        email: 'jane.smith@example.com',
        department: 'Corporate Law',
        permissions: ['create_matter', 'edit_documents', 'manage_team'],
        performance: {
          casesHandled: 25,
          clientSatisfaction: 4.8,
          taskCompletion: 95,
          billableHours: 145,
          recentCases: ['Smith vs. Johnson', 'Corporate Merger A'],
        },
        specializations: ['Corporate Law', 'Mergers & Acquisitions'],
        availability: {
          status: 'Available',
          nextAvailable: '2024-03-20T09:00:00',
        },
      },
      {
        id: 2,
        name: 'John Doe',
        role: 'Associate Attorney',
        email: 'john.doe@example.com',
        department: 'Litigation',
        permissions: ['edit_documents', 'view_matters'],
        performance: {
          casesHandled: 15,
          clientSatisfaction: 4.5,
          taskCompletion: 88,
          billableHours: 120,
          recentCases: ['Brown vs. State'],
        },
        specializations: ['Civil Litigation', 'Employment Law'],
        availability: {
          status: 'In Court',
          nextAvailable: '2024-03-21T14:00:00',
        },
      },
      {
        id: 3,
        name: 'Test User',
        role: undefined,
        email: 'invalid-email',
        department: null,
        permissions: [],
        performance: null,
        specializations: undefined,
        availability: {
          status: 'Unknown',
          nextAvailable: 'invalid-date',
        },
      }
    ],
    roles: [
      {
        id: 1,
        name: 'Senior Attorney',
        permissions: ['create_matter', 'edit_documents', 'manage_team'],
        description: 'Full access to all system features',
        level: 1,
        canApprove: true,
      },
      {
        id: 2,
        name: 'Associate Attorney',
        permissions: ['edit_documents', 'view_matters'],
        description: 'Limited access to system features',
        level: 2,
        canApprove: false,
      },
    ],
    departments: [
      {
        id: 1,
        name: 'Corporate Law',
        head: 'Jane Smith',
        members: ['John Doe', 'Sarah Johnson'],
        activeCases: 15,
        description: 'Handles all corporate legal matters',
      },
      {
        id: 2,
        name: 'Litigation',
        head: 'Mike Wilson',
        members: ['John Doe', 'Alice Brown'],
        activeCases: 12,
        description: 'Handles all litigation matters',
      },
    ],
    workload: [
      {
        userId: 1,
        activeCases: 5,
        pendingTasks: 8,
        upcomingDeadlines: 3,
        billableHours: 145,
      },
      {
        userId: 2,
        activeCases: 3,
        pendingTasks: 5,
        upcomingDeadlines: 2,
        billableHours: 120,
      },
    ],
  },

  // Messages
  messages: [
    {
      id: 1,
      sender: 'Jane Smith',
      recipient: 'John Doe',
      subject: 'Case Update',
      content: 'Please review the latest changes to the Smith case.',
      timestamp: '2024-03-15T09:30:00',
      read: false,
      priority: 'High',
      category: 'Case Related',
      attachments: [
        {
          id: 1,
          name: 'case_summary.pdf',
          size: '2.5MB',
          type: 'application/pdf',
        },
      ],
      thread: [
        {
          id: 1,
          sender: 'Jane Smith',
          content: 'Initial message content...',
          timestamp: '2024-03-15T09:30:00',
        },
        {
          id: 2,
          sender: 'John Doe',
          content: 'Reply to the message...',
          timestamp: '2024-03-15T10:15:00',
        },
      ],
    },
    {
      id: 2,
      sender: 'Sarah Johnson',
      recipient: 'Jane Smith',
      subject: 'Document Review Request',
      content: 'Can you please review the attached contract?',
      timestamp: '2024-03-15T11:00:00',
      read: true,
      priority: 'Medium',
      category: 'Document Review',
      attachments: [
        {
          id: 1,
          name: 'contract_v2.docx',
          size: '1.8MB',
          type: 'application/docx',
        },
      ],
      thread: [],
    },
  ],

  // Document Sharing
  sharedDocuments: [
    {
      id: 1,
      name: 'Case Brief.pdf',
      sharedBy: 'Jane Smith',
      sharedWith: ['John Doe', 'Sarah Johnson'],
      shareDate: '2024-03-15',
      permissions: ['view', 'comment'],
      expiryDate: '2024-04-15',
      status: 'Active',
      accessLog: [
        {
          user: 'John Doe',
          action: 'Viewed',
          timestamp: '2024-03-15T10:00:00',
        },
        {
          user: 'Sarah Johnson',
          action: 'Downloaded',
          timestamp: '2024-03-15T11:30:00',
        },
      ],
    },
    {
      id: 2,
      name: 'Meeting Notes.docx',
      sharedBy: 'John Doe',
      sharedWith: ['Jane Smith'],
      shareDate: '2024-03-14',
      permissions: ['view'],
      expiryDate: '2024-03-28',
      status: 'Active',
      accessLog: [],
    },
  ],
};

// Helper function to get mock data by category
export const getMockData = (category) => {
  return mockData[category] || [];
};

// Helper function to get mock data by ID
export const getMockDataById = (category, id) => {
  const data = mockData[category] || [];
  return data.find(item => item.id === id);
};

// Helper function to filter mock data
export const filterMockData = (category, filterFn) => {
  const data = mockData[category] || [];
  return data.filter(filterFn);
}; 