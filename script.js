var clockElement = document.getElementById( "clock" );

function updateClock ( clock ) {
    clock.innerHTML = new Date().toLocaleTimeString();
}

setInterval(function () {
    updateClock( clockElement );
}, 1000);

(function () {

    var clockElement = document.getElementById( "clock" );
  
    function updateClock ( clock ) {
      clock.innerHTML = new Date().toLocaleTimeString();
      console.log('was mache ich hier')
    }
  
    setInterval(function () {
        updateClock( clockElement );
    }, 1000);
  
  }());