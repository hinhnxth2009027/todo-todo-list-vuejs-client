<template>
  <div id="Application" class="row">
    <i v-on:click="change_view()" class="far fa-calendar-alt"></i>
    <LeftMenu
      v-on:job_indays="data_job_inday"
      v-on:get_day="get_day"
      v-on:scroll_to_view="change_view"
      class="Menu_day none"
    />
    <MainContent
      v-on:job_indays="data_job_inday"
      v-bind:job_indays="job_inday"
      v-on:get_day="get_day"
      v-bind:send_day="send_day"
      class="show_job"
    />
  </div>
</template>

<script>
import LeftMenu from "../main_components/Left_Menu";
import MainContent from "../main_components/Main_Content";
export default {
  name: "Container",
  components: {
    LeftMenu,
    MainContent,
  },
  data() {
    return {
      job_inday: [],
      send_day: "",
    };
  },
  methods: {
    data_job_inday(sender) {
      this.job_inday = sender.reverse();
    },
    get_day(get_day) {
      this.send_day = get_day;
    },
    change_view(){
      document.querySelector('.show_job').classList.toggle('none')
      document.querySelector('.Menu_day').classList.toggle('none')
    }
  },
  
};
</script>

<style>
#Application {
  height: 100%;
  width: 100%;
  padding-right: 0;
}

@media only screen and (min-width: 576px) {  
  .fa-calendar-alt {
    display: none;
  }
}
@media only screen and (max-width: 575px) {
  .none {
    width: 0;
    overflow: hidden;
    transition: 0.6s;
  }

.none p , .none button{
    display: none;
    overflow: hidden;
  }

  .show_job{
    transition: 0.6s;
  }
  .Menu_day {
    transition: 0.6s;
  }
  .fa-calendar-alt {
    position: fixed;
    top: 30px;
    left: 88%;
    z-index: 10000;
    color: rgb(243, 114, 114);
    font-size: 30px;
    display: block;
  }
}
</style>
