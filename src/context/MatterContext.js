import React, { createContext, useState } from 'react';

// Create context for matters
export const MatterContext = createContext();

// MatterProvider is the component that provides the context to the rest of the app
export const MatterProvider = ({ children }) => {
  const [matters, setMatters] = useState([]);
  const [userRole, setUserRole] = useState('attorney'); // Default to attorney role

  const createMatter = (matterData) => {
    const newMatter = {
      id: Math.random().toString(36).substring(2),
      ...matterData,
      notes: [],
    };
    setMatters((prevMatters) => [...prevMatters, newMatter]);
  };

  const assignMatterToUser = (matterId) => {
    const updatedMatters = matters.map((matter) =>
      matter.id === matterId ? { ...matter, assignedUser: 'New User' } : matter
    );
    setMatters(updatedMatters);
  };

  const updateMatter = (matterId, updatedMatterData) => {
    const updatedMatters = matters.map((matter) =>
      matter.id === matterId ? updatedMatterData : matter
    );
    setMatters(updatedMatters);
  };

  return (
    <MatterContext.Provider value={{ matters, createMatter, assignMatterToUser, updateMatter, userRole }}>
      {children}
    </MatterContext.Provider>
  );
};
