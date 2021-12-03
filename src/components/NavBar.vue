<template>
  <div>
    <div id="btn">
      <i id="iconeBotao" class="fas fa-bars" @click="teste()"></i>
    </div>
    <div id="menu">
      <div class="logo">
        <img src="../assets/img/logo.png" alt="" />
      </div>
      <div class="links" @click="finishTasks()">
        <div>
          <router-link to="/"><i class="fas fa-tasks"></i>Tarefas</router-link>
        </div>
        <div @click="finishTasks()">
          <router-link to="/"><i class="far fa-check-circle"></i>Finalizadas</router-link>
        </div>
        <div>
          <router-link to="/"><i class="fas fa-users"></i>Sobre</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  verifica: "block",
  methods: {
    teste() {
      const menu = document.getElementById("menu");
      const btn = document.getElementById('iconeBotao')
      const verifica = menu.style.display;
      this.verifica = verifica;
      console.log(this.verifica)
      if (verifica == "none" || !verifica) {
        menu.style.display = "block";
        btn.classList.replace('fa-bars', 'fa-times');
        btn.style.marginLeft = "160px"
        btn.style.color = "#000"
      } else {
        menu.style.display = "none";
        btn.classList.replace('fa-times', 'fa-bars');
        btn.style.marginLeft = "10px"
        btn.style.color = "#fff"
      }
    },
  },
};
</script>

<style scoped>
#menu {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 150px;
  background: #c8e1ff;
  z-index: 100;
  transition: all 0.5s ease;
}

#btn {
  display: block;
}

#btn i {
  position: fixed;
  font-size: 40px;
  top: 5px;
  color: #fff;
  z-index: 1001;
  margin-left: 10px;
  cursor: pointer;
}
.logo img {
  width: 120px;
  margin: 0px 0 25px 7px;
}
.links div {
  margin: 10px 0 0 5px;
  padding: 4px;
  cursor: pointer;
}

.links div:hover {
  background-color: #fff;
}

.links div a {
  font-size: 17px;
  color: #000;
}
.links div i {
  margin-right: 10px;
}

</style>