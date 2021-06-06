<template>
  <main class="main row">
<router-view  ></router-view >
  </main>
</template>

<script>

export default {
  name: "Main",
};
</script>

<style scoped>
.main {
  height: 740px;
  margin: 1px 0;
  background: #333;
}

.main h1 {
  font-family: sans-serif;
  font-style: italic;
  font-size: 29px;
  color: aliceblue;
}

.row{
    --bs-gutter-x:0;
}


</style>
