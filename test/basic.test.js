(function() {
  var chai;

  chai = require('chai');

  chai.should();

  describe('First test', function() {
    var task1, task2;
    task1 = task2 = null;
    return it('one equals one :-)', function() {
      var a;
      a = 1;
      return a.should.equal(1);
    });
  });

}).call(this);
