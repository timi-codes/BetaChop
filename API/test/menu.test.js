import chai from 'chai';
import 'chai/register-should';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

describe('Menu', () => {
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
   * POST the /menu/ route
   */
  describe('POST /menu', () => {
    it('it should add a meal given the id to the menu', (done) => {
      const mealId = 5;
      const meal = {
        id: mealId,
      };
      chai
        .request(app)
        .post('/api/v1/menu')
        .send(meal)
        .set('x-access-token', generatedToken)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message').eql('Meal successfully added to Menu List');
          res.body.data.should.have.property('id').eql(mealId);
          done();
        });
    });

    it('it should send a message if meal has already been added', (done) => {
      const mealId = 5;
      const meal = {
        id: mealId,
      };
      chai
        .request(app)
        .post('/api/v1/menu')
        .send(meal)
        .set('x-access-token', generatedToken)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Meal has already been added to menu list');
          done();
        });
    });

    it('it should throw an error when the given meal id is not found', (done) => {
      const meal = {
        id: 100,
      };
      chai
        .request(app)
        .post('/api/v1/menu')
        .send(meal)
        .set('x-access-token', generatedToken)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql(`Meal with id ${meal.id} cannot be found`);
          done();
        });
    });

    it('it should throw an error when mealId parameter(body) is missing', (done) => {
      const meal = {};
      chai
        .request(app)
        .post('/api/v1/menu')
        .send(meal)
        .set('x-access-token', generatedToken)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('meal id is required');
          done();
        });
    });

    it('it should throw an error when a number is not passed as mealId', (done) => {
      const meal = {
        id: '1c',
      };
      chai
        .request(app)
        .post('/api/v1/menu')
        .send(meal)
        .set('x-access-token', generatedToken)
        .end((err, res) => {
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
  describe('GET /menu', () => {
    it('it should get all menu for today', (done) => {
      chai
        .request(app)
        .get('/api/v1/menu')
        .set('x-access-token', generatedToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.be.a('array');
          done();
        });
    });
  });
});
