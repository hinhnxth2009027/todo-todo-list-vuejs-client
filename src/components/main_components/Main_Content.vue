<template>
  <div
    class="content col-sm-8 col-md-8 col-lg-9 col-xl-10">    
    <div class="nav_bar">
      <button v-if="send_day === curenDate" data-toggle="modal" data-target="#exampleModal" v-on:click="remove_mess()">New</button>
      <button data-toggle="modal" data-target="#exampleModal2">Logout</button>      
    </div>
    <div class="nav_bar2">
      <p v-if="job_indays.length >= 1" style="color:#fff;">các đầu việc trong ngày {{ send_day }}</p>
      <p v-if="job_indays.length < 1" style="color:rgb(250, 118, 118);">Bạn không có đầu việc nào trong ngày <span v-if="send_day === curenDate">hôm nay</span> {{ send_day }}</p>
    </div>
    



    <div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel2" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel2">
              logout confirmation
            </h5>
          </div>
          
          <div class="modal-footer">
            <button type="button" v-on:click="logOut()" class="btn btn-danger" data-dismiss="modal">Confirm </button>
            <button type="button" class="btn btn-warning" data-dismiss="modal" >Close </button>
          </div>
        </div>
      </div>
    </div>




    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Add new tasks you will do for the day
            </h5>
          </div>
          <div class="modal-body">
            <form>
              <div class="row">
                <div class="form-group col-6">
                  <label for="start-time">Start Time</label>
                  <input id="start-time" v-model="start_time" type="time" class="form-control"/>
                </div>
                <div class="form-group col-6">
                  <label for="end-time">End Time</label>
                  <input
                    id="end-time"
                    v-model="end_time"
                    type="time"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="row">
                <div class="form-group col-12">
                  <label for="work">Work</label>
                  <input
                    id="work"
                    v-model="work"
                    type="text"
                    class="form-control"
                  />
                </div>
              </div>
            </form>
          </div>
          <div style="text-align:center;">
            <p>  <span class="txtColor_good">{{ mesage_good }}</span><span class="txtColor_err">{{ mesage_err }}</span> </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">
              Close
            </button>
            <button
              type="button"              
              class="btn btn-primary"              
              v-on:click="create_new_job_inday()"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <ul>
      <li v-for="(item, index) in job_indays" v-bind:key="index" :class="[ item.status === 1 || item.status === -1 ? 'status_start' : 'status_done']">
        <div class="col-12 row">
          <div v-if="curenDate === send_day" class="col-3 col-sm-3 col-md-2">
            <i v-if="item.status === 1" class="fas fa-bars " data-toggle="dropdown"></i>
            <i v-else-if="item.status === 0" class="fas fa-check-circle" data-toggle="dropdown"></i>
            <i v-else class="fas fa-skull" data-toggle="dropdown"></i>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a v-if="item.status !== 0 && item.status !== -1" v-on:click="set_done_job(item.id,item.working_day_code,item.work)" class="dropdown-item">Done</a>
              <a v-if="item.status !== 0 && item.status !== -1" v-on:click="set_ignore(item.id,item.working_day_code,item.work)" class="dropdown-item">Ignore</a>
              <a v-if="item.status !== 0 && item.status !== -1" v-on:click="delete_job(item.id,item.working_day_code,item.work)" class="dropdown-item">Delete</a>
              <a v-if="item.status === 0 && item.status !== -1" class="dropdown-item">không thể update sau khi công việc đã hoàn thành</a>
              <a v-if="item.status === -1" class="dropdown-item" style="color:rgb(250, 78, 78);">Công viễ đã ở trạng thái không hoàn thành</a>
            </div>
          </div>



          <div v-else class="col-3 col-sm-3 col-md-2">
            <i v-if="item.status === 1 || item.status === -1" class="fas fa-skull" data-toggle="dropdown"></i>
            <i v-else-if="item.status === 0" class="fas fa-check-circle" data-toggle="dropdown"></i>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item">Bạn chỉ được phép thay đổi trạng thái <br> công việc của ngày hiện tại</a>
            </div>
          </div>



          <div class="col show_work row">
            <div class="col-lg-4 col-xl-3">
              <p>{{ item.start_time }} -- to -- {{ item.end_time }}</p>
            </div>
            <div class="col-lg-8 col-xl-9 work_tranform">
              <p>work : {{ item.work }}</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Main_Content",
  props:{
    job_indays:{
      type:Array
    },
    send_day:{
      type:String
    }
  }
  ,
  data() {
    return {
      work: "New word",
      start_time: "00:00",
      end_time: "00:00",      
      curenDate:"",
      mesage_err:"",
      mesage_good:""
    };
  },
  methods: {
    logOut(){
        localStorage.setItem('user_token','')
        var protocol = window.location.protocol;
            var host = window.location.host;
            var redirec = protocol + "//" + host + "/";
            window.location.replace(redirec);
    },
    create_new_job_inday(){
      if (this.work === 'New word' || this.work === '') {
        this.mesage_err = "Vui lòng nhập công việc cụ thể"
        this.mesage_good = ""
      }
      else{
        var checkUserlogin = localStorage.getItem("user_token");
        var data = {
          work:this.work,
          start_time:this.start_time,
          end_time:this.end_time
        }
        var headers = {
        'Content-Type':'application/json',
        'token':`${checkUserlogin}`,
        'today':this.curenDate
        }
        axios.post('/api/create_new_job_in_date',data,{ headers }).then((response)=>{
          console.log(response.data)
          this.mesage_err = ""
          this.mesage_good = response.data.message
          this.start_time = "00:00"
          this.end_time = "00:00"
          this.work = "New word"
          this.$emit('job_indays',response.data.data)
          this.$emit('get_day',this.curenDate)          
        },(err)=>{
          console.log(err.response.data)
          this.mesage_err = err.response.data.message
          this.mesage_good = ""
        })
      }      
    },
    remove_mess(){
      this.mesage_good = ""
      this.mesage_err = ""
    },
    delete_job(id,working_day_code,work){
      if(confirm('Xác nhận xóa đầu việc này')){
        var dataa = {
            'id':id,
            'working_day_code':working_day_code
        }
        var checkUserlogin = localStorage.getItem("user_token");
        var headers = {
        'Content-Type':'application/json',
        'token':`${checkUserlogin}`,
        }
        axios.post('/api/delete_job_in_day',dataa , { headers }).then((response)=>{
          alert('đã xóa : '+ work)
          this.$emit('job_indays',response.data.data)
          this.$emit('get_day',this.curenDate)
        },(err)=>{
          alert(err.response.data.message)
        })        
      }else{
        alert('Đã hủy thao tác xóa')
      }
    },

    set_done_job(id,working_day_code,work){
      if(confirm('Xác nhận hoàn thành đầu việc này')){
        var dataa = {
            'id':id,
            'working_day_code':working_day_code
        }
        var checkUserlogin = localStorage.getItem("user_token");
        var headers = {
        'Content-Type':'application/json',
        'token':`${checkUserlogin}`,
        }
        axios.post('/api/update_done_job_in_day',dataa , { headers }).then((response)=>{
          alert('đã hoàn thành : '+ work)
          this.$emit('job_indays',response.data.data)
          this.$emit('get_day',this.curenDate)
          console.log(response.data.data)
        },(err)=>{
          alert(err.response.data.message)
        })        
      }else{
        alert('Đã hủy thao tác')
      }
    },
    set_ignore(id,working_day_code,work){
      if(confirm('Xác nhận không thể hoàn thành đầu việc này')){
        var dataa = {
            'id':id,
            'working_day_code':working_day_code
        }
        var checkUserlogin = localStorage.getItem("user_token");
        var headers = {
        'Content-Type':'application/json',
        'token':`${checkUserlogin}`,
        }
        axios.post('/api/update_NOT_COMPLETED_job_in_day',dataa , { headers }).then((response)=>{
          alert('đã khóa : '+ work+' dưới trạng thái không thể hoàn thành')
          this.$emit('job_indays',response.data.data)
          this.$emit('get_day',this.curenDate)
          console.log(response.data.data)
        },(err)=>{
          alert(err.response.data.message)
        })        
      }else{
        alert('Đã hủy thao tác')
      }
    }

  },
  created(){
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
          this.curenDate = today
  }
};
</script>

<style scoped>
.content {
  height: 100%;
  padding: 10px;
  overflow: scroll;
}
::-webkit-scrollbar {
  width: 0;
}

ul {
  list-style: none;
  padding: 0;
}

ul li {
  border-radius: 5px;
  height: 100px;
  overflow: hidden;
  margin: 10px 0;
}

.status_done {
border: rgb(113, 241, 113) 2px solid;
}

.status_start {
border: rgb(250, 78, 78) 2px solid;
}



.nav_bar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin-bottom: 20px;
}

.nav_bar2 p {
  font-size: 17px;
}
.nav_bar2 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;  
}



.nav_bar button:hover {
  background: rgb(10, 10, 10);
}
.nav_bar button {
  width: 130px;
  border: rgb(2, 255, 57) 2px solid;
  color: white;
  height: 40px;
  transition: 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(41, 41, 41);
  border-radius: 5px;
  font-style: italic;
  margin: 0 5px;
}
.fa-bars {
  color: rgb(255, 255, 255);
  font-size: 30px;
  line-height: 90px;
  margin-left: 30px;
  cursor: pointer;
  transition: 0.4s;
}

.fa-skull {
  color: rgb(214, 100, 100);
  font-size: 30px;
  line-height: 90px;
  margin-left: 30px;
  cursor: pointer;
  transition: 0.4s;
}

.fa-check-circle {
  color: rgb(122, 238, 128);
  font-size: 30px;
  line-height: 90px;
  margin-left: 30px;
  cursor: pointer;
  transition: 0.4s;
}

.fa-bars:hover {
  color: rgb(250, 118, 118);
}
.dropdown-item {
  cursor: pointer;
}

.show_work {
  height: 100px;
}

.show_work p {
  color: white;
  margin: 0;
}

@media only screen and (min-width: 992px) {
  .show_work div {
    height: 100%;
    display: flex;
    align-items: center;
  }
  
}
@media only screen and (max-width: 991px) {
  .show_work div {
    height: 50%;
    padding-top: 5px;
    display: block;
  }
  .work_tranform {
    transform: translateY(-15px);
  }
}
label {
  color: black;
}

.txtColor_err{
  color: rgb(247, 90, 90);
}
.txtColor_good{
  color: rgb(57, 189, 90);
}





</style>
