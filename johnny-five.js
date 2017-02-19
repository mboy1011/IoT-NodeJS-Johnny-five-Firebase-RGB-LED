var five = require('johnny-five'); //NodeJS Module Required for Johnny-Five.
var firebase = require('firebase'); //NodeJS Module Required for Firebase.
var board = new five.Board();
/*Initialize Firebase*/
var config = {
	 databaseURL: "https://colors-45ade.firebaseio.com/" //Link to my firebase account.
};
var arduino = firebase.initializeApp(config);
/*//*/
var r,g,b; //Red, Green, Blue colors of led light.
var rState = 0, gState = 0, bState = 0;
/*Create Database on Firebase*/
var db = firebase.database().ref().child('colors');
var blue = db.child('blue');
var green = db.child('green');
var red = db.child('red');
/*//*/
/*Reset Colors Database into default value.*/
arduino.database().ref('colors').set({
	'blue'  : bState,
	'green' : gState,
	'red': rState
});
/*Initialize LEDs in Johnny-Five*/
board.on("ready", function () {
    r = new five.Led(5);
    b = new five.Led(6);
    g = new five.Led(7);
/*Reset LED State to Off*/
    r.stop().off();
    b.stop().off();
    g.stop().off();
/*Register firebase event*/
    listenEvent();
});
var listenEvent = function(){
	blue.on('value', function (snapshot) {
        changeLed(b,snapshot.val(),'blue');
    });
    green.on('value', function (snapshot) {
        changeLed(g,snapshot.val(),'green');
    });
    red.on('value', function (snapshot) {
        changeLed(r,snapshot.val(),'red');
    });
};
/*Change LED state*/
//tag is the color of the led.
//value is a state of color either ON or OFF.
//led is what led number is.
var changeLed = function(led, value, tag){
    switch (value){
        case 0:
            led.stop().off();
            console.log(tag + " off");
            break;
        default :
            led.on();
            console.log(tag + " on");
            break;
    }
};
