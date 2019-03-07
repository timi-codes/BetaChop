"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

require("chai/register-should");

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

_chai.default.use(_chaiHttp.default); // This runs before each test


describe('Order', function () {
  var generatedToken = null;
  /**
   * Logins user to generate userToken before test
   */

  before(function (done) {
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
   * Test the POST /orders/ route
   */

  describe('POST /orders', function () {
    it("it should place an order for a meal available in the today's menu", function (done) {
      var id = 2;
      var validMeal = {
        mealId: id,
        type: 'breakfast'
      };

      _chai.default.request(_index.default).post('/api/v1/orders').send(validMeal).set('x-access-token', generatedToken).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Your order has been placed');
        done();
      });
    });
    it("it should not place an order for a meal that is not available in today's menu", function (done) {
      var id = 50;
      var validMeal = {
        mealId: id,
        type: 'breakfast'
      };

      _chai.default.request(_index.default).post('/api/v1/orders').send(validMeal).set('x-access-token', generatedToken).end(function (err, res) {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('This meal cannot be found');
        done();
      });
    });
    it('it should not place an order for a meal without "mealId" parameter', function (done) {
      var validMeal = {
        type: 'breakfast'
      };

      _chai.default.request(_index.default).post('/api/v1/orders').send(validMeal).set('x-access-token', generatedToken).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('All parameters are required');
        done();
      });
    });
    it('it should not place an order for a meal without "type" parameter', function (done) {
      var id = 50;
      var validMeal = {
        mealId: id
      };

      _chai.default.request(_index.default).post('/api/v1/orders').send(validMeal).set('x-access-token', generatedToken).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('All parameters are required');
        done();
      });
    });
    it('it should throw an error when a number is not passed as mealId', function (done) {
      var id = '5c'; // Invalid mealId

      var validMeal = {
        mealId: id,
        type: 'breakfast'
      };

      _chai.default.request(_index.default).post('/api/v1/orders').send(validMeal).set('x-access-token', generatedToken).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Invalid mealId. mealId must be a number');
        done();
      });
    });
  });
  /**
   * Test the PUT /orders/:orderId route
   */

  describe('PUT /orders/:orderId', function () {
    it("it should update an ordered meal with another meal available in today's menu", function (done) {
      var orderId = 3; // This meal is available for today's menu

      var availableMealId = 3;
      var newOrder = {
        mealId: availableMealId,
        type: 'dinner'
      };

      _chai.default.request(_index.default).put("/api/v1/orders/".concat(orderId)).send(newOrder).set('x-access-token', generatedToken).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Order was successfully updated');
        done();
      });
    });
    it("it should throw an error when order is updated with a meal that is not available in today's menu", function (done) {
      var orderId = 2; // This meal is not available in today's menu

      var unAvailableMealId = 4;
      var newOrder = {
        mealId: unAvailableMealId,
        type: 'dinner'
      };

      _chai.default.request(_index.default).put("/api/v1/orders/".concat(orderId)).send(newOrder).set('x-access-token', generatedToken).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("Order with id ".concat(orderId, " or Meal with id ").concat(unAvailableMealId, " cannot be found"));
        done();
      });
    });
    it('it should throw an error when wrong orderId is passed', function (done) {
      // This meal is not available in today's menu
      var orderId = 100;
      var availableMealId = 2;
      var newOrder = {
        mealId: availableMealId,
        type: 'dinner'
      };

      _chai.default.request(_index.default).put("/api/v1/orders/".concat(orderId)).send(newOrder).set('x-access-token', generatedToken).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("Order with id ".concat(orderId, " or Meal with id ").concat(availableMealId, " cannot be found"));
        done();
      });
    });
    it('it should throw an error when  orderId or mealId is not a number', function (done) {
      // This meal is not available in today's menu
      var orderId = '1c';
      var availableMealId = 2;
      var newOrder = {
        mealId: availableMealId,
        type: 'dinner'
      };

      _chai.default.request(_index.default).put("/api/v1/orders/".concat(orderId)).send(newOrder).set('x-access-token', generatedToken).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("Invalid ID. ID's must be a number");
        done();
      });
    });
  });
  /**
   * Test the GET /orders route
   */

  describe('GET /orders ', function () {
    it('it should get all orders', function (done) {
      _chai.default.request(_index.default).get('/api/v1/orders').set('x-access-token', generatedToken).end(function (err, res) {
        res.should.have.status(200);
        res.body.data.should.be.a('array');
        done();
      });
    });
  });
});