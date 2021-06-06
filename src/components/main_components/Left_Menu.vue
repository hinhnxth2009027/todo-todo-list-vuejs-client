<template>
  <div class="left_menu col-12 col-sm-4 col-md-4 col-lg-3 col-xl-2">
    <ul class="menu">
      <li v-on:click="create_new_working_day()" style="border:rgb(155, 128, 253) 1px solid;font-size: 18px;">+</li>      



      <li v-for="(item, index) in working_days" v-bind:key="index" v-on:click="Choice_day(item.working_day_code,item.working_day)" :class="['menu_item',item.working_day==today ? 'border_green' : 'border_red',item.working_day_code == checked ? 'checked' : '']" v-bind:id="item.working_day_code">
        <span v-if="item.working_day == today" style="color:#00ff66;">hôm nay</span>
        <span v-else >{{ item.working_day }}</span>
      </li>




    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Left_Menu",
  data() {
    return {
      working_days:[],
      today:"",
      checked:""
    };
  },
  created() {
    var date = new Date()
          var year = date.getFullYear()
          var month = `${(date.getMonth()+1)}`
          var day = `${date.getDate()}`
          var a = ""
          var b = ""
          if(month.length < 2){
              a = `0${month}`
          }
          else{
            a=month
          }
          if(day.length < 2){
              b = `0${day}`
          }
          else{
            b=day
          }
          var today = `${year}-${a}-${b}`
          this.today = today
    var checkUserlogin = localStorage.getItem("user_token");
    if (checkUserlogin == "" || checkUserlogin.length < 30) {
      var protocol = window.location.protocol;
      var host = window.location.host;
      var redirec = protocol + "//" + host + "/";
      window.location.replace(redirec);      
    } else {
      var data = {
        title:"okie"
      }
      var headers = {
        'Content-Type':'application/json',
        'token':`${checkUserlogin}`
      }
      axios.post('https://my-todo-list-appp.herokuapp.com/api/get_all_work_day',data,{ headers }).then((response)=>{
        var data = response.data.data
        for (let index = data.length-1 ; index >=0 ; index--) {
          this.working_days.push(data[index])          
        }

        var data_get_job_inday = {
            'working_day_code':data[data.length-1].working_day_code
        }      
        axios.post('https://my-todo-list-appp.herokuapp.com/api/get_all_job_in_day',data_get_job_inday,{ headers }).then((response)=>{
          var my_data = []
          for (let index = 0; index < response.data.data.length; index++) { 
            var sender = response.data.data[index]
            my_data.push(sender)            
          }
          this.$emit('job_indays',my_data)
          this.$emit('get_day',data[data.length-1].working_day)                
        })        
      },(err)=>{
        console.log(err.response.data)
      })
    }    

  },
  methods: {    
    create_new_working_day(){
      var checkUserlogin = localStorage.getItem("user_token");
      var working_data ={
        today:this.today
      } 
      var headers = {
        'Content-Type':'application/json',
        'token':`${checkUserlogin}`
      }
      axios.post('https://my-todo-list-appp.herokuapp.com/api/create_new_working_day',working_data,{ headers }).then((response)=>{
        if(response.data.code === 201){          
         var data = response.data.data          
            this.working_days = data.reverse()          
        }
        else if(response.data.code === 200){
          alert(response.data.message)
        }        
      },(err)=>{
        console.log(err.response.data)
      })
    },
    Choice_day(day_code,day){

      var checkUserlogin = localStorage.getItem("user_token");
      var data_get_job_inday = {
            'working_day_code':day_code
        } 
      var headers = {
        'Content-Type':'application/json',
        'token':`${checkUserlogin}`
      }

      axios.post('https://my-todo-list-appp.herokuapp.com/api/get_all_job_in_day',data_get_job_inday,{ headers }).then((response)=>{
          var my_data = []
          for (let index = 0; index < response.data.data.length; index++) { 
            var sender = response.data.data[index]
            my_data.push(sender)            
          }
          this.$emit('job_indays',my_data)
          this.$emit('get_day',day)
        }) 

        this.checked = day_code
        if(window.innerWidth <= 575){
          this.$emit('scroll_to_view',1)
        } 



        
    }
  },
};
</script>

<style scoped>
.menu {
  list-style: none;
  padding: 0;
}
.menu li:hover {
  background: rgb(74, 138, 138);
  color: aliceblue;
}

::-webkit-scrollbar {
  width: 0;
}

.menu li {
  margin: 5px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(166, 166, 167);
  cursor: pointer;
  transition: 0.3s;
  border-radius: 3px;
}

.menu_item {  
  font-size: 18px;
}


.border_red {
  border: rgb(253, 84, 126) 1px solid;
}

.border_green {
  border: rgb(102, 248, 73) 1px solid;
}

.left_menu {
  padding-top: 10px;
  border-right: 1px solid white;
  overflow: scroll;
}

@media only screen and (max-width: 575px) {
  .left_menu {
    padding-top: 10px;
    height: 100%;
    border-right: 0px solid white;
    margin: 10px 0;
  }
}

.checked{
  background: rgb(99, 98, 98);
  color: azure !important;
  border: rgb(145, 14, 145) 2px solid;
}
</style>
