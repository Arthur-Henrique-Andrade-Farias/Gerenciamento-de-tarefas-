<script setup>

import { reactive } from 'vue'
import router from "@/router"

const user = reactive({});

function login() {
    fetch(`/login?email=${user.email}&password=${user.password}`)
    .then(response => response.json())
    .then(data => {
        if(data.message === "Accepted"){
            console.log("Logado")
            router.replace({ path: '/home' })
        }else{
            console.log(data.message)
        }
    })
}

</script>

<template>

<section class="bg-gray-50 dark:bg-gray-900 fixed top-0 left-0 w-screen h-screen" >   
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Entre com a sua conta
                </h1>
                <section class="space-y-4 md:space-y-6">
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input v-model="user.email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email@exemplo.com" required="">
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
                        <input v-model="user.password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                    </div>
                    <button @click="login" type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Logar</button>
                    <p class="text-center font-light text-gray-500 dark:text-gray-400">
                        Não tem conta ainda?? <router-link class="text-white hover:text-blue-500" to="/register">Cadastre-se</router-link>
                    </p>
                </section>
            </div>
        </div>
    </div>
  </section>
</template>

