<template>
  <section>

    <div v-if="produto" class="produto">

      <ul v-if="produto.fotos" class="fotos">
        <li v-for="(foto, index) in produto.fotos" :key="index">
          <img :src="foto.src" :alt="foto.titulo">
        </li>
      </ul>

      <div class="info">
        <h1>{{produto.nome}}</h1>
        <p class="preco">{{produto.preco | transformarMoeda}}</p>
        <p class="descricao">{{produto.descricao}}</p>
        <transition-group v-if="produto.vendido === 'false'" mode="out-in">
          <button @click="finalizar = true" v-if="!finalizar" class="btn" key="button">Comprar</button>
          <FinalizarCompra v-else :produto="produto" key="sla"/>
        </transition-group>
        <button v-else class="btn btn-disabled" disabled>Produto Vendido</button>
      </div>

    </div>

    <PaginaCarregando v-else />
    
  </section>
</template>

<script>

import { api } from '@/services.js';
import { mixin } from '../mixins/filterPreco.js';
import FinalizarCompra from "@/components/FinalizarCompra.vue";

export default {
  name: "Produto",
  mixins: [mixin],
  props: ["id"],
  components: {
    FinalizarCompra,
  },
  data(){
    return {
      produto: null,
      finalizar: false,
    }
  },  
  methods: {
    getProduto(){
      api.get(`/produto/${this.id}`)
        .then(response => this.produto = response.data);
    }
  },
  created(){
    this.getProduto();
  }
}
</script>

<style scoped>

.produto {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  max-width: 900px;
  padding: 60px 20px;
  margin: 0 auto;
}

.preco {
  margin-bottom: 40px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #e80;
}

.fotos {
  grid-row: 1 / 3;
}

.descricao {
  font-size: 1.2rem;
}

.info {
  position: sticky;
  top: 20px;
}

img {
  margin-bottom: 30px;
  box-shadow: 0 4px 8px rgba(30px, 60px, 90px, 0.2px );
}

.btn {
  width: 200px;
  margin-top: 60px;
}

@media(max-width: 500px) {
  .produto {
    grid-template-columns: 1fr;
  }

  .fotos {
    grid-row: 2;
  }

  .info {
    position: static;
  }
}

</style>