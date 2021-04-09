<template>
  <form class="adicionar-produto">
    <label for="nome">Nome</label>
    <input v-model="produto.nome" id="nome" name="nome" type="text">

    <label for="preco">Preco (R$)</label>
    <input v-model="produto.preco" id="preco" name="preco" type="number">

    <label for="fotos">Fotos</label>
    <input ref="fotos" id="fotos" name="fotos" type="file" multiple>

    <label for="descricao">Descricão</label>
    <textarea v-model="produto.descricao" id="descricao" name="descricao"></textarea>
  
    <input @click.prevent="adicionarProduto" class="btn" type="button" value="Adicionar Produto">
  </form>
</template>

<script>

import { api } from "@/services.js";

export default {
  name: "ProdutoAdicionar",
  data(){
    return {
      produto: {
        nome: "",
        preco: "",
        descricao: "",
        fotos: null,
        vendido: "falso"
      }
    }
  },
  methods: {
    formatarProduto(){
      const form = new FormData();
      const files = this.$refs.fotos.files;

      for (let i = 0; i < files.length; i++) {
        form.append(files[i].name, files[i]);
      }

      form.append("nome", this.produto.nome);
      form.append("preco", this.produto.preco);
      form.append("descricao", this.produto.descricao);
      form.append("vendido", this.produto.vendido);
      form.append("usuario_id", this.$store.state.usuario.id);

      return form;
    },
    adicionarProduto(event){
      const produto = this.formatarProduto();

      const button = event.currentTarget;
      button.value = "Adicionando..."
      button.classList.add("btn-disabled");

      api.post("/produto", produto)
        .then(() => {
          this.$store.dispatch("getUsuarioProdutos");
          button.value = "Adicionar Produto"
          button.classList.remove("btn-disabled");
        });
    }
  }
}
</script>

<style scoped>
.adicionar-produto {
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
  margin-bottom: 60px;
}

.btn {
  grid-column: 2;
}

</style>