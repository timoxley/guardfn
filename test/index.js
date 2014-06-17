"use strict"

var test = require('tape')
var guard = require('../')

test('guard can control calling', function(t) {
  t.plan(6)
  var fn = guard(function(a) {
    t.ok(a < 100, 'guard filtered result: ' + a)
    return a * 2
  }, function(a) {
    return a < 100
  })
  t.equal(fn(1), 2)
  t.equal(fn(10), 20)
  t.equal(fn(100), undefined)
  t.equal(fn(), undefined)
})

test('guard fns happen in order they are defined', function(t) {
  t.plan(8)
  var fn = guard(function A(a) {
    return a * 2
  }, function B(a) {
    called.push('first')
    return a < 10
  })

  fn = guard(fn, function C(a) {
    called.push('second')
    return a < 100
  })

  var called = []
  t.equal(fn(1), 2)
  t.deepEqual(called, ['first', 'second'])
  called = []
  t.equal(fn(10), undefined)
  t.deepEqual(called, ['first'])
  called = []
  t.equal(fn(100), undefined)
  t.deepEqual(called, ['first'])
  called = []
  t.equal(fn(), undefined)
  t.deepEqual(called, ['first'])
  called = []
})

test('guard can control calling', function(t) {
  t.plan(6)

  function fn(a) {
    t.ok(arguments.length)
    return a * 2
  }

  var lt100 = guard(fn, function(a) {
    return a < 100
  })
  var gt100 = guard(fn, function(a) {
    return a > 100
  })
  t.equal(lt100(50), 100)
  t.equal(gt100(50), undefined)
  t.equal(gt100(200), 400)
  t.equal(lt100(200), undefined)
})
