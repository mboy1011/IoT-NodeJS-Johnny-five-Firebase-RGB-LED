$(document).ready(function() {
  var db = new Firebase("https://colors-45ade.firebaseio.com/colors");
  db.child("blue").once('value').then(function(snapshot) {
  	var value = (snapshot.val());
  	$("#bulbred").val(value);
  	chStat('blue',value);
  });
  db.child("green").once('value').then(function(snapshot) {
  	var value = (snapshot.val());
  	$("#bulbblue").val(value);
  	chStat('green',value);
  });
  db.child("red").once('value').then(function(snapshot) {
  	var value = (snapshot.val());
  	$("#bulbred").val(value);
  	chStat('red',value);
  });
  function chStat(color,value) {
  	if(value==1){
  		$("#bulb"+color).addClass(color+'-text');
  		$("#"+color).prop('checked',true);
  		// console.log(color+value);
  	}else{
  		$("#bulb"+color).removeClass(color+'-text');
  		$("#"+color).prop('checked',false);
  		// console.log(color+value);
  	}
  }
  $("#red,#blue,#green").click(function(){
  	var t = $(this).prop('checked');
  	if(t==true){
  		if(this.id=='green'){
  			$("#bulb"+this.id).addClass('green-text');
  			db.child("green").set(1);
  			Materialize.toast('Green is turned ON',1000,'rounded');
  		}else if(this.id=='blue'){
  			$("#bulb"+this.id).addClass('blue-text');
  			db.child("blue").set(1);
  			Materialize.toast('Blue is turned ON',1000,'rounded');
  		}else{
  			$("#bulb"+this.id).addClass('red-text');
  			db.child("red").set(1);
  			Materialize.toast('Red is turned ON',1000,'rounded');
  		}  		
  	}else{
  		if(this.id=='green'){
  			$("#bulb"+this.id).removeClass('green-text');
  			db.child("green").set(0);
  			Materialize.toast('Green is turned OFF',1000,'rounded');
  		}else if(this.id=='blue'){
  			$("#bulb"+this.id).removeClass('blue-text');
  			db.child("blue").set(0);
  			Materialize.toast('Blue is turned OFF',1000,'rounded');
  		}else{
  			$("#bulb"+this.id).removeClass('red-text');
  			db.child("red").set(0);
  			Materialize.toast('Red is turned OFF',1000,'rounded');
  		} 
  	}
  });
});