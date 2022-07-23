<script setup>
defineProps({
    title: "",
    color: "",
    textColor:"",
    descColor:"",
    image:"",
    desc: "",
    isShow: false,
});
</script>

<template>  
<main :class="color" class="flex bg-purle-400 h-screen w-full justify-center px-6">
    <div class="flex items-center justify-between w-full">
        <div class="flex flex-col">
            <h1 :class="tiitleColor" class="text-black-900 font-medium text-3xl">
            {{ title }}
            </h1>
            <p v-if="isShow" :class="descColor" class="max-w-sm">
            {{ desc }}
            </p>
        </div>
        <img width="500" :src="image" alt="">
    </div>
</main>
</template>