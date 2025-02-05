import React, { useState } from 'react';
import {
  Box,
  Card,
  Grid,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogContentText,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Send as SendIcon,
} from '@mui/icons-material';

const mockInvoices = [
  {
    id: 'INV-2024-001',
    client: 'John Smith',
    matter: 'Smith vs. Johnson',
    amount: 75000.00,
    date: '2024-03-20',
    dueDate: '2024-04-19',
    status: 'pending',
  },
  {
    id: 'INV-2024-002',
    client: 'Sarah Williams',
    matter: 'Williams Estate',
    amount: 52500.00,
    date: '2024-03-18',
    dueDate: '2024-04-17',
    status: 'paid',
  },
  {
    id: 'INV-2024-003',
    client: 'Michael Chen',
    matter: 'Chen Contract Review',
    amount: 42000.00,
    date: '2024-03-15',
    dueDate: '2024-04-14',
    status: 'overdue',
  },
];

const BillingInvoices = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState(null);
  const [invoices, setInvoices] = useState(mockInvoices);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleDialogOpen = (invoice = null) => {
    setSelectedInvoice(invoice);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setSelectedInvoice(null);
    setIsDialogOpen(false);
  };

  const handleDelete = (invoice) => {
    setInvoiceToDelete(invoice);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setInvoices(invoices.filter(invoice => invoice.id !== invoiceToDelete.id));
    setDeleteDialogOpen(false);
    setInvoiceToDelete(null);
  };

  const handleAddInvoice = (formData) => {
    const newInvoice = {
      id: `INV-2024-${String(invoices.length + 1).padStart(3, '0')}`,
      ...formData,
    };
    setInvoices([newInvoice, ...invoices]);
    handleDialogClose();
  };

  const handleUpdateInvoice = (formData) => {
    setInvoices(invoices.map(invoice => 
      invoice.id === selectedInvoice.id ? { ...invoice, ...formData } : invoice
    ));
    handleDialogClose();
  };

  const handleDownloadInvoice = (invoice) => {
    // In a real application, this would make an API call to generate and download the PDF
    console.log('Downloading invoice:', invoice.id);
    
    // Mock PDF generation
    const invoiceData = {
      invoiceNumber: invoice.id,
      client: invoice.client,
      matter: invoice.matter,
      amount: invoice.amount,
      date: invoice.date,
      dueDate: invoice.dueDate,
      items: [
        { description: 'Legal Services', hours: 10, rate: invoice.amount / 10 },
        { description: 'Court Fees', amount: invoice.amount * 0.1 },
      ],
    };

    // Create a blob URL for download (this is just a mock)
    const blob = new Blob(
      [JSON.stringify(invoiceData, null, 2)],
      { type: 'application/json' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${invoice.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSendInvoice = (invoice) => {
    // In a real application, this would make an API call to send the invoice via email
    console.log('Sending invoice:', invoice.id);
    
    // Mock email sending
    const emailData = {
      to: `${invoice.client.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      subject: `Invoice #${invoice.id} for ${invoice.matter}`,
      attachments: [`invoice-${invoice.id}.pdf`],
    };
    
    // Show success message
    setSnackbar({
      open: true,
      message: `Invoice #${invoice.id} sent to ${emailData.to}`,
      severity: 'success',
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'overdue':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">Invoices</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleDialogOpen()}
        >
          Create Invoice
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Invoice #</TableCell>
                    <TableCell>Client</TableCell>
                    <TableCell>Matter</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{invoice.id}</TableCell>
                      <TableCell>{invoice.client}</TableCell>
                      <TableCell>{invoice.matter}</TableCell>
                      <TableCell align="right">
                        {formatCurrency(invoice.amount)}
                      </TableCell>
                      <TableCell>
                        {new Date(invoice.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(invoice.dueDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={invoice.status}
                          color={getStatusColor(invoice.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="primary"
                          onClick={() => handleDownloadInvoice(invoice)}
                          title="Download Invoice"
                        >
                          <DownloadIcon />
                        </IconButton>
                        <IconButton
                          color="primary"
                          onClick={() => handleSendInvoice(invoice)}
                          title="Send Invoice"
                        >
                          <SendIcon />
                        </IconButton>
                        <IconButton
                          color="primary"
                          onClick={() => handleDialogOpen(invoice)}
                          title="Edit Invoice"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(invoice)}
                          title="Delete Invoice"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this invoice? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create/Edit Invoice Dialog */}
      <Dialog open={isDialogOpen} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedInvoice ? 'Edit Invoice' : 'Create New Invoice'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Invoice Number"
                defaultValue={selectedInvoice?.id}
                disabled={!!selectedInvoice}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Client</InputLabel>
                <Select
                  label="Client"
                  defaultValue={selectedInvoice?.client || ''}
                >
                  <MenuItem value="John Smith">John Smith</MenuItem>
                  <MenuItem value="Sarah Williams">Sarah Williams</MenuItem>
                  <MenuItem value="Michael Chen">Michael Chen</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Matter</InputLabel>
                <Select
                  label="Matter"
                  defaultValue={selectedInvoice?.matter || ''}
                >
                  <MenuItem value="Smith vs. Johnson">Smith vs. Johnson</MenuItem>
                  <MenuItem value="Williams Estate">Williams Estate</MenuItem>
                  <MenuItem value="Chen Contract Review">
                    Chen Contract Review
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Amount"
                type="number"
                defaultValue={selectedInvoice?.amount}
                InputProps={{
                  startAdornment: '$',
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Invoice Date"
                type="date"
                defaultValue={selectedInvoice?.date}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Due Date"
                type="date"
                defaultValue={selectedInvoice?.dueDate}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  defaultValue={selectedInvoice?.status || 'pending'}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="paid">Paid</MenuItem>
                  <MenuItem value="overdue">Overdue</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={() => {
              const formData = {
                client: document.querySelector('[name="client"]').value,
                matter: document.querySelector('[name="matter"]').value,
                amount: parseFloat(document.querySelector('[name="amount"]').value),
                date: document.querySelector('[name="date"]').value,
                dueDate: document.querySelector('[name="dueDate"]').value,
                status: document.querySelector('[name="status"]').value,
              };
              
              if (selectedInvoice) {
                handleUpdateInvoice(formData);
              } else {
                handleAddInvoice(formData);
              }
            }}
          >
            {selectedInvoice ? 'Update Invoice' : 'Create Invoice'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BillingInvoices; 