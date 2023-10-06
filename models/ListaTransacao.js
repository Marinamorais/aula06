import Transacao from "./Transacao";                // Importa a classe Transacao

export default class ListaTransacao {               // Exporta a classe ListaTransacao
    constructor() {                        // Construtor da classe ListaTransacao
        this.historico = [];            // Cria um array vazio para armazenar as transações
        this.saldo = 0;                 // Cria uma variável para armazenar o saldo
        this.receitas = 0;              // Cria uma variável para armazenar as receitas
        this.despesas = 0;              // Cria uma variável para armazenar as despesas
    }

    adicionarTransacao(descricao, valor, tipo) {                // Recebe os dados da transação
        const novaTransacao = new Transacao(descricao, valor, tipo);    // Cria uma nova transação

        console.log(novaTransacao);
        this.historico.push(novaTransacao);                 // Adiciona a nova transação ao histórico

        this.atuliazarValores();                            // Atualiza os valores

    }

    getHistorico() {                                    // Retorna o histórico
        return this.historico;
    }

    getTransacaoPorId(id) {
        const transacao = this.historico.find(
            (transacao) => transacao.id == id);
        return transacao;
    }

    atualizarTransacao(id, descricao, valor) {              // Atualiza uma transação
        const transacao = this.getTransacaoPorId(id);

        if (transacao) {
            transacao.descricao = descricao;
            transacao.valor = valor;
        }
        this.atuliazarValores();

        return transacao;
    }
    excluirTransacao(id) {
        const listaTransacoes = this.historico.filter(
            (transacao) => transacao.id != id);

        this.historico = listaTransacoes;

        this.atuliazarValores();

        return listaTransacoes;
    }

    atuliazarValores() {
        this.saldo = 0;                                     // Zera o saldo
        this.receitas = 0;                                  // Zera as receitas
        this.despesas = 0;                                  // Zera as despesas

        this.historico.map(transacao => {                   // Percorre o histórico
            if (transacao.tipo == "Receita") {                 // Se a transação for uma receita
                this.receitas = Number(this.receitas) + Number(transacao.valor);     // Soma o valor da receita ao total de receitas
            } else {
                this.despesas = Number(this.despesas) + Number(transacao.valor);     // Soma o valor da despesa ao total de despesas
            }
        });

        this.saldo = this.receitas - this.despesas;     // Calcula o saldo}
    }
}