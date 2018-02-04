const request = require('supertest');

const paths = ['/about-page', '/jobs' , '/valves'];

describe('Project Test:', () => {
    describe('Page Ping:', () => {
        paths.map( (path) => {
            it('should respond with 200', (done) => {
                request(require('../app.js'))
                .get(path)
                .expect(200, (err, res) =>  {
                    done();
                });
            });
        });
        it('Should respond 404', (done) => {
            request(require('../app.js'))
            .get('/wrong-url')
            .expect(200, (err, res) =>  {
                done();
            });
        }); 
    });
    describe('Ensure page content', () => {
        paths.map( (path) => {
            it('should match snapshots 200', (done) => {
                request(require('../app.js'))
                .get(path)
                .expect(200, (err, res) =>  {
                    expect(res.text).toMatchSnapshot();
                    done();
                });
            });
        });    
    });
});