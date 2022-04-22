const startButton = document.querySelector('.start');
const restartButton = document.querySelector('.restart');
const playTexts = document.querySelectorAll('.play>p');

const player = (user, letter) => {

    return{ user, letter };
};

const gameBoard = ( () =>{
    let _fields = document.querySelectorAll(".board>div");
    let _curTurn = 0;
    let _isBotPlayer = [];
    let _playedHands = 0;
    const gameInit = () => {
        players[0].user = document.querySelector('.player1').value;
        (players[0].user == 'bot') ? _isBotPlayer[0]=true : _isBotPlayer[0]=false;
        players[1].user = document.querySelector('.player2').value;
        (players[1].user == 'bot') ? _isBotPlayer[1]=true : _isBotPlayer[1]=false;
        if(_isBotPlayer[0]){
            setTimeout(_botPlay,1000);
        }
        else{
            _addPlayerListener();
        }
        
    };
    const gameRestart = () => {
        for(let i =0;i<_fields.length;i++){
            _fields[i].innerHTML = "";
        }
        _removePlayerListener();
        _playedHands = 0;
        _curTurn = 0;
        const highestTimeoutId = setTimeout(() =>{
            for(let i = highestTimeoutId; i>=0 ; i--){
                window.clearTimeout(i);
            }
        }, 0);
    };
    const _botPlay = () => {
        while (_playedHands < 9){
            let i = Math.floor(Math.random()*9);
            if (!_fields[i].innerHTML){
                _fields[i].innerHTML = '<span>' + players[_curTurn].letter + '</span>';
                break;
            }
        }
        _changeTurn();
    };
    const _addPlayerListener = () => {
        for(let i =0;i<_fields.length;i++){
            _fields[i].addEventListener("click",_playerClick);
        }
    };
    const _removePlayerListener = () => {
        for(let i =0;i<_fields.length;i++){
            _fields[i].removeEventListener("click",_playerClick);
        }
    };
    const _changeTurn = () =>{
        _playedHands += 1;
        playTexts[_curTurn].style.display = "none";
        _curTurn == 0 ? _curTurn = 1 : _curTurn = 0;
        playTexts[_curTurn].style.display = "";
        _removePlayerListener();
        _gameStat();
    };
    const _checkWin = () => {
        if (_fields[1].innerText && (_fields[1].innerText == _fields[0].innerText && _fields[1].innerText== _fields[2].innerText)){
            return true;
        }
        if (_fields[1].innerText && (_fields[1].innerText == _fields[4].innerText && _fields[1].innerText== _fields[7].innerText)){
            return true;
        }
        if (_fields[3].innerText && (_fields[3].innerText == _fields[0].innerText && _fields[3].innerText== _fields[6].innerText)){
            return true;
        }
        if (_fields[3].innerText && (_fields[3].innerText == _fields[4].innerText && _fields[3].innerText== _fields[5].innerText)){
            return true;
        }
        if (_fields[5].innerText && (_fields[5].innerText == _fields[2].innerText && _fields[5].innerText== _fields[8].innerText)){
            return true;
        }
        if (_fields[7].innerText && (_fields[7].innerText == _fields[6].innerText && _fields[7].innerText== _fields[8].innerText)){
            return true;
        }
        if (_fields[4].innerText && (_fields[4].innerText == _fields[0].innerText && _fields[4].innerText== _fields[8].innerText)){
            return true;
        }
        if (_fields[4].innerText && (_fields[4].innerText == _fields[2].innerText && _fields[4].innerText== _fields[6].innerText)){
            return true;
        }
        return false;
    };
    const _playerClick = (e)=>{
        if(!e.srcElement.innerHTML){
                e.srcElement.innerHTML = '<span>' + players[_curTurn].letter + '</span>';
                _changeTurn();
        }
    };
    const _gameStat = () => {
        
        if(_checkWin()){
            _isBotPlayer[0] = false;
            _isBotPlayer[1] = false;
            _removePlayerListener();
            playTexts[_curTurn].style.display = "none";
            playTexts[_curTurn+2].style.display = "";
            return 0;
        }
        else if(_playedHands == 9){
            _isBotPlayer[0] = false;
            _isBotPlayer[1] = false;
            playTexts[_curTurn].style.display = "none";
            playTexts[4].style.display="";
            return 0;
        }
        if (_isBotPlayer[_curTurn]){
            setTimeout(_botPlay,1000);
        }
        else{
            _addPlayerListener();
        }
    }
    return { gameInit, gameRestart};
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
    gameBoard.gameRestart();
    for(let i =0;i<playTexts.length;i++){
        playTexts[i].style.display = "none";
    }
}

let players = []
players[0] = player("", "X");
players[1] = player("", "O");
startButton.addEventListener('click',start);
restartButton.addEventListener('click',restart);
