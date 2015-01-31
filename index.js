var Cylon = require('cylon');

Cylon.robot({
  connections: {
    arduino: { adaptor: 'firmata', port: '/dev/tty.usbmodem1411' },
    joystick: { adaptor: 'joystick' }, 
  },

  devices: {
    controller: { driver: 'dualshock-3', connection: 'joystick' }, 
    led: { driver: 'led', pin: 13, connection: 'arduino'},
    pin3: { driver: 'direct-pin', pin: 3, connection: 'arduino'},
    pin4: { driver: 'direct-pin', pin: 4, connection: 'arduino'},
    pin5: { driver: 'direct-pin', pin: 5, connection: 'arduino'},
    pin6: { driver: 'direct-pin', pin: 6, connection: 'arduino'},
    pin7: { driver: 'direct-pin', pin: 7, connection: 'arduino'},
    pin8: { driver: 'direct-pin', pin: 8, connection: 'arduino'},
    pin9: { driver: 'direct-pin', pin: 9, connection: 'arduino'},
  },

  nat: function(value) {
    var that = this;
    console.log("HELLO", that.pin4.digitalWrite(value));
  },

  work: function(my) {
    var that = this;
    var value = 0;
    every((1).second(), function() {
      my.pin4.digitalWrite(value);
      my.pin5.digitalWrite(value);
      value = (value == 0) ? 1 : 0;
    });

    ["square", "circle", "x", "triangle", "left", "right", "up", "down"].forEach(function(button) {
      my.controller.on(button + ":press", function() {
        console.log("Button " + button + " pressed.");
         my.nat(value);
         value = (value == 0) ? 1 : 0;
      });
    });

  }
}).start();