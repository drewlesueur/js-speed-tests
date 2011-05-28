#test = (name, test) ->




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

    
