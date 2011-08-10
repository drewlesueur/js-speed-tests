(function() {
  var drews, nimble, _;
  _ = require("underscore");
  nimble = require("nimble");
  drews = require("drews-mixins");
  define("js-tests", function() {
    var Foo, closure1, closure2, closure3, foo, foo2, loops, noPoly1, noPoly2, noPoly3, proto1, proto2, proto3, run, tests;
    foo = function(val) {
      var inc, setVal;
      inc = function() {
        val = val + 1;
        return val;
      };
      setVal = function(newVal) {
        return val = newVal;
      };
      return {
        inc: inc,
        setVal: setVal
      };
    };
    foo2 = {
      inc: function(self) {
        self.val = self.val + 1;
        return self.val;
      },
      setVal: function(self, newVal) {
        return self.val = newVal;
      }
    };
    Foo = function(val) {
      return this.val = val;
    };
    Foo.prototype.inc = function() {
      this.val = this.val + 1;
      return this.val;
    };
    Foo.prototype.setVal = function(newVal) {
      return this.val = newVal;
    };
    loops = 1e8;
    closure1 = function() {
      var i, myFoo;
      for (i = 0; 0 <= loops ? i <= loops : i >= loops; 0 <= loops ? i++ : i--) {
        myFoo = foo(i);
        myFoo.inc();
      }
      return false;
    };
    noPoly1 = function() {
      var i, myFoo;
      for (i = 0; 0 <= loops ? i <= loops : i >= loops; 0 <= loops ? i++ : i--) {
        myFoo = {
          val: i
        };
        foo2.inc(myFoo);
      }
      return false;
    };
    proto1 = function() {
      var i, myFoo;
      for (i = 0; 0 <= loops ? i <= loops : i >= loops; 0 <= loops ? i++ : i--) {
        myFoo = new Foo(i);
        myFoo.inc();
      }
      return false;
    };
    closure2 = function() {
      var i, myFoo;
      myFoo = foo(1);
      for (i = 0; 0 <= loops ? i <= loops : i >= loops; 0 <= loops ? i++ : i--) {
        myFoo.inc();
      }
      return false;
    };
    noPoly2 = function() {
      var i, myFoo;
      myFoo = {
        val: 1
      };
      for (i = 0; 0 <= loops ? i <= loops : i >= loops; 0 <= loops ? i++ : i--) {
        foo2.inc(myFoo);
      }
      return false;
    };
    proto2 = function() {
      var i, myFoo;
      myFoo = new Foo(1);
      for (i = 0; 0 <= loops ? i <= loops : i >= loops; 0 <= loops ? i++ : i--) {
        myFoo.inc();
      }
      return false;
    };
    closure3 = function() {
      var i, myFoo;
      myFoo = foo(1);
      for (i = 0; 0 <= loops ? i <= loops : i >= loops; 0 <= loops ? i++ : i--) {
        myFoo.setVal(i);
      }
      return false;
    };
    noPoly3 = function() {
      var i, myFoo;
      myFoo = {
        val: 1
      };
      for (i = 0; 0 <= loops ? i <= loops : i >= loops; 0 <= loops ? i++ : i--) {
        foo2.setVal(myFoo, i);
      }
      return false;
    };
    proto3 = function() {
      var i, myFoo;
      myFoo = new Foo(1);
      for (i = 0; 0 <= loops ? i <= loops : i >= loops; 0 <= loops ? i++ : i--) {
        myFoo.setVal(i);
      }
      return false;
    };
    tests = {
      closure1: closure1,
      noPoly1: noPoly1,
      proto1: proto1,
      closure2: closure2,
      noPoly2: noPoly2,
      proto2: proto2,
      closure3: closure3,
      noPoly3: noPoly3,
      proto3: proto3
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
