chai = require 'chai'
chai.should()

describe 'First test', ->
    task1 = task2 = null
    it 'one equals one :-)', ->
        a = 1
        a.should.equal 1
