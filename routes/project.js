var models = require('../models');

exports.projectInfo = function(req, res) { 
  var projectID = req.params.id;

  models.Project
    .find({ _id: projectID })
    .exec(afterQuery);

  function afterQuery(err, projects) {
    if(err) console.log(err);
    res.json(projects[0]);
  }
}

exports.addProject = function(req, res) {
  var project = new models.Project({
    title: req.body.project_title,
    date: req.body.date,
    summary: req.body.summary,
    image: req.body.image_url
  });

  project.save(function(err) {
    if (err) {
      console.log(err);
      res.send(500);
    }
    res.send(200);
  });
}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;

  models.Project
    .find({ _id: projectID })
    .remove()
    .exec(function(err) {
      if (err) {
        console.log(err);
        res.send(500);
      }
      res.send(200); 
    });
}