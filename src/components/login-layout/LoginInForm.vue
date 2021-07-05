<template>
    <div class="form-wrapper">
        <p>登  录</p>
        <div class="form-item">
            <input type="text" v-model="username" placeholder="请输入用户名">
        </div>
        <div class="form-item">
            <input type="password" v-model="password" placeholder="请输入密码">
        </div>
        <div class="login-btn-wrapper">
            <button @click="login">登录</button>
        </div>
        <div class="footer">
            <p>Copyright©2020 重庆大学微系统研究中心余华课题组 版权所有</p>
            <p><a href="http://www.beian.miit.gov.cn/">渝ICP备 19011317号</a></p>
            <p>最佳分辨率1920*1080</p> 
        </div>
    </div>
</template>

<script>
import showAlert from '@/x-views/xAlert/xAlert'
export default {
    name: "LoginInForm",
    data:function(){
        return {
            username:'',
            password:''
        }
    },
    methods:{
        login:function(){
            this.$router.push('/home')
            return
            if(this.username === 'admin' && this.password === 'admin'){
                this.$router.push('/home')
            } else {
                showAlert('账号或者密码错误','failure')
            }            
        }
    }
}
</script>

<style scoped>
.form-wrapper {
    padding: 50px 40px;
    color: #3a3b45;
    text-align: center;
}
.form-wrapper > p {
    font-size: 40px;
}
.form-item {
    margin: 20px 0;
}
.form-item > input:hover,
.form-item > input:focus {
    border-color: #4e5fdf;
    transition: border-color 0.4s;
}
.form-item > input {
    border: 0;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    width: 100%;
    border-radius: 50px;
    border: 1px solid #d1d3e2;
    padding: 0 20px;
    box-sizing: border-box;
}
.login-btn-wrapper {
    padding-top: 20px;
    border-top: 1px solid #d1d3e2;
}
.login-btn-wrapper > button {
    display: block;
    height: 50px;
    width: 100%;
    background-color: #4e73df;
    border-radius: 50px;
    font-size: 16px;
    color: #ffffff
}
.login-btn-wrapper > button:hover {
    background-color: #4e5fdf;
}
.footer {
    margin-top: 15px;
    font-size: 12px;
}
</style>