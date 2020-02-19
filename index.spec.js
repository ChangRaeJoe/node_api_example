const should = require('should');
const request = require('supertest')
const app = require('./index')

describe('GET /users', ()=>{
    describe('성공', ()=>{
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
    
        it('최대 limit 갯수만큼 응답한다. ', (done)=>{
            request(app)
                .get('/users?limit=2')
                .end((err, res) =>{
                    if(err) throw err;
                    res.body.should.have.lengthOf(2)
                    done()
                })
        })
    })
    describe('실패', ()=>{
        it('limit이 숫자가 아니면 400으로 응답한다.', (done)=>{
            request(app)
                .get('/users?limit=two')
                .expect(400)
                .end(done)
        })
    })
    
})

describe('GET /users/:id', ()=>{
    describe('성공', ()=>{
        it('유저 객체를 반환한다.', done =>{
            request(app)
                .get('/users/1')
                .end((err, res)=>{
                    res.body.should.have.property('id', 1)
                    done()
                })
        })
    })
    describe('실패', ()=>{
        it('id가 숫자가 아니라면 400에러로 응답한다.', done=>{
            request(app)
                .get('/users/hello')
                .expect(400)
                .end(done)
        })
        it('id가 없을 경우에 404로 응답한다.', done=>{
            request(app)
                .get('/users/1000')
                .expect(404)
                .end(done)
        })
    })
})

describe('DELETE /users/:id', ()=>{
    describe('성공', ()=>{
        it('204로 응답한다.', done=>{
            request(app)
                .delete('/users/1')
                .expect(204)
                .end(done)
        })
    })
    describe('실패', ()=>{
        it('id가 숫자가 아니면 400에러로 응답한다.', done=>{
            request(app)
                .delete('/users/deleteHello')
                .expect(400)
                .end(done)
        })
        it('해당되는 아이디가 없을 경우, 404에러로 응답한다.', done=>{
            request(app)
                .delete('/users/1000')
                .expect(404)
                .end(done)
        })
    })
    
})

describe('POST /users', () => {
    describe('성공', () => {
        it('201코드를 반환한다.', done => {
            request(app)
                .post('/users')
                .send({name: 'Zeta'})
                .expect(201)
                .end(done)
        })
        it('생성된 유저 객체를 반환한다.', done => {
            request(app)
                .post('/users')
                .send({name: 'Maga'})
                .end((err, res) => {
                    res.body.should.be.instanceof(Object)
                    res.body.should.have.property("name", "Maga")
                    done()
                })
        })
    })

    describe('실패', () => {
        it('name 파라미터 없으면 400 응답한다.', done => {
            request(app)
                .post('/users')
                .send({})
                .expect(400)
                .end(done)
        })
        it('name이 중복되면 409를 반환한다.', done => {
            request(app)
                .post('/users')
                .send({name: 'Beta'})
                .expect(409)
                .end(done)
        })

    })
    
})


describe('PUT /users', () => {
    describe('성공', () => {
        it('200코드를 반환한다.', done => {
            request(app)
                .put('/users')
                .send({id: 2, name: 'Tera'})
                .expect(200)
                .end(done)
        })
        it('수정된 유저 객체를 반환한다.', done => {
            request(app)
                .put('/users')
                .send({id: 2, name: 'Giga'})
                .end((err, res) => {
                    res.body.should.be.instanceOf(Object)
                    res.body.should.have.properties('id', 'name')
                    done()
                })
        })
    })

    describe('실패', () => {
        it('해당되는 id가 없을 경우, 404에러 응답한다.', done => {
            request(app)
                .put('/users')
                .send({id:4000, name:"test"})
                .expect(404)
                .end(done)
        })
        it('id 파라미터가 없을 경우, 400에러 응답한다.', done => {
            request(app)
                .put('/users')
                .send({name: 'Test'})
                .expect(400)
                .end(done)
        })

    })
    
})