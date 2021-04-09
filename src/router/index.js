import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Produto from "../views/Produto.vue";
import Login from "../views/Login.vue";
import Usuario from "../views/usuario/Usuario.vue";
import UsuarioProdutos from "../views/usuario/UsuarioProdutos.vue";
import UsuarioEditar from "../views/usuario/UsuarioEditar.vue";
import UsuarioCompra from "../views/usuario/UsuarioCompra.vue";
import UsuarioVenda from "../views/usuario/UsuarioVenda.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/produto/:id",
    name: "Produto",
    component: Produto,
    props: true
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/usuario",
    component: Usuario,
    meta: {
      login: true,
    },
    children: [
      {
        path: "",   //página (produtos) padrão quando é logado, não possui caminho
        name: "Usuario",
        component: UsuarioProdutos
      },
      {
        path: "editar",
        name: "UsuarioEditar",
        component: UsuarioEditar,
      },
      {
        path: "compras",
        name: "Compras",
        component: UsuarioCompra,
      },
      {
        path: "vendas",
        name: "Vendas",
        component: UsuarioVenda,
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(){
    return {
      x: 0,
      y: 0,
      behavior: 'smooth'
    }
  }
});


router.beforeEach((to, from, next) => {
  const pegarAsPropriedadeDasRotas = to.matched;
  const pegaMetaLogin = pegarAsPropriedadeDasRotas.some(propriedadesRota => propriedadesRota.meta.login);

  if (pegaMetaLogin) {
    if (!window.localStorage.token) {
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
