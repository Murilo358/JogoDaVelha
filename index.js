const gameBoard = document.getElementById("gameBoard");
const turnPlayer = document.getElementById("turnPlayer");
let buttons = document.querySelectorAll(".cursor-pointer");
const buttonsDiv = document.getElementById("buttonsDiv");

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    if (gameBoard.dataset.player === "x") {
      button.classList.add("x");
      gameBoard.dataset.player = "o";
      button.setAttribute("disabled", "");
      velha();
      turnPlayer.innerText = document.getElementById("player2").value;
    } else {
      button.classList.add("o");
      gameBoard.dataset.player = "x";
      button.setAttribute("disabled", "");
      velha();

      turnPlayer.innerText = document.getElementById("player1").value;
    }
  });
});

document.getElementById("start").addEventListener("click", function (ev) {
  document.getElementById("status").appendChild(turnPlayer);
  if (
    document.getElementById("player2").value === "" ||
    document.getElementById("player1").value === ""
  ) {
    alert("Insira o nome dos jogadores");
  }
  document.querySelectorAll(".cursor-pointer").forEach(function (button) {
    button.removeAttribute("disabled");
    turnPlayer.innerText = document.getElementById("player1").value;
  });
});
const winningPatterns = [
  ["0.0", "0.1", "0.2"],
  ["1.0", "1.1", "1.2"],
  ["2.0", "2.1", "2.2"],
  ["0.0", "1.0", "2.0"],
  ["0.1", "1.1", "2.1"],
  ["0.2", "1.2", "2.2"],
  ["0.0", "1.1", "2.2"],
  ["0.2", "1.1", "2.0"],
];

function velha() {
  if (verificarVencedor() === false && verificarTodosDesabilitados() === true) {
    document.getElementById("status").innerHTML = "DEU VELHA #!";
    buttonsDiv.appendChild(restart);
  }
}

function verificarTodosDesabilitados() {
  for (let i = 0; i < buttons.length; i++) {
    if (!buttons[i].hasAttribute("disabled")) {
      return false;
    }
  }
  return true;
}

const restart = document.createElement("button");
restart.innerText = "Reiniciar";

restart.addEventListener("click", function () {
  buttons.forEach(function (button) {
    button.setAttribute("disabled", "");
    button.classList.remove("x", "o");
    document.getElementById("status").innerHTML = "Vez do jogador :";
    document.getElementById("player1").value = "";
    document.getElementById("player2").value = "";
  });
  buttonsDiv.removeChild(restart);
});

function verificarVencedor() {
  const x = document.getElementsByClassName("x");
  const o = document.getElementsByClassName("o");
  for (let i = 0; i < winningPatterns.length; i++) {
    const pattern = winningPatterns[i];
    let countX = 0;
    let countO = 0;
    for (let j = 0; j < pattern.length; j++) {
      for (let k = 0; k < x.length; k++) {
        if (x[k].getAttribute("data-region") === pattern[j]) {
          countX++;
          break;
        }
      }
      for (let l = 0; l < o.length; l++) {
        if (o[l].getAttribute("data-region") === pattern[j]) {
          countO++;
          break;
        }
      }
    }

    if (countX === pattern.length || countO === pattern.length) {
      buttonsDiv.appendChild(restart);
      document.getElementById("status").innerHTML =
        "O jogador: " + turnPlayer.innerHTML + " é o vencedor!";
      buttons.forEach((button) => button.setAttribute("disabled", ""));

      return true;
    }
  }
  return false;
}
