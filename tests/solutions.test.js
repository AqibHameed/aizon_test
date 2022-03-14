const request = require('supertest')
const app = require('../index.js');
const db  = require('../app/models/index.js');
const Solution = db.solution;

var token = null;
var id = null;
var userId = null;
var name =""
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
      try{
          await Solution.destroy({
            where: {name: "solution1"}
          })
      }
      catch (e) {
        console.log(e.error)
      }    
          
  })

  describe('GET /api/solutions/', function() {
      it('responds with json and Status OK', async () => {
        await request(app)
              .get('/api/solutions/')
              .set('Authorization', 'Bearer '+ token)
              .expect(200)
              .expect('Content-Type', /json/)
            
        });
    });

describe('POST /api/solutions/', function() {
  it('UnAuthorized User', async () => {
    await request(app)
        .post('/api/solutions/')
        .set('Authorization', 'Bearer '+ "token")
        .send({
          "name": "solution1"
        })
        .expect(401)
        .then(async (response) => {
          // Check the response
          expect(response.body.message).toBe("Unauthorized!");
  
        });
      
  });
  it('Solution is created', async () => {
    await request(app)
          .post('/api/solutions/')
          .set('Authorization', 'Bearer '+ token)
          .send({
            "name": "solution1"
          })
          .expect(200)
          .expect('Content-Type', /json/)
          .then(async (response) => {
            // Check the response
            id = response.body.data.id
            name = response.body.data.name
            expect(response.body.message).toBe("Solution was created successfully!");
          });
        
    });

    it('Solution is already created', async () => {
          await request(app)
          .post('/api/solutions/')
          .set('Authorization', 'Bearer '+ token)
          .send({
            "name": "solution1"
          })
          .expect(500)
          .then(async (response) => {
            // Check the response
            expect(response.body.message).toBe("Validation error");
    
          });
        
    });

    it('Solution validation error null', async () => {
        await request(app)
            .post('/api/solutions/')
            .set('Authorization', 'Bearer '+ token)
            .send({
              "name": null
            })
            .expect(500)
            .then(async (response) => {
              // Check the response
              expect(response.body.message).toBe("notNull Violation: solutions.name cannot be null");
      
            });
          
      });

  });

describe('GET /api/solutions/:solutionId', function() {
  it('responds with json and Status OK', async () => {

    await request(app)
          .get('/api/solutions/'+id)
          .set('Authorization', 'Bearer '+ token)
          .expect(200)
          .expect('Content-Type', /json/)
          .then( response => {
            // Check the response
            expect(response.body.id).toBe(id);
            expect(response.body.name).toBe(name);
            expect(response.body.userId).toBe(userId);
    
          });
        
    });

    it('Solution Id is not exist', async () => {
      
      await request(app)
            .get('/api/solutions/'+1)
            .set('Authorization', 'Bearer '+ token)
            .expect(404)
            .expect('Content-Type', /json/)
            .then( response => {
              // Check the response
              expect(response.body.message).toBe("solution not found with id undefined");
      
            });
          
      });
    
});

describe('PUT /api/solutions/:solutionId', function() {
  it('responds with json and Status OK', async () => {
    await request(app)
          .put('/api/solutions/'+id)
          .set('Authorization', 'Bearer '+ token)
          .send({
            name: "solution1"
          })
          .expect(200)
          .expect('Content-Type', /json/)
          .then( response => {
            // Check the response
            expect(response.body.message).toBe("Solution was updated successfully!");
    
    
          });
        
    });

    it('Solution Id is not exist', async () => {
      
      await request(app)
            .put('/api/solutions/'+1)
            .set('Authorization', 'Bearer '+ token)
            .send({
              "name": "solution3"
            })
            .expect(400)
            .expect('Content-Type', /json/)
            .then( response => {
              // Check the response
              expect(response.body.message).toBe("Failed! soultion not found with id!");
      
            });
          
      });

      it('Solution name is empty', async () => {
        await request(app)
              .put('/api/solutions/'+id)
              .set('Authorization', 'Bearer '+ token)
              .send({
                name: ""
              })
              .expect(400)
              .expect('Content-Type', /json/)
              .then( response => {
                // Check the response
                expect(response.body.message).toBe("Solution name can not be empty");
        
        
              });
            
        });
    
});

describe('DELETE /api/solutions/:solutionId', function() {
  
    it('Solution Id is not exist', async () => {
      
      await request(app)
            .delete('/api/solutions/'+1)
            .set('Authorization', 'Bearer '+ token)
            .expect(400)
            .expect('Content-Type', /json/)
            .then( response => {
              // Check the response
              expect(response.body.message).toBe("Failed! soultion not found with id!");
      
            });
          
      });

      it('Solution is delted', async () => {
        await request(app)
              .delete('/api/solutions/'+id)
              .set('Authorization', 'Bearer '+ token)
              .expect(200)
              .expect('Content-Type', /json/)
              .then( response => {
                // Check the response
                expect(response.body.message).toBe("Solution is deleted successfully!");
        
        
              });
            
        });
    
});
