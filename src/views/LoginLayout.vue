<template>
  <div class="wrapper">
    <div class="content">
      <div class="left">
        <logo></logo>
      </div>
      <div class="right">
        <login-in-form></login-in-form>
      </div>
    </div>
  </div>
</template>

<script>
import LoginInForm from "@/components/login-layout/LoginInForm.vue";
import Logo from "@/components/login-layout/Logo.vue";
export default {
  name: "LoginLayout",
  components: { LoginInForm, Logo },
};
</script>

<style scoped>
.wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-image:linear-gradient(to bottom,#4e72de 0%,#2348b8 100%) */
  background-image: url("../assets/operation_room.jpg");
  background-size: cover;
}
.content {
  min-width: 1000px;
  display: flex;
  border-radius: 15px;
  animation: moveIn 1.5s;
  background-color: rgba(255, 255, 255, 0.7);
}
.content > .left {
  flex: 1;
  border-right: 1px solid #bfbfbf;
  text-align: center;
}
.left > p:first-child {
  font-size: 24px;
}
.content > .right {
  flex: 1;
  /* background-color: #ffffff */
}
@keyframes moveIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
}
</style>