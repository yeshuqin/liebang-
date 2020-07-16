import { logout } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import Vue from 'vue'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: localStorage.getItem('name')
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
    localStorage.setItem('name', name)
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    console.log(userInfo, 'userInfo==')
    commit('SET_TOKEN', userInfo.token)
    commit('SET_NAME', userInfo.name)
    setToken(userInfo.token)
  },

  // user logout
  logout({ commit }) {
    removeToken()
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

