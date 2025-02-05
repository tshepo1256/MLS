import Editor from '@monaco-editor/react';
import {
    Code,
    Help,
    Preview,
    Save
} from '@mui/icons-material';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography
} from '@mui/material';
import React, { useRef, useState } from 'react';
import './Documents.css';

const TemplateEditor = ({ template, onSave }) => {
  const editorRef = useRef(null);
  const [showVariableHelper, setShowVariableHelper] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Available variables with descriptions
  const availableVariables = {
    case: {
      'case.reference': 'Case reference number',
      'case.title': 'Case title',
      'case.type': 'Type of case',
      'case.court': 'Court name',
      'case.judge': 'Assigned judge',
      'case.filingDate': 'Case filing date',
      'case.nextHearing': 'Next hearing date',
    },
    client: {
      'client.name': 'Client full name',
      'client.address': 'Client address',
      'client.email': 'Client email',
      'client.phone': 'Client phone number',
    },
    attorney: {
      'attorney.name': 'Attorney full name',
      'attorney.barNumber': 'Attorney bar number',
      'attorney.firm': 'Law firm name',
      'attorney.email': 'Attorney email',
    },
    dates: {
      'date.today': 'Current date',
      'date.tomorrow': 'Tomorrow\'s date',
      'date.nextWeek': 'Date next week',
      'date.nextMonth': 'Date next month',
    },
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    // Configure Monaco editor
    monaco.languages.register({ id: 'legaltemplate' });
    monaco.languages.setMonarchTokensProvider('legaltemplate', {
      tokenizer: {
        root: [
          [/{{[^}]+}}/, 'variable'], // Highlight variables
          [/\b(WHEREAS|NOW THEREFORE|IN WITNESS WHEREOF)\b/, 'keyword'],
          [/\b(shall|must|will|may)\b/, 'modal'],
          [/\b(\d{1,2}\/\d{1,2}\/\d{4}|\d{4}-\d{2}-\d{2})\b/, 'date'],
          [/"[^"]*"/, 'string'],
        ],
      },
    });

    // Add custom theme
    monaco.editor.defineTheme('legalTheme', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'variable', foreground: '1976d2', fontStyle: 'bold' },
        { token: 'keyword', foreground: '0d47a1', fontStyle: 'bold' },
        { token: 'modal', foreground: '2e7d32' },
        { token: 'date', foreground: 'c62828' },
        { token: 'string', foreground: '6a1b9a' },
      ],
      colors: {
        'editor.background': '#fafafa',
      },
    });

    editor.getModel().updateOptions({ tabSize: 2 });
  };

  const insertVariable = (variable) => {
    const editor = editorRef.current;
    if (editor) {
      const position = editor.getPosition();
      editor.executeEdits('insert-variable', [{
        range: {
          startLineNumber: position.lineNumber,
          startColumn: position.column,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        },
        text: `{{${variable}}}`,
      }]);
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const generatePreview = () => {
    const content = editorRef.current?.getValue() || '';
    // Replace variables with sample values
    let preview = content;
    Object.entries(availableVariables).forEach(([category, vars]) => {
      Object.keys(vars).forEach(variable => {
        const sampleValue = `[Sample ${variable.split('.')[1]}]`;
        preview = preview.replace(new RegExp(`{{${variable}}}`, 'g'), sampleValue);
      });
    });
    return preview;
  };

  return (
    <Box className="template-editor-container">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Template Editor</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                startIcon={<Help />}
                onClick={() => setShowVariableHelper(true)}
              >
                Variables
              </Button>
              <Button
                startIcon={<Preview />}
                onClick={handlePreview}
              >
                Preview
              </Button>
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={() => onSave(editorRef.current?.getValue())}
              >
                Save Template
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ height: '70vh' }}>
            <Editor
              height="100%"
              defaultLanguage="legaltemplate"
              theme="legalTheme"
              defaultValue={template?.content || ''}
              onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: false },
                lineNumbers: 'on',
                rulers: [80],
                wordWrap: 'on',
                wrappingIndent: 'indent',
                fontSize: 14,
                fontFamily: "'Courier New', monospace",
              }}
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Variables Helper Dialog */}
      <Dialog
        open={showVariableHelper}
        onClose={() => setShowVariableHelper(false)}
        maxWidth="md"
      >
        <DialogTitle>Available Variables</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {Object.entries(availableVariables).map(([category, variables]) => (
              <Grid item xs={12} md={6} key={category}>
                <Typography variant="subtitle1" gutterBottom sx={{ textTransform: 'capitalize' }}>
                  {category} Variables
                </Typography>
                <List dense>
                  {Object.entries(variables).map(([variable, description]) => (
                    <ListItem
                      key={variable}
                      button
                      onClick={() => {
                        insertVariable(variable);
                        setShowVariableHelper(false);
                      }}
                    >
                      <ListItemIcon>
                        <Code fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={variable}
                        secondary={description}
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowVariableHelper(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog
        open={showPreview}
        onClose={() => setShowPreview(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Document Preview
        </DialogTitle>
        <DialogContent dividers>
          <Box className="preview-content">
            <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'Times New Roman' }}>
              {generatePreview()}
            </pre>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPreview(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TemplateEditor; 