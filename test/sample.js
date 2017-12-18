process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");

var server = require('../server/app');
var Blob = require("../server/models/blob");

var should = chai.should();
chai.use(chaiHttp);


describe('Blobs', function () {
  Blob.collection.drop();

  beforeEach(function(done){
    var newBlob = new Blob({
      name: 'Bat',
      lastName: 'man'
    });
    newBlob.save(function(err) {
      done();
    });
  });

  afterEach(function(done){
    Blob.collection.drop();
    done();
  });
});