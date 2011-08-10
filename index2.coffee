_ = require "underscore"
nimble = require "nimble"
drews = require "drews-mixins"

define "js-tests", () ->
      
  foo = (val) ->
    inc = () ->
      val = val + 1
      val
    setVal = (newVal) ->
      val = newVal 
    {inc, setVal}

  foo2 =
    inc: (self) ->
      self.val = self.val + 1
      self.val
    setVal: (self, newVal) ->
      self.val = newVal

  Foo = (val) ->
    @val = val
  Foo.prototype.inc = () ->
    @val = @val + 1
    @val
  Foo.prototype.setVal = (newVal) ->
    @val = newVal

  loops = 1e8

  closure1 = () ->
    for i in [0..loops]
      myFoo = foo(i) 
      myFoo.inc()
    false

  noPoly1 = () ->
    for i in [0..loops]
      myFoo = {val: i}
      foo2.inc myFoo
    false

  proto1 = () ->
    for i in [0..loops]
      myFoo = new Foo(i) 
      myFoo.inc()
    false

  closure2 = () ->
    myFoo = foo(1) 
    for i in [0..loops]
      myFoo.inc()
    false

  noPoly2 = () ->
    myFoo = {val: 1}
    for i in [0..loops]
      foo2.inc myFoo
    false

  proto2 = () ->
    myFoo = new Foo(1)
    for i in [0..loops]
      myFoo.inc()
    false

  closure3 = () ->
    myFoo = foo(1) 
    for i in [0..loops]
      myFoo.setVal i
    false

  noPoly3 = () ->
    myFoo = {val: 1}
    for i in [0..loops]
      foo2.setVal myFoo, i
    false

  proto3 = () ->
    myFoo = new Foo(1)
    for i in [0..loops]
      myFoo.setVal i
    false

  tests = {closure1, noPoly1, proto1, closure2, noPoly2, proto2, closure3,noPoly3, proto3}
  run = () ->
    for name, test of tests 
      start = drews.time()
      test()
      end = drews.time()
      console.log "#{name}:#{end - start}"
    
    
     

      
     


  return {run}



