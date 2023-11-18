let vida1 = 100;
let vida2 = 100;

(function () {
  const cnv = document.querySelector('#canvas');
  const ctx = cnv.getContext('2d');

  //movimentos
  let moveLeft = false;
  let moveUp = false;
  let moveRight = false;
  let moveDown = false;

  let moveLeft2 = false;
  let moveUp2 = false;
  let moveRight2 = false;
  let moveDown2 = false;


  //robos
  const imagens = [];

  const img1 = new Image();
  img1.src = '../img/images.png';
  imagens.push(img1);

  const img2 = new Image();
  img2.src = '../img/images (1).png';
  imagens.push(img2);

  const personagem1 = {
    img: img1,
    posX: 930,
    posY: 10,
    width: 50,
    height: 70,
    velocidade: 8,
  };

  const personagem2 = {
    img: img2,
    posX: 20,
    posY: 10,
    width: 50,
    height: 70,
    velocidade: 8,
  };


  //pressionar teclas
  window.addEventListener('keydown', function (e) {
    const nomeKey = e.key;
    console.log(nomeKey);
    switch (nomeKey) {
      case 'ArrowLeft':
        moveLeft = true;
        break;
      case 'ArrowUp':
        moveUp = true;
        break;
      case 'ArrowRight':
        moveRight = true;
        break;
      case 'ArrowDown':
        moveDown = true;
        break;
    }
  });

  window.addEventListener('keydown', function (e) {
    const nomeKey = e.key;
    console.log(nomeKey);
    switch (nomeKey) {
      case 'a':
        moveLeft2 = true;
        break;
      case 'A':
        moveLeft2 = true;
        break;
      case 'w':
        moveUp2 = true;
        break;
      case 'W':
        moveUp2 = true;
        break;
      case 'd':
        moveRight2 = true;
        break;
      case 'D':
        moveRight2 = true;
        break;
      case 's':
        moveDown2 = true;
        break;
      case 'S':
        moveDown2 = true;
        break;
    }
  });


  //soltar teclas
  window.addEventListener('keyup', (e) => {
    const key = e.key;
    switch (key) {
      case 'ArrowLeft':
        moveLeft = false;
        break;
      case 'ArrowUp':
        moveUp = false;
        break;
      case 'ArrowRight':
        moveRight = false;
        break;
      case 'ArrowDown':
        moveDown = false;
        break;
    }
  });

  window.addEventListener('keyup', (e) => {
    const key = e.key;
    switch (key) {
      case 'a':
        moveLeft2 = false;
        break;
      case 'A':
        moveLeft2 = false;
        break;
      case 'w':
        moveUp2 = false;
        break;
      case 'W':
        moveUp2 = false;
        break;
      case 'd':
        moveRight2 = false;
        break;
      case 'D':
        moveRight2 = false;
        break;
      case 's':
        moveDown2 = false;
        break;
      case 'S':
        moveDown2 = false;
        break;
    }
  });

  function moverPersonagem1() {
    if (moveLeft && !moveRight) {
      personagem1.posX -= personagem1.velocidade;
    }
    if (moveRight && !moveLeft) {
      personagem1.posX += personagem1.velocidade;
    }
    if (moveUp && !moveDown) {
      personagem1.posY -= personagem1.velocidade;
    }
    if (moveDown && !moveUp) {
      personagem1.posY += personagem1.velocidade;
    }

    personagem1.posX = Math.max(0, Math.min(cnv.width - personagem1.width, personagem1.posX));
    personagem1.posY = Math.max(0, Math.min(cnv.height - personagem1.height, personagem1.posY));
  }

  function moverPersonagem2() {
    if (moveLeft2 && !moveRight2) {
      personagem2.posX -= personagem2.velocidade;
    }
    if (moveRight2 && !moveLeft2) {
      personagem2.posX += personagem2.velocidade;
    }
    if (moveUp2 && !moveDown2) {
      personagem2.posY -= personagem2.velocidade;
    }
    if (moveDown2 && !moveUp2) {
      personagem2.posY += personagem2.velocidade;
    }

    personagem2.posX = Math.max(0, Math.min(cnv.width - personagem2.width, personagem2.posX));
    personagem2.posY = Math.max(0, Math.min(cnv.height - personagem2.height, personagem2.posY));
  }

  function exibirPersonagens() {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.drawImage(personagem1.img, personagem1.posX, personagem1.posY, personagem1.width, personagem1.height);
    ctx.drawImage(personagem2.img, personagem2.posX, personagem2.posY, personagem2.width, personagem2.height);
  }

  function verificarColisao() {
    const esquerda1 = personagem1.posX;
    const direita1 = personagem1.posX + personagem1.width;
    const cima1 = personagem1.posY;
    const baixo1 = personagem1.posY + personagem1.height;

    const esquerda2 = personagem2.posX;
    const direita2 = personagem2.posX + personagem2.width;
    const cima2 = personagem2.posY;
    const baixo2 = personagem2.posY + personagem2.height;

    if (esquerda1 < direita2 && direita1 > esquerda2 && cima1 < baixo2 && baixo1 > cima2) {

      personagem1.posX = 930;
      personagem1.posY = 10;
      personagem2.posX = 20;
      personagem2.posY = 10;

      //sortear número
      const dano1 = Math.floor(Math.random() * 21);
      const dano2 = Math.floor(Math.random() * 21);

      const resultado1 = vida1 - dano1;
      const resultado2 = vida2 - dano2;

      const resultado11 = document.getElementById('resultado1');
      const resultado22 = document.getElementById('resultado2');

      resultado11.textContent = `Vida = ${resultado1}`;
      resultado22.textContent = `Vida = ${resultado2}`;

      vida1 = resultado1;
      vida2 = resultado2;
    }

    if (vida1 <= 0 || vida2 <= 0) {
      const fim = document.getElementById('FIM');
      fim.textContent = 'FIM!!! APERTE F5 PARA JOGAR NOVAMENTE!';

    }


  }


  function atualizarTela() {
    window.requestAnimationFrame(atualizarTela, cnv);
    moverPersonagem1();
    moverPersonagem2();
    exibirPersonagens();
    verificarColisao();
  }

  atualizarTela();
})();