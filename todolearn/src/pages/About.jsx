import React from 'react';
import { Container, Paper, Typography, Box, Avatar, Grid } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Avatar 
              src="https://via.placeholder.com/150" 
              alt="Profile Picture" 
              sx={{ width: 150, height: 150, border: '2px solid #1976d2' }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom color="primary">
              First Last
            </Typography>
            <Typography variant="body1" paragraph>
              Hello! I am a passionate software developer with over 10 years of experience in building web applications.
              I specialize in front-end development, particularly in React and Material-UI, but I also have extensive experience with back-end technologies like Node.js and Express.
            </Typography>
            <Typography variant="body1" paragraph>
              My journey in software development started in college, where I fell in love with the process of turning ideas into reality through code. Since then, I have worked on a wide variety of projects ranging from small personal websites to large-scale enterprise applications.
            </Typography>
            <Typography variant="body1" paragraph>
              I am always looking to learn new things and take on new challenges. In my spare time, I enjoy contributing to open-source projects, blogging about technology, and mentoring aspiring developers.
            </Typography>
          </Grid>
        </Grid>
        <Box mt={4}>
          <Typography variant="h5" gutterBottom color="secondary">
            Skills and Expertise
          </Typography>
          <Typography variant="body2" paragraph>
            - Front-end Development: React, Material-UI, Redux, HTML, CSS, JavaScript
          </Typography>
          <Typography variant="body2" paragraph>
            - Back-end Development: Node.js, Express, MongoDB, REST APIs
          </Typography>
          <Typography variant="body2" paragraph>
            - DevOps: Docker, Kubernetes, CI/CD, AWS
          </Typography>
          <Typography variant="body2" paragraph>
            - Other: Git, Agile/Scrum, Unit Testing, Integration Testing
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default About;
