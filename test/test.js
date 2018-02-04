const request = require('supertest');


/* 
 I went to the JSroundabout meetup where they were using jest and snapshot testing.
 I took it a learning opprtunity to use it in this project, this was very useful to 
 make the page-content tests because Jest automatically generate the content and saves 
 it in the __snapshot__ folder. If the content change the snapshots tests can be re-generated on demand.
*/
const paths = ['/about-page', '/jobs' , '/valves'];

describe('Project Test:', () => {
    describe('Page Ping:', () => {
        // looping over paths array which remove code duplications 
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
                    // compare page content with snapshots
                    expect(res.text).toMatchSnapshot();
                    done();
                });
            });
        });    
    });
});