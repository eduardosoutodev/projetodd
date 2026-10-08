document.addEventListener("DOMContentLoaded", () => {
    const lista = document.getElementById("listaPersonagens");
    const form = document.getElementById("formPersonagem");
    const busca = document.getElementById("busca-personagem");
    const msgVazio = document.getElementById("msg-vazio");
    const overlay = document.getElementById("overlay-modal");
    const btnNovo = document.getElementById("btn-novo-personagem");
    const btnFechar = document.getElementById("fechar-modal");
    const personagemMensagem = document.getElementById("personagemMensagem");

    let personagens = [];

    carregarPersonagens();

    btnNovo?.addEventListener("click", () => {
        form?.reset();
        if (personagemMensagem) personagemMensagem.textContent = "";
        overlay?.classList.remove("escondido");
        document.getElementById("nome-personagem")?.focus();
    });

    btnFechar?.addEventListener("click", fecharModal);

    overlay?.addEventListener("click", (event) => {
        if (event.target === overlay) fecharModal();
    });

    busca?.addEventListener("input", renderizarPersonagens);

    form?.addEventListener("submit", async (event) => {
        event.preventDefault();

        const valor = (nome) => form.querySelector(`[name="${nome}"]`)?.value?.trim() || "";
        const numero = (nome, padrao = 0) => {
            const n = Number(valor(nome));
            return Number.isFinite(n) ? n : padrao;
        };

        const nome = valor("nome");
        if (!nome) {
            mostrarMensagem("Informe o nome do personagem.", true);
            return;
        }

        const personagem = {
            nome,
            classe: valor("classe"),
            nivel: numero("nivel", 1),
            raca: valor("raca"),
            alinhamento: valor("alinhamento"),
            forca: numero("forca", 10),
            destreza: numero("destreza", 10),
            constituicao: numero("constituicao", 10),
            inteligencia: numero("inteligencia", 10),
            sabedoria: numero("sabedoria", 10),
            carisma: numero("carisma", 10),
            pvMax: numero("pvMax", 10),
            pvAtual: numero("pvMax", 10),
            ca: numero("ca", 10),
            notas: "",
            campanhaId: valor("campanhaId") ? numero("campanhaId") : null
        };

        try {
            mostrarMensagem("Salvando personagem...", false);

            const resposta = await fetch("/api/personagens", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(personagem)
            });

            if (!resposta.ok) {
                const erro = await resposta.text();
                throw new Error(erro || "Não foi possível cadastrar o personagem.");
            }

            form.reset();
            mostrarMensagem("Personagem cadastrado com sucesso!", false);
            await carregarPersonagens();
            fecharModal();
        } catch (erro) {
            console.error("Erro no cadastro:", erro);
            mostrarMensagem("Erro ao cadastrar personagem. Verifique o terminal do Spring Boot.", true);
        }
    });

    async function carregarPersonagens() {
        if (!lista) return;
        lista.innerHTML = "<p>Carregando personagens...</p>";

        try {
            const resposta = await fetch("/api/personagens");
            if (!resposta.ok) throw new Error("Falha ao consultar a API.");

            personagens = await resposta.json();
            renderizarPersonagens();
        } catch (erro) {
            console.error(erro);
            lista.innerHTML = "<p class=\"mensagem-erro\">Não foi possível carregar os personagens.</p>";
        }
    }

    function renderizarPersonagens() {
        if (!lista) return;

        const termo = (busca?.value || "").trim().toLowerCase();
        const filtrados = personagens.filter(p =>
            String(p.nome || "").toLowerCase().includes(termo)
        );

        if (!filtrados.length) {
            lista.innerHTML = "";
            msgVazio?.classList.remove("escondido");
            return;
        }

        msgVazio?.classList.add("escondido");
        lista.innerHTML = filtrados.map(p => `
            <article class="card-personagem" data-id="${p.id}">
                <img src="assets/img/avatar-placeholder.svg" alt="Avatar de ${escapeHtml(p.nome)}">
                <h3>${escapeHtml(p.nome)}</h3>
                <div class="meta">${escapeHtml(p.raca || "")} ${escapeHtml(p.classe || "")} · Nv ${p.nivel ?? "-"}</div>
                <p>Força: ${p.forca ?? "-"} (${formatarModificador(p.forca)})</p>
                <p>PV: ${p.pvAtual ?? "-"} / ${p.pvMax ?? "-"} · CA: ${p.ca ?? "-"}</p>
                <button type="button" class="botao botao-itens" data-id="${p.id}">Ver itens</button>
            </article>
        `).join("");

        lista.querySelectorAll(".botao-itens").forEach(botao => {
            botao.addEventListener("click", () => selecionarPersonagem(botao.dataset.id));
        });
    }

    function selecionarPersonagem(id) {
        const personagem = personagens.find(p => String(p.id) === String(id));
        const campoId = document.getElementById("personagemId");
        const nome = document.getElementById("personagemSelecionado");

        if (!personagem || !campoId) return;

        campoId.value = personagem.id;
        if (nome) nome.textContent = `Personagem: ${personagem.nome}`;
        carregarItens(personagem.id);
    }

    function fecharModal() {
        overlay?.classList.add("escondido");
    }

    function mostrarMensagem(mensagem, erro) {
        if (!personagemMensagem) return;
        personagemMensagem.textContent = mensagem;
        personagemMensagem.className = erro ? "mensagem-erro" : "mensagem-sucesso";
    }

    function formatarModificador(valor) {
        const n = Number(valor);
        if (!Number.isFinite(n)) return "";
        const mod = Math.floor((n - 10) / 2);
        return mod >= 0 ? `+${mod}` : `${mod}`;
    }

    function escapeHtml(valor) {
        return String(valor ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }
});

// Integração dos itens do personagem.
const itensSection = document.getElementById("itensSection");
const itensLista = document.getElementById("itensLista");
const itemForm = document.getElementById("itemForm");
const itemNome = document.getElementById("itemNome");
const itensMensagem = document.getElementById("itensMensagem");

function escapeItemHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    }[char]));
}

async function carregarItens(personagemId) {
    if (!itensSection || !itensLista || !personagemId) return;

    itensSection.hidden = false;
    itensLista.innerHTML = "<p>Carregando itens...</p>";

    try {
        const response = await fetch(`/api/personagens/${personagemId}/itens`);
        if (!response.ok) throw new Error("Não foi possível carregar os itens.");

        const itens = await response.json();

        if (!itens.length) {
            itensLista.innerHTML = "<p>Nenhum item cadastrado.</p>";
            return;
        }

        itensLista.innerHTML = itens.map(item => `
            <div class="item-card">
                <span>${escapeItemHtml(item.nome)}</span>
                <button type="button" onclick="excluirItem(${item.id})">Excluir</button>
            </div>
        `).join("");
    } catch (error) {
        itensLista.innerHTML = `<p>Erro: ${escapeItemHtml(error.message)}</p>`;
    }
}

if (itemForm) {
    itemForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const personagemId = document.getElementById("personagemId")?.value;
        const nome = itemNome?.value.trim();

        if (!personagemId || !nome) {
            if (itensMensagem) itensMensagem.textContent = "Selecione um personagem e informe o nome do item.";
            return;
        }

        try {
            const response = await fetch(`/api/personagens/${personagemId}/itens`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome })
            });

            if (!response.ok) throw new Error("Não foi possível adicionar o item.");

            itemForm.reset();
            if (itensMensagem) itensMensagem.textContent = "Item adicionado com sucesso.";
            await carregarItens(personagemId);
        } catch (error) {
            if (itensMensagem) itensMensagem.textContent = error.message;
        }
    });
}

async function excluirItem(id) {
    if (!confirm("Deseja excluir este item?")) return;

    const personagemId = document.getElementById("personagemId")?.value;

    try {
        const response = await fetch(`/api/itens/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Não foi possível excluir o item.");

        if (personagemId) await carregarItens(personagemId);
    } catch (error) {
        if (itensMensagem) itensMensagem.textContent = error.message;
    }
}
