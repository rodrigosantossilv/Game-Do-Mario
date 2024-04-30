const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreDisplay = document.createElement('div'); // Criar elemento para exibir o placar
scoreDisplay.classList.add('score-display'); // Adicionar classe para estilização CSS
document.body.appendChild(scoreDisplay); // Adicionar o elemento ao corpo do documento HTML

let score = 0; // Inicializar o placar

const jump = () => {
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

const updateScore = () => {
    score++; // Incrementar o placar
    scoreDisplay.textContent = `Score: ${score}`; // Atualizar o texto do placar
}

const endGame = () => {
    clearInterval(loop);
    const gameOverMessage = document.createElement('div');
    gameOverMessage.textContent = 'Game Over';
    gameOverMessage.classList.add('game-over-message');
    
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart';
    restartButton.classList.add('restart-button');
    restartButton.addEventListener('click', () => {
        window.location.reload(); // Recarrega a página para reiniciar o jogo
    });

    document.body.appendChild(gameOverMessage);
    document.body.appendChild(restartButton);
}

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 110) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;
        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;
        mario.src = './img/game-over.png';
        mario.style.width = '80px';
        mario.style.marginLeft = '50px';
        endGame();
    } else {
        updateScore(); // Atualizar o placar enquanto o jogo continua
    }
}, 10);

document.addEventListener('keydown', jump);
