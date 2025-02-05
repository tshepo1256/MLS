import {
    Delete,
    Description,
    Download,
    Share,
    Upload
} from '@mui/icons-material';
import {
    Box,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDocumentContext } from '../../context/DocumentContext';
import { useAsync } from '../../hooks/useAsync';
import ErrorDisplay from '../common/ErrorDisplay';
import LoadingAnimation from '../common/LoadingAnimation';

const DocumentManager = () => {
  const { documents, uploadDocument, deleteDocument } = useDocumentContext();
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const { execute: handleUpload, loading: uploading } = useAsync(async (file) => {
    try {
      await uploadDocument(file);
      setUploadError(null);
    } catch (error) {
      setUploadError(error);
      throw error;
    }
  });

  const { execute: handleDelete, loading: deleting } = useAsync(async (id) => {
    await deleteDocument(id);
  });

  const onDrop = useCallback(async (acceptedFiles) => {
    for (const file of acceptedFiles) {
      try {
        await handleUpload(file);
      } catch (error) {
        console.error('Failed to upload file:', file.name, error);
      }
    }
  }, [handleUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc', '.docx'],
      'image/*': ['.png', '.jpg', '.jpeg']
    }
  });

  // Define handler functions at component level
  const handleDownload = useCallback((doc) => {
    // Mock download functionality
    console.log('Downloading:', doc.name);
    // In a real app, this would trigger a file download
    alert(`Downloading ${doc.name}`);
  }, []);

  const handleShare = useCallback((doc) => {
    // Mock share functionality
    console.log('Sharing:', doc.name);
    // In a real app, this would open a share dialog
    alert(`Sharing ${doc.name}`);
  }, []);

  if (uploading || deleting) {
    return (
      <LoadingAnimation 
        type="dots" 
        message={uploading ? "Uploading documents..." : "Deleting document..."}
      />
    );
  }

  if (uploadError) {
    return (
      <ErrorDisplay 
        error={uploadError}
        onRetry={() => setUploadError(null)}
      />
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper
            {...getRootProps()}
            sx={{
              p: 3,
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: isDragActive ? '#f0f8ff' : 'white',
              border: isDragActive ? '2px dashed #1976d2' : '2px dashed #ccc',
              '&:hover': {
                border: '2px dashed #1976d2'
              }
            }}
          >
            <input {...getInputProps()} />
            <Upload sx={{ fontSize: 40, color: 'primary.main' }} />
            <Typography variant="h6">
              Drag and drop files here, or click to select files
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Supported formats: PDF, DOC, DOCX, PNG, JPG, JPEG
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Document Library
            </Typography>
            <List>
              {documents.length === 0 ? (
                <Typography variant="body1" color="textSecondary" sx={{ p: 2, textAlign: 'center' }}>
                  No documents uploaded yet
                </Typography>
              ) : (
                documents.map((doc) => (
                  <ListItem
                    key={doc.id}
                    secondaryAction={
                      <Box>
                        <IconButton 
                          onClick={() => handleDownload(doc)}
                          title="Download"
                        >
                          <Download />
                        </IconButton>
                        <IconButton 
                          onClick={() => handleShare(doc)}
                          title="Share"
                        >
                          <Share />
                        </IconButton>
                        <IconButton 
                          onClick={() => handleDelete(doc)}
                          title="Delete"
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemIcon>
                      <Description />
                    </ListItemIcon>
                    <ListItemText
                      primary={doc.name}
                      secondary={`Uploaded on ${new Date(doc.uploadDate).toLocaleDateString()}`}
                    />
                  </ListItem>
                ))
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DocumentManager; 