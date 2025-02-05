import {
    Download,
    Preview,
    Print,
    Save
} from '@mui/icons-material';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useCaseContext } from '../../context/CaseContext';
import { useContactContext } from '../../context/ContactContext';

const DocumentGenerator = ({ template, onClose }) => {
  const { cases } = useCaseContext();
  const { contacts } = useContactContext();
  const [selectedCase, setSelectedCase] = useState(null);
  const [variables, setVariables] = useState({});
  const [preview, setPreview] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (selectedCase) {
      // Pre-fill variables with case data
      const caseData = {
        case_number: selectedCase.reference,
        court_name: selectedCase.courtName,
        hearing_date: selectedCase.nextHearing,
        // Add more case-related variables
      };
      setVariables(prev => ({ ...prev, ...caseData }));
    }
  }, [selectedCase]);

  const generateDocument = () => {
    let content = template.content;
    // Replace variables in content
    Object.entries(variables).forEach(([key, value]) => {
      content = content.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });
    return content;
  };

  const handlePreview = () => {
    const generatedContent = generateDocument();
    setPreview(generatedContent);
    setShowPreview(true);
  };

  const handleDownload = () => {
    const content = generateDocument();
    const blob = new Blob([content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${template.name}_${new Date().toISOString()}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Box className="document-generator">
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Generate Document: {template.name}
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Select Case</InputLabel>
              <Select
                value={selectedCase?.id || ''}
                onChange={(e) => setSelectedCase(cases.find(c => c.id === e.target.value))}
              >
                {cases.map((case_) => (
                  <MenuItem key={case_.id} value={case_.id}>
                    {case_.reference} - {case_.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Fill in Variables
            </Typography>
            <Grid container spacing={2}>
              {template.variables.map((variable) => (
                <Grid item xs={12} md={6} key={variable}>
                  <TextField
                    fullWidth
                    label={variable.replace(/_/g, ' ').toUpperCase()}
                    value={variables[variable] || ''}
                    onChange={(e) => setVariables({
                      ...variables,
                      [variable]: e.target.value
                    })}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                startIcon={<Preview />}
                onClick={handlePreview}
              >
                Preview
              </Button>
              <Button
                variant="outlined"
                startIcon={<Download />}
                onClick={handleDownload}
              >
                Download
              </Button>
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={() => {/* Handle save to case documents */}}
              >
                Save to Case
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Preview Dialog */}
      <Dialog
        open={showPreview}
        onClose={() => setShowPreview(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Document Preview
          <IconButton
            sx={{ position: 'absolute', right: 8, top: 8 }}
            onClick={() => setShowPreview(false)}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ p: 2, whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
            {preview}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            startIcon={<Print />}
            onClick={() => window.print()}
          >
            Print
          </Button>
          <Button
            startIcon={<Download />}
            onClick={handleDownload}
          >
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DocumentGenerator; 