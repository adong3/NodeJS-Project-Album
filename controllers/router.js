var files = require("../models/file.js");
var formidable = require("formidable");
var http = require("http");
var util = require("util");
var path = require("path");
var fs = require("fs");

exports.showIndex = function(req, res) {
  //   res.render("index", { album: files.getAllAlbums() });
  files.getAllAlbums(function(allAlbums) {
    res.render("index", { albums: allAlbums });
  });
};

exports.anotherShowIndex = function(req, res) {
  res.render("index", { albums: files.anotherGetAllAlbums() });
};

exports.getSelected = function(req, res) {
  var name = req.params.name;
  //   var list = files.showSelectedAlbums(name);

  //   res.render("album", { albums: list });
  files.showSelectedAlbums(name, function(list) {
    res.render("album", { albums: list });
  });
};

exports.anotherGetSelected = function(req, res) {
  var name = req.params.name;
  var list = files.anotherShowSelectedAlbums(name);

  res.render("album", { albums: list });
};

exports.uploadPage = function(req, res) {
  res.render("upload", { albums: files.anotherGetAllAlbums() });
};

exports.doPost = function(req, res) {
  if (req.url == "/up" && req.method.toLowerCase() == "post") {
    var form = new formidable.IncomingForm();

    form.uploadDir = __dirname + "/../" + "uploads";

    form.parse(req, function(err, fields, files) {
      var folder = fields.folder;
      var oldPath = files.image.path;
      var newPath =
        __dirname + "/../uploads/" + folder + "/" + files.image.name;
      fs.renameSync(oldPath, newPath);
      console.log(fields);
      console.log(files);
    });
    res.end("success");
    return;
  }
};
