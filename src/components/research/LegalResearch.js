import React, { useState } from 'react';
import {
  Box,
  Card,
  Grid,
  TextField,
  Button,
  Typography,
  Chip,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material';
import {
  Search as SearchIcon,
  BookmarkBorder as BookmarkIcon,
  Share as ShareIcon,
  FilterList as FilterIcon,
  History as HistoryIcon,
} from '@mui/icons-material';

const mockCases = [
  {
    id: 1,
    title: 'Smith v. Johnson',
    citation: '123 F.3d 456 (2023)',
    summary: 'Key precedent in contract law regarding implied terms.',
    relevance: 95,
    tags: ['Contract Law', 'Precedent', '2023'],
  },
  {
    id: 2,
    title: 'State v. Williams',
    citation: '789 F.2d 123 (2022)',
    summary: 'Important case defining scope of self-defense.',
    relevance: 88,
    tags: ['Criminal Law', 'Self-Defense', '2022'],
  },
];

const LegalResearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory] = useState([
    'contract breach remedies',
    'statute of limitations employment',
    'damages calculation methods',
  ]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Legal Research Assistant
      </Typography>

      <Grid container spacing={3}>
        {/* Search Section */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search case law, statutes, or legal documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
              />
              <Button
                variant="contained"
                startIcon={<FilterIcon />}
                sx={{ minWidth: 120 }}
              >
                Filters
              </Button>
            </Box>

            {/* Search Results */}
            <Box>
              {mockCases.map((case_) => (
                <Paper
                  key={case_.id}
                  sx={{
                    p: 2,
                    mb: 2,
                    '&:hover': {
                      boxShadow: (theme) => theme.shadows[4],
                      transform: 'translateY(-2px)',
                      transition: 'all 0.3s ease',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="h6" color="primary">
                      {case_.title}
                    </Typography>
                    <Box>
                      <IconButton size="small">
                        <BookmarkIcon />
                      </IconButton>
                      <IconButton size="small">
                        <ShareIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {case_.citation}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {case_.summary}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      {case_.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{ mr: 1 }}
                          variant="outlined"
                        />
                      ))}
                    </Box>
                    <Typography variant="subtitle2" color="success.main">
                      {case_.relevance}% Relevant
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Search History */}
          <Card sx={{ p: 2, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <HistoryIcon sx={{ mr: 1 }} color="primary" />
              <Typography variant="h6">Recent Searches</Typography>
            </Box>
            <List dense>
              {searchHistory.map((search, index) => (
                <ListItem
                  key={index}
                  button
                  sx={{
                    borderRadius: 1,
                    '&:hover': { bgcolor: 'background.default' },
                  }}
                >
                  <ListItemText primary={search} />
                </ListItem>
              ))}
            </List>
          </Card>

          {/* Research Tools */}
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Research Tools
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  sx={{ justifyContent: 'flex-start', mb: 1 }}
                >
                  Citation Analysis
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  sx={{ justifyContent: 'flex-start', mb: 1 }}
                >
                  Document Compare
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  sx={{ justifyContent: 'flex-start', mb: 1 }}
                >
                  Legal Brief Generator
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  sx={{ justifyContent: 'flex-start' }}
                >
                  Statute Tracker
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LegalResearch; 