import Vue from 'vue';
import Vuex from 'vuex';

import { api } from '@/services.js'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login: false,
    usuario: {
      id: "",
      nome: "",
      email: "",
      senha: "",
      cep: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: ""
    },
    usuario_produtos: null
  },
  mutations: {
    UPDATE_LOGIN(state, payload){
      state.login = payload;
    },
    UPDATE_USUARIO(state, payload){
      state.usuario = Object.assign(state.usuario, payload);
    },
    UPDATE_USUARIO_PRODUTOS(state, payload){
      state.usuario_produtos = payload;
    },
    ADD_USUARIO_PRODUTOS(state, payload){
      state.usuario_produtos.unshit(payload);
    }
  },
  actions: {
    getUsuarioProdutos(context){
      api.get(`/produto/?usuario_id=${context.state.usuario.id}`)
        .then(response => {
          context.commit("UPDATE_USUARIO_PRODUTOS", response.data)
        })
    },
    getUsuario({ commit }) {
      return api.get(`/usuario`)
        .then(response => {
          commit("UPDATE_USUARIO", response.data);
          commit("UPDATE_LOGIN", true);
        })
    },
    criarUsuario({ commit }, payload){
      commit("UPDATE_USUARIO", {id: payload.email});
      return api.post("/usuario", payload);
    },
    logarUsuario(context, payload) {
      const dadosUser = {
        username: payload.email,
        password: payload.senha,
      }
      return api.login(dadosUser)
        .then(response => {
          window.localStorage.token = `Bearer ${response.data.token}`;
        });
    },
    deslogarUsuario({ commit }){
      commit("UPDATE_USUARIO", {
        id: "",
        nome: "",
        email: "",
        senha: "",
        cep: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: ""
      });
      window.localStorage.removeItem("token");
      commit("UPDATE_LOGIN", false);
    }
  },
  modules: {
  }
})
