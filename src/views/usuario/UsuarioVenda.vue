<template>
  <section>
    <div v-if="vendas">
      <h2>Vendas</h2>
      <div v-for="(venda, index) in vendas" :key="index" class="produto-wrapper">
        <ProdutoItem v-if="venda.produto" :produto="venda.produto">
          <p class="vendedor">
            <span>Comprador</span>
            {{venda.comprador_id}}
          </p>
        </ProdutoItem>
        <div class="entrega">
          <h3>Entrega:</h3>
          <ul v-if="venda.endereco">
            <li v-for="(value, key) in venda.endereco" :key="key">
              {{key}}: {{value}}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <PaginaCarregando v-else />
  </section>
</template>

<script>

import ProdutoItem from "@/components/ProdutoItem.vue";
import { api } from "@/services.js";
import { mapState } from "vuex";

export default {
  name: "UsuarioCompra",
  components: { 
    ProdutoItem,
  },
  data()  {
    return {
      vendas: null,

    }
  },
  computed: {
    ...mapState(["usuario", "login"]),
  },
  methods: {
    getVendas() {
      api.get(`/transacao?tipo=vendedor_id`)
        .then(response => this.vendas = response.data);
    }
  },
  watch: {
    login() {
      this.getVendas();
    }
  },
  created() {
    if (this.login) {
      this.getVendas();
    }
  }
}
</script>

<style scoped>
.produto-wrapper {
  margin-bottom: 40px;
}

.vendedor span {
  color: #e80;
}

h2 {
  margin-bottom: 20px;
}


.entrega {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  gap: 20px;
  margin-bottom: 60px;
}

h3 {
  justify-self: end;
  margin: 0px;
}

@media(max-width: 500px) {
  .entrega { 
    grid-template-columns: 1fr;
  }

  h3 {
    justify-self: start;
  }
}
</style>