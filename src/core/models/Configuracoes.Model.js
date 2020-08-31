'use strict'

import knex from '../database/connection'

class Configuracoes {

  async getConfiguracoes() {
    return await knex.from('CONFIGURACOES')
      .first()
  }

  async update(data) {
    return await knex.from('CONFIGURACOES')
      .update(data)
      .where('ID', 1)
  }

  async store(data) {
    return await knex.from('CONFIGURACOES')
      .insert(data)
  }

}

export default Configuracoes