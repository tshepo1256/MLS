import { ChevronRight, Home } from '@mui/icons-material';
import { Link, Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material';
import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { navigationConfig } from '../../config/navigation';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Function to find route title from navigation config
  const findRouteTitle = (path) => {
    const flattenedRoutes = navigationConfig.reduce((acc, route) => {
      acc.push({ path: route.path, title: route.title });
      if (route.children) {
        route.children.forEach((child) => {
          acc.push({ path: child.path, title: child.title });
        });
      }
      return acc;
    }, []);

    const route = flattenedRoutes.find((r) => r.path === `/${path}`);
    return route ? route.title : path;
  };

  return (
    <MuiBreadcrumbs 
      separator={<ChevronRight fontSize="small" />}
      sx={{ 
        py: 2,
        '& .MuiBreadcrumbs-separator': {
          mx: 1,
        },
      }}
    >
      <Link
        component={RouterLink}
        to="/"
        color="inherit"
        sx={{
          display: 'flex',
          alignItems: 'center',
          '&:hover': {
            textDecoration: 'none',
            color: 'primary.main',
          },
        }}
      >
        <Home sx={{ mr: 0.5 }} fontSize="small" />
        Dashboard
      </Link>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const title = findRouteTitle(value);

        return last ? (
          <Typography
            color="text.primary"
            key={to}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            {title}
          </Typography>
        ) : (
          <Link
            component={RouterLink}
            color="inherit"
            to={to}
            key={to}
            sx={{
              '&:hover': {
                textDecoration: 'none',
                color: 'primary.main',
              },
            }}
          >
            {title}
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs; 