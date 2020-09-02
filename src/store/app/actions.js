import * as services from '../../core/services/Configuracoes.Services'

export const getThemeFromDB = async ({ commit }) => {
  const configs = await services.getConfigs()
  commit('SET_THEME', configs.MODO_NOTURNO === 1)
}

export const setTheme = ({ commit }, payload) => {
  commit('SET_THEME', payload)
}