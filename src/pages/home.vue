<script setup>
import {ref} from 'vue'
import Navbar from '../components/navbar.vue'
import Banner from '../components/banner.vue'
import Logo from '../assets/img/logo.png'


const isModalShow = ref(false);

</script>
<template>
<Navbar color="bg-blue-400"/>
<Banner 
title="home" 
color="bg-black-400" 
:image= "Logo"
desc = "ini adalah desckripsi dari about yang belum jadi"
:isShow="true"
/>
<modal v-if="isModalShow"/>
</template>