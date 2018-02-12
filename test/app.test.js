import expect from 'expect';
import 'babel-polyfill';
import request from 'supertest';
import app from '../app';

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