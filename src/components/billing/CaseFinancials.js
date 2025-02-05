import { Add, GetApp } from '@mui/icons-material';
import {
    Box,
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';

const CaseFinancials = () => {
  const [financials, setFinancials] = useState({
    billingItems: [
      {
        id: 1,
        date: '2024-03-15',
        description: 'Initial Consultation',
        hours: 2,
        rate: 1500,
        amount: 3000,
      },
      // Add more items
    ],
    expenses: [
      {
        id: 1,
        date: '2024-03-16',
        description: 'Court Filing Fees',
        amount: 2500,
        category: 'Filing Fees',
      },
      // Add more expenses
    ],
  });

  const calculateTotals = () => {
    const billingTotal = financials.billingItems.reduce((acc, item) => acc + item.amount, 0);
    const expensesTotal = financials.expenses.reduce((acc, item) => acc + item.amount, 0);
    return {
      billingTotal,
      expensesTotal,
      total: billingTotal + expensesTotal,
      vat: (billingTotal + expensesTotal) * 0.15,
    };
  };

  const totals = calculateTotals();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6">Financial Summary</Typography>
          <Box>
            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{ mr: 2 }}
            >
              Add Billing Item
            </Button>
            <Button
              variant="outlined"
              startIcon={<GetApp />}
            >
              Export Statement
            </Button>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Billing Items
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Hours</TableCell>
                  <TableCell align="right">Rate (ZAR)</TableCell>
                  <TableCell align="right">Amount (ZAR)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {financials.billingItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell align="right">{item.hours}</TableCell>
                    <TableCell align="right">{item.rate.toFixed(2)}</TableCell>
                    <TableCell align="right">{item.amount.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Summary
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography>Subtotal: R {totals.billingTotal.toFixed(2)}</Typography>
              <Typography>Expenses: R {totals.expensesTotal.toFixed(2)}</Typography>
              <Typography>VAT (15%): R {totals.vat.toFixed(2)}</Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Total: R {(totals.total + totals.vat).toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CaseFinancials; 