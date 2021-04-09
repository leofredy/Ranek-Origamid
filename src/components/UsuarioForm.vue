<template>
  <form>
    <div class="usuario" v-if="mostrarDadosLogin">

      <label for="nome">Nome</label>
      <input v-model="nome" id="nome" name="nome" type="text">

      <label for="email">E-mail</label>
      <input v-model="email" id="email" name="email" type="email">

      <label for="senha">Senha</label>
      <input v-model="senha" id="senha" name="senha" type="password">


    </div>
    
    <label for="cep">Cep</label>
    <input @keyup="preencherCep" v-model="cep" id="cep" name="cep" type="text">

    <label for="rua">Rua</label>
    <input v-model="rua" id="rua" name="rua" type="text">

    <label for="numero">Numero</label>
    <input v-model="numero" id="numero" name="numero" type="text">

    <label for="bairro">Bairro</label>
    <input v-model="bairro" id="bairro" name="bairro" type="text">

    <label for="cidade">Cidade</label>
    <input v-model="cidade" id="cidade" name="cidade" type="text">
    
    <label for="estado">Estado</label>
    <input v-model="estado" id="estado" name="estado" type="text">

    <div class="button">
      <slot></slot>
    </div>

  </form>
</template>

<script>

import { mapFields, mask } from "@/helpers.js";
import { getCep } from "@/services.js";

export default {
  name: "UsuarioForm",
  data(){
    return {

    }
  },
  computed: {
    ...mapFields({
      fields: [
        "nome",
        "email",
        "senha",
        "cep",
        "rua",
        "numero",
        "bairro",
        "cidade",
        "estado",
      ],
      base: "usuario",
      mutation: "UPDATE_USUARIO"
    }),
    mostrarDadosLogin() {
      /** -> Condições para mostrar informações a mais!
       * 
       * Se login = false, logo o usuario
       * não esta logado!
       * 
       * Ou se o usuario esta na rota 
       * de Editar Usuario...
       *
      */
      return (!this.$store.state.login || (this.$route.name === "UsuarioEditar"))
    }
  },
  methods: {
    preencherCep(){
      const cep = this.cep.replace(/\D/g, "");
      if(cep.length === 8) {
        this.cep = mask(cep, "#####-###");

        getCep(cep)
          .then(response => {
            this.rua = response.data.logradouro;
            this.bairro = response.data.bairro;
            this.cidade = response.data.localidade;
            this.estado = response.data.uf;
          });
      }
    }
  }
}
</script>

<style scoped>

form,
.usuario {
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
}

.usuario {
  grid-column: 1 / 3;
}

.button {
  grid-column: 2;
  margin-top: 10px;
}

</style>