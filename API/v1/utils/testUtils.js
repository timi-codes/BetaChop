const TestUtility = {
  orderTimerTestResponse(res) {
    res.should.have.status(403);
    res.body.should.be.a('object');
    res.body.should.have
      .property('message')
      .eql(
        "Sorry, Order can't be placed now because we've closed for the day. (if you are testing you can change the time in orderTimermiddleware)",
      );
  },
};

export default TestUtility;
