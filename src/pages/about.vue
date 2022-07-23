<script setup>
import { ref } from "vue"
import Navbar from '../components/navbar.vue'
import Banner from '../components/banner.vue'
import Logo from '../assets/img/logo.png'

const isDescShow = ref(false);

</script>
<template>
<Navbar color="bg-red-400"/>
<Banner 
@click="isDescShow = !isDescShow"
title="Ini About" 
color="bg-purple-300" 
text-color="text-white"
:image= "Logo"
desc = "ini adalah deskripsi dari about yang belum jadi"
:is-show="isDescShow"

/>
</template>