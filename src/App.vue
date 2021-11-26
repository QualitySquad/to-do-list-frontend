<template>
  <div id="app">
    <NavBar />
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: "App",
  components: {
    NavBar,
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;700&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  list-style: none;
  font-family: 'Roboto', sans-serif;
}
body {
  background-image: url('./assets/img/bg.jpg');
  background-size: cover;
}


</style>
