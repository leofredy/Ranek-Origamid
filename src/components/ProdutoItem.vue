<template>
  <div class="produto" v-if="produto">
    <router-link :to="{name: 'Produto', params: {id: produto.id}}" class="produto-img">
      <img v-if="produto.fotos" :src="produto.fotos[0].src" :alt="produto.fotos[0].titulo">
    </router-link>
    <div class="info">
      <p class="preco">{{produto.preco | transformarMoeda}}</p>
      <h2 class="titulo">{{produto.nome}}</h2>
      <slot></slot>
    </div>
  </div>
</template>

<script>

import { mixin } from "@/mixins/filterPreco.js";

export default {
  name: "ProdutoItem",
  props: ["produto"],
  mixins: [mixin]
}
</script>

<style scoped>

.produto {
  position: relative;
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  gap: 20px;
  margin-bottom: 40px;
}

.info {
  align-self: end;
}

.produto-img {
  height: 100px;
  overflow: hidden;
  border-radius: 4px;
}

@media(max-width: 500px) {
  .produto {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}

</style>