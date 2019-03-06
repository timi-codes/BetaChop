import chai from 'chai';
import 'chai/register-should';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

// This runs before each test
describe('Order', () => {
  beforeEach((done) => {
    done();
  });

  /**
   * Test the POST /orders/ route
   */
  describe('POST /orders', () => {
    it("it should place an order for a meal available in the today's menu", (done) => {
      const id = 2;
      const validMeal = {
        mealId: id,
        type: 'breakfast',
      };
      chai
        .request(app)
        .post('/api/v1/orders')
        .send(validMeal)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Your order has been placed');
          done();
        });
    });

    it("it should not place an order for a meal that is not available in today's menu", (done) => {
      const id = 50;
      const validMeal = {
        mealId: id,
        type: 'breakfast',
      };
      chai
        .request(app)
        .post('/api/v1/orders')
        .send(validMeal)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('This meal cannot be found');
          done();
        });
    });

    it('it should not place an order for a meal without "mealId" parameter', (done) => {
      const validMeal = {
        type: 'breakfast',
      };
      chai
        .request(app)
        .post('/api/v1/orders')
        .send(validMeal)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('All parameters are required');
          done();
        });
    });

    it('it should not place an order for a meal without "type" parameter', (done) => {
      const id = 50;
      const validMeal = {
        mealId: id,
      };
      chai
        .request(app)
        .post('/api/v1/orders')
        .send(validMeal)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('All parameters are required');
          done();
        });
    });

    it('it should throw an error when a number is not passed as mealId', (done) => {
      const id = '5c'; // Invalid mealId
      const validMeal = {
        mealId: id,
        type: 'breakfast',
      };
      chai
        .request(app)
        .post('/api/v1/orders')
        .send(validMeal)
        .end((err, res) => {
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
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Order was successfully updated');
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
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('message')
            .eql(`Order with id ${orderId} or Meal with id ${unAvailableMealId} cannot be found`);
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
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('message')
            .eql(`Order with id ${orderId} or Meal with id ${availableMealId} cannot be found`);
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
        .end((err, res) => {
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
  describe('GET /orders ', () => {
    it('it should get all orders', (done) => {
      chai
        .request(app)
        .get('/api/v1/orders')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('array');
          done();
        });
    });
  });
});
