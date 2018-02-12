import expect from 'expect';
import 'babel-polyfill';
import request from 'supertest';
import app from '../app';

describe('Test all endpoint', () => {
    describe('PUT /add', () => {
        it('should create a new task to do', (done) => {
            const text = 'Text from test';

            request(app)
                .put('/api/add')
                .send({data: text})
                .expect(200)
                .expect((res) => {
                    expect(res.body.data).toBe('success');
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done();
                })

        });
    });

    describe('GET /showAll', () => {
        it('should display all tasks', (done) => {
            request(app)
                .get('/api/showAll')
                .expect(200)
                .expect((res) => {
                    expect(res.body.data.length).toBeGreaterThan(0);
                })
                .end(done);
        });
    });
});
