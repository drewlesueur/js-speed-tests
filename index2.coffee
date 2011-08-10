_ = require "underscore"
nimble = require "nimble"
drews = require "drews-mixins"

define "js-tests", () ->
  foo = (val) ->
    inc = () ->
      val = val + 1
      val
    {inc}

  Foo = (val) ->
    @val = val
  Foo.prototype.inc = () ->
    val = val + 1
    val

  loops = 2e6 

  closure1 = () ->
    objects = []
    for i in [0..loops]
      objects.push foo(i) 
      objects[i].inc()

  proto1 = () ->
    objects = []
    for i in [0..loops]
      objects.push new Foo(i)
      objects[i].inc()

  closure2 = () ->
    objects = []
    myFoo = foo(1) 
    for i in [0..loops]
      myFoo.inc()

  proto2 = () ->
    objects = []
    myFoo = new Foo(1)
    for i in [0..loops]
      myFoo.inc()

  tests = {closure1, proto1, closure2, proto2}
  run = () ->
    for name, test of tests 
      start = drews.time()
      test()
      end = drews.time()
      console.log "#{name}:#{end - start}"
    
    
     

      
     


  return {run}



