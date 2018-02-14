import chai from 'chai'
import chaiHttp from 'chai-http'
import 'babel-polyfill';
import app from '../app';
import mongoose from 'mongoose';
import assert from 'chai'

const Tasks = mongoose.model('tasks');

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

let existTask = null;
beforeEach( async () => {
    existTask = await Tasks.findOne();
});

describe('Test all endpoint', () => {
    describe('PUT /add', () => {
        it('should create a new task to do', (done) => {
            const task = {
                "text" : "Text from test",
                "completed": false,
                "deadline": "2016-05-18T16:00:00.000Z",
            };

            chai.request(app)
                .put('/api/add')
                .send({data: task})
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
                    if (err) {
                        return done(err);
                    }

                    res.should.have.status(200);
                    if (res.body.data.length > 0) {
                        expect(res.body.data[0]).to.have.any.keys('completed');
                        expect(res.body.data[0].completed).to.equal(false);
                    }
                    done();
                })
        });
    });

    describe('PUT /change', () => {

        it('should edit task', (done) => {
            const taskValue = {
                "_id": existTask._id,
                "text": "Test add new",
                "completed": true,
                "deadline": "2016-05-18T16:00:00.000Z",
            };
            chai.request(app)
                .put("/api/change")
                .send({data: taskValue})
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    res.should.have.status(200);
                    res.body.should.have.property('data');
                    expect(res.body.data).to.have.any.keys('completed');
                    expect(res.body.data.completed).to.equal(true);
                    done();
                })
        });
    });

    describe(' DELETE /delete', () => {
        it('should delete task by id',  (done) => {
            const sendValue = {
                "_id": existTask._id
            };

            chai.request(app)
                .delete('/api/delete')
                .send({data: sendValue})
                .end((err, res)=> {
                    if (err) {
                        return done(err);
                    }

                    res.should.have.status(200);
                    res.body.should.have.property('data');
                    done();
                });
        });
    });
});

