"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

require("chai/register-should");

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

_chai.default.use(_chaiHttp.default); // This runs before each test


describe('Meal', function () {
  beforeEach(function (done) {
    done();
  });
  /**
   * Test the POST /auth/signup/ route
   */

  describe('POST /auth/signup', function () {
    it('it should not POST a new user without without email address field', function (done) {
      var newUser = {
        username: 'Kolade',
        password: 'password'
      };

      _chai.default.request(_index.default).post('/api/v1/auth/signup/').send(newUser).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('message').eql('Email Address is required');
        done();
      });
    });
    it('it should not POST a new user  without password field', function (done) {
      var newUser = {
        username: 'Kolade',
        email: 'tejumolamofe@gmail.com'
      };

      _chai.default.request(_index.default).post('/api/v1/auth/signup/').send(newUser).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('message').eql('Password is required');
        done();
      });
    });
    it('it should not POST a new user if the email address already exist in the system', function (done) {
      var newUser = {
        username: 'Kolade',
        email: 'timitejumola@gmail.com',
        password: 'password'
      };

      _chai.default.request(_index.default).post('/api/v1/auth/signup/').send(newUser).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('message').eql('User with this email address already exist!');
        done();
      });
    });
    it('it should create a new user', function (done) {
      var newUser = {
        username: 'Bolades',
        email: 'timijk@gmail.com',
        password: 'passw'
      };

      _chai.default.request(_index.default).post('/api/v1/auth/signup/').send(newUser).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Account was successfully created!');
        res.body.data.should.have.property('username');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('token');
        done();
      });
    });
  });
  /**
   * Test the POST /auth/login/ route
   */

  describe('POST /auth/login', function () {
    it('it should throw an error if email adress is not provided', function (done) {
      var loginCredentials = {
        password: 'password'
      };

      _chai.default.request(_index.default).post('/api/v1/auth/login').send(loginCredentials).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('message').eql('Email Address is required');
        done();
      });
    });
    it('it should throw an error if password is not provided', function (done) {
      var loginCredentials = {
        email: 'tejumolamofe@gmail.com'
      };

      _chai.default.request(_index.default).post('/api/v1/auth/login').send(loginCredentials).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('message').eql('Password is required');
        done();
      });
    });
    it('it should throw an error if user supply wrong email address', function (done) {
      var loginCredentials = {
        email: 'timi@gmail.com',
        password: 'password'
      };

      _chai.default.request(_index.default).post('/api/v1/auth/login').send(loginCredentials).end(function (err, res) {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('message').eql('User profile cannot be found!');
        done();
      });
    });
    it('it should throw an error if user supply a wrong email and password combination ', function (done) {
      var loginCredentials = {
        email: 'timijk@gmail.com',
        password: 'passwordsdd'
      };

      _chai.default.request(_index.default).post('/api/v1/auth/login').send(loginCredentials).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('message').eql('Invalid user credentials');
        done();
      });
    });
    it('it should login the user in', function (done) {
      var loginCredentials = {
        email: 'timijk@gmail.com',
        password: 'passw'
      };

      _chai.default.request(_index.default).post('/api/v1/auth/login').send(loginCredentials).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('token');
        done();
      });
    });
  });
});