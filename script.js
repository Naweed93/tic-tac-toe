const startButton = document.querySelector('.start');
const restartButton = document.querySelector('.restart');
const playTexts = document.querySelectorAll('.play>p');

const player = (user, letter) => {

    return{ user, letter };
};

const gameBoard = ( () =>{
    let fields = document.querySelectorAll(".board>div");
    let _curTurn = 0;
    let _isBotPlayer = [];
    let _playedHands = 0;
    currentResult = [];
    const gameInit = () => {
        players[0].user = document.querySelector('.player1').value;
        (players[0].user == 'bot') ? _isBotPlayer[0]=true : _isBotPlayer[0]=false;
        players[1].user = document.querySelector('.player2').value;
        (players[1].user == 'bot') ? _isBotPlayer[1]=true : _isBotPlayer[1]=false;
        if(_isBotPlayer[0]){
            setTimeout(botPlay,1000);
        }
        _playedHands = 0;
        _curTurn = 0;
        for(let i =0;i<fields.length;i++){
            fields[i].addEventListener("click",playerClick);
        }
    };
    const botPlay = () => {
        while (_playedHands < 9){
            let i = Math.floor(Math.random()*9);
            if (!fields[i].innerHTML){
                fields[i].innerHTML = '<span>' + players[_curTurn].letter + '</span>';
                break;
            }
        }
        _changeTurn();
    };
    const _changeTurn = () =>{
        _playedHands += 1;
        playTexts[_curTurn].style.display = "none";
        _curTurn == 0 ? _curTurn = 1 : _curTurn = 0;
        playTexts[_curTurn].style.display = "";
        _gameStat();
    };
    const _checkWin = () => {
        if (fields[1].innerText && (fields[1].innerText == fields[0].innerText && fields[1].innerText== fields[2].innerText)){
            return true;
        }
        if (fields[1].innerText && (fields[1].innerText == fields[4].innerText && fields[1].innerText== fields[7].innerText)){
            return true;
        }
        if (fields[3].innerText && (fields[3].innerText == fields[0].innerText && fields[3].innerText== fields[6].innerText)){
            return true;
        }
        if (fields[3].innerText && (fields[3].innerText == fields[4].innerText && fields[3].innerText== fields[5].innerText)){
            return true;
        }
        if (fields[5].innerText && (fields[5].innerText == fields[2].innerText && fields[5].innerText== fields[8].innerText)){
            return true;
        }
        if (fields[7].innerText && (fields[7].innerText == fields[6].innerText && fields[7].innerText== fields[8].innerText)){
            return true;
        }
        if (fields[4].innerText && (fields[4].innerText == fields[0].innerText && fields[4].innerText== fields[8].innerText)){
            return true;
        }
        if (fields[4].innerText && (fields[4].innerText == fields[2].innerText && fields[4].innerText== fields[6].innerText)){
            return true;
        }
        return false;
    };
    const playerClick = (e)=>{
        if(!e.srcElement.innerHTML){
                e.srcElement.innerHTML = '<span>' + players[_curTurn].letter + '</span>';
                _changeTurn();
        }
    };
    const _gameStat = () => {
        if(_playedHands == 9){
            _isBotPlayer[0] = false;
            _isBotPlayer[1] = false;
            playTexts[_curTurn].style.display = "none";
            playTexts[4].style.display="";
        }
        if(_checkWin()){
            console.log("win");
            _isBotPlayer[0] = false;
            _isBotPlayer[1] = false;
            for(let i =0;i<fields.length;i++){
                fields[i].removeEventListener("click",playerClick);
            }
            playTexts[_curTurn].style.display = "none";
            playTexts[_curTurn+2].style.display = "";
        }
        if (_isBotPlayer[_curTurn]){
            setTimeout(botPlay,1000);
        }
    }
    return { currentResult,fields,playerClick, botPlay, gameInit};
})();


function start(){
    gameBoard.gameInit();
    document.querySelector('.player-selection').style.display = "none";
    document.querySelector('.play').style.display = "";
    playTexts[0].style.display = "";
}
function restart(){
    document.querySelector('.player-selection').style.display = "";
    document.querySelector('.play').style.display = "none";
    for(let i =0;i<gameBoard.fields.length;i++){
        gameBoard.fields[i].innerHTML = "";
    }
    for(let i =0;i<playTexts.length;i++){
        playTexts[i].style.display = "none";
    }
}

let players = []
players[0] = player("", "X");
players[1] = player("", "O");
startButton.addEventListener('click',start);
restartButton.addEventListener('click',restart);
