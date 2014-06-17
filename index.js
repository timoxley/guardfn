"use strict"

module.exports = guardQueue

function guardQueue(fn, guardFn) {
  if (fn.__guardFns) {
    fn.__guardFns.push(guardFn)
    return fn
  }

  var fns = guard.__guardFns = guard.__guardFns || []

  fns.push(guardFn)

  function guard() {
    var args = arguments
    var ok = fns.every(function(test) {
      return test.apply(this, args)
    }, this)
    if (ok) return fn.apply(this, args)
  }
  return guard
}
