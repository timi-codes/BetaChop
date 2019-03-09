import chai from 'chai';
import 'chai/register-should';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

// This runs before each test
describe('Meal', () => {
  let generatedToken = null;
  /**
   * Logins user to generate userToken before test
   */
  before('Login user to obtain auth token to be used in other operations', (done) => {
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
   * Test the POST /meals/ route
   */
  describe('POST /meals', () => {
    it('it should not POST a meal without name field', (done) => {
      const meal = {
        size: 'Small',
        price: '300',
      };
      chai
        .request(app)
        .post('/api/v1/meals')
        .send(meal)
        .set('x-access-token', generatedToken)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('error');
          res.body.should.have.property('message').eql('All parameters are required');
          done();
        });
    });

    it('it should post a meal', (done) => {
      const meal = {
        name: 'Porridge',
        size: 'Small',
        price: '300',
        imageUrl: 'poridgesmall.png',
      };
      chai
        .request(app)
        .post('/api/v1/meals')
        .send(meal)
        .set('x-access-token', generatedToken)
        .end((err, res) => {
          res.should.have.status(201);
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
  describe('GET /meals', () => {
    it('it should get all the meals', (done) => {
      chai
        .request(app)
        .get('/api/v1/meals')
        .set('x-access-token', generatedToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('array');
          done();
        });
    });
  });

  /**
   * Test the GET /meals/:id route
   */
  describe('GET /meals/:id', () => {
    it('it should GET a meal by the given id', (done) => {
      const mealId = 1;
      chai
        .request(app)
        .get(`/api/v1/meals/${mealId}`)
        .set('x-access-token', generatedToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.have.property('id').eql(mealId);
          res.body.data.should.have.property('name');
          res.body.data.should.have.property('size');
          res.body.data.should.have.property('price');
          done();
        });
    });

    it('it should not GET a meal that is not available', (done) => {
      const mealId = 10000;
      chai
        .request(app)
        .get(`/api/v1/meals/${mealId}`)
        .set('x-access-token', generatedToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Meal cannot be found');
          done();
        });
    });

    it('it should throw an error when a number is not passed as id', (done) => {
      const mealId = 'o';
      chai
        .request(app)
        .get(`/api/v1/meals/${mealId}`)
        .set('x-access-token', generatedToken)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Invalid ID. ID must be a number');
          done();
        });
    });
  });

  // /**
  //  * Test  PUT /meals/:id route
  //  */
  describe('PUT /meals/:id', () => {
    it('it should update a book given the id', (done) => {
      const mealId = 1;
      const updateMeal = { name: 'Coconut Rice', price: '300' };
      chai
        .request(app)
        .put(`/api/v1/meals/${mealId}`)
        .send(updateMeal)
        .set('x-access-token', generatedToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Meal was successfully updated');
          res.body.data.should.have.property('name').eql('Coconut Rice');
          res.body.data.should.have.property('price').eql('300');
          done();
        });
    });

    it('it should not PUT a meal that is not available', (done) => {
      const mealId = 10000;
      const updateMeal = { name: 'Coconut Rice', price: '300' };
      chai
        .request(app)
        .put(`/api/v1/meals/${mealId}`)
        .send(updateMeal)
        .set('x-access-token', generatedToken)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql(`Meal with id ${mealId} cannot be found`);
          done();
        });
    });

    it('it should throw an error when a number is not passed as id', (done) => {
      const mealId = 'o';
      const updateMeal = { name: 'Coconut Rice', price: '300' };
      chai
        .request(app)
        .put(`/api/v1/meals/${mealId}`)
        .send(updateMeal)
        .set('x-access-token', generatedToken)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Invalid ID. ID must be a number');
          done();
        });
    });
  });

  // /**
  //  * Test  DELETE /meals/:id route
  //  */
  describe('DELETE /meal/:id', () => {
    it('it should not DELETE a meal that is not available', (done) => {
      const mealId = 10000;
      chai
        .request(app)
        .put(`/api/v1/meals/${mealId}`)
        .set('x-access-token', generatedToken)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql(`Meal with id ${mealId} cannot be found`);
          done();
        });
    });

    it('it should throw an error when a number is not passed as id', (done) => {
      const mealId = 'o';
      chai
        .request(app)
        .put(`/api/v1/meals/${mealId}`)
        .set('x-access-token', generatedToken)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Invalid ID. ID must be a number');
          done();
        });
    });

    it('it should delete a meal given the id', (done) => {
      const mealId = 1;

      chai
        .request(app)
        .delete(`/api/v1/meals/${mealId}`)
        .set('x-access-token', generatedToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Meal was successfully deleted');
          done();
        });
    });
  });
});
