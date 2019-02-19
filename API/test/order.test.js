import chai from 'chai';
import 'chai/register-should';
import chaiHttp from 'chai-http';
import app from '../v1/index';
import dummyData from '../v1/utils/dummyData';

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
      const id = Number(dummyData.menu[0].id);
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
          res.should.have.status(200);
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
      const id = '5c';
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
});
