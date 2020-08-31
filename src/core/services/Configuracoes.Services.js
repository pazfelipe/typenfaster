'use strict'

import Configuracoes from '../models/Configuracoes.Model'

/**
 * Atualiza as configurações do software
 * @param {JSON} data Objeto contendo as configurações
 * @returns {Promise<JSON>}
 */
// eslint-disable-next-line no-unused-vars
export const update = async data => {

  const Model = new Configuracoes()

  const config = {
    nivel: 1,
    mao: 'E',
    teclado_alfanumerico: false,
    modo_noturno: data.modoNoturno,
    mostrar_dicas: data.mostrarDicas
  }
  try {
    const result = await Model.update(config)
    if (!result) {
      await Model.store(config)
    }
  } catch (error) {
    console.error(error)
  }

  try {
    return await Model.getConfiguracoes()
  } catch (error) {
    console.log(error)
  }
}