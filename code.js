const moves = ["U", "F", "R", "L", "B", "D"];
const postfix = ["", "2", "'"];
        
function generate(scrambleLen) {
    var scramble = [];
    for(let i = 0; i < scrambleLen; i++) {
        scramble[i] = [Math.floor(Math.random() * 6), postfix[Math.floor(Math.random() * 3)]];
    }
    return scramble;
}
        
function valid(scramble) {
    for(let i = 2; i < scramble.length; i++) {
        while(scramble[i][0] == scramble[i - 2][0] && scramble[i][0] == 5 - scramble[i - 1][0]) {
            scramble[i] = [Math.floor(Math.random() * 6), postfix[Math.floor(Math.random() * 3)]];
        }
    }
    for(let i = 1; i < scramble.length; i++) {
        while(scramble[i][0] == scramble[i - 1][0]) {
            scramble[i] = [Math.floor(Math.random() * 6), postfix[Math.floor(Math.random() * 3)]];
        }
    }
    return scramble;
}
        
function format(scramble) {
    var ret = []
    for(let i = 0; i < scramble.length; i++) {
        ret[i] = moves[scramble[i][0]] + scramble[i][1];
    }
    return ret;
}

function printScrambles(scrambleCnt) {
    var scrambleNum;
    var ret = "";
    for(let i = 0; i < scrambleCnt; i++) {
        var scrambleNum = i + 1;
        if(scrambleCnt != 1) ret += scrambleNum.toString() + ". ";
        scramble = generate(Math.floor(Math.random() * 6) + 25)
        scramble = valid(scramble);
        scramble = format(scramble);
        for(let j = 0; j < scramble.length; j++) {
            ret += scramble[j] + " ";
        }
    }
    document.getElementById("scramble").innerHTML = ret;
}

window.onload = function(){
    var writeto = document.getElementById("timer");
    var space_bar = 32;
    var prevKeyUpAt = 0;
    var holding = false;
    var active = false;
    window.onkeydown = function(ctx){
        if(active) {
            writeto.innerHTML = "Timer Stopped!";
            active = false;
        }
        if(ctx.keyCode === space_bar) {
            if(!holding) writeto.innerHTML = "Keep Holding!";
            var keyDownAt = new Date();
            setTimeout(function() {
                if(+keyDownAt > +prevKeyUpAt) {
                    holding = true;
                    writeto.innerHTML = "Release to Start the Timer!";
                }
                else {
                    holding = false;
                }
                
            }, 500);
        };
    };
    window.onkeyup = function(ctx) {
        if(ctx.keyCode === space_bar) {
            prevKeyUpAt = new Date();
            if(holding) {
                writeto.innerHTML = "Go!";
                active = true;
            }
            else writeto.innerHTML = "Not Held Enough";
            holding = false;
        }
    };
};

printScrambles(1);