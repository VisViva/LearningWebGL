var Router = require('express').Router();

module.exports = function(root){

  Router.get('/square', function (req, res) {
    res.sendFile(root + '/samples/square/index.html');
  });

  Router.get('/threejs_square', function (req, res) {
    res.sendFile(root + '/samples/threejs_square/index.html');
  });

  Router.get('/threejs_cube', function (req, res) {
    res.sendFile(root + '/samples/threejs_cube/index.html');
  });

  // Single Page Application

  Router.get('*', function (req, res) {
    res.sendFile(root + '/samples/threejs_cube/index.html');
  });

  return Router;
}
