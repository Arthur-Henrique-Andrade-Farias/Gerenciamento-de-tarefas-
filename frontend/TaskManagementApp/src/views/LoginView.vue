<script setup>

import {reactive} from 'vue'

const user = reactive({});

function login() {
    console.log(user.email,user.passoword)
}

</script>

<template>
    <h1>Seja bem vindo</h1>
    <section>
        

        <input type="text" v-model="user.email" placeholder="Usuário">
        <input type="text" v-model="user.passoword" placeholder="Senha">
        <button @click="login()">Login</button>

    </section>
    <h2>Ainda não tem conta?</h2>
    <router-link to="/register">Cadastre-se</router-link>
</template>