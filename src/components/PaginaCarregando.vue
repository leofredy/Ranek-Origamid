<template>
  <div class="loading">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script>
export default {
  name: "PaginaCarregando"
}
</script>

<style scoped>

.loading {
  text-align: center;
}

span {
  display: inline-block;
  width: 15px;
  height: 15px;
  margin: 0 5px;
  background-color: #87f;
  border-radius: 50%;
  animation: flow 0.6s cubic-bezier(0.075, 0.82, 0.165, 1) forwards infinite alternate;
}

span:nth-child(1){
  animation-delay: 0.1s;
}
span:nth-child(2){
  animation-delay: 0.2s;
}
span:nth-child(3){
  animation-delay: 0.3s;
}
span:nth-child(4){
  animation-delay: 0.4s;
}

@keyframes flow {
  from {
    transform: translate3d(0, 40px, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}

</style>