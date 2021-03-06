import chai from 'chai';
import 'chai/register-should';
import chaiHttp from 'chai-http';
import app from '../index';
import Utility from '../v1/utils/helpers';
import TestUtility from '../v1/utils/testUtils';

chai.use(chaiHttp);

// This runs before each test
describe('Order', () => {
  let generatedToken = null;

  /**
   * Logins user to generate userToken before test
   */
  before((done) => {
    const adminCredentials = {
      email: 'whitehouse@gmail.com',
      password: 'password',
    };

    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(adminCredentials)
      .end((err, res) => {
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
  describe('POST /orders', () => {
    const catererId = 2;

    it("it should place an order for a meal available in the today's menu", (done) => {
      const id = 2;
      const validMeal = {
        mealId: id,
        type: 'breakfast',
        catererId,
      };
      chai
        .request(app)
        .post('/api/v1/orders')
        .send(validMeal)
        .set('x-access-token', generatedToken)
        .end((err, res) => {
          if (!Utility.isOrderTime()) {
            TestUtility.orderTimerTestResponse(res);
          } else {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Your order has been placed');
          }
          done();
        });
    });

    it("it should not place an order for a meal that is not available in today's menu", (done) => {
      const id = 50;
      const validMeal = {
        mealId: id,
        type: 'breakfast',
        catererId,
      };
      chai
        .request(app)
        .post('/api/v1/orders')
        .send(validMeal)
        .set('x-access-token', generatedToken)
        .end((err, res) => {
          if (!Utility.isOrderTime()) {
            TestUtility.orderTimerTestResponse(res);
          } else {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('This meal cannot be found');
          }
          done();
        });
    });

    it('it should not place an order for a meal without "mealId" parameter', (done) => {
      const validMeal = {
        type: 'breakfast',
        catererId,
      };
      chai
        .request(app)
        .post('/api/v1/orders')
        .send(validMeal)
        .set('x-access-token', generatedToken)
        .end((err, res) => {
          if (!Utility.isOrderTime()) {
            TestUtility.orderTimerTestResponse(res);
          } else {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have
              .property('message')
              .eql('All parameters are required(mealId,type,catererId)');
          }
          done();
        });
    });

    it('it should not place an order for a meal without "type" parameter', (done) => {
      const id = 50;
      const validMeal = {
        mealId: id,
        catererId,
      };
      chai
        .request(app)
        .post('/api/v1/orders')
        .send(validMeal)
        .set('x-access-token', generatedToken)
        .end((err, res) => {
          if (!Utility.isOrderTime()) {
            TestUtility.orderTimerTestResponse(res);
          } else {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have
              .property('message')
              .eql('All parameters are required(mealId,type,catererId)');
          }
          done();
        });
    });

    it('it should not place an order for a meal without "catererId" parameter', (done) => {
      const id = 2;
      const validMeal = {
        mealId: id,
        type: 'breakfast',
      };
      chai
        .request(app)
        .post('/api/v1/orders')
        .send(validMeal)
        .set('x-access-token', generatedToken)
        .end((err, res) => {
          if (!Utility.isOrderTime()) {
            TestUtility.orderTimerTestResponse(res);
          } else {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have
              .property('message')
              .eql('All parameters are required(mealId,type,catererId)');
          }
          done();
        });
    });

    it('it should throw an error when a number is not passed as mealId', (done) => {
      const id = '5c'; // Invalid mealId
      const validMeal = {
        mealId: id,
        type: 'breakfast',
        catererId,
      };
      chai
        .request(app)
        .post('/api/v1/orders')
        .send(validMeal)
        .set('x-access-token', generatedToken)
        .end((err, res) => {
          if (!Utility.isOrderTime()) {
            TestUtility.orderTimerTestResponse(res);
          } else {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Invalid mealId. mealId must be a number');
          }
          done();
        });
    });
  });

  /**
   * Test the PUT /orders/:orderId route
   */
  describe('PUT /orders/:orderId', () => {
    it("it should update an ordered meal with another meal available in today's menu", (done) => {
      const orderId = 3;
      // This meal is available for today's menu
      const availableMealId = 3;

      const newOrder = {
        mealId: availableMealId,
        type: 'dinner',
      };

      chai
        .request(app)
        .put(`/api/v1/orders/${orderId}`)
        .send(newOrder)
        .set('x-access-token', generatedToken)
        .end((err, res) => {
          if (!Utility.isOrderTime()) {
            TestUtility.orderTimerTestResponse(res);
          } else {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Order was successfully updated');
          }
          done();
        });
    });

    it("it should throw an error when order is updated with a meal that is not available in today's menu", (done) => {
      const orderId = 2;

      // This meal is not available in today's menu
      const unAvailableMealId = 4;

      const newOrder = {
        mealId: unAvailableMealId,
        type: 'dinner',
      };

      chai
        .request(app)
        .put(`/api/v1/orders/${orderId}`)
        .send(newOrder)
        .set('x-access-token', generatedToken)
        .end((err, res) => {
          if (!Utility.isOrderTime()) {
            TestUtility.orderTimerTestResponse(res);
          } else {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have
              .property('message')
              .eql(`Order with id ${orderId} or Meal with id ${unAvailableMealId} cannot be found`);
          }
          done();
        });
    });

    it('it should throw an error when wrong orderId is passed', (done) => {
      // This meal is not available in today's menu
      const orderId = 100;
      const availableMealId = 2;

      const newOrder = {
        mealId: availableMealId,
        type: 'dinner',
      };

      chai
        .request(app)
        .put(`/api/v1/orders/${orderId}`)
        .send(newOrder)
        .set('x-access-token', generatedToken)
        .end((err, res) => {
          if (!Utility.isOrderTime()) {
            TestUtility.orderTimerTestResponse(res);
          } else {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have
              .property('message')
              .eql(`Order with id ${orderId} or Meal with id ${availableMealId} cannot be found`);
          }
          done();
        });
    });

    it('it should throw an error when  orderId or mealId is not a number', (done) => {
      // This meal is not available in today's menu
      const orderId = '1c';
      const availableMealId = 2;

      const newOrder = {
        mealId: availableMealId,
        type: 'dinner',
      };

      chai
        .request(app)
        .put(`/api/v1/orders/${orderId}`)
        .send(newOrder)
        .set('x-access-token', generatedToken)
        .end((err, res) => {
          if (!Utility.isOrderTime()) {
            TestUtility.orderTimerTestResponse(res);
          } else {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql("Invalid ID. ID's must be a number");
          }
          done();
        });
    });
  });

  /**
   * Test the GET /orders route
   */
  describe('GET /orders ', () => {
    it('it should get all orders', (done) => {
      chai
        .request(app)
        .get('/api/v1/orders')
        .set('x-access-token', generatedToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('array');
          done();
        });
    });
  });
});
