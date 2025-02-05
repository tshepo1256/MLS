import React, { createContext, useContext, useState } from 'react';

const CaseContext = createContext();

// Mock data for cases
const mockCases = [
  {
    id: 1,
    reference: 'CASE-2024-001',
    title: 'Smith vs. Johnson',
    type: 'Civil Litigation',
    status: 'Active',
    priority: 'High',
    description: 'Contract dispute regarding property development',
    client: 'John Smith',
    assignedTo: 'Jane Doe',
    courtName: 'High Court of South Africa',
    jurisdiction: 'Gauteng Division, Pretoria',
    filingDate: '2024-03-15',
    nextHearing: '2024-04-01',
    estimatedDuration: '12 months',
    estimatedCost: 'R 150,000',
  },
  {
    id: 2,
    reference: 'CASE-2024-002',
    title: 'State vs. Williams',
    type: 'Criminal Defense',
    status: 'Pending',
    priority: 'Medium',
    description: 'Criminal case involving theft allegations',
    client: 'Mike Williams',
    assignedTo: 'David Brown',
    courtName: 'Magistrate Court',
    jurisdiction: 'Cape Town',
    filingDate: '2024-03-20',
    nextHearing: '2024-04-15',
    estimatedDuration: '6 months',
    estimatedCost: 'R 75,000',
  },
  {
    id: 3,
    reference: 'CASE-2024-003',
    title: 'Brown Estate Matter',
    type: 'Estate Planning',
    status: 'Active',
    priority: 'Low',
    description: 'Estate planning and will execution',
    client: 'Sarah Brown',
    assignedTo: 'Jane Doe',
    courtName: 'Master\'s Office',
    jurisdiction: 'Johannesburg',
    filingDate: '2024-02-28',
    nextHearing: null,
    estimatedDuration: '3 months',
    estimatedCost: 'R 45,000',
  },
];

export const CaseProvider = ({ children }) => {
  const [cases, setCases] = useState(mockCases);
  const [currentCase, setCurrentCase] = useState(null);

  const addCase = (newCase) => {
    setCases([...cases, { ...newCase, id: Date.now() }]);
  };

  const updateCase = (id, updatedCase) => {
    setCases(cases.map(c => c.id === id ? { ...c, ...updatedCase } : c));
  };

  const deleteCase = (id) => {
    setCases(cases.filter(c => c.id !== id));
  };

  const value = {
    cases,
    currentCase,
    setCases,
    setCurrentCase,
    addCase,
    updateCase,
    deleteCase,
  };

  return <CaseContext.Provider value={value}>{children}</CaseContext.Provider>;
};

export const useCaseContext = () => {
  const context = useContext(CaseContext);
  if (!context) {
    throw new Error('useCaseContext must be used within a CaseProvider');
  }
  return context;
}; 