const formLogin = document.getElementById('form-login');
const campoEmail = document.getElementById('email');
const campoSenha = document.getElementById('senha');
const erroEmail = document.getElementById('erro-email');
const erroSenha = document.getElementById('erro-senha');

function emailValido(valor) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
}

formLogin.addEventListener('submit', (evento) => {
  evento.preventDefault();

  let valido = true;

  if (!emailValido(campoEmail.value)) {
    erroEmail.classList.remove('escondido');
    valido = false;
  } else {
    erroEmail.classList.add('escondido');
  }

  if (campoSenha.value.length < 6) {
    erroSenha.classList.remove('escondido');
    valido = false;
  } else {
    erroSenha.classList.add('escondido');
  }

  if (!valido) return;

  // Sem back-end nesta etapa: apenas simula o login e redireciona
  window.location.href = 'dashboard.html';
});
