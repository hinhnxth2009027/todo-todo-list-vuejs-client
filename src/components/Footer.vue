<template>
  <footer class="footer" v-on:dblclick="show_author">
    <h1>{{ app_footer }}</h1>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      footer_title: "Footer",
    };
  },
  props: {
    app_footer: {
      type: String,
    },
  },
  methods:{
    show_author(){
        alert('Made by - hjnh nguyen xuan')
    }
  }
};
</script>

<style scoped>
.footer {
  height: 100px;
  display: flex;
  padding-left:50px ;
  align-items: center;
  background: #333;
}
.footer h1 {
  color: aliceblue;
  font-size: 29px;
  font-style: italic;
}
</style>
