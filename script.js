// Classe do cadastro
class Cadastro {
    constructor() {
        this.dados = [];
        this.id = 1;
    }

    // Adiciona um novo cadastro
    adicionar(nome, idade, tipo) {
        this.dados.push({ id: this.id++, nome, idade, tipo });
        this.render();
    }

    // Edita o cadastro que já existe
    editar(id, nome, idade, tipo) {
        const item = this.dados.find(d => d.id === id);
        if (item) {
            item.nome = nome;
            item.idade = idade;
            item.tipo = tipo;
            this.render();
        }
    }

    // Exclui o cadastro
    excluir(id) {
        this.dados = this.dados.filter(d => d.id !== id);
        this.render();
    }

    // Renderiza os dados na tabela
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
                    <button class="editar" onclick="abrirModalEdicao(${dado.id})">Editar</button>
                    <button class="excluir" onclick="cadastro.excluir(${dado.id})">Excluir</button>
                </td>
            `;
        });
    }
}

// Instancia a classe Cadastro
const cadastro = new Cadastro();

// Adiciona um evento ao formulário de cadastro
document.getElementById("cadastroForm").onsubmit = function(event) {
    event.preventDefault();

    const nome = document.getElementById("name").value;
    const idade = document.getElementById("idade").value;
    const tipo = document.getElementById("tipo").value;

    // Valida os campos de nome e tipo
    if (!validarNome(nome) || !validarTipo(tipo)) {
        alert("Verifique os campos: nome deve conter apenas letras e tipo não deve conter números.");
        return;
    }

    cadastro.adicionar(nome, idade, tipo);
    this.reset();
};

// Função para validar o nome (apenas letras e espaços)
function validarNome(nome) {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(nome);
}

// Função para validar o tipo (letras, espaços e caracteres especiais, sem números)
function validarTipo(tipo) {
    const regex = /^[^\d]+$/; // Qualquer caractere, exceto números
    return regex.test(tipo);
}

// Variáveis para controlar o modal de edição
let idEmEdicao = null;
const editModal = document.getElementById("editModal");
const editName = document.getElementById("editName");
const editIdade = document.getElementById("editIdade");
const editTipo = document.getElementById("editTipo");

// Função para abrir o modal de edição com os dados do cadastro
function abrirModalEdicao(id) {
    idEmEdicao = id;
    const item = cadastro.dados.find(d => d.id === id);

    if (item) {
        editName.value = item.nome;
        editIdade.value = item.idade;
        editTipo.value = item.tipo;
        editModal.style.display = "flex"; // Exibe o modal
    }
}

// Salva as edições ao clicar no botão de salvar
document.getElementById("saveEdit").onclick = function() {
    const nome = editName.value;
    const idade = editIdade.value;
    const tipo = editTipo.value;

    if (validarNome(nome) && idade && !isNaN(idade) && idade > 0 && validarTipo(tipo)) {
        cadastro.editar(idEmEdicao, nome, idade, tipo);
        editModal.style.display = "none"; // Fecha o modal
    } else {
        alert("Nome, idade ou tipo inválidos.");
    }
};

// Fecha o modal ao clicar em cancelar
document.getElementById("cancelEdit").onclick = function() {
    editModal.style.display = "none";
};
