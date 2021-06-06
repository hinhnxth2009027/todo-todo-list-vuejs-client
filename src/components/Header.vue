<template>
  <header class="header">
    <h1>{{ app_name }}</h1>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      title_header: "Toto list"
    };
  },
  props: {
    app_name: {
      type: String,
    },
  },
};
</script>

<style scoped>
.header {
  height: 100px;
  background: #333;
  display: flex;
  padding-left: 50px;
  align-items: center;
}
.header h1 {
  color: #fff;
  font-size: 29px;
  font-style: italic;
}
</style>
