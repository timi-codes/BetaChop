import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../v1/index';


const should = chai.use(chaiHttp).should();
