<template>
  <div id="app">
    <Header v-bind:app_name="app_name" />
    <Main v-bind:status_time_bar="status_time_bar" />    
    <Footer v-bind:app_footer="app_footer" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";

export default {
  name: "myapp",
  components: {
    Header,
    Footer,
    Main,
  },
  created(){
    if(localStorage.getItem('user_token') === null){
      localStorage.setItem('user_token','')
    }
  }
  ,
  data() {
    return {
      app_name: "Todo List",
      app_footer: "Have a productive day",
      status_time_bar:1
    };
  }
  
};
</script>

<style></style>
