"use strict";

var _chai = _interopRequireDefault(require("chai"));

require("chai/register-should");

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../v1/index"));

var _dummyData = _interopRequireDefault(require("../v1/utils/dummyData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai.default.use(_chaiHttp.default); // This runs before each test


describe('Order', function () {
  beforeEach(function (done) {
    done();
  });
  /**
   * Test the POST /orders/ route
   */

  describe('POST /orders', function () {
    it("it should place an order for a meal available in the today's menu", function (done) {
      var id = Number(_dummyData.default.menu[0].id);
      var validMeal = {
        mealId: id,
        type: 'breakfast'
      };

      _chai.default.request(_index.default).post('/api/v1/orders').send(validMeal).end(function (err, res) {
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

      _chai.default.request(_index.default).post('/api/v1/orders').send(validMeal).end(function (err, res) {
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

      _chai.default.request(_index.default).post('/api/v1/orders').send(validMeal).end(function (err, res) {
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

      _chai.default.request(_index.default).post('/api/v1/orders').send(validMeal).end(function (err, res) {
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

      _chai.default.request(_index.default).post('/api/v1/orders').send(validMeal).end(function (err, res) {
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
      var orderId = Number(_dummyData.default.orders[0].id); // This meal is available for today's menu

      var availableMealId = Number(_dummyData.default.menu[0].id);
      var newOrder = {
        mealId: availableMealId,
        type: 'dinner'
      };

      _chai.default.request(_index.default).put("/api/v1/orders/".concat(orderId)).send(newOrder).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Order was successfully updated');
        res.body.data.should.have.property('type').eql('dinner');
        res.body.data.meal.should.have.property('name').eql('Jollof Rice');
        done();
      });
    });
    it("it should throw an error when order is updated with a meal that is not available in today's menu", function (done) {
      var orderId = Number(_dummyData.default.orders[0].id); // This meal is not available in today's menu

      var meal = _dummyData.default.meals[5];
      var unAvailableMealId = Number(meal.id);
      var newOrder = {
        mealId: unAvailableMealId,
        type: 'dinner'
      };

      _chai.default.request(_index.default).put("/api/v1/orders/".concat(orderId)).send(newOrder).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("Order with id ".concat(orderId, " or Meal with id ").concat(unAvailableMealId, " cannot be found"));
        done();
      });
    });
    it('it should throw an error when wrong orderId is passed', function (done) {
      // This meal is not available in today's menu
      var orderId = 100;
      var availableMealId = Number(_dummyData.default.menu[0].id);
      var newOrder = {
        mealId: availableMealId,
        type: 'dinner'
      };

      _chai.default.request(_index.default).put("/api/v1/orders/".concat(orderId)).send(newOrder).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("Order with id ".concat(orderId, " or Meal with id ").concat(availableMealId, " cannot be found"));
        done();
      });
    });
    it('it should throw an error when  orderId or mealId is not a number', function (done) {
      // This meal is not available in today's menu
      var orderId = '1c';
      var availableMealId = Number(_dummyData.default.menu[0].id);
      var newOrder = {
        mealId: availableMealId,
        type: 'dinner'
      };

      _chai.default.request(_index.default).put("/api/v1/orders/".concat(orderId)).send(newOrder).end(function (err, res) {
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
      _chai.default.request(_index.default).get('/api/v1/orders').end(function (err, res) {
        res.should.have.status(200);
        res.body.data.should.be.a('array');
        done();
      });
    });
  });
});