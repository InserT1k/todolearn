import React from 'react';
import { Container, Paper, Typography, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Contacts = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Contact Information
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary="Email" secondary="example@ukr.com" />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <PhoneIcon />
            </ListItemIcon>
            <ListItemText primary="Phone" secondary="+380991111111" />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText primary="Location" secondary="123 Main St, Kyiv, Ukraine" />
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
};

export default Contacts;
