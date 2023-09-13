<script setup>

import axios from 'axios'
import { onUpdated, onMounted, reactive } from 'vue';
import router from '../router';
import Task from '../components/Task.vue';

const tasks = reactive({ taskList: [] })
const flags = reactive({ newTask: false })
const newTaskItem = reactive({task :{id: -1, title: '', description: '', completion_status: false, tags: []}})

function checkSession() {
  axios.get('http://localhost:3000/checkSession').then(response => {
    if (response.status === 204) {
      console.log("Logado")
    }
  }).catch(error => {
    console.log("Nao logado")
    router.replace({ path: '/' })
  })
}

onMounted(() => {
  checkSession()
  getTasks()
})

function getTasks() {
  axios.get('http://localhost:3000/tasks').then(res => {
    tasks.taskList = res.data
    console.log(res.data)
  })
}

function newTask() {

  checkSession()

  axios.post('http://localhost:3000/tasks', newTaskItem.task).then(res => {
    newTaskItem.task.id = res.data.taskid
    tasks.taskList.push(newTaskItem.task)
    newTaskItem.task = {id: -1, title: '', description: '', completion_status: false, tags: []}
  }).catch(error => {
    console.log(error)
  })

}

function changeStatus(title) {
  let taskId = getTaskId(title)
  tasks.taskList[taskId].completion_status = !tasks.taskList[taskId].completion_status
  updateTask(tasks.taskList[taskId])
}

function updateTask(task) {
  checkSession()
  axios.post('http://localhost:3000/updateTask', task).then(res => console.log(res.data))
}

function removeTask(task) {
  axios.post('http://localhost:3000/deleteTask', { taskId: task.id }).then(res => console.log(res.data))
  tasks.taskList.splice(getTaskId(task.title), 1)
}

function getTaskId(title) {
  for (let i = 0; i < tasks.taskList.length; i++) {
    if (tasks.taskList[i].title === title) {
      return i
    }
  }
}

function logout() {
  axios.get('http://localhost:3000/logout').then(res => {
    console.log(res.data.message)
    router.replace({ path: '/' })
  }).catch(error => {
    console.log(error)
  })
}

</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900 fixed top-0 left-0 w-screen h-screen">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">

            <section>
              <input v-model="newTaskItem.task.title" type="text" name="title" id="title"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Título" required="">
              <input @keyup.enter="newTask" v-model="newTaskItem.task.description" type="text" name="desc" id="desc"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Descrição" required="">
            </section>

            <button @click="newTask"
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Nova
              Tarefa</button>

            <h1 class="text-3xl font-semibold mb-4">Lista de tarefas</h1>

            <Task v-for="t in tasks.taskList" :task="t" @changeStatus="(title) => changeStatus(title)"
              @removeTask="(t) => removeTask(t)" />
          </h1>
          <button @click="logout"
            class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Logout</button>
        </div>
      </div>
    </div>
  </section>
</template>