const API = '/api';

const stats = {
  campanhas: document.querySelector('#total-campanhas'),
  personagens: document.querySelector('#total-personagens'),
  criaturas: document.querySelector('#total-criaturas')
};

const lista = document.querySelector('#ultimas-campanhas');
const mensagem = document.querySelector('#dashboard-mensagem');

function esc(valor) {
  return String(valor ?? '').replace(/[&<>'"]/g, c => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;'
  }[c]));
}

async function carregarDashboard() {
  mensagem.textContent = 'Carregando dados...';
  try {
    const [resumoResp, campanhasResp] = await Promise.all([
      fetch(`${API}/dashboard`),
      fetch(`${API}/campanhas`)
    ]);

    if (!resumoResp.ok || !campanhasResp.ok) {
      throw new Error('Não foi possível carregar os dados do dashboard.');
    }

    const resumo = await resumoResp.json();
    const campanhas = await campanhasResp.json();

    stats.campanhas.textContent = resumo.campanhas;
    stats.personagens.textContent = resumo.personagens;
    stats.criaturas.textContent = resumo.criaturas;

    renderizarCampanhas(campanhas);
    mensagem.textContent = '';
  } catch (erro) {
    mensagem.textContent = erro.message;
    lista.innerHTML = '<div class="item">Não foi possível carregar as campanhas.</div>';
  }
}

function renderizarCampanhas(campanhas) {
  const recentes = [...campanhas].reverse().slice(0, 3);

  if (!recentes.length) {
    lista.innerHTML = '<div class="item">Nenhuma campanha cadastrada.</div>';
    return;
  }

  lista.innerHTML = recentes.map(campanha => `
    <div class="item">
      <strong>${esc(campanha.nome)}</strong>
      <div class="meta">Mestre: ${esc(campanha.mestre || 'Não informado')}</div>
      <div class="meta">${esc(campanha.descricao || 'Sem descrição')}</div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', carregarDashboard);
