<template>
  <div class="container d-flex">
    <div class="form">
      <div class="row" id="Interface_log_reg">
        <div class="col-6">
          <form v-on:submit.prevent="onSubmit">
            <h2>Login</h2>
            <div class="form-group col-12">
              <label for="email">Email</label>
              <input
                id="email"
                v-model="email"
                type="email"
                class="form-control"
                required
              />
            </div>
            <div class="form-group col-12">
              <label for="password">Password</label>
              <input
                autocomplete="off"
                v-model="password"
                id="password"
                type="password"
                class="form-control"
                required
              />
            </div>

            <div class="form-group col-12">
              <button v-on:click="login()" class="btn btn-warning">
                Login
              </button>
              <button type="reset" class="btn btn-warning">Reset</button>
            </div>
            <div class="form-group col-12">
              <a v-on:click="gotoRegister()" href="#">Register</a>
            </div>
            <div class="validate">
              <span class="err">{{ valid_messg }}</span>
            </div>
          </form>
        </div>

        <div class="col-6">
          <form action="" v-on:submit.prevent="onSubmit">
            <h2>Register</h2>
            <div class="form-group col-12">
              <label for="user_name">Full name</label>
              <input
                id="user_name"
                v-model="C_user_name"
                type="text"
                class="form-control"
                required
              />
            </div>
            <div class="form-group col-12">
              <label for="C_email">Email</label>
              <input
                id="C_email"
                v-model="C_email"
                type="email"
                class="form-control"
                required
              />
            </div>
            <div class="form-group col-12">
              <label for="C_password">Password</label>
              <input
                autocomplete="off"
                id="C_password"
                v-model="C_password"
                type="password"
                class="form-control"
                required
              />
            </div>
            <div class="form-group col-12">
              <button v-on:click="register()" class="btn btn-warning">
                Register
              </button>
              <button type="reset" class="btn btn-warning">Reset</button>
            </div>
            <div class="form-group col-12">
              <a v-on:click="gotoLogin()" href="#" id="golo_login_btn">Login</a>
            </div>
            <div class="validate">
              <span class="err">{{ valid_messg }}</span>
              <span class="success">{{ success_msg }}</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginScreen",
  data() {
    return {
      email: "",
      password: "",
      C_user_name: "",
      C_password: "",
      C_email: "",
      valid_messg: "",
      success_msg: "",
    };
  },
  created() {
    var checkUserlogin = localStorage.getItem("user_token");
    if (checkUserlogin !== "" || checkUserlogin.length > 30) {      
      var protocol = window.location.protocol; 
      var host = window.location.host;
      var redirec = protocol + "//" + host + "/home";
      window.location.replace(redirec);      
    }
  },
  methods: {
    gotoLogin() {
      var Interface_log_reg = document.getElementById("Interface_log_reg");
      Interface_log_reg.classList.remove("tranfom");
      this.valid_messg = ""
      this.success_msg = ""
    },
    gotoRegister() {
      var Interface_log_reg = document.getElementById("Interface_log_reg");
      Interface_log_reg.classList.add("tranfom");
      this.valid_messg = ""
      this.success_msg = ""
    },
    register() {
      var newUser = {
        name: this.C_user_name,
        email: this.C_email,
        password: this.C_password,
      };

      if (newUser.name.length <= 5) {
        this.valid_messg = "Vui lòng nhập tên đầy đủ";
      } else if (newUser.email.length <= 10) {
        this.valid_messg = "Vui lòng nhập email theo đúng định dạng";
      } else if (newUser.password.length <= 5) {
        this.valid_messg = "Vui lòng nhập mật khẩu an toàn hơn";
      } else {
        this.valid_messg = "";
        axios.post("/api/register", newUser).then(
          (response) => {
            var res_data = response.data;
            if (res_data.code === 201) {
              this.success_msg = res_data.message;
              this.C_password = "";
              this.C_email = "";
              this.C_user_name = "";
              var Interface_log_reg = document.getElementById(
                "Interface_log_reg"
              );
              setTimeout(function() {
                Interface_log_reg.classList.remove("tranfom");
              }, 3200);
            }
          },
          (err) => {
            if (err == "Error: Request failed with status code 500") {
              this.valid_messg = "Email này đã được sử dụng !";
              this.C_email = "";
            }
          }
        );
      }
    },
    login() {
      var user = {
        email: this.email,
        password: this.password,
      };

      if (user.email.length <= 10) {
        this.valid_messg = "Vui lòng nhập email đúng như bạn đã đăng kí";
      } else if (user.password.length < 1) {
        this.valid_messg = "Vui lòng không bỏ chống password";
      } else {
        this.valid_messg = "";
        axios.post("/api/login", user).then(
          (response) => {
            console.log(response.data);
            localStorage.setItem("user_token", response.data.data.token);
            var protocol = window.location.protocol;
            var host = window.location.host;
            var redirec = protocol + "//" + host + "/home";
            window.location.replace(redirec);
          },
          (err) => {
            this.valid_messg = err.response.data.message;
          }
        );
      }
    },
  },
};
</script>

<style>
.tranfom {
  transform: translateX(-50%);
}

.container {
  height: 100%;
  justify-content: center;
  align-items: center;
}
.form {
  height: 550px;
  width: 400px;
  border: rgb(245, 123, 123) 1px solid;
  border-radius: 8px;
  overflow: hidden;
}

.form > div {
  width: 200%;
  height: 100%;
  padding: 0;
  margin: 0;
  transition: 0.6s;
}

.form > div .col-6 {
  padding: 0 25px;
  height: 100%;
  text-align: center;
  padding-top: 20px;
}

.form > div .col-6 h2 {
  color: aliceblue;
  margin-bottom: 50px;
}

.form > div .col-6 > form > div {
  margin: 20px 0;
}

.form > div .col-6 > form > div > button {
  margin: 10px 5px 0 5px;
  font-size: 18px;
  width: 46%;
}
.form > div .col-6 > form > div > a {
  font-size: 18px;
}
.validate .err {
  color: rgb(248, 66, 66);
  font-size: 14px;
}

.validate .success {
  color: rgb(0, 252, 55);
  font-size: 14px;
}

label {
  color: aliceblue;
}
</style>
