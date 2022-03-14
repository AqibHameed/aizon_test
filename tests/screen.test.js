const request = require('supertest')
const app = require('../index.js');
const db  = require('../app/models/index.js');
const Screen = db.screen;
const Solution = db.solution;

var token = null;
var id = null;
var userId = null;
var name =""
var solutionId = null

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
            userId = response.body.id
    
          });
    
  await Screen.destroy({
      where: {name: "screen1"}
    })
      
  await request(app)
          .post('/api/solutions/')
          .set('Authorization', 'Bearer '+ token)
          .send({
            "name": "solution1"
          })
          .expect(200)
          .then(async (response) => {
            // Check the response
            solutionId = response.body.data.id
    
          });    
        
       
        
})

afterAll(async() =>{
  
  await Solution.destroy({
      where: {name: "solution1"}
  })
})
describe('GET /api/solutions/:solutionId/screens/', function() {
    it('responds with json and Status OK', async () => {
      await request(app)
            .get('/api/solutions/'+solutionId+'/screens/')
            .set('Authorization', 'Bearer '+ token)
            .expect(200)
            .expect('Content-Type', /json/)
          
      });
  });

  describe('POST /api/solutions/:solutionId/screens/', function() {
    it('UnAuthorized User', async () => {
      await request(app)
          .post('/api/solutions/'+solutionId+'/screens/')
          .set('Authorization', 'Bearer '+ "token")
          .send({
            "name": "screen1",
            "solutionId":solutionId
          })
          .expect(401)
          .then(async (response) => {
            // Check the response
            expect(response.body.message).toBe("Unauthorized!");
    
          });
        
     });
    it('Screen is created', async () => {
      await request(app)
            .post('/api/solutions/'+solutionId+'/screens/')
            .set('Authorization', 'Bearer '+ token)
            .send({
              "name": "screen1",
              "solutionId":solutionId
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(async (response) => {
              // Check the response
              id = response.body.data.id
              name = response.body.data.name
              expect(response.body.message).toBe("Screen is created successfully!");
            });
          
      });
  
    });

    describe('GET /api/solutions/:solutionId/screens/:screenId', function() {
      it('responds with json and Status OK', async () => {
        await request(app)
              .get('/api/solutions/'+solutionId+'/screens/'+id)
              .set('Authorization', 'Bearer '+ token)
              .expect(200)
              .expect('Content-Type', /json/)
              .then( response => {
                // Check the response
                expect(response.body.id).toBe(id);
                expect(response.body.name).toBe(name);
        
              });
            
        });

        it('Screen Id is not exist', async () => {
          
          await request(app)
                .get('/api/solutions/'+solutionId+'/screens/'+1)
                .set('Authorization', 'Bearer '+ token)
                .expect(404)
                .expect('Content-Type', /json/)
                .then( response => {
                  // Check the response
                  expect(response.body.message).toBe("screen not found with id 1");
          
                });
              
          });
        
    });

    describe('PUT /api/solutions/:solutionId/screens/:screenId', function() {
      it('responds with json and Status OK', async () => {
        await request(app)
              .put('/api/solutions/'+solutionId+'/screens/'+id)
              .set('Authorization', 'Bearer '+ token)
              .send({
                name: "screen1"
              })
              .expect(200)
              .expect('Content-Type', /json/)
              .then( response => {
                // Check the response
                expect(response.body.message).toBe("Screen is updated successfully!");
        
        
              });
            
        });

        it('Screen Id is not exist', async () => {
          
          await request(app)
                .put('/api/solutions/'+solutionId+'/screens/'+1)
                .set('Authorization', 'Bearer '+ token)
                .send({
                  "name": "solution1"
                })
                .expect(400)
                .expect('Content-Type', /json/)
                .then( response => {
                  // Check the response
                  expect(response.body.message).toBe("Failed! screen not found with id!");
          
                });
              
          });
        
    });

    describe('DELETE /api/solutions/:solutionId/screens/:screenId', function() {
  
          it('Screen is deleted', async () => {
            await request(app)
                  .delete('/api/solutions/'+solutionId+'/screens/'+id)
                  .set('Authorization', 'Bearer '+ token)
                  .expect(200)
                  .expect('Content-Type', /json/)
                  .then( response => {
                    // Check the response
                    expect(response.body.message).toBe("Screen is deleted successfully!");
            
            
                  });
                
            });
        
    });