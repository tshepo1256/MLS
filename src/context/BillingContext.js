import React, { createContext, useContext, useState } from 'react';
import { billingService } from '../services/api';

const BillingContext = createContext();

export const BillingProvider = ({ children }) => {
  const [billingSettings, setBillingSettings] = useState({
    rateType: 'hourly',
    defaultRate: 1500,
    currency: 'ZAR',
    vatRate: 15,
    billingCycle: 'monthly',
  });

  const [billingItems, setBillingItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateBillingSettings = async (settings) => {
    try {
      setLoading(true);
      const response = await billingService.updateSettings(settings);
      setBillingSettings(response.data);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    billingSettings,
    billingItems,
    loading,
    error,
    updateBillingSettings,
    setBillingItems,
  };

  return (
    <BillingContext.Provider value={value}>
      {children}
    </BillingContext.Provider>
  );
};

export const useBillingContext = () => {
  const context = useContext(BillingContext);
  if (!context) {
    throw new Error('useBillingContext must be used within a BillingProvider');
  }
  return context;
}; 