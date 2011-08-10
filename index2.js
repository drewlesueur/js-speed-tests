(function() {
  var drews, nimble, _;
  _ = require("underscore");
  nimble = require("nimble");
  drews = require("drews-mixins");
  define("js-tests", function() {
    var Foo, closure1, closure2, foo, loops, proto1, proto2, run, tests;
    foo = function(val) {
      var inc;
      inc = function() {
        val = val + 1;
        return val;
      };
      return {
        inc: inc
      };
    };
    Foo = function(val) {
      return this.val = val;
    };
    Foo.prototype.inc = function() {
      var val;
      val = val + 1;
      return val;
    };
    loops = 2e6;
    closure1 = function() {
      var i, objects, _results;
      objects = [];
      _results = [];
      for (i = 0; 0 <= loops ? i <= loops : i >= loops; 0 <= loops ? i++ : i--) {
        objects.push(foo(i));
        _results.push(objects[i].inc());
      }
      return _results;
    };
    proto1 = function() {
      var i, objects, _results;
      objects = [];
      _results = [];
      for (i = 0; 0 <= loops ? i <= loops : i >= loops; 0 <= loops ? i++ : i--) {
        objects.push(new Foo(i));
        _results.push(objects[i].inc());
      }
      return _results;
    };
    closure2 = function() {
      var i, myFoo, objects, _results;
      objects = [];
      myFoo = foo(1);
      _results = [];
      for (i = 0; 0 <= loops ? i <= loops : i >= loops; 0 <= loops ? i++ : i--) {
        _results.push(myFoo.inc());
      }
      return _results;
    };
    proto2 = function() {
      var i, myFoo, objects, _results;
      objects = [];
      myFoo = new Foo(1);
      _results = [];
      for (i = 0; 0 <= loops ? i <= loops : i >= loops; 0 <= loops ? i++ : i--) {
        _results.push(myFoo.inc());
      }
      return _results;
    };
    tests = {
      closure1: closure1,
      proto1: proto1,
      closure2: closure2,
      proto2: proto2
    };
    run = function() {
      var end, name, start, test, _results;
      _results = [];
      for (name in tests) {
        test = tests[name];
        start = drews.time();
        test();
        end = drews.time();
        _results.push(console.log("" + name + ":" + (end - start)));
      }
      return _results;
    };
    return {
      run: run
    };
  });
}).call(this);
