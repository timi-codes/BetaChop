import chai from 'chai';
import 'chai/register-should';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

// This runs before each test
describe('Meal', () => {
  beforeEach((done) => {
    done();
  });
  /**
   * Test the POST /auth/signup/ route
   */
  describe('POST /auth/signup', () => {
    it('it should not POST a new user without without email address field', (done) => {
      const newUser = {
        username: 'Kolade',
        password: 'password',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup/')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('error');
          res.body.should.have.property('message').eql('Email Address is required');
          done();
        });
    });

    it('it should not POST a new user  without password field', (done) => {
      const newUser = {
        username: 'Kolade',
        email: 'tejumolamofe@gmail.com',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup/')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('error');
          res.body.should.have.property('message').eql('Password is required');
          done();
        });
    });

    it('it should not POST a new user if the email address already exist in the system', (done) => {
      const newUser = {
        username: 'Kolade',
        email: 'timitejumola@gmail.com',
        password: 'password',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup/')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('error');
          res.body.should.have
            .property('message')
            .eql('User with this email address already exist!');
          done();
        });
    });

    it('it should create a new user', (done) => {
      const newUser = {
        username: 'Bolades',
        email: 'timijk@gmail.com',
        password: 'passw',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup/')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Account was successfully created!');
          res.body.data.should.have.property('username');
          res.body.data.should.have.property('email');
          res.body.data.should.have.property('token');
          done();
        });
    });
  });

  /**
   * Test the POST /auth/login/ route
   */
  describe('POST /auth/login', () => {
    it('it should throw an error if email adress is not provided', (done) => {
      const loginCredentials = {
        password: 'password',
      };
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(loginCredentials)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('error');
          res.body.should.have.property('message').eql('Email Address is required');
          done();
        });
    });

    it('it should throw an error if password is not provided', (done) => {
      const loginCredentials = {
        email: 'tejumolamofe@gmail.com',
      };
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(loginCredentials)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('error');
          res.body.should.have.property('message').eql('Password is required');
          done();
        });
    });

    it('it should throw an error if user supply wrong email address', (done) => {
      const loginCredentials = {
        email: 'timi@gmail.com',
        password: 'password',
      };
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(loginCredentials)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('error');
          res.body.should.have.property('message').eql('User profile cannot be found!');
          done();
        });
    });

    it('it should throw an error if user supply a wrong email and password combination ', (done) => {
      const loginCredentials = {
        email: 'timijk@gmail.com',
        password: 'passwordsdd',
      };
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(loginCredentials)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('error');
          res.body.should.have.property('message').eql('Invalid user credentials');
          done();
        });
    });

    it('it should login the user in', (done) => {
      const loginCredentials = {
        email: 'timijk@gmail.com',
        password: 'passw',
      };
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(loginCredentials)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.have.property('token');
          done();
        });
    });
  });
});
