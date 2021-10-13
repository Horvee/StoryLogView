<template>
  <div class="home">
    <search-bar></search-bar>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import SearchBar from '../components/SearchBar.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    SearchBar
  }
}
</script>
