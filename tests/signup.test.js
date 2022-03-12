const request = require('supertest')
const assert = require('assert');
const app = require('../index.js')

describe('GET /user', function() {
    it('responds with json', async () => {
    const screenId = 3
    await request(app)
          .get('/api/screens/')
          .expect(200).then(response => {
            console.log(response);
            
          });
    });
  });