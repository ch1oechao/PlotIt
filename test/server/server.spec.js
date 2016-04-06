process.env.NODE_ENV = 'test';

var chai = require('chai'),
    chaiHttp = require('chai-http');

var server = 'http://localhost:3000';
var should = chai.should();

chai.use(chaiHttp);

describe('<Unit Test Server: ', () => {

  it('should list ALL pics on /list GET', (done) => {
    chai.request(server)
        .get('/list')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
  });

  it('should get qiniu token on /uptoken POST', (done) => {
    chai.request(server)
        .post('/uptoken')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('Object');
          res.body.should.have.property('uptoken');
          done();
        });
  });

  it('should list a SINGLE pic on /image POST', (done) => {
    chai.request(server)
        .post('/image')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
  });

  // it('should save a SINGLE pic on /save POST', (done) => {
  //   chai.request(server)
  //       .post('/save')
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         done();
  //       });
  // });
  //
  // it('should update a SINGLE pic on /update POST', (done) => {
  //   chai.request(server)
  //       .post('/update')
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         done();
  //       });
  // });
  // it('should delete a SINGLE pic from db on /image/:id DELETE', (done) => {
  //   chai.request(server)
  //       .delete('/image/')
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         done();
  //       });
  // });
  // it('should delete a SINGLE pic from qiniu on /qiniu/:id DELETE', (done) => {
  //   chai.request(server)
  //       .delete('/qiniu/')
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         done();
  //       });
  // });
  // it('should download a SINGLE pic on /download POST', (done) => {
  //   chai.request(server)
  //       .post('/download')
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         done();
  //       });
  // });
});


