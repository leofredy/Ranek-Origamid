<template>
  <form>
    <input v-model="busca" name="busca" id="busca" placeholder="Buscar..." type="text">
    <input @click.prevent="buscarProdutos" value="Buscar" id="lupa" type="submit">
  </form>
</template>

<script>
export default {
  name: "ProdutosBuscar",
  data(){
    return {
      busca: ""
    }
  },
  methods: {
    buscarProdutos(){
      this.$router.push({query: {q: this.busca}})
    }
  },
}
</script>

<style scoped>
form {
  position: relative;
  max-width: 600px;
  margin: 30px auto 60px auto;
  padding: 0 20px;
}

#busca {
  width: 100%;
  padding: 20px;
  border: none;
}

#busca:focus,
#busca:hover {
  transform: scale(1.1);
}

#lupa {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 62px;
  height: 62px;
  text-indent: 150px;
  background: url("../assets/search.svg") no-repeat center center;
  border: none;
  box-shadow: none;
  cursor: pointer;
}

</style>