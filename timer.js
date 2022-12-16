window.onload = function() {
    printScrambles(1);
    
    var startAt;
    var holdStartAt;
    var held = false;
    var active = false;
    var spaceBar = 32;

    window.onkeydown = function(ctx) {
        if(active) {
            updateTimes([sec.innerHTML, ms.innerHTML]);
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
                    
                    var sec = document.getElementById("sec");
                    var ms = document.getElementById("ms");

                    var delta = Date.now() - startAt;
                    
                    var secSince = Math.floor((delta % (1000 * 60)) / 1000);
                    var msSince = (delta % 1000 - delta % 10) / 10;

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

var prevTimes = [];
var displayTimes = [];
    
var solveCnt = 0;

function updateTimes(time) {
    
    prevTimes.push(time);
    
    solveCnt++;
    
    var solveTime = (parseInt(time[0]) + (parseInt(time[1]) + 1) / 100);
    
    if(Math.floor(solveTime * 10) == solveTime * 10) {
        solveTime += "0";
    }
    
    var scramble = document.getElementById("scramble").innerHTML;
    displayTimes.push("Solve " + (solveCnt) + ": " + solveTime + " Scramble: " + scramble + "<br>");

    document.getElementById("prevTimes").innerHTML += displayTimes[solveCnt - 1];
    
    if(solveCnt >= 3) {
        var recent3 = prevTimes.slice(solveCnt - 3, solveCnt);
        
        var totSecs3 = 0;
        
        for(let i = 0; i < 3; i++) {
            totSecs3 += parseInt(recent3[i][0]) + (parseInt(recent3[i][1]) + 1) / 100;
        }
        
        totSecs3 /= 3;
        
        var mo3 = Math.round(totSecs3 * 100) / 100;
        
        if(Math.floor(mo3 * 10) == mo3 * 10) {
            mo3 += "0";
        }
        
        document.getElementById("mo3").innerHTML = "mo3: " + mo3 + "<br>";
    }
    
    if(solveCnt >= 5) {
        var recent5 = prevTimes.slice(solveCnt - 5, solveCnt);

        for(let i = 0; i < 5; i++) {
            recent5[i] = parseInt(recent5[i][0]) + (parseInt(recent5[i][1]) + 1) / 100;
        }
        
        recent5.sort();
        
        console.log(recent5);
        
        var totSecs5 = 0;
        
        for(let i = 1; i < 4; i++) {
            totSecs5 += recent5[i];
        }
        
        totSecs5 /= 3;
        
        var ao5 = Math.round(totSecs5 * 100) / 100;
    
        if(Math.floor(ao5 * 10) == ao5 * 10) {
            ao5 += "0";
        }
        
        document.getElementById("ao5").innerHTML = "ao5: " + ao5 + "<br>";
    }
    
    if(solveCnt >= 12) {
        var recent12 = prevTimes.slice(solveCnt - 12, solveCnt);

        for(let i = 0; i < 12; i++) {
            recent12[i] = parseInt(recent12[i][0]) + (parseInt(recent12[i][1]) + 1) / 100;
        }
        
        recent12.sort();
        
        console.log(recent12);
        
        var totSecs12 = 0;
        
        for(let i = 1; i < 11; i++) {
            totSecs12 += recent12[i];
        }
        
        totSecs12 /= 10;
        
        var ao12 = Math.round(totSecs12 * 100) / 100;
    
        if(Math.floor(ao12 * 10) == ao12 * 10) {
            ao12 += "0";
        }
        
        document.getElementById("ao12").innerHTML = "ao12: " + ao12 + "<br>";
    }
}