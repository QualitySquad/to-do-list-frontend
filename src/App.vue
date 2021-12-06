<template>
  <div id="app">
    <!-- <NavBar /> -->
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
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  list-style: none;
  font-family: 'Roboto', sans-serif;
  border: none;
}
body {
  background:
    linear-gradient(
      rgba(255, 255, 255, 0.137),rgba(255, 255, 255, 0.137)
    ),
    url('./assets/img/bg.png') no-repeat;
}


</style>
