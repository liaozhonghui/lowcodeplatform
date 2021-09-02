<template>
  <div class="login-container">
    <el-form
      class="card-box login-form"
      autocomplete="on"
      :model="form"
      :rules="rules"
      :ref="
        (el) => {
          if (el) ruleFromRef = el;
        }
      "
      label-position="left"
    >
      <h3 class="title">管理系统 · 登录</h3>
      <el-form-item prop="username" class="item">
        <el-input
          placeholder="账号"
          name="username"
          autocomplete="on"
          v-model="form.username"
        >
          <template #prefix>
            <i class="el-input__icon el-icon-user"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password" class="item">
        <el-input
          placeholder="密码"
          name="password"
          :type="isShowPwd ? 'text' : 'password'"
          @keyup.enter="handleLogin"
          v-model="form.password"
          autocomplete="on"
        >
          <template #prefix>
            <i class="el-input__icon el-icon-lock"></i>
          </template>
          <template #suffix>
            <i
              class="el-input__icon"
              :class="isShowPwd ? 'el-icon-unlock' : 'el-icon-key'"
              @click="isShowPwd = !isShowPwd"
            ></i>
          </template>
        </el-input>
      </el-form-item>
      <div>
        <el-button
          type="primary"
          style="width: 100%; margin-bottom: 30px"
          :loading="loading"
          @click="handleLogin()"
          >登录</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeUpdate } from "vue";
import useLogin from "../../composition/login";

export default defineComponent({
  name: "Login",
  components: {},
  setup() {
    const loginObj = useLogin();

    onBeforeUpdate(() => {
      loginObj.ruleFromRef.value = null;
    });

    return {
      ...loginObj,
    };
  },
});
</script>

<style lang="scss">
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #435c84;
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px #fff inset !important;
    -webkit-text-fill-color: #999 !important;
  }
  .item {
    .el-form-item__content {
      display: flex;
      flex-flow: row;
    }
  }
  input {
    background: #fff;
    border: 0;
    -webkit-appearance: none;
    border-radius: 0;
    color: #606266;
    height: 100%;
  }
  .el-input {
    display: inline-block;
  }
  .title {
    font-size: 22px;
    color: #d6e6ff;
    margin: 0 auto 1.4rem auto;
    text-align: center;
    font-weight: bold;
  }
  .login-form {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 22em;
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 0.0666rem;
    color: #454545;
  }
  .el-input__prefix,
  .el-input__suffix {
    color: #606266;
  }
  .el-input__icon {
    font-size: 16px;
  }
}
</style>
