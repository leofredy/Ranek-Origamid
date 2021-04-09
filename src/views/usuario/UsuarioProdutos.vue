<template>
  <section>
    <h2>Adicionar Produto</h2>
    <ProdutoAdicionar/>
    <h2>Seus Produtos</h2>
    <transition-group v-if="usuario_produtos" tag="ul" name="list">
      <li v-for="(produto, index) in usuario_produtos" :key="index">
        <ProdutoItem :produto="produto">
          <p>{{produto.descricao}}</p>
          <button @click="deletarProduto(produto.id)" class="deletar">Deletar</button>
        </ProdutoItem>
      </li>
    </transition-group>
  </section>
</template>

<script>

import ProdutoAdicionar from "@/components/ProdutoAdicionar.vue";
import ProdutoItem from "@/components/ProdutoItem.vue";
import { mapState, mapActions } from "vuex";
import { api } from "@/services.js";

export default {
  name: "UsuarioProdutos",
  components: {
    ProdutoAdicionar,
    ProdutoItem
  },
  computed: {
    ...mapState(["login", "usuario", "usuario_produtos"]),
  },
  methods: {
    ...mapActions(["getUsuarioProdutos"]),
    deletarProduto(produtoID){
      const confirmar = window.confirm("Deseja remover este produto?");
      if (confirmar) {
        api.deletar(`/produto/${produtoID}`)
          .then(() => this.getUsuarioProdutos())
          .catch(error => console.log(error))
      }
    }
  },
  watch: {
    login(){
      this.getUsuarioProdutos();
      /** Essa watch garante que
       * se o componente já foi criado,
       * mas ainda não tenha realizado a
       * mutação do login do usuario,
       * vai realizar uma segunda chamada!
       * */ 
    }
  },
  created() {
    if (this.login) {
      this.getUsuarioProdutos();
    }
  }
}
</script>

<style scoped>

h2 {
  margin-bottom: 20px;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translate3d(20px, 0, 0);
}

.list-enter-active,
.list-leave-active {
  transition: all .3s;
}

.deletar {
  position: absolute;
  top: 0px;
  right: 0px;
  background: url("../../assets/remove.svg") no-repeat center center;
  width: 24px;
  height: 24px;
  text-indent: -140px;
  overflow: hidden;
  cursor: pointer;
  border: none;
}

</style>