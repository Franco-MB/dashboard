import "./svg.js";
import "./mqtt.js";

const status = document.getElementById("status");
const botao = document.getElementById("botao");

status.textContent = "Alteração detectada pelo Vite!";

botao.addEventListener("click", () => {

    status.textContent = "JavaScript funcionando!";

});