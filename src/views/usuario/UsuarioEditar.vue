<template>
  <section>
    <UsuarioForm>
      <button @click.prevent="atualizarUsuario" class="btn">Atualizar Usuario</button>
      <ErroNotificacao id="user-editar-erro" :erros="erros"/>
    </UsuarioForm>
  </section>
</template>

<script>

import UsuarioForm from "@/components/UsuarioForm.vue";
import { api } from "@/services.js";

export default {
  name: "UsuarioEditar",
  components: {
    UsuarioForm,
  },
  data() {
    return {
      erros: [],
    }
  },
  methods: {
    atualizarUsuario(){
      this.erros = [];
      api.atualizar("/usuario", this.$store.state.usuario)
        .then(() => {
          this.$store.dispatch("getUsuario");
          this.$router.push({name: "Usuario"});
        })
        .catch(error => {
          this.erros.push(error.response.data.message);
        });
      
    }
  }
}
</script>

<style scoped>

.erro {
  display: flex;
  justify-content: flex-start;
}


</style>