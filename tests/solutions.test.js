const request = require('supertest')
const app = require('../index.js');

var token = null;

beforeAll(async() =>{
   await request(app)
          .post('/api/auth/signin/')
          .send({
            "username": "aqib23",
            "password": "aqib"
          })
          .then(async (response) => {
            // store token value
            token = response.body.accessToken
           // console.log(token)
    
          });
        
})
describe('GET /api/solutions/', function() {
    it('responds with json and Status OK', async () => {
      await request(app)
            .get('/api/solutions/')
            .set('Authorization', 'Bearer '+ token)
            .expect(200)
            .then(async (response) => {
                // Check the response
                //console.log(response)
                // expect(response.body.id).not.toBeUndefined();
                // expect(response.body.username).toBe("aqib23");
                // expect(response.body.email).toBe("aqib@gmail.com");
                // expect(response.body.accessToken).not.toBeNull();
        
              });
          
      });
  });