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
