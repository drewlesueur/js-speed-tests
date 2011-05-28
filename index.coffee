log = (x) -> console.log x
{eachSeries, each, keys, each, wait, interval, time} = _
tests = {}
test = (name, func) ->
  tests[name] = func

class Planet
  constructor: ->
    @rotations = 0
  rotate: () ->
    @rotations++

class Saturn extends Planet
class SaturnMoon extends Saturn
  

Planet2 = () ->
  self =
    rotations: 0
  rotate = () ->
    self.rotations++
  self.rotate = rotate
  return self

Planet3 = () ->
  self =
    rotations: 0
  self.rotate = () ->
    self.rotations++
  return self

Planet4 = () ->
  self = rotations: 0
  createRotate = () ->
    self.rotate = () ->
      self.rotations++
  createRotate()
  return self
  
rotate = (planet) ->
  planet.rotations++

rotate2 = (single) ->
  single++

rotatePoly = (planet) ->
  planet._type.rotate planet

PlanetType = 
  rotate: (planet) ->
    planet.rotations++
period = 1000 # 1 second  
loops = 6e7
results = {}
run = () ->
  eachSeries tests, (func, key, cb=->) ->
    count = 0
    start = time()
    for i in [0..loops]
      func()
    end = time()
    results[key] =  end - start
    log "#{key}: #{end - start}"
    cb()
  , () ->


do ->
  p = new SaturnMoon
  test "polymorphic 3", () ->
    p.rotate()

do ->
  class MyPlanet
    constructor: ->
      @rotations = 0
    rotate: () ->
      @rotations++
  p = new MyPlanet
  test "local polymorphic", () ->
    p.rotate()
    
    
do ->
  p = new Planet
  test "polymorphic", () ->
    p.rotate()

do ->
  p = new Saturn
  test "polymorphic 2", () ->
    p.rotate()

do ->
  rotate = (x) ->
    x.rotations++
  x = rotations: 0
  test "local func", ->
    rotate x


  
rotateG = (x) ->
  x.rotations++
   
do ->
  x = rotations: 0
  test "global func", ->
    rotateG x

do ->
  planet = rotations: 0
  start = time()
  for i in [0..loops]
    rotateG planet
  end = time()
  log "global func 2: #{end - start}"
do ->
  planet = Planet3()
  start = time()
  for i in [0..loops]
    rotateG planet
  end = time()
  log "factory global other: #{end - start}"
planet = Planet3()
start = time()
for i in [0..loops]
  rotateG planet
end = time()
log "factory global other super global: #{end - start}"
do ->
  planet = Planet4()
  start = time()
  for i in [0..loops]
    rotateG planet
  end = time()
  log "factory global other2: #{end - start}"

do ->
  rotate = (x) ->
    x.rotations++
  planet = rotations: 0
  start = time()
  for i in [0..loops]
    rotate planet
  end = time()
  log "local func 2: #{end - start}"
planet = rotations: 0
start = time()
for i in [0..loops]
  rotateG planet
end = time()
log "local func 2 super global: #{end - start}"

do ->
  factory = () ->
    x = {}
    x.rotations = 0
    x.rotate = () ->
     x.rotations++ 
    x
  p = factory() 
  test "factory literal", () -> p.rotate()
    
do ->
  p = Planet3() #factory
  test "factory global 2", () -> p.rotate()
    
do ->
  rotate = (x) ->
    x.rotations++
  do ->
    do ->
      y = 100
      anotherFunc = (x) ->
      do ->
        x = rotations: 0
        test "closured func", ->
          rotate x



a = 0
test "global", () ->
  a++  

do ->
  x = 0
  test "nested1", -> x++

do () ->
  x = 0
  do () ->
    test "nested variable closure", () ->
      x++

do ->
  x = 0
  do ->
    do ->
      do ->
        x = 100
        do ->
          do ->
            test "nested variable closure 2", () ->
              x++
             



run()

###



getTime = () ->
  (new Date()).getTime()
loops = 1e8


#whichever proto gets called first wins!

funcs = {}


funcs['double proto'] = () ->
  planet = new Saturn()
  for i in [0..loops]
    planet.rotate()
  return true

funcs['single proto'] = () ->
  planet = new Planet()
  for i in [0..loops]
    planet.rotate()
  return true

funcs['triple proto'] = () ->
  planet = new SaturnMoon()
  for i in [0..loops]
    planet.rotate()
  return true


funcs['fake polymorphic'] = () ->
  planet =
    rotations: 0
    _type: PlanetType
  for i in [0..loops]
    rotatePoly planet
  return true

funcs['inlined single'] = () ->
  planet_rotations = 0
  for i in [0..loops]
    planet_rotations++
  return true

funcs['no hash lookup'] = () ->
  planet_rotations = 0
  for i in [0..loops]
    rotate2 planet_rotations
  return true
  
funcs['simple function'] = () ->
  planet = rotations: 0
  for i in [0..loops]
    rotate planet
  return true
    
funcs['closure method'] = () ->
  planet = Planet2()
  for i in [0..loops]
    planet.rotate()
  return true
  
funcs['closure method 2'] = () ->
  planet = Planet3()
  for i in [0..loops]
    planet.rotate()
  return true
  
funcs['closure method 3'] = () ->
  planet = Planet4()
  for i in [0..loops]
    planet.rotate()
  return true

funcs['method directly on object'] = () ->
  planet =
    rotations: 0
    rotate: () -> @rotations++
  for i in [0..loops]
    planet.rotate()
  return true
  

    
for name, func of funcs
  console.log name
  time = getTime()
  func()
  newTime = getTime()
  console.log newTime - time

###  
