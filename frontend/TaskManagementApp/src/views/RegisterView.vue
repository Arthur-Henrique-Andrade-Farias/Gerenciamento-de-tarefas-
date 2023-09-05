<script setup>

import {reactive} from 'vue'
import router from "@/router";

const user = reactive({});

function register(){
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  }
  fetch("/register", requestOptions)
  .then(response => response.json())
  .then(data => {
    if(data.message === "User registered"){
      router.back()
    }
  })

}

</script>

<template>
    <section>
      <label>Email: </label> 
      <input type="text" placeholder="Email" v-model="user.email" required>
      <label>Senha:</label>
      <input type="text" placeholder="Senha" v-model="user.password" required>
      <label>Confirme a senha:</label>
      <input type="text" placeholder="Confirmar senha" required>
      <label>Nome de usuário:</label>
      <input type="text" placeholder="Nome de usuário" v-model="user.username" required>
      <label>Nome:</label>
      <input type="text" placeholder="Nome" v-model="user.name" required>
      <button @click="register">Cadastrar</button>
    </section>
</template>
