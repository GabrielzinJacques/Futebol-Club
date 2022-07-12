import * as sinon from 'sinon';
import * as chai from 'chai';
import User from '../database/models/UserModel'
import { mockUser } from './mocks/loginMock';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';


chai.use(chaiHttp);

const {expect} = chai;

describe('User API Test', () => {
  describe('POST /login SUCESSO', () => {

    before(() => {
      sinon.stub(User, 'findOne').resolves(mockUser);
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    })

    it('Email ou senha valido retorna status 200', async () => {
      const response = await chai.request(app).post('/login').send({
        email: mockUser.email,
        password: 'secret_admin'
      })
      expect(response).to.have.status(200);
    })
  });

  describe('POST /login ERRO', () => {

    before(() => {
      sinon.stub(User, 'findOne').resolves(mockUser);
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    })

    it('Email ou senha invalido retorna status 401', async () => {
      const response = await chai.request(app).post('/login').send({
        email: mockUser.email,
        password: 'secret_admi'
      })
      expect(response.status).to.be.equal(401);
    })
  })



})

