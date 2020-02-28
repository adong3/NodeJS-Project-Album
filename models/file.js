var fs = require("fs");

exports.getAllAlbums = function(callback) {
  fs.readdir("./uploads", function(err, files) {
    var allAlbums = [];
    (function iterator(i) {
      if (i >= files.length) {
        callback(allAlbums);
        return;
      }
      fs.stat("./uploads/" + files[i], function(err, state) {
        if (state.isDirectory()) {
          allAlbums.push(files[i]);
        }
        iterator(i + 1);
      });
    })(0);
  });
  //   return ["11", "22", "33"];
};

exports.anotherGetAllAlbums = function() {
  var allAlbums = [];
  var files = fs.readdirSync("./uploads");
  for (var i = 0; i < files.length; i++) {
    var state = fs.statSync("./uploads/" + files[i]);
    if (state.isDirectory()) {
      allAlbums.push(files[i]);
    }
  }
  return allAlbums;
};

exports.showSelectedAlbums = function(name, callback) {
  console.log(name);
  console.log("./uploads/" + name + "/");
  fs.readdir("./uploads/" + name, (err, files) => {
    var allAlbums = [];
    console.log("hei");
    (function iterator(i) {
      if (i == files.length) {
        // console.log(allAlbums);
        // return allAlbums;
        callback(allAlbums);
        return;
      }
      console.log("./uploads/" + name + "/" + files[i]);
      fs.stat("./uploads/" + name + "/" + files[i], function(err, stats) {
        if (stats.isFile()) {
          //   console.log(files[i]);
          allAlbums.push(files[i]);
        }
        iterator(i + 1);
      });
    })(0);
    // return allAlbums;
  });
};

exports.anotherShowSelectedAlbums = function(name) {
  console.log(name);
  console.log("./uploads/" + name + "/");
  var files = fs.readdirSync("./uploads/" + name);
  var allAlbums = [];
  console.log(files.length);
  (function iterator(i) {
    if (i == files.length) {
      // console.log(allAlbums);
      // return allAlbums;
      return;
    }
    console.log("./uploads/" + name + "/" + files[i]);
    var state = fs.statSync("./uploads/" + name + "/" + files[i]);
    if (state.isFile()) {
      allAlbums.push(files[i]);
    }
    iterator(i + 1);
  })(0);
  console.log(allAlbums);
  return allAlbums;
};
