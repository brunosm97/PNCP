const axios = require('axios');

class axiosComponent {
  constructor() {
    this.apiClient = axios.create({
      baseURL: 'https://pncp.gov.br/api/',
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async getLicitacoes(palavraChave) {
    try {
      const res = await this.apiClient.get('search/', {
        params: {
          q: palavraChave,
          tipos_documento: 'edital',
          ordenacao: '-data',
          pagina: 1,
          tam_pagina: 10000,
          status: 'encerradas',
        }
      })
      
      return res.data;
      
    } catch (error) {
      throw this.errorHandler(error);
    }
  }

  async getItem(cnpj, ano, num_seq) {
    try {
      const res = await this.apiClient.get(`pncp/v1/orgaos/${cnpj}/compras/${ano}/${num_seq}/itens`, {
        params: {
          pagina: 1,
          tamanhoPagina: 10000,
        }
      })

      return res.data;
    } catch (error) {
      throw this.errorHandler(error);
    }
  }

  

  errorHandler(error) {
    if(error.response) {
      console.log(error.response);
      
      return new Error(error.response.data.message || 'Sem mensagem de erro');
    } else if(error.request) {
      return new Error('No response received');
    } else {
      return new Error('Error setting up the request');
    }
  }
}

module.exports = new axiosComponent();

// https://pncp.gov.br/api/pncp/v1/orgaos/46410775000136/compras/2024/578/itens?pagina=1&tamanhoPagina=5

// 46410775000136 orgao_cnpj
// 2024 ano
// 578 numero_sequencial