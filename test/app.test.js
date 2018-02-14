import chai from 'chai'
import chaiHttp from 'chai-http'
import 'babel-polyfill';
import app from '../app';
import assert from 'chai'

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('Test all endpoint', () => {
    describe('PUT /add', () => {
        it('should create a new task to do', (done) => {
            const text = 'Text from test';

            chai.request(app)
                .put('/api/add')
                .send({data: text})
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('data');
                    res.body.data.should.equal('success');

                    done();
                });

        });
    });

    describe('GET /showAll', () => {
        it('should display all tasks', (done) => {
            chai.request(app)
                .get('/api/showAll')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('data');
                    done();
                });
        });
    });

    describe('GET /show/:completed', () => {
        it('should display tasks where completed = :completed', (done) => {
            chai.request(app)
                .get('/api/show/false')
                .end((err, res) => {
                    res.should.have.status(200);
                    if(res.body.data.length > 0) {
                        expect(res.body.data[0]).to.have.any.keys('completed');
                        expect(res.body.data[0].completed).to.equal(false);
                    }
                    done();
                })
        });
    });
});
