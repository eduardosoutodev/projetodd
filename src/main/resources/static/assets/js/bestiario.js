const campoBusca = document.getElementById('busca-criatura');
const filtroTipo = document.getElementById('filtro-tipo');
const listaCriaturas = document.getElementById('lista-criaturas');
const msgVazio = document.getElementById('msg-vazio');
const msgCarregando = document.getElementById('msg-carregando');
const msgErro = document.getElementById('msg-erro');
const overlay = document.getElementById('overlay-criatura');
const form = document.getElementById('formCriatura');
const mensagem = document.getElementById('criaturaMensagem');
let criaturas = [];

function normalizar(valor) {
  return (valor || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

function numero(formulario, nome, padrao = 10) {
  const n = Number(formulario.querySelector(`[name="${nome}"]`)?.value);
  return Number.isFinite(n) ? n : padrao;
}

function carregarTipos() {
  const tipos = [...new Set(criaturas.map(c => c.tipo).filter(Boolean))].sort((a,b) => a.localeCompare(b, 'pt-BR'));
  filtroTipo.innerHTML = '<option value="">Todos os tipos</option>';
  tipos.forEach(tipo => {
    const option = document.createElement('option'); option.value = tipo; option.textContent = tipo; filtroTipo.appendChild(option);
  });
}

function renderizarCriaturas() {
  const termo = normalizar(campoBusca.value);
  const tipoSelecionado = normalizar(filtroTipo.value);
  const filtradas = criaturas.filter(c => {
    const nome = normalizar(c.nome), tipo = normalizar(c.tipo);
    return (nome.includes(termo) || tipo.includes(termo)) && (!tipoSelecionado || tipo === tipoSelecionado);
  });
  listaCriaturas.innerHTML = '';
  filtradas.forEach(c => {
    const linha = document.createElement('div'); linha.className = 'linha-criatura';
    const imagem = document.createElement('img'); imagem.src = 'assets/img/criatura-placeholder.svg'; imagem.alt = c.nome || 'Criatura';
    const dados = document.createElement('div'); const titulo = document.createElement('h3'); titulo.textContent = c.nome;
    const meta = document.createElement('div'); meta.className = 'meta'; meta.textContent = `ND ${c.nd ?? '-'} · CA ${c.ca ?? '-'}`;
    dados.append(titulo, meta);
    const badge = document.createElement('span'); badge.className = 'badge-tipo'; badge.textContent = c.tipo || 'Sem tipo';
    linha.append(imagem, dados, badge); listaCriaturas.appendChild(linha);
  });
  msgVazio.classList.toggle('escondido', filtradas.length !== 0);
}

async function carregarCriaturas() {
  msgCarregando.classList.remove('escondido'); msgErro.classList.add('escondido');
  try {
    const resposta = await fetch('/api/criaturas');
    if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
    criaturas = await resposta.json(); carregarTipos(); renderizarCriaturas();
  } catch (erro) {
    console.error('Erro ao carregar criaturas:', erro); criaturas = []; listaCriaturas.innerHTML = ''; msgErro.classList.remove('escondido'); msgVazio.classList.add('escondido');
  } finally { msgCarregando.classList.add('escondido'); }
}

form?.addEventListener('submit', async event => {
  event.preventDefault();
  const valor = nome => form.querySelector(`[name="${nome}"]`)?.value.trim() || '';
  const criatura = {
    nome: valor('nome'), tipo: valor('tipo'), nd: valor('nd'), tamanho: valor('tamanho'), pv: valor('pv'),
    ca: numero(form, 'ca'), forca: numero(form, 'forca'), destreza: numero(form, 'destreza'),
    constituicao: numero(form, 'constituicao'), inteligencia: numero(form, 'inteligencia'),
    sabedoria: numero(form, 'sabedoria'), carisma: numero(form, 'carisma'),
    habilidades: valor('habilidades'), acoes: valor('acoes')
  };
  if (!criatura.nome) { mensagem.textContent = 'Informe o nome da criatura.'; return; }
  try {
    mensagem.className = 'mensagem-sucesso'; mensagem.textContent = 'Salvando...';
    const resposta = await fetch('/api/criaturas', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(criatura) });
    if (!resposta.ok) throw new Error(await resposta.text() || `HTTP ${resposta.status}`);
    form.reset(); fecharModal(); await carregarCriaturas(); alert('Criatura cadastrada com sucesso.');
  } catch (erro) {
    console.error(erro); mensagem.className = 'mensagem-erro'; mensagem.textContent = 'Erro ao cadastrar criatura. Verifique o terminal do Spring Boot.';
  }
});

document.getElementById('btn-nova-criatura')?.addEventListener('click', () => { form?.reset(); mensagem.textContent=''; overlay?.classList.remove('escondido'); form?.querySelector('[name="nome"]')?.focus(); });
document.getElementById('fechar-criatura')?.addEventListener('click', fecharModal);
overlay?.addEventListener('click', e => { if (e.target === overlay) fecharModal(); });
campoBusca.addEventListener('input', renderizarCriaturas); filtroTipo.addEventListener('change', renderizarCriaturas);
function fecharModal() { overlay?.classList.add('escondido'); }
carregarCriaturas();
