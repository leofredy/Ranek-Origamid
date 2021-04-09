export const mixin = {
  filters: {
    transformarMoeda(number){
      return Number(number).toLocaleString('pt-BR', {
        style: "currency",
        currency: "BRL"
      });
    }
  }
}