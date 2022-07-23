<script setup>
import { ref } from 'vue'
import Modal from "./modal.vue" 
import { database } from '../server'
const emits = defineEmits(['closeModal'])

const isAuthenticated = ref(false);
const currentFullname = ref("");

const isModalShow = ref(false)

const openModalLogin = () => {
    emits("openModal");
    isModalShow.value = true;
    isLogin.value     = true;
};
const openModalRegister = () => {
    emits("openModal");
    isModalShow.value = true;
    isLogin.value     = false;
};

const email       = ref("")
const username    = ref("")
const fullname    = ref("")
const password    = ref("")
const kompassword = ref("")

// syarat : username, email,password, fullname harus lebih dari 5, dan password harus sama dengan password konfirmasi (ini merupakan cara fungsinya)
const isLoginFormValid = () => {
    return email.value.includes ("@") && email.value.length > 5 && password.value.length > 5 
};
const isRegisterFormValid = () => {
    return email.value.includes ("@") && email.value.length > 5 && password.value.length > 5 && fullname.value.length > 5 && username.value.length > 5 && password.value === kompassword.value 
}; 

const isLogin = ref(false);

// ini adalah cara login sesuai data di database
const submitLogin = () => {
    currentFullname.value = database.value.filter((x) => x.email === email.value).map((x) => x.fullname)[0];
    isModalShow.value = false;
    isAuthenticated.value = true;
    email.value = "";
    password.value = "";

    // return database.value.find((email) => email === email.value);
    // atau cara ini
    // for (let i = 0; i < database.value.length; i++){
    //     database[i].email === email.value
    // }
};
const submitRegister = () => {
    const playload = {
        id: new Date(),
        username : username.value,
        email    : email.value,
        password : password.value,
        fullname : fullname.value, 
    };
    database.value.push(playload)
    isModalShow.value = false;
    email.value = "";
    password.value = "";
};
const isLogout = () =>{
    currentFullname.value = "";
    isAuthenticated.value = false;
};

</script>
<template>
<header :class="color" class="text-gray-600 body-font sticky top-0"> <!-- sticky top-0 = untuk membuat navbar mengikuti layar -->
  <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
      <span class="ml-3 text-xl">PortofolioKU</span>
    </a>
    <nav :class="navcolor" class="md:ml-auto flex flex-wrap items-center text-base justify-center">

   <!-- 3 tombol di atas navbar -->
      <router-link to="/">
          <a class="mr-5 hover:text-gray-900">Home</a>
      </router-link>
      <router-link to="/about">
          <a class="mr-5 hover:text-gray-900">About</a>
      </router-link>
      <router-link to="/contact">
          <a class="mr-5 hover:text-gray-900">Contact</a>
      </router-link>


      <div v-if="isAuthenticated">
          <span class="mr-5 hover:text-gray-900">{{ currentFullname }}</span>
          <span @click="isLogout()" class="mr-5 hover:text-gray-900">Logout</span>
      </div>
      <div v-else>
          <span @click="openModalLogin()" class="mr-5 hover:text-gray-900">Login</span>
          <span @click="openModalRegister()" class="mr-5 hover:text-gray-900">Register</span>
      </div>


    </nav>
  </div>
</header>

<Modal 
v-if="isModalShow" 
@close-modal= "isModalShow = false" 
:title="isLogin ? 'Login' : 'Register'"
:btn-text="isLogin ? 'Login' : 'Register'"
:isValid = "isLogin ? isLoginFormValid () : isRegisterFormValid ()"
@submit-modal = "isLogin ? submitLogin() : submitRegister()">


<!-- form login dan Register -->
<form>
  <div class="mb-6 " v-if = "!isLogin">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Masukan Nama</label>
    <input v-model="fullname" type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    placeholder="Nama Anda" required="">
  </div>

  <div class="mb-6 " v-if = "!isLogin">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Masukan Username</label>
    <input v-model="username" type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    placeholder="Username anda" required="">
  </div>

  <div class="mb-6">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Masukan email</label>
    <input v-model="email" type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    placeholder="email@gmail.com" required="">
  </div>

  <div class="mb-6">
    <label 
    for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Masukan password</label>
    <input v-model="password" type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    required="">
  </div>

  <div class="mb-6" v-if = "!isLogin">
    <label 
    for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Masukan Kembali password</label>
    <input v-model="kompassword" type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    required="">

  </div>
  <div class="flex items-start mb-6">
    <div class="flex items-center h-5">
      <input id="remember" type="checkbox" value="" class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required="">
    </div>
    <label 
    for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ingat Akun</label>
  </div>
</form>


</Modal>
</template>