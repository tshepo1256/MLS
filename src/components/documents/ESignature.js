import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Assignment,
  CheckCircle,
  Description,
  Draw,
  Edit,
  History,
  Person,
  Schedule,
  Upload,
  Cancel,
} from '@mui/icons-material';
import { getMockData } from '../../mock/mockData';
import { format } from 'date-fns';

const ESignature = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [signDialogOpen, setSignDialogOpen] = useState(false);

  const documents = getMockData('documents').filter(
    (doc) => doc.signatures && doc.signatures.length > 0
  );

  const steps = ['Upload Document', 'Add Signers', 'Place Signatures', 'Send for Signing'];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSignClick = (document) => {
    setSelectedDocument(document);
    setSignDialogOpen(true);
  };

  const formatDate = (dateString) => {
    try {
      if (!dateString) return 'Not signed';
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const getSignatureStatus = (signatures) => {
    if (!Array.isArray(signatures)) return { signed: 0, total: 0, progress: 0 };
    const total = signatures.length;
    const signed = signatures.filter((sig) => sig?.status === 'Signed').length;
    return { signed, total, progress: total > 0 ? (signed / total) * 100 : 0 };
  };

  const renderSignDialog = () => (
    <Dialog
      open={signDialogOpen}
      onClose={() => signDialogOpen && setSignDialogOpen(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        {selectedDocument ? selectedDocument.name : 'Sign Document'}
      </DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ py: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 2 }}>
          {activeStep === 0 && (
            <Box
              sx={{
                border: '2px dashed',
                borderColor: 'divider',
                borderRadius: 1,
                p: 3,
                textAlign: 'center',
              }}
            >
              <Upload sx={{ fontSize: 48, color: 'action.active', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Drop your document here
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Supported formats: PDF, DOC, DOCX
              </Typography>
              <Button variant="outlined" sx={{ mt: 2 }}>
                Choose File
              </Button>
            </Box>
          )}

          {activeStep === 1 && (
            <Box>
              <TextField
                fullWidth
                label="Add Signers"
                placeholder="Enter email addresses"
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText
                    primary="John Smith"
                    secondary="john.smith@example.com"
                  />
                  <Chip label="Signer 1" color="primary" size="small" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText
                    primary="Jane Doe"
                    secondary="jane.doe@example.com"
                  />
                  <Chip label="Signer 2" color="primary" size="small" />
                </ListItem>
              </List>
            </Box>
          )}

          {activeStep === 2 && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Drag and drop signature fields onto the document
              </Typography>
              <Box
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  height: 400,
                  bgcolor: 'background.default',
                  p: 2,
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    border: '2px solid',
                    borderColor: 'primary.main',
                    borderRadius: 1,
                    p: 1,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <Typography variant="caption" color="primary">
                    Signature Field
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}

          {activeStep === 3 && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Review and Send
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Description />
                  </ListItemIcon>
                  <ListItemText
                    primary="Document Name"
                    secondary="contract_final.pdf"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText
                    primary="Signers"
                    secondary="2 signers added"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Schedule />
                  </ListItemIcon>
                  <ListItemText
                    primary="Expiry"
                    secondary="7 days"
                  />
                </ListItem>
              </List>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={activeStep === steps.length - 1 ? () => setSignDialogOpen(false) : handleNext}
          disabled={activeStep === 0 && !selectedDocument}
        >
          {activeStep === steps.length - 1 ? 'Send' : 'Next'}
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            startIcon={<Upload />}
            onClick={() => setSignDialogOpen(true)}
          >
            Upload for Signing
          </Button>
        </Grid>

        {documents.map((document) => {
          const { signed, total, progress } = getSignatureStatus(document.signatures);
          return (
            <Grid item xs={12} md={6} lg={4} key={document.id}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Description color="primary" />
                      <Typography variant="h6">
                        {document.name || 'Untitled Document'}
                      </Typography>
                    </Box>
                    <Chip
                      label={`${signed}/${total} signed`}
                      color={signed === total ? 'success' : 'default'}
                      size="small"
                    />
                  </Box>

                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {document.matter || 'No matter assigned'}
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      Signature Progress
                    </Typography>
                  </Box>

                  <List dense>
                    {Array.isArray(document.signatures) && document.signatures.map((signature) => (
                      <ListItem key={signature?.id || Math.random()}>
                        <ListItemIcon>
                          {signature?.status === 'Signed' ? (
                            <CheckCircle color="success" />
                          ) : signature?.status === 'Declined' ? (
                            <Cancel color="error" />
                          ) : (
                            <Schedule color="action" />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary={signature?.name || 'Unknown Signer'}
                          secondary={formatDate(signature?.date)}
                        />
                        <Chip
                          label={signature?.status || 'Unknown'}
                          size="small"
                          color={
                            signature?.status === 'Signed'
                              ? 'success'
                              : signature?.status === 'Declined'
                              ? 'error'
                              : 'default'
                          }
                        />
                      </ListItem>
                    ))}
                  </List>

                  <Divider sx={{ my: 2 }} />

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: 1,
                    }}
                  >
                    <Button
                      size="small"
                      startIcon={<History />}
                      onClick={() => {}}
                      disabled={!Array.isArray(document.timeline) || document.timeline.length === 0}
                    >
                      History
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<Draw />}
                      onClick={() => handleSignClick(document)}
                      disabled={signed === total}
                    >
                      Sign
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {renderSignDialog()}
    </Box>
  );
};

export default ESignature; 