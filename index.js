var Planet, Planet2, Planet3, Planet4, PlanetType, Saturn, SaturnMoon, a, each, eachSeries, end, i, interval, keys, log, loops, period, planet, results, rotate, rotate2, rotateG, rotatePoly, run, start, test, tests, time, wait;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
log = function(x) {
  return console.log(x);
};
eachSeries = _.eachSeries, each = _.each, keys = _.keys, each = _.each, wait = _.wait, interval = _.interval, time = _.time;
tests = {};
test = function(name, func) {
  return tests[name] = func;
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
period = 1000;
loops = 6e7;
results = {};
run = function() {
  return eachSeries(tests, function(func, key, cb) {
    var count, end, i, start;
    if (cb == null) {
      cb = function() {};
    }
    count = 0;
    start = time();
    for (i = 0; 0 <= loops ? i <= loops : i >= loops; 0 <= loops ? i++ : i--) {
      func();
    }
    end = time();
    results[key] = end - start;
    log("" + key + ": " + (end - start));
    return cb();
  }, function() {});
};
(function() {
  var p;
  p = new SaturnMoon;
  return test("polymorphic 3", function() {
    return p.rotate();
  });
})();
(function() {
  var MyPlanet, p;
  MyPlanet = (function() {
    function MyPlanet() {
      this.rotations = 0;
    }
    MyPlanet.prototype.rotate = function() {
      return this.rotations++;
    };
    return MyPlanet;
  })();
  p = new MyPlanet;
  return test("local polymorphic", function() {
    return p.rotate();
  });
})();
(function() {
  var p;
  p = new Planet;
  return test("polymorphic", function() {
    return p.rotate();
  });
})();
(function() {
  var p;
  p = new Saturn;
  return test("polymorphic 2", function() {
    return p.rotate();
  });
})();
(function() {
  var x;
  rotate = function(x) {
    return x.rotations++;
  };
  x = {
    rotations: 0
  };
  return test("local func", function() {
    return rotate(x);
  });
})();
rotateG = function(x) {
  return x.rotations++;
};
(function() {
  var x;
  x = {
    rotations: 0
  };
  return test("global func", function() {
    return rotateG(x);
  });
})();
(function() {
  var end, i, planet, start;
  planet = {
    rotations: 0
  };
  start = time();
  for (i = 0; 0 <= loops ? i <= loops : i >= loops; 0 <= loops ? i++ : i--) {
    rotateG(planet);
  }
  end = time();
  return log("global func 2: " + (end - start));
})();
(function() {
  var end, i, planet, start;
  planet = Planet3();
  start = time();
  for (i = 0; 0 <= loops ? i <= loops : i >= loops; 0 <= loops ? i++ : i--) {
    rotateG(planet);
  }
  end = time();
  return log("factory global other: " + (end - start));
})();
planet = Planet3();
start = time();
for (i = 0; 0 <= loops ? i <= loops : i >= loops; 0 <= loops ? i++ : i--) {
  rotateG(planet);
}
end = time();
log("factory global other super global: " + (end - start));
(function() {
  var i;
  planet = Planet4();
  start = time();
  for (i = 0; 0 <= loops ? i <= loops : i >= loops; 0 <= loops ? i++ : i--) {
    rotateG(planet);
  }
  end = time();
  return log("factory global other2: " + (end - start));
})();
(function() {
  var i;
  rotate = function(x) {
    return x.rotations++;
  };
  planet = {
    rotations: 0
  };
  start = time();
  for (i = 0; 0 <= loops ? i <= loops : i >= loops; 0 <= loops ? i++ : i--) {
    rotate(planet);
  }
  end = time();
  return log("local func 2: " + (end - start));
})();
planet = {
  rotations: 0
};
start = time();
for (i = 0; 0 <= loops ? i <= loops : i >= loops; 0 <= loops ? i++ : i--) {
  rotateG(planet);
}
end = time();
log("local func 2 super global: " + (end - start));
(function() {
  var factory, p;
  factory = function() {
    var x;
    x = {};
    x.rotations = 0;
    x.rotate = function() {
      return x.rotations++;
    };
    return x;
  };
  p = factory();
  return test("factory literal", function() {
    return p.rotate();
  });
})();
(function() {
  var p;
  p = Planet3();
  return test("factory global 2", function() {
    return p.rotate();
  });
})();
(function() {
  rotate = function(x) {
    return x.rotations++;
  };
  return (function() {
    return (function() {
      var anotherFunc, y;
      y = 100;
      anotherFunc = function(x) {};
      return (function() {
        var x;
        x = {
          rotations: 0
        };
        return test("closured func", function() {
          return rotate(x);
        });
      })();
    })();
  })();
})();
a = 0;
test("global", function() {
  return a++;
});
(function() {
  var x;
  x = 0;
  return test("nested1", function() {
    return x++;
  });
})();
(function() {
  var x;
  x = 0;
  return (function() {
    return test("nested variable closure", function() {
      return x++;
    });
  })();
})();
(function() {
  var x;
  x = 0;
  return (function() {
    return (function() {
      return (function() {
        x = 100;
        return (function() {
          return (function() {
            return test("nested variable closure 2", function() {
              return x++;
            });
          })();
        })();
      })();
    })();
  })();
})();
run();
/*



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

*/