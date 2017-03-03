$(function() {
 var inputSeconds = $("#sessionLength").html() * 60;
  
  var status="stopped";
  
  var currentActivity="session";
  //var inputSeconds=60;

  var breakLength = $("#breakLength").html() * 60;
  var firstSeconds;
  
  var t;

  function sessionWatch() {
    
   
    
    currentActivity="session";
    
   $("#activityType").html("Session").css("color","white");

    var currentSecond = (new Date()).getTime();

    inputSeconds = inputSeconds - (Math.floor((currentSecond - firstSeconds)/1000));
    //console.log("inputSeconds"+inputSeconds+"current"+currentSecond+"first"+firstSeconds);
    if (inputSeconds >= 0) {

      var m = checkTime(Math.floor(inputSeconds / 60));

      var s = checkTime(Math.floor(inputSeconds % 60));

      $("#timer").html(m + ":" + s);
      firstSeconds = currentSecond;

      t = setTimeout(sessionWatch, 1000);

    } else {

      
      $("#timer").html("00:00");
      inputSeconds = $('#sessionLength').html() * 60;

      firstSeconds = (new Date()).getTime();

      breakWatch();

    }

  }
  
  function breakWatch(){
    
    currentActivity="break";
     
    $("#activityType").html("Break").css("color","red");
    
    
    var currentSecond = (new Date()).getTime();

    breakLength = breakLength - (Math.floor((currentSecond - firstSeconds)/1000));
    //console.log("inputSeconds"+inputSeconds+"current"+currentSecond+"first"+firstSeconds);
    if (breakLength >= 0) {

      var m = checkTime(Math.floor(breakLength/ 60));

      var s = checkTime(Math.floor(breakLength % 60));

      $("#timer").html(m + ":" + s);
      firstSeconds = currentSecond;

      t = setTimeout(breakWatch, 1000);

    } else {

      
      $("#timer").html("00:00");
      breakLength = $('#breakLength').html() * 60;

      firstSeconds = (new Date()).getTime();

      sessionWatch();

    }
    
    
    
  }

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i
    }; // add zero in front of numbers < 10
    return i;
  }

  $("#btn").click(function() {

    
    
    if(status==="stopped"){
      firstSeconds = (new Date()).getTime();
      status="running";
      if(currentActivity==="session"){
       sessionWatch();
    
    }else{
      
      breakWatch();
      
    }
    
      
    }else{
      
      clearTimeout(t);
      status="stopped";
      
    }

  })

  $("#sessionDecrement").click(function() {

    var value = parseInt($("#sessionLength").html());

    if (value > 1) {

      value = value - 1;
      inputSeconds = value * 60;
      $("#sessionLength").html(value);
      $("#timer").html(value);
    }

  })

  $("#sessionIncrement").click(function() {

    var value = parseInt($("#sessionLength").html());

    value = value + 1;
    inputSeconds = value * 60;
    $("#sessionLength").html(value);

    $("#timer").html(value);

  })

  $("#breakIncrement").click(function() {

    var value = parseInt($("#breakLength").html());

    value = value + 1;
    breakLength = value * 60;
    $("#breakLength").html(value);

  })

  $("#breakDecrement").click(function() {

    var value = parseInt($("#breakLength").html());

    if (value > 1) {

      value = value - 1;
      breakLength = value * 60;
      $("#breakLength").html(value);
    }

  })

})