// Classe do cadastro
class Cadastro {
    constructor() {
        this.dados = [];
        this.id = 1;
    }

    adicionar(nome, idade, tipo) {
        this.dados.push({ id: this.id++, nome, idade, tipo });
        this.render();
    }

    editar(id, nome, idade, tipo) {
        const item = this.dados.find(d => d.id === id);
        if (item) {
            item.nome = nome;
            item.idade = idade;
            item.tipo = tipo;
            this.render();
        }
    }

    excluir(id) {
        this.dados = this.dados.filter(d => d.id !== id);
        this.render();
    }

    render() {
        const tabela = document.querySelector("#cadastroTable tbody");
        tabela.innerHTML = "";
        this.dados.forEach(dado => {
            const row = tabela.insertRow();
            row.innerHTML = `
                <td>${dado.nome}</td>
                <td>${dado.idade}</td>
                <td>${dado.tipo}</td>
                <td>
                    <button class="editar" onclick="prepararEdicao(${dado.id})">Editar</button>
                    <button class="excluir" onclick="cadastro.excluir(${dado.id})">Excluir</button>
                </td>
            `;
        });
    }
}

const cadastro = new Cadastro();

document.getElementById("cadastroForm").onsubmit = function(event) {
    event.preventDefault();

    const nome = document.getElementById("name").value;
    const idade = document.getElementById("idade").value;
    const tipo = document.getElementById("tipo").value;

    const formError = document.getElementById("formError");
    if (!nome || !idade || !tipo) {
        formError.textContent = "Todos os campos são obrigatórios.";
        return;
    }

    if (!/^[a-zA-Z\s]+$/.test(nome)) {
        formError.textContent = "Nome deve conter apenas letras.";
        return;
    }

    if (!/^\d+$/.test(idade)) {
        formError.textContent = "Idade deve conter apenas números.";
        return;
    }

    // Permitir caracteres especiais e letras, mas não números no Tipo de Raça
    if (/\d/.test(tipo)) {
        formError.textContent = "Tipo de raça não pode conter números.";
        return;
    }

    formError.textContent = "";
    cadastro.adicionar(nome, idade, tipo);

    document.getElementById("name").value = "";
    document.getElementById("idade").value = "";
    document.getElementById("tipo").value = "";
};

function prepararEdicao(id) {
    const item = cadastro.dados.find(d => d.id === id);
    if (item) {
        document.getElementById("editSection").classList.remove("hidden");
        document.getElementById("editName").value = item.nome;
        document.getElementById("editIdade").value = item.idade;
        document.getElementById("editTipo").value = item.tipo;

        document.getElementById("editForm").onsubmit = function(event) {
            event.preventDefault();

            const nome = document.getElementById("editName").value;
            const idade = document.getElementById("editIdade").value;
            const tipo = document.getElementById("editTipo").value;

            const editError = document.getElementById("editError");
            if (!nome || !idade || !tipo) {
                editError.textContent = "Todos os campos são obrigatórios.";
                return;
            }

            if (!/^[a-zA-Z\s]+$/.test(nome)) {
                editError.textContent = "Nome deve conter apenas letras.";
                return;
            }

            if (!/^\d+$/.test(idade)) {
                editError.textContent = "Idade deve conter apenas números.";
                return;
            }

            // Permitir caracteres especiais e letras, mas não números no Tipo de Raça
            if (/\d/.test(tipo)) {
                editError.textContent = "Tipo de raça não pode conter números.";
                return;
            }

            editError.textContent = "";
            cadastro.editar(id, nome, idade, tipo);
            document.getElementById("editSection").classList.add("hidden");
        };
    }
}

function cancelarEdicao() {
    document.getElementById("editSection").classList.add("hidden");
}

