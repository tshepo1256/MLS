// Mock API service for testing

export const caseService = {
  getCases: () => Promise.resolve({ data: mockCases }),
  getCase: (id) => Promise.resolve({ data: mockCases.find(c => c.id === id) }),
  createCase: (data) => Promise.resolve({ data: { ...data, id: Date.now() } }),
  updateCase: (id, data) => Promise.resolve({ data: { id, ...data } }),
  deleteCase: (id) => Promise.resolve({ data: { success: true } }),
};

export const documentService = {
  uploadDocument: (caseId, file) => {
    return Promise.resolve({
      data: {
        id: Date.now(),
        name: file.name,
        size: file.size,
        uploadDate: new Date().toISOString(),
        caseId,
      }
    });
  },
  deleteDocument: (id) => Promise.resolve({ success: true }),
};

export const billingService = {
  updateSettings: (settings) => Promise.resolve({ data: settings }),
  getBillingItems: () => Promise.resolve({ data: [] }),
  createBillingItem: (item) => Promise.resolve({ data: { ...item, id: Date.now() } }),
};

const mockCases = [
  {
    id: 1,
    reference: 'CASE-2024-001',
    type: 'Civil',
    status: 'Active',
    description: 'Test case 1',
  },
  {
    id: 2,
    reference: 'CASE-2024-002',
    type: 'Criminal',
    status: 'Pending',
    description: 'Test case 2',
  },
];

export default {
  caseService,
  documentService,
  billingService,
}; 