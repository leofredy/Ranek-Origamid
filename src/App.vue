<template>
  <div id="app">
    <TheHeader />
    <main>
      <transition mode="out-in">
        <router-view />
      </transition>
    </main>
    <TheFooter />
  </div>
</template>

<script>

import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';
import { api } from "@/services.js";

export default {
  components: {
    TheHeader,
    TheFooter
  },
  created() {
    if (window.localStorage.token) {
      api.validateToken()
        .then(() => {
          this.$store.dispatch("getUsuario");
        })
        .catch(() => {
          window.localStorage.removeItem("token");
        });
    }
  }
}
</script>

<style>

* {
  box-sizing: border-box;
}

body,
ul, 
li, 
h1, 
h2, 
p {
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
}

body {
  font-family: "Poppins", sans-serif;
  color: #345;
  background: url("./assets/pattern.svg") repeat top;
}

a {
  color: #345;
  text-decoration: none;
}

img {
  max-width: 100%;
  display: block;
}

#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

main {
  flex: 1;
}

.btn {
  display: block;
  padding: 10px 30px;
  font-size: 1rem;
  font-family: "Poppins", sans-serif;
  text-align: center;
  background-color: #87f;
  color: #FFF;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
  transition: all 0.3s;
  border: none;
  cursor: pointer;
}

.btn:hover {
  background-color: #65d;
  transform: scale(1.1);
}

.btn-disabled,
.btn-disabled:hover {
  background-color: #bbc;
  transform: scale(1);
  cursor: not-allowed;
}

label {
  margin-bottom: 5px;
}

input,
textarea {
  width: 100%;
  padding: 15px;
  margin-bottom: 15px;
  font-size: 1rem;
  font-family: "Poppins", sans-serif;
  border: 1px solid #FFF;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  transition: all 0.3s;
}

input:hover,
input:focus,
textarea:hover,
textarea:focus  {
  outline: none;
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  border-color: #87f;
}

.v-enter, 
.v-leave-to {
  opacity: 0;
  transform: translate3d(-40px, 0, 0);
}

.v-enter-to, 
.v-leave-active {
  transition: 0.3s ease;
}

</style>
