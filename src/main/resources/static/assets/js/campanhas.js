document.addEventListener("DOMContentLoaded", () => {
    const lista = document.getElementById("listaCampanhas");
    const form = document.getElementById("formCampanha");
    const busca = document.getElementById("busca-campanha");
    const vazio = document.getElementById("msg-vazio");
    const overlay = document.getElementById("overlay-modal");
    const btnNovo = document.getElementById("btn-nova-campanha");
    const btnFechar = document.getElementById("fechar-modal");
    const mensagem = document.getElementById("campanhaMensagem");
    let campanhas = [];

    carregarCampanhas();

    btnNovo?.addEventListener("click", () => {
        form?.reset();
        mensagem.textContent = "";
        overlay?.classList.remove("escondido");
        document.getElementById("nome-campanha")?.focus();
    });

    btnFechar?.addEventListener("click", fecharModal);
    overlay?.addEventListener("click", e => { if (e.target === overlay) fecharModal(); });
    busca?.addEventListener("input", renderizar);

    form?.addEventListener("submit", async e => {
        e.preventDefault();
        const valor = nome => form.querySelector(`[name="${nome}"]`)?.value.trim() || "";
        const campanha = { nome: valor("nome"), descricao: valor("descricao"), mestre: valor("mestre") };

        if (!campanha.nome) {
            mostrarMensagem("Informe o nome da campanha.", true);
            return;
        }

        try {
            mostrarMensagem("Salvando...", false);
            const resposta = await fetch("/api/campanhas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(campanha)
            });
            if (!resposta.ok) throw new Error(await resposta.text() || `HTTP ${resposta.status}`);
            fecharModal();
            await carregarCampanhas();
            alert("Campanha criada com sucesso.");
        } catch (erro) {
            console.error(erro);
            mostrarMensagem("Erro ao criar campanha. Verifique o terminal do Spring Boot.", true);
        }
    });

    async function carregarCampanhas() {
        lista.innerHTML = "<p>Carregando campanhas...</p>";
        try {
            const resposta = await fetch("/api/campanhas");
            if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
            campanhas = await resposta.json();
            renderizar();
        } catch (erro) {
            console.error(erro);
            lista.innerHTML = "<p class='mensagem-erro'>Não foi possível carregar as campanhas.</p>";
        }
    }

    function renderizar() {
        const termo = (busca?.value || "").toLowerCase().trim();
        const filtradas = campanhas.filter(c => (c.nome || "").toLowerCase().includes(termo));
        lista.innerHTML = "";
        vazio.classList.toggle("escondido", filtradas.length !== 0);
        filtradas.forEach(c => {
            const article = document.createElement("article");
            article.className = "card-campanha";
            article.innerHTML = `<h3></h3><p></p><div class="meta"></div>`;
            article.querySelector("h3").textContent = c.nome || "Sem nome";
            article.querySelector("p").textContent = c.descricao || "Sem descrição.";
            article.querySelector(".meta").textContent = `Mestre: ${c.mestre || "Não informado"}`;
            lista.appendChild(article);
        });
    }

    function fecharModal() { overlay?.classList.add("escondido"); }
    function mostrarMensagem(texto, erro) {
        mensagem.textContent = texto;
        mensagem.className = erro ? "mensagem-erro" : "mensagem-sucesso";
    }
});
