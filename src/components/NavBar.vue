<template>
  <div>
    <div id="btn">
      <i id="iconeBotao" class="fas fa-bars" @click="teste()"></i>
    </div>
    <div id="menu">
      <div class="logo">
        <img src="../assets/img/logo.png" alt="" />
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
    teste() {
      const menu = document.getElementById("menu");
      const btn = document.getElementById('iconeBotao')
      const verifica = menu.style.display;
      console.log(verifica);
      if (verifica == "none" || !verifica) {
        menu.style.display = "block";
        btn.style.margin = "15px 0 0 150px"
        btn.style.color = "#fff"
      } else {
        menu.style.display = "none";
        btn.style.margin = "15px 0 0 10px"
        btn.style.color = "#2a343b"
      }
    },
  },
};
</script>

<style scoped>
#menu {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 220px;
  background: #2a343b;
  z-index: 100;
  transition: all 0.5s ease;
}

#btn {
  display: none;
}

#btn i {
  position: relative;
  font-size: 50px;
  color: #2a343b;
  z-index: 1001;
  margin: 15px 0 0 10px;
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

@media screen and (min-width: 1000px) {
  #menu {
    display: block !important;
  }
  #menu .logo {
    margin-top: 0;
  }
  #btn {
    display: none;
  }
}

@media screen and (max-width: 1000px) {
  #menu {
    display: none;
  }
  #menu .logo {
    margin-top: 60px;
  }
  #btn {
    display: block;
  }

}

</style>