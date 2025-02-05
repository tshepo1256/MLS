import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Document, Page } from 'react-pdf'; // Import from react-pdf
import './CaseWorkshop.css';

const CaseWorkshop = () => {
  const [documents, setDocuments] = useState([]); // Store documents in the state
  const [openDialog, setOpenDialog] = useState(false); // Control the dialog for uploading files
  const [currentDoc, setCurrentDoc] = useState(null); // Document selected for viewing
  const [fileInput, setFileInput] = useState(null); // File input to upload files

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newDoc = {
        name: file.name,
        type: file.type,
        file: URL.createObjectURL(file),
      };
      setDocuments([...documents, newDoc]);
      setOpenDialog(false); // Close the dialog after file is uploaded
    }
  };

  // Open the document for viewing
  const openDocument = (doc) => {
    setCurrentDoc(doc);
  };

  // Close the document viewer
  const closeDocument = () => {
    setCurrentDoc(null);
  };

  return (
    <div className="case-workshop-container">
      <div className="document-upload-section">
        <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
          Upload Document
        </Button>
      </div>

      <Grid container spacing={2} className="document-list">
        {documents.map((doc, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{doc.name}</Typography>
                <Button variant="contained" onClick={() => openDocument(doc)}>
                  View Document
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Document Viewer Dialog */}
      <Dialog open={!!currentDoc} onClose={closeDocument} maxWidth="lg" fullWidth>
        <DialogTitle>Document Viewer</DialogTitle>
        <DialogContent>
          {currentDoc && currentDoc.type === 'application/pdf' ? (
            <Document file={currentDoc.file}>
              <Page pageNumber={1} />
            </Document>
          ) : (
            <iframe
              src={currentDoc.file}
              width="100%"
              height="500px"
              title="Document Viewer"
            ></iframe>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDocument} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Upload Document Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Upload Document</DialogTitle>
        <DialogContent>
          <input
            type="file"
            onChange={handleFileChange}
            fullWidth
            accept=".pdf, .docx, .xlsx, .pptx"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CaseWorkshop;
