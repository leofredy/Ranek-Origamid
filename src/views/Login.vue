<template>
  <section class="login">
    <h1>Login</h1>
    <form>
      <label for="email">E-mail</label>
      <input v-model="login.email" id="email" name="email" type="email">
      <label for="senha">E-mail</label>
      <input v-model="login.senha" id="senha" name="senha" type="password">
      <button @click.prevent="logar" class="btn">Logar</button>
      <ErroNotificacao :erros="erros"/>
    </form>
    <p class="perdeu">
      <a href="http://localhost/Ranek/wp-login.php?redirect_to=http%3A%2F%2Flocalhost%2FRanek%2Fwp-admin%2F&reauth=1" target="_blank">Perdeu a senha? Clique aqui.</a>
    </p>
    <LoginCriar />
  </section>
</template>

<script>

import LoginCriar from '@/components/LoginCriar.vue';

export default {
  name: "Login",
  components: {
    LoginCriar,
  },
  data(){
    return {
      login: {
        email: "",
        senha: "",
      },
      erros: []
    }
  },
  methods: {
    logar(){
      this.erros = [];
      this.$store.dispatch("logarUsuario", this.login)
        .then(() => {
          this.$store.dispatch("getUsuario");
          this.$router.push({ name: "Usuario" });
        })
        .catch(error => {
          this.erros.push(error.response.data.message);
        })

    }
  }
}
</script>

<style scoped>

.login {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  margin-top: 40px;
  font-size: 2rem;
  text-align: center;
  color: #87f;
}

form {
  display: grid;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}

.perdeu {
  text-align: center;
  margin: 20px auto 0 auto;
}

.perdeu a:hover {
  color: #87f;
  text-decoration: underline;
}

</style>