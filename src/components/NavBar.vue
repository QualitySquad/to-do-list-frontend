<template>
  <div>
      <div class="menu">
          <div id="btn">
              <i class="fas fa-bars" @click="opa()"></i>
          </div>
          <div class="logo">
              <img src="../assets/img/logo.png" alt="">
          </div>
          <div class="links">
              <div>
                  <router-link to="/"><i class="fas fa-tasks"></i>Tarefas</router-link>
              </div>
              <div>
                  <router-link to="/"><i class="fas fa-users"></i>Equipe</router-link>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    opa(){alert("opa")},
    responsive() {
      let btn = document.querySelector("#btn");
      let menu = document.querySelector(".menu");
      let searchBtn = document.querySelector(".fa-search");

      btn.onclick = function () {
        menu.classList.toggle("active");
      };
      searchBtn.onclick = function () {
        menu.classList.toggle("active");
      };
    },
  },
};
</script>

<style scoped>
.menu{
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 220px;
  background: #2a343b;
  z-index: 100;
  transition: all 0.5s ease;
}
#btn i {
    display: none;
    position: relative;
    font-size: 35px;
    color: #fff;
    left: 85%;
    margin-top: 15px;
    cursor: pointer;
}
.logo img {
    width: 200px;
    margin: 25px 0 25px 7px;
}
.links div {
    margin: 10px 0 0 5px;
    padding: 4px;
    cursor: pointer;
}

.links div:hover {
  background-color: #191d20;
}

.links div a {
    font-size: 25px;
    color: #fff;
}
.links div i {
    margin-right: 10px;
}
</style>