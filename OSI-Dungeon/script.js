let doLava;

function stopLava() {
    clearInterval(doLava);
    for (let i in document.getElementsByClassName('lava-spec')) {
        if (i > 0) {
            document.getElementsByClassName('lava-spec')[i].remove();
        }
    }
}

function startLava() {
    doLava = setInterval(function () {
        let tmplava = document.createElement('DIV');
        tmplava.classList.add('lava-spec');
        tmplava.style.marginLeft = (Math.random() * (500 - 10) + 10) + 'px';
        tmplava.step = 0;
        tmplava.startat = (Math.random() * (40 - 10) + 40) + 'px';
        tmplava.style.marginTop = tmplava.startat;
        document.getElementsByClassName('lava-top')[0].appendChild(tmplava);
        tmplava.addEventListener('transitionend', function () {
            if (this.step === 0) {
                this.style.transition = 'all 0.6s';
                this.style.marginTop = this.startat;
                this.step = 1;
            } else {
                this.remove();
            }
        });
        setTimeout(function (l) {
            l.style.marginTop = (0 - (Math.random() * (120 - 60) + 60)) + 'px';
        }, 100, tmplava);
    }, 200);
}



let character = document.getElementById('character');
let y = 230;
let x = 0;
let time_start = 0;
let level = 0;
let charlock = true;



document.getElementsByClassName('play_button')[0].addEventListener('click', function () {
    document.getElementById('gamestart').style.display = 'none';
    character.style.opacity = '1';
    time_start = Date.now();
    closeDoor();
});

document.getElementsByClassName('restart_button')[0].addEventListener('click', function () {
    stopLava();
    for (let i in document.getElementsByClassName('sign-left')) {
        if (i > 0) {
            document.getElementsByClassName('sign-left')[i].style.color = '#FFFFFF';
            document.getElementsByClassName('sign-right')[i].style.color = '#FFFFFF';
        }
    }
    for (let i in document.getElementsByClassName('closed-door')) {
        if (i > 0) {
            document.getElementsByClassName('closed-door')[i].style.opacity = '0';
        }
    }
    document.getElementById('gameover').style.display = 'none';
    document.getElementById('thedrop').style.display = 'none';
    y = 230;
    x = 0;
    level = 0;
    character.style.marginLeft = '230px';
    character.style.marginTop = '0px';
    character.style.transition = 'opacity 1s'
    character.style.opacity = '1';
    time_start = Date.now();
    closeDoor();
});

function closeDoor() {
    setTimeout(function () {
        if (level < 7) {
            document.getElementsByClassName('closed-door')[(6 - level)].style.opacity = '1';
            charlock = false;
        }
    }, 700);
}

let cheatButton = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'KeyB',
    'KeyA'
];

let cheatStep = 0;

document.onkeydown = function (e) {
    if (!charlock) {

        if (e.code === cheatButton[cheatStep]) {
            cheatStep++;
            if (cheatStep === 10) {
                character.style.backgroundImage = 'url(char.png)';
                cheatStep = 0;
            }
        } else {
            cheatStep = 0;
        }

        if (e.code === 'ArrowRight') {
            character.style.backgroundPositionY = '64px'
            y = y + 10;
            if (y > 480) {
                y = 480;
            }
            character.style.marginLeft = y + 'px';
        }
        if (e.code === 'ArrowLeft') {
            y = y - 10;
            character.style.backgroundPositionY = '96px'
            if (y < 0) {
                y = 0;
            }
            character.style.marginLeft = y + 'px';
        }
    }
}

function entered(side) {
    let wrong_answer = false;
    if (level === 0) {
        document.getElementsByClassName('level')[(6 - level)].getElementsByClassName('sign-left')[0].style.color = '#46b327';
        document.getElementsByClassName('level')[(6 - level)].getElementsByClassName('sign-right')[0].style.color = '#af2e2e';
        if (side === 'right') wrong_answer = true;
    }

    if (level === 1) {
        document.getElementsByClassName('level')[(6 - level)].getElementsByClassName('sign-right')[0].style.color = '#46b327';
        document.getElementsByClassName('level')[(6 - level)].getElementsByClassName('sign-left')[0].style.color = '#af2e2e';
        if (side === 'left') wrong_answer = true;
    }

    if (level === 2) {
        document.getElementsByClassName('level')[(6 - level)].getElementsByClassName('sign-right')[0].style.color = '#46b327';
        document.getElementsByClassName('level')[(6 - level)].getElementsByClassName('sign-left')[0].style.color = '#af2e2e';
        if (side === 'left') wrong_answer = true;
    }

    if (level === 3) {
        document.getElementsByClassName('level')[(6 - level)].getElementsByClassName('sign-left')[0].style.color = '#46b327';
        document.getElementsByClassName('level')[(6 - level)].getElementsByClassName('sign-right')[0].style.color = '#af2e2e';
        if (side === 'right') wrong_answer = true;
    }

    if (level === 4) {
        document.getElementsByClassName('level')[(6 - level)].getElementsByClassName('sign-right')[0].style.color = '#46b327';
        document.getElementsByClassName('level')[(6 - level)].getElementsByClassName('sign-left')[0].style.color = '#af2e2e';
        if (side === 'left') wrong_answer = true;
    }

    if (level === 5) {
        document.getElementsByClassName('level')[(6 - level)].getElementsByClassName('sign-left')[0].style.color = '#46b327';
        document.getElementsByClassName('level')[(6 - level)].getElementsByClassName('sign-right')[0].style.color = '#af2e2e';
        if (side === 'right') wrong_answer = true;
    }

    if (level === 6) {
        document.getElementsByClassName('level')[(6 - level)].getElementsByClassName('sign-left')[0].style.color = '#46b327';
        document.getElementsByClassName('level')[(6 - level)].getElementsByClassName('sign-right')[0].style.color = '#af2e2e';
        if (side === 'right') wrong_answer = true;
    }

    if (wrong_answer) {
        y = 240;
        x = -660;
        document.getElementById('thedrop').style.display = 'block';
        character.style.marginLeft = y + 'px';
        character.style.marginTop = x + 'px';
        character.style.backgroundPositionY = '0px'
        setTimeout(function () {
            startLava();
            character.style.opacity = '1';
            character.style.transition = 'all 3s'
            setTimeout(function () {
                character.style.marginTop = '-30px';
            }, 1000);
            setTimeout(function () {
                document.getElementsByClassName('gameinfo')[1].innerHTML = 'Schau dir die Schichten des OSI Modells noch mal genau an!';
                document.getElementById('gameover').style.display = 'block';
            }, 3500);
        }, 250);
    } else {
        level++;
        closeDoor();
        y = 230;
        x = 0 - (level * 110);
        character.style.marginLeft = y + 'px';
        character.style.marginTop = x + 'px';
        character.style.backgroundPositionY = '0px'
        setTimeout(function () {
            if (level === 7) {
                let completed_time = ((Date.now() - time_start) / 1000);
                document.getElementsByClassName('completed_seconds')[0].innerHTML = completed_time.toFixed(2);
                document.getElementById('completed').style.display = 'block';
            } else {
                character.style.opacity = '1';
            }
        }, 250);
    }

}

function enterDoor(side) {
    character.style.backgroundPositionY = '32px'
    character.style.opacity = '0';
    setTimeout(entered, 950, side);
}

document.onkeyup = function (e) {
    character.style.backgroundPositionY = '0px'
    if (e.code === 'Space') {
        if (!charlock) {
            let pos = parseInt(character.style.marginLeft.replace('px', ''));
            if (pos >= 50 && pos <= 80) {
                charlock = true;
                character.style.marginLeft = '65px';
                enterDoor('left');
            }
            if (pos >= 380 && pos <= 420) {
                charlock = true;
                character.style.marginLeft = '410px';
                enterDoor('right');
            }
        }
    }
}