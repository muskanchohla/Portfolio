const express = require('express');
const projects = require('./data');
const popup_projects = require('./popup_data') ;// Importing the project data
const app = express();
const PORT = 3000;


app.set('view engine', 'ejs');
app.use(express.static('public'));

// Endpoint to get all projects
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

// Endpoint to get a project by ID
app.get('/api/projects/:id', (req, res) => {
  const projectId = parseInt(req.params.id);
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }
  
  res.json(project);
});



app.get('/', (req, res) => {
    res.render('index', { project_data: projects, popup_project: popup_projects });
});

 


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
