const express = require('express');
const app = express();
const { projects } = require ("./data.json");

//sets up the view engine to pug
app.set('view engine', 'pug');
//files being requested
app.use('/static', express.static('public'));

//render the home page
app.get('/', (req, res, next) => {
    res.render('index', { projects });
})

//renders the about route/page
app.get('/about', (req, res) => {
    res.render('about');
  })

//dynamically renders the project routes
app.get('/projects/:id', (req, res, next) => {
    const { id } = req.params;
    const project = projects[id];
    if(project) {
        res.render('project', { project })
    } else {
        const err = new Error;
        err.status = 404;
        err.message = `Cannot find project ${id}`;
        next(err);
    }
})


//404 error handling
app.use(( req, res, next) => {
  const err = new Error;
  err.status = 404;
  next(err)
  });

//global error handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(err.status).send('Something broke!');
  })


app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});