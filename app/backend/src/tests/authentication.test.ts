import * as sinon from 'sinon';
import * as chai from 'chai';
import User from '../database/models/UserModel'
import { mockUser, fakeToken } from './mocks/loginMock';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';


chai.use(chaiHttp);

const {expect} = chai;

describe('Rota login Test', () => {
  describe('POST em caso de SUCESSO', () => {

    before(() => {
      sinon.stub(User, 'findOne').resolves(mockUser);
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    })

    it('Email ou senha valido retorna status 200', async () => {
      const response = await chai.request(app).post('/login').send({
        email: mockUser.email,
        password: 'secret_admin',
      });
      expect(response).to.have.status(200);
    })
  });

  describe('POST em caso de ERRO', () => {

    before(() => {
      sinon.stub(User, 'findOne').resolves(mockUser);
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    });

    it('Email inválido ou inexistente retorna status 400', async () => {
      const response = await chai.request(app).post('/login').send({
        password: 'secret_admin',
      });
      expect(response.status).to.be.equal(400);
    });

    it('Senha inválida ou inexistente retorna status 400', async () => {
      const response = await chai.request(app).post('/login').send({
        email: mockUser.email,
      })
      expect(response.status).to.be.equal(400);
    });
  });
});

describe('Rota login/validate API Test', () => {
  describe('GET em caso de SUCESSO', () => {

    before(() => {
      sinon.stub(User, 'findOne').resolves(mockUser);
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    })

    it('Retorna status 200 com um token', async () => {
      const response = await chai.request(app).post('/login').send({
        email: mockUser.email,
        password: 'secret_admin',
      });

      expect(response).to.have.status(200);
      expect(response.body).to.have.property('token')
    })
  });

  describe('GET em caso de ERRO', () => {

    before(() => {
      sinon.stub(User, 'findOne').resolves(mockUser);
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    });

    it('Token inválido retorna status 500', async () => {
      
      const response = await chai.request(app).get('/login/validate').set({
        'Authorization': fakeToken
      });
      expect(response).to.have.status(500);
    });

    it('Sem token retorna a mensagem "jwt must be provided"', async () => {

      const response = await chai.request(app).get('/login/validate')

      expect(response.body.message).to.be.equal('jwt must be provided');
    });
  });
});

