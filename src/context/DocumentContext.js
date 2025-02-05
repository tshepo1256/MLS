import React, { createContext, useContext, useState } from 'react';

const DocumentContext = createContext();

// Mock data for documents
const mockDocuments = [
  {
    id: 1,
    name: 'Notice of Motion.pdf',
    type: 'PDF',
    size: 1024576,
    uploadDate: '2024-03-15T10:30:00Z',
    caseId: 1,
    category: 'Court Documents',
    lastModified: '2024-03-15T10:30:00Z',
    uploadedBy: 'Jane Doe',
  },
  {
    id: 2,
    name: 'Client Agreement.docx',
    type: 'DOCX',
    size: 512000,
    uploadDate: '2024-03-16T14:20:00Z',
    caseId: 1,
    category: 'Contracts',
    lastModified: '2024-03-16T14:20:00Z',
    uploadedBy: 'David Brown',
  },
  {
    id: 3,
    name: 'Evidence Photos.zip',
    type: 'ZIP',
    size: 5242880,
    uploadDate: '2024-03-17T09:15:00Z',
    caseId: 2,
    category: 'Evidence',
    lastModified: '2024-03-17T09:15:00Z',
    uploadedBy: 'Jane Doe',
  },
];

// Mock data for templates
const mockTemplates = [
  {
    id: 1,
    name: 'Notice of Motion Template',
    category: 'Court Documents',
    description: 'Standard notice of motion template',
    content: `
MLS LEGAL MANAGEMENT SYSTEM
---------------------------

IN THE HIGH COURT OF SOUTH AFRICA
GAUTENG DIVISION, PRETORIA

CASE NO: {{case.reference}}

In the matter between:

{{client.name}}
(Applicant)

and

{{opposing.party}}
(Respondent)

NOTICE OF MOTION

TAKE NOTICE that {{attorney.firm}} intends to make application to the above Honorable Court on {{date.hearing}} for an order in the following terms:

1. {{relief.sought}}

2. Costs of the application.

TAKE NOTICE FURTHER that the accompanying affidavit of {{client.name}} will be used in support of this application.

DATED at {{location}} on this {{date.today}}.

________________________
{{attorney.name}}
Attorney for the Applicant
{{attorney.firm}}
{{attorney.address}}
Tel: {{attorney.phone}}
Email: {{attorney.email}}
Ref: {{case.reference}}`,
    variables: ['case.reference', 'client.name', 'opposing.party', 'attorney.firm', 'date.hearing', 'relief.sought', 'location', 'date.today', 'attorney.name', 'attorney.address', 'attorney.phone', 'attorney.email'],
    lastModified: '2024-03-15T10:30:00Z',
    createdBy: 'Jane Doe',
  },
  // Add more templates...
];

export const DocumentProvider = ({ children }) => {
  const [documents, setDocuments] = useState(mockDocuments);
  const [templates, setTemplates] = useState(mockTemplates);

  const uploadDocument = async (file, caseId) => {
    const newDoc = {
      id: Date.now(),
      name: file.name,
      type: file.type,
      size: file.size,
      uploadDate: new Date().toISOString(),
      caseId,
      category: 'Uncategorized',
      uploadedBy: 'Current User',
    };
    setDocuments([...documents, newDoc]);
    return newDoc;
  };

  const deleteDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const value = {
    documents,
    templates,
    uploadDocument,
    deleteDocument,
    setDocuments,
    setTemplates,
  };

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocumentContext = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocumentContext must be used within a DocumentProvider');
  }
  return context;
}; 