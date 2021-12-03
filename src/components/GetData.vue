<template>
  <div class="getData">
    <h2 id="dataAtual"></h2>   
  </div>
</template>

<script>
export default {
  name: "GetData",
  data() {
    return {
      opa: "",
    };
  },
  mounted() {
    this.getData()
  },
  methods: {

    returnSomeData(data){
      this.$emit('emitindoEventoFilhoParaPai', this.opa)
    },



    getData() {
      let data = new Date();
      
      let CodigoDia = new Array(7);
      CodigoDia[0] = "Domingo";
      CodigoDia[1] = "Segunda";
      CodigoDia[2] = "Terça-feira"
      CodigoDia[3] = "Quarta-feira"
      CodigoDia[4] = "Quinta-feira"
      CodigoDia[5] = "Sexta-feira"
      CodigoDia[6] = "Sábado"
      
      var dd = String(data.getDate()).padStart(2, '0');
      let dia = CodigoDia[data.getDay()]
      let mes = [
      'janeiro', 'fevereiro', 'março', 'abril',
      'maio', 'junho', 'julho', 'agosto', 'setembro', 
      'outubro', 'novembro', 'dezembro'][data.getMonth()]
      
      document.getElementById('dataAtual').innerText = dia + ", " + dd + " de "+ mes
    },
  },
};
</script>
<style scoped>
.getData {
  margin-left: 3px;
}
h2 {
  color: #000000;
  margin: 80px 0 25px 0;
}
@media screen and (max-width: 855px){
  .getData{
    margin: 5px 0 15px 0;
  }
}
</style>