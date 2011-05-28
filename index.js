var Planet, Planet2, Planet3, Planet4, PlanetType, Saturn, SaturnMoon, func, funcs, getTime, loops, name, newTime, rotate, rotate2, rotatePoly, time;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Planet = (function() {
  function Planet() {
    this.rotations = 0;
  }
  Planet.prototype.rotate = function() {
    return this.rotations++;
  };
  return Planet;
})();
Saturn = (function() {
  __extends(Saturn, Planet);
  function Saturn() {
    Saturn.__super__.constructor.apply(this, arguments);
  }
  return Saturn;
})();
SaturnMoon = (function() {
  __extends(SaturnMoon, Saturn);
  function SaturnMoon() {
    SaturnMoon.__super__.constructor.apply(this, arguments);
  }
  return SaturnMoon;
})();
Planet2 = function() {
  var rotate, self;
  self = {
    rotations: 0
  };
  rotate = function() {
    return self.rotations++;
  };
  self.rotate = rotate;
  return self;
};
Planet3 = function() {
  var self;
  self = {
    rotations: 0
  };
  self.rotate = function() {
    return self.rotations++;
  };
  return self;
};
Planet4 = function() {
  var createRotate, self;
  self = {
    rotations: 0
  };
  createRotate = function() {
    return self.rotate = function() {
      return self.rotations++;
    };
  };
  createRotate();
  return self;
};
rotate = function(planet) {
  return planet.rotations++;
};
rotate2 = function(single) {
  return single++;
};
rotatePoly = function(planet) {
  return planet._type.rotate(planet);
};
PlanetType = {
  rotate: function(planet) {
    return planet.rotations++;
  }
};
getTime = function() {
  return (new Date()).getTime();
};
loops = 1e8;
funcs = {};
funcs['double proto'] = function() {
  var i, planet;
  planet = new Saturn();
  for (i = 0; 0 <= loops ? i <= loops : i >= loops; 0 <= loops ? i++ : i--) {
    planet.rotate();
  }
  return true;
};
funcs['single proto'] = function() {
  var i, planet;
  planet = new Planet();
  for (i = 0; 0 <= loops ? i <= loops : i >= loops; 0 <= loops ? i++ : i--) {
    planet.rotate();
  }
  return true;
};
funcs['triple proto'] = function() {
  var i, planet;
  planet = new SaturnMoon();
  for (i = 0; 0 <= loops ? i <= loops : i >= loops; 0 <= loops ? i++ : i--) {
    planet.rotate();
  }
  return true;
};
funcs['fake polymorphic'] = function() {
  var i, planet;
  planet = {
    rotations: 0,
    _type: PlanetType
  };
  for (i = 0; 0 <= loops ? i <= loops : i >= loops; 0 <= loops ? i++ : i--) {
    rotatePoly(planet);
  }
  return true;
};
funcs['inlined single'] = function() {
  var i, planet_rotations;
  planet_rotations = 0;
  for (i = 0; 0 <= loops ? i <= loops : i >= loops; 0 <= loops ? i++ : i--) {
    planet_rotations++;
  }
  return true;
};
funcs['no hash lookup'] = function() {
  var i, planet_rotations;
  planet_rotations = 0;
  for (i = 0; 0 <= loops ? i <= loops : i >= loops; 0 <= loops ? i++ : i--) {
    rotate2(planet_rotations);
  }
  return true;
};
funcs['simple function'] = function() {
  var i, planet;
  planet = {
    rotations: 0
  };
  for (i = 0; 0 <= loops ? i <= loops : i >= loops; 0 <= loops ? i++ : i--) {
    rotate(planet);
  }
  return true;
};
funcs['closure method'] = function() {
  var i, planet;
  planet = Planet2();
  for (i = 0; 0 <= loops ? i <= loops : i >= loops; 0 <= loops ? i++ : i--) {
    planet.rotate();
  }
  return true;
};
funcs['closure method 2'] = function() {
  var i, planet;
  planet = Planet3();
  for (i = 0; 0 <= loops ? i <= loops : i >= loops; 0 <= loops ? i++ : i--) {
    planet.rotate();
  }
  return true;
};
funcs['closure method 3'] = function() {
  var i, planet;
  planet = Planet4();
  for (i = 0; 0 <= loops ? i <= loops : i >= loops; 0 <= loops ? i++ : i--) {
    planet.rotate();
  }
  return true;
};
funcs['method directly on object'] = function() {
  var i, planet;
  planet = {
    rotations: 0,
    rotate: function() {
      return this.rotations++;
    }
  };
  for (i = 0; 0 <= loops ? i <= loops : i >= loops; 0 <= loops ? i++ : i--) {
    planet.rotate();
  }
  return true;
};
for (name in funcs) {
  func = funcs[name];
  console.log(name);
  time = getTime();
  func();
  newTime = getTime();
  console.log(newTime - time);
}