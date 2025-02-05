import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography
} from '@mui/material';
import React, { useState } from 'react';
import { useBillingContext } from '../../context/BillingContext';

const BillingPreference = () => {
  const { billingSettings, updateBillingSettings } = useBillingContext();
  const [settings, setSettings] = useState({
    rateType: 'hourly',
    currency: 'ZAR',
    vatRate: 15,
    defaultRate: 1500,
    billingCycle: 'monthly',
    paymentTerms: 30,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBillingSettings(settings);
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Billing Preferences
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Rate Type</InputLabel>
              <Select
                value={settings.rateType}
                onChange={(e) => setSettings({ ...settings, rateType: e.target.value })}
              >
                <MenuItem value="hourly">Hourly Rate</MenuItem>
                <MenuItem value="fixed">Fixed Rate</MenuItem>
                <MenuItem value="contingency">Contingency Fee</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Default Rate (ZAR)"
              type="number"
              value={settings.defaultRate}
              onChange={(e) => setSettings({ ...settings, defaultRate: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Billing Cycle</InputLabel>
              <Select
                value={settings.billingCycle}
                onChange={(e) => setSettings({ ...settings, billingCycle: e.target.value })}
              >
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="quarterly">Quarterly</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Save Preferences
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default BillingPreference; 