import chai from 'chai';
import 'chai/register-should';
import chaiHttp from 'chai-http';
import app from '../v1/index';
import dummyData from '../v1/utils/dummyData';

chai.use(chaiHttp);

// This runs before each test
describe('Meal', () => {
  beforeEach((done) => {
    done();
  });

  /**
   * Test the GET /meals/ route
   */
  describe('GET /meals', () => {
    it('it should get all the meals', (done) => {
      chai
        .request(app)
        .get('/api/v1/meals')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('array');
          done();
        });
    });
  });
});
