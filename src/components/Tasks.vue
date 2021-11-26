<template>
  <div class="container">
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
      <input type="search" v-model="busca" placeholder="Busque por uma tarefa">
    </div>
    <table>
      <tr class="title">
        <td>#</td>
        <td><i class="fas fa-sort-alpha-down" @click="ordemTarefas()"></i> Tarefas</td>
        <td>Ações</td>
      </tr>
      <tr v-for="tarefas in ordemAlfabetica" :key="tarefas.id">
        <td><input type="checkbox" /></td>
        <td class="descricao testandoCor" v-if="tarefas.finalizado == 1">
          <span>{{ tarefas.task }}</span>
        </td>
        <td class="descricao" v-else>
          <span>{{ tarefas.task }}</span><td>
        </td>
        <td>
          <button @click.prevent="putTasks(tarefas)">
            <i class="far fa-edit"></i>Editar
          </button>
          <button @click.prevent="deleteTasks(tarefas.id)">
            <i class="far fa-trash-alt"></i>Excluir
          </button>
          <button v-if="tarefas.finalizado === false" @click.prevent="finalizarTasks(tarefas)">
            <i class="far fa-check-circle"></i>Finalizar
          </button>
          <button v-else @click.prevent="finalizarTasks(tarefas)">
           <i class="fas fa-reply"></i>Revisar
          </button>
        </td>
      </tr>
    </table>

    <div class="botoes">
      <div>
        <button><i class="fas fa-check-double"></i>Selecionar Todos</button>
        <button>
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

export default {
  name: "Tasks",
  components: {
  },
  data() {
    return {
      teste: null,
      busca: null,
      data: [{
        id: [],
        task: [],
        finalizado: [],
      }],
      sortBy: 'task',
      sortDirection: '',
      input: {
        task: "",
        finalizado: null,
      },
      editInput: {
        id: null,
        task: null,
        finalizado: null,
      },
    };
  },

  async mounted() {
    await this.getTasks()
  },

  computed: {
    ordemAlfabetica: function () {
      if(this.busca != null){
        return this.data
      .filter((tasks) => {
        return (
          tasks.task.match(this.busca)
        )
      })
      }else{
        return this.data.sort((p1, p2) => {
        let modifier = 1;
        if(this.sortDirection === 'desc') modifier = -1;
        if(p1[this.sortBy] < p2[this.sortBy]) return -1 * modifier;
        if(p1[this.sortBy] > p2[this.sortBy]) return 1 * modifier;
        return 0;
      })
      }
    },
  },

  methods: {
    async ordemTarefas() {
      if (this.sortDirection === ''){
        this.sortDirection = "asc"
      }else if (this.sortDirection === 'asc'){
        this.sortDirection = 'desc'
      }else if (this.sortDirection === 'desc'){
        this.sortDirection = "asc"
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
        console.log(task.task)
        await AxiosPut.putTask(task);
        this.limpaEditInput();
        await this.getTasks();
      }else {
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

    async finalizarTasks(tarefas, index) {
      let task;
      if (tarefas.finalizado === false) {
        task = {
          id: tarefas.id,
          task: tarefas.task,
          finalizado: 1,
        };
      } else {
        task = {
          id: tarefas.id,
          task: tarefas.task,
          finalizado: 0,
        };
      }
      await AxiosPut.putTask(task);
      await this.getTasks();
    },
  },
};
</script>

<style scoped>
.testandoCor {
  background-color: rgba(21, 226, 89, 0.616);
}
.fa-sort-alpha-down{
  cursor: pointer;
}

.container {
  margin: 2% 0 0 20%;
  width: 100%;
  max-width: 1100px;
  align-items: center;
}

.container .title {
  font-weight: 700;
  font-size: 20px;
}

.inputTask {
  width: 45%;
  height: 38px;
  padding: 5px 15px;
  font-size: 18px;
  font-weight: 700;
  border: 1px solid rgba(36, 36, 36, 0.212);
  margin: 0 15px 50px 105px;
}

.descricao {
  min-width: 500px;
}

table {
  margin-bottom: 15px;
}

table {
  border-bottom: 1px solid rgba(36, 36, 36, 0.212);
}

table,
td {
  border-top: 1px solid rgba(36, 36, 36, 0.212);
  border-collapse: collapse;
  padding: 2px 30px 2px 30px;
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

@media screen and (max-width: 1450px) {
  .container {
    margin: 2% 0 0 20%;
    width: 100%;
    max-width: 900px;
  }
}
@media screen and (max-width: 1150px) {
  .container {
    margin: 2% 0 0 20%;
    width: 100%;
  }
  .descricao {
    min-width: 300px;
  }
}
</style>
