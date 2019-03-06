"use strict";

var _chai = _interopRequireDefault(require("chai"));

require("chai/register-should");

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

var _dummyData = _interopRequireDefault(require("../v1/utils/dummyData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai.default.use(_chaiHttp.default);

describe('Menu', function () {
  beforeEach(function (done) {
    done();
  });
  /**
   * POST the /menu/ route
   */

  describe('POST /menu', function () {
    it('it should add a meal given the id to the menu', function (done) {
      var mealId = Number(_dummyData.default.meals[1].id);
      var meal = {
        id: mealId
      };

      _chai.default.request(_index.default).post('/api/v1/menu').send(meal).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.have.property('message').eql('Meal successfully added to Menu List');
        res.body.data.should.have.property('id').eql(mealId);
        done();
      });
    });
    it('it should send a message if meal has already been added', function (done) {
      var mealId = Number(_dummyData.default.meals[1].id);
      var meal = {
        id: mealId
      };

      _chai.default.request(_index.default).post('/api/v1/menu').send(meal).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Meal has already been added to menu list');
        done();
      });
    });
    it('it should throw an error when the given meal id is not found', function (done) {
      var meal = {
        id: 100
      };

      _chai.default.request(_index.default).post('/api/v1/menu').send(meal).end(function (err, res) {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("Meal with id ".concat(meal.id, " cannot be found"));
        done();
      });
    });
    it('it should throw an error when mealId parameter(body) is missing', function (done) {
      var meal = {};

      _chai.default.request(_index.default).post('/api/v1/menu').send(meal).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('meal id is required');
        done();
      });
    });
    it('it should throw an error when a number is not passed as mealId', function (done) {
      var meal = {
        id: '1c'
      };

      _chai.default.request(_index.default).post('/api/v1/menu').send(meal).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Invalid ID. ID must be a number');
        done();
      });
    });
  });
  /**
   * GET the /menu/ route
   */

  describe('GET /menu', function () {
    it('it should get all menu for today', function (done) {
      _chai.default.request(_index.default).get('/api/v1/menu').end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
    });
  });
});