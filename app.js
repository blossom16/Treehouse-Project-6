//Express
const express = require("express");
const app = express();

//add data.json file
const { projects } = require("./data.json");

//Middleware
app.set("view engine", "pug");
app.use("/static", express.static("public"));

//starts server
app.listen(3000, () => {
  console.log("The application is listening on localhost 3000!");
});

//Routes
//index
app.get("/", (req, res, next) => {
  res.render("index", { projects });
});
//about 
app.get("/about", (req, res, next) => {
  res.render("about");
});

//dynamic project routes
app.get("/projects/:id", (req, res, next) => {
  const projectId = req.params.id;
  const project = projects.find(({ id }) => id === +projectId);
  res.render('project', { project });
});

//Error handlers
//404 Error
app.use((req, res, next) => {
  const err = new Error("Page not found");
  err.status = 404;
  next(err);
});

//global errors
app.use((err, req, res, next) => {
    res.locals.error = err
    const status = err.status || 500
    res.status(status);
    console.log(`An error has occured: ${status}`);
    res.render('error');
})