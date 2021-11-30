<template>
  <div class="container">
    <GetData />
    <div class="inputs">
      <div class="addtask">
      <input
        class="inputTask"
        type="text"
        v-model="input.task"
        v-on:keyup.enter="postTasks()"
        placeholder="Adicione uma nova tarefa"
      />
    </div>
    <div class="busca">
      <input
        class="buscaTask"
        type="search"
        v-model="busca"
        placeholder="Busque por uma tarefa"
      />
    </div>
    </div>
    <table>
      <thead>
        <tr class="title">
          <th>#</th>
          <th>
            <i class="fas fa-sort-alpha-down" @click="ordemTarefas()"></i>
            Tarefas
          </th>
          <th>Ações</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="tarefas in ordemAlfabetica" :key="tarefas.id">
          <td class="checkbox"><input type="checkbox" :value="tarefas" v-model="allSelected" @change="selectCheckbox()"/></td>
          <td
            class="descricao"
            :class="{ testandoCor: tarefas.finalizado == 1 }"
          >
            <span><input class="checkboxMobile" type="checkbox" /> {{ tarefas.task }}</span>
          </td>
          <td>
            
            <button @click.prevent="putTasks(tarefas)">
              <i class="far fa-edit"></i>Editar
            </button>
            <button @click.prevent="deleteTasks(tarefas.id)">
              <i class="far fa-trash-alt"></i>Excluir
            </button>
            <button
              v-if="tarefas.finalizado === false"
              @click.prevent="finalizarTasks(tarefas)"
            >
              <i class="far fa-check-circle"></i>Finalizar
            </button>   
          </td>
        </tr>
      </tbody>
    </table>

    <div class="botoes">
      <div>
        <button @click="selectAll()"><i class="fas fa-check-double"></i>Selecionar Todos</button>
        <button @click="finalizarSelecionados()">
          <i class="far fa-check-circle"></i>Finalizar Selecionados
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import AxiosGet from "../service/getTask";
import AxiosPost from "../service/postTask";
import AxiosPut from "../service/putTask";
import AxiosDelete from "../service/deleteTask";
import GetData from './GetData.vue'

export default {
  name: "Tasks",
  components: {
    GetData
  },
  data() {
    return {
      teste: null,
      busca: null,
      data: [
        {
          id: [],
          task: [],
          finalizado: [],
        },
      ],
      sortBy: "task",
      sortDirection: "",
      input: {
        task: "",
        finalizado: null,
      },
      editInput: {
        id: null,
        task: null,
        finalizado: null,
      },
      selected: [],
      allSelected: [],
      selecionados: [],
    };
  },

  async mounted() {
    await this.getTasks();
  },

  computed: {
    ordemAlfabetica: function () {
      if (this.busca != null) {
        return this.data.filter((tasks) => {
          return tasks.task.match(this.busca);
        });
      } else {
        return this.data.sort((p1, p2) => {
          let modifier = 1;
          if (this.sortDirection === "desc") modifier = -1;
          if (p1[this.sortBy] < p2[this.sortBy]) return -1 * modifier;
          if (p1[this.sortBy] > p2[this.sortBy]) return 1 * modifier;
          return 0;
        });
      }
    },
  },

  methods: {
    async ordemTarefas() {
      if (this.sortDirection === "") {
        this.sortDirection = "asc";
      } else if (this.sortDirection === "asc") {
        this.sortDirection = "desc";
      } else if (this.sortDirection === "desc") {
        this.sortDirection = "asc";
      }
    },

    async getTasks() {
      const res = await AxiosGet.getTask();
      const task = res.data;
      this.insertData(task);
    },

    insertData(data) {
      this.data = data;
    },

    async postTasks() {
      if (this.editInput.id != null) {
        const task = this.editInput;
        task.task = this.input.task;
        console.log(task.task);
        await AxiosPut.putTask(task);
        this.limpaEditInput();
        await this.getTasks();
      } else {
        const task = {
          task: this.input.task,
          finalizado: this.input.finalizado,
        };
        await AxiosPost.postTask(task);
        await this.getTasks();
      }
      this.input.task = "";
    },

    async putTasks(tarefas) {
      this.input.task = tarefas.task;
      this.editInput = {
        id: tarefas.id,
        finalizado: false,
      };
    },

    async deleteTasks(id) {
      await AxiosDelete.deleteTask(id);
      await this.getTasks();
    },

    limpaEditInput() {
      this.editInput = {
        id: null,
        task: null,
        finalizado: null,
      };
    },

    async finalizarTasks(tarefas) {
      let task;
      if (tarefas.finalizado === false) {
        task = {
          id: tarefas.id,
          task: tarefas.task,
          finalizado: 1,
      };
      }
      await AxiosPut.putTask(task);
      await this.getTasks();
    },
    selectAll() {
        this.allSelected = true;
        let selecionados = this.selecionados;
        this.ordemAlfabetica.forEach(tasks => {
          if(tasks.finalizado == false) {
            selecionados.push({
              id: tasks.id ,
              task: tasks.task,
              finalizado: tasks.finalizado,
            })
          }          
        });
    },
    async finalizarSelecionados() {
      // console.log(selecionados)
      this.selecionados.forEach(async (selecionado) => {
        selecionado = {
          ...selecionado, 
          finalizado: 1
        }
        await AxiosPut.putTask(selecionado)
      });
      await this.getTasks()
      this.allSelected = false
    },
    selectCheckbox(tasks) {
      
    }
  },
};
</script>

<style scoped>
.testandoCor {
  background-color: rgba(21, 226, 89, 0.616);
}
.fa-sort-alpha-down {
  cursor: pointer;
}

.container {
  margin: 2% 0 0 20%;
  max-width: 850px;
  width: 100%;
  align-items: center;
}

th {
  font-weight: 700;
  text-align: left;
  padding-left: 30px;
  font-size: 20px;
  color: #00c4cc;
}

.inputs {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 625px;
}

.inputTask {
  width: 100%;
  height: 38px;
  padding: 5px 15px;
  font-size: 18px;
  font-weight: 700;
  border: 1px solid rgba(36, 36, 36, 0.212);
  margin: 10px 15px 50px 3px;
}

.buscaTask {
  width: 100%;
  margin-left: 53%;
  height: 38px;
  padding: 5px 15px;
  font-size: 18px;
  font-weight: 700;
  border: 1px solid rgba(36, 36, 36, 0.212);
  margin-top: 10px;
}

input[type="text"], input[type="search"] {
  border: 1px solid rgba(165, 70, 70, 0.212)
}
input[type="text"]:hover, input[type="search"]:hover {
  border: 1px solid rgba(73, 51, 51, 0.555)
}

.checkboxMobile {
  display: none;
}

.descricao {
  width: 100%;
  width: 450px;
}

table {
  margin-bottom: 15px;
  border-bottom: 1px solid rgba(36, 36, 36, 0.212);
}

table,
td {
  border-top: 1px solid rgba(36, 36, 36, 0.212);
  border-collapse: collapse;
  padding: 2px 30px 2px 30px;
  position: relative;
}

.botoes {
  display: flex;
  justify-content: space-between;
}

tr td button,
.botoes button {
  padding: 10px;
  margin: 5px 5px 5px 0;
  cursor: pointer;
  color: black;
  border: 1px solid rgba(0, 0, 0, 0.329);
  background-color: transparent;
}

tr td button i {
  margin-right: 7px;
}

@media screen and (max-width: 1240px) {
  .container {
    margin: 2% 0 0 18%;
  }
  .checkbox {
    padding: 2px 0px 2px 30px;
  }
  .descricao {
    padding-right: 0;
  }
}
@media screen and (max-width: 1100px) {
  .container {
    margin: 3% 0 0 0;
  }
}
@media screen and (max-width: 855px) {
  .container {
    margin: 7% 0 0 5%;
  }
  .title, .checkbox {
    display: none;
  }
  td {
    padding: 2px 0 0 0;
    display: block;
    text-align: right;
    display: block;
    text-align: left;
    width: 100%;
  }
  .inputTask, .buscaTask {
    width: 100%;
    margin: 0 0 35px;
  }
}
</style>
