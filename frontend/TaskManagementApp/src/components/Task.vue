<script setup>

const props = defineProps(['task'])

</script>

<template>
        <a :class="{'line-through': task.completion_status}" href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 @click="$emit('changeStatus', task.title)" @dblclick="$emit('removeTask', task)" class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{task.title}}</h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">{{task.description}}</p>
        </a>
</template>