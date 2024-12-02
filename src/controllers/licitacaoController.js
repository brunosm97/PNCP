const axiosComponent = require('../components/axiosComponent');

class licitacaoController {
  async getLicitacao(req, res) {
    try {
      const licitacoes = await axiosComponent.getLicitacoes(req.query.q);
      let licitacoesFilter = [];
      
      for (const licitacao of licitacoes.items) {
        let found = false;
        const itens = await axiosComponent.getItem(licitacao.orgao_cnpj, licitacao.ano, licitacao.numero_sequencial);        
        
        for (const item of itens) {
          if(!found && item.descricao.toLowerCase().includes(req.query.q.toLowerCase()) && item.quantidade >= req.query.qtd * 2 && item.valorUnitarioEstimado >= req.query.valor) {
            licitacao.acesso = `https://pncp.gov.br/app/editais/${licitacao.orgao_cnpj}/${licitacao.ano}/${licitacao.numero_sequencial}`;
            licitacoesFilter.push(licitacao);
            found = true;
          }
        }
      }    

      res.status(200).json(licitacoesFilter);
    } catch (error) {
      console.log(error);
      res.status(400).json();
      
    }
  }
}

module.exports = new licitacaoController();
