"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

require("chai/register-should");

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

_chai.default.use(_chaiHttp.default); // This runs before each test


describe('Meal', function () {
  var generatedToken = null;
  /**
   * Logins user to generate userToken before test
   */

  before('Login user to obtain auth token to be used in other operations', function (done) {
    var adminCredentials = {
      email: 'whitehouse@gmail.com',
      password: 'password'
    };

    _chai.default.request(_index.default).post('/api/v1/auth/login').send(adminCredentials).end(function (err, res) {
      res.should.have.status(200);

      if (!err) {
        generatedToken = res.body.data.token;
      }

      done();
    });
  });
  /**
   * Test the POST /meals/ route
   */

  describe('POST /meals', function () {
    it('it should not POST a meal without name field', function (done) {
      var meal = {
        size: 'Small',
        price: '300'
      };

      _chai.default.request(_index.default).post('/api/v1/meals').send(meal).set('x-access-token', generatedToken).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('message').eql('All parameters are required');
        done();
      });
    });
    it('it should post a meal', function (done) {
      var meal = {
        name: 'Porridge',
        size: 'Small',
        price: '300',
        imageUrl: 'poridgesmall.png'
      };

      _chai.default.request(_index.default).post('/api/v1/meals').send(meal).set('x-access-token', generatedToken).end(function (err, res) {
        // res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Meal successfully added!');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('name');
        res.body.data.should.have.property('size');
        res.body.data.should.have.property('price');
        done();
      });
    });
  });
  /**
   * Test the GET /meals/ route
   */

  describe('GET /meals', function () {
    it('it should get all the meals', function (done) {
      _chai.default.request(_index.default).get('/api/v1/meals').set('x-access-token', generatedToken).end(function (err, res) {
        res.should.have.status(200);
        res.body.data.should.be.a('array');
        done();
      });
    });
  });
  /**
   * Test the GET /meals/:id route
   */

  describe('GET /meals/:id', function () {
    it('it should GET a meal by the given id', function (done) {
      var mealId = 1;

      _chai.default.request(_index.default).get("/api/v1/meals/".concat(mealId)).set('x-access-token', generatedToken).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('id').eql(mealId);
        res.body.data.should.have.property('name');
        res.body.data.should.have.property('size');
        res.body.data.should.have.property('price');
        done();
      });
    });
    it('it should not GET a meal that is not available', function (done) {
      var mealId = 10000;

      _chai.default.request(_index.default).get("/api/v1/meals/".concat(mealId)).set('x-access-token', generatedToken).end(function (err, res) {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Meal cannot be found');
        done();
      });
    });
    it('it should throw an error when a number is not passed as id', function (done) {
      var mealId = 'o';

      _chai.default.request(_index.default).get("/api/v1/meals/".concat(mealId)).set('x-access-token', generatedToken).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Invalid ID. ID must be a number');
        done();
      });
    });
  }); // /**
  //  * Test  PUT /meals/:id route
  //  */

  describe('PUT /meals/:id', function () {
    it('it should update a book given the id', function (done) {
      var mealId = 1;
      var updateMeal = {
        name: 'Coconut Rice',
        price: '300'
      };

      _chai.default.request(_index.default).put("/api/v1/meals/".concat(mealId)).send(updateMeal).set('x-access-token', generatedToken).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Meal was successfully updated');
        res.body.data.should.have.property('name').eql('Coconut Rice');
        res.body.data.should.have.property('price').eql('300');
        done();
      });
    });
    it('it should not PUT a meal that is not available', function (done) {
      var mealId = 10000;
      var updateMeal = {
        name: 'Coconut Rice',
        price: '300'
      };

      _chai.default.request(_index.default).put("/api/v1/meals/".concat(mealId)).send(updateMeal).set('x-access-token', generatedToken).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("Meal with id ".concat(mealId, " cannot be found"));
        done();
      });
    });
    it('it should throw an error when a number is not passed as id', function (done) {
      var mealId = 'o';
      var updateMeal = {
        name: 'Coconut Rice',
        price: '300'
      };

      _chai.default.request(_index.default).put("/api/v1/meals/".concat(mealId)).send(updateMeal).set('x-access-token', generatedToken).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Invalid ID. ID must be a number');
        done();
      });
    });
  }); // /**
  //  * Test  DELETE /meals/:id route
  //  */

  describe('DELETE /meal/:id', function () {
    it('it should not DELETE a meal that is not available', function (done) {
      var mealId = 10000;

      _chai.default.request(_index.default).put("/api/v1/meals/".concat(mealId)).set('x-access-token', generatedToken).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("Meal with id ".concat(mealId, " cannot be found"));
        done();
      });
    });
    it('it should throw an error when a number is not passed as id', function (done) {
      var mealId = 'o';

      _chai.default.request(_index.default).put("/api/v1/meals/".concat(mealId)).set('x-access-token', generatedToken).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Invalid ID. ID must be a number');
        done();
      });
    });
    it('it should delete a meal given the id', function (done) {
      var mealId = 1;

      _chai.default.request(_index.default).delete("/api/v1/meals/".concat(mealId)).set('x-access-token', generatedToken).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Meal was successfully deleted');
        done();
      });
    });
  });
});