<template>

  <ul v-if="paginasTotal > 1">
    <li v-for="pagina in paginas" :key="pagina">
      <router-link :to="{query: query(pagina)}">{{pagina}}</router-link>
    </li>
  </ul>

</template>

<script>
export default {
  name: "ProdutosPaginar",
  props: {
    produtosTotal: {
      type: Number,
      default: 1
    },
    produtosPorPagina: {
      type: Number,
      default: 1
    },
  },
  methods: {
    query(pagina){
      return {
        ...this.$route.query, 
        _page: pagina
      };
    }
  },
  computed: {
    paginas(){
      /*
      *   Função retorna um periodo de paginas 
      * que deve aparece, conforme a atual
      */
      const currentPage = Number(this.$route.query._page); //pega a pagina atual, atraves da url query
      const range = 6;
      const offset = Math.ceil(range / 2); //função arredonda pra cima
      const total = this.paginasTotal;
      const pagesArray = [];

      for(let i = 1; i <= total; i++){
        pagesArray.push(i);
      }

      pagesArray.splice(0, currentPage - offset);
      pagesArray.splice(range, total);

      return pagesArray;
    },

    paginasTotal(){
      const total = this.produtosTotal / this.produtosPorPagina;
      return total !== Infinity ? Math.ceil(total) : 0;
    }
  },
}
</script>

<style scoped>

ul {
  grid-column: 1 / -1;
}

li {
  display: inline-block;
}


li a {
  padding: 2px 8px;
  margin: 4px;
  border-radius: 2px;
}

li a.router-link-exact-active,
li a:hover {
  background-color: #87f;
  color: #fff;
}

</style>