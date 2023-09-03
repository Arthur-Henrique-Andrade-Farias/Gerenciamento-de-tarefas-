<script setup>

import {reactive} from 'vue'

const user = reactive({});

function register(){
    console.log(user.name,user.email,user.password)
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
      <button @click="register()">Cadastrar</button>
    </section>
</template>
