window.onload = function() {
    printScrambles(1);
    
    var startAt;
    var holdStartAt;
    var held = false;
    var active = false;
    var spaceBar = 32;
    
    window.onkeydown = function(ctx) {
        if(active) {
            document.getElementById("indicator").innerHTML = "Timer Stopped!";
            active = false;
            printScrambles(1);
        }
        else if(!held && ctx.keyCode === spaceBar) {
            holdStartAt = Date.now();
            held = true;
            document.getElementById("indicator").innerHTML = "Keep Holding!";
            setTimeout(function() {
                if(held) document.getElementById("indicator").innerHTML = "Release to Begin!";
            }, 500);
        }
    }
    
    window.onkeyup = function(ctx) {
        if(held) {
            var holdDelta = Date.now() - holdStartAt;
            if(holdDelta >= 500) {
                document.getElementById("indicator").innerHTML = "Timer Started!";
                active = true;
                startAt = Date.now();
                var x = setInterval(function() {
                    
                    var min = document.getElementById("min");
                    var sec = document.getElementById("sec");
                    var ms = document.getElementById("ms");

                    var delta = Date.now() - startAt;
                    
                    var minSince = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
                    var secSince = Math.floor((delta % (1000 * 60)) / 1000);
                    var msSince = (delta % 1000 - delta % 10) / 10;

                    if(minSince < 10) min.innerHTML = "0" + minSince;
                    else min.innerHTML = minSince;

                    if(secSince < 10) sec.innerHTML = "0" + secSince;
                    else sec.innerHTML = secSince;

                    if(msSince < 10) ms.innerHTML = "0" + msSince;
                    else ms.innerHTML = msSince;

                    if(!active) clearInterval(x);

                }, 10);
            }
            else {
                document.getElementById("indicator").innerHTML = "Not Held Enough";
            }
            held = false;
        }
    }
}
