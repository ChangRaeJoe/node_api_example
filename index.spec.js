const should = require('should');
const request = require('supertest')
const app = require('./index')

describe('GET /users', ()=>{
    it('배열을 반환한다', (done)=>{
        // assert.equal(1,1)
        // (1).should.equal(2)
        request(app)
            .get('/users')
            .end((err, res) =>{
                if(err) throw err;
                res.body.should.be.instanceof(Array).and.have.not.lengthOf(0)
                res.body.forEach((user)=>{
                    user.should.have.property('name')
                })
                done()
            })
    })
})