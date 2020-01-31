const request = require('supertest');
const server = require('./server');
const db = require('../database/dbConfig')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { signToken } = require('../auth/auth-router');
const { jwtSecret } = require('../config/secret');

describe('server', function() {
    
    it('runs the tests', function() {
        expect(true).toBe(true)
    });

    beforeEach(function(done) {
        db.migrate.rollback()
            .then(function() {
            return db.migrate.latest()
            })
            .then(function() {
            done();
        });
    });

    describe('GET /', function() {
        it('should return connection message',function() {
            return request(server).get('/').then(res => {
                expect(res.type).toMatch(/html/i)
                expect(res.text).toEqual('<h1>connected<h1>')
            });
        });
    });

    describe('POST /api/auth/register', function() {
        it('should post user to the database', function() {
            return request(server).post('/api/auth/register')
            .send({
                username: 'name',
                password: 'password'
            })
            .then(res => {
                expect(res.status).toBe(201)
                expect(res.type).toMatch(/json/i)
                expect(res.body).toHaveProperty('id')
                expect(res.body).toEqual(expect.objectContaining({username: 'name'}))
                expect(res.body.username).toBe('name')
                let user = res.body;
                const hash = bcrypt.hashSync(user.password, 10);
                user.password = hash;
                expect(res.body.password).toEqual(hash)
            });
        });
    });

    describe('POST /api/auth/login', function() {
        it('should post user to the database and return token', function() {
            return request(server).post('/api/auth/register')
            .send({
                username: 'name',
                password: 'password'
            }).then(function() {
                return request(server).post('/api/auth/login')
                .send({
                    username: 'name',
                    password: 'password',
                })
                .then(res => {
                    expect(res.status).toBe(200)
                    expect(res.type).toMatch(/json/i)
                    expect(res.body).toHaveProperty('token')
                    let response = jwt.verify(res.body.token, jwtSecret)
                    expect(response.username).toBe('name')
                    expect(response.userId).toBe(1)
                });
            });
        });
    });

    describe('GET /api/jokes', function() {
        it('should return response status 401', function() {
            return request(server).get('/api/jokes').then(res => {
                expect(res.status).toBe(401)
                expect(res.type).toMatch(/json/i)
                expect(res.body.you).toBe('shall not pass!')
            });
        });
    });

    describe('GET /api/jokes', function() {
        it('should return jokes', function() {
            let token = signToken({
                userId : 1,
                username: 'name',
            })
            return request(server).get('/api/jokes')
            .set({ authorization: token })
            .then(res => {
                expect(res.status).toBe(200)
                expect(res.type).toMatch(/json/i)
                expect(res.body).toEqual(expect.arrayContaining([expect.objectContaining({   joke: "I'm tired of following my dreams. I'm just going to ask them where they are going and meet up with them later."})]))
            })
        });
    });
});