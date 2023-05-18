<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const loginRef = ref<HTMLElement | undefined>()
const form = ref<HTMLElement | undefined>()
const formData = reactive({
  username: '',
  password: '',
})
const submit = () => {
  if (route.query) {
    let path = route.query.redirect as string
    router.push(path)
  }
}
const signup = () => {
  if (loginRef.value) {
    loginRef.value.classList.add('signin_wrapper')
  }
}
const login = () => {
  if (loginRef.value) {
    loginRef.value.classList.remove('signin_wrapper')
  }
}
</script>
<template>
  <div class="login_wrapper">
    <div ref="loginRef" class="login">
      <!-- Sign Up -->
      <div class="sign signup_active">
        <p>个人注册功能未开放</p>
        <p>请联系管理员为你注册</p>
        <p>
          <img alt="qrcode" src="../../assets/logo.png" width="150" />
        </p>
      </div>

      <!-- Sign In -->
      <div class="sign signin_active">
        <h3>登录</h3>
        <var-form ref="form" scroll-to-error="start">
          <var-space direction="column" :size="[14, 0]">
            <var-input
              v-model="formData.username"
              placeholder="用户名"
              :rules="[(v) => !!v || '用户名不能为空']"
            />
            <var-input
              v-model="formData.password"
              placeholder="密码"
              :rules="[(v) => !!v || '密码不能为空']"
              type="password"
            />
            <var-button block class="submit" type="primary" @click="submit"> 登 录 </var-button>
          </var-space>
        </var-form>
      </div>

      <!-- Overlay -->
      <div class="overlay_wrapper">
        <div class="overlay">
          <div class="overlay__panel overlay_left">
            <button ref="signInBtn" class="btn" @click="login">登 录</button>
          </div>
          <div class="overlay__panel overlay_right">
            <button ref="signUpBtn" class="btn" size="'large" @click="signup">注 册</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login_wrapper {
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  align-items: center;
  background: var(--theme-bg-image) url('@/assets/img/login_bg.jpg') no-repeat fixed center;
  background-size: cover;
  display: grid;
  place-items: center;
  font-size: 16px;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;

  .login {
    background-image: var(--theme-bg-image);
    border-radius: 0.7rem;
    box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25), 0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
    height: 420px;
    max-width: 758px;
    overflow: hidden;
    position: relative;
    width: 100%;

    .sign {
      height: 100%;
      position: absolute;
      top: 0;
      transition: all 0.6s ease-in-out;
      background-image: var(--theme-bg-image);
      h3 {
        padding: 20px;
        text-align: left;
        color: #000;
      }
      .var-form {
        padding: 0 20px;
        text-align: left;
      }
    }

    .signin_active {
      left: 0;
      width: 50%;
      z-index: 2;
    }

    .signup_active {
      left: 0;
      opacity: 0;
      width: 50%;
      z-index: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      text-align: center;
      line-height: 2;
      font-size: large;
    }

    .overlay_wrapper {
      height: 100%;
      left: 50%;
      overflow: hidden;
      position: absolute;
      top: 0;
      transition: transform 0.6s ease-in-out;
      width: 50%;
      z-index: 100;

      .overlay {
        background: #008997 url('@/assets/img/login_bg.jpg') no-repeat fixed center;
        background-size: cover;
        height: 100%;
        left: -100%;
        position: relative;
        transform: translateX(0);
        transition: transform 0.6s ease-in-out;
        width: 200%;

        .overlay__panel {
          align-items: center;
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: center;
          position: absolute;
          text-align: center;
          top: 0;
          transform: translateX(0);
          transition: transform 0.6s ease-in-out;
          width: 50%;
        }

        .overlay_left {
          transform: translateX(-20%);
        }

        .overlay_right {
          right: 0;
          transform: translateX(0);
        }
      }
    }

    .btn {
      background-color: #0367a6;
      background-image: linear-gradient(90deg, #0367a6 0%, #008997 74%);
      border-radius: 20px;
      border: 1px solid #0367a6;
      color: #fff;
      cursor: pointer;
      font-size: 0.8rem;
      font-weight: bold;
      letter-spacing: 0.1rem;
      padding: 0.9rem 3rem;
      text-transform: uppercase;
      transition: transform 80ms ease-in;
    }
    .submit {
      margin-top: 20px;
      width: 100%;
      color: #fff;
      background-color: #069a57;
    }

    &.signin_wrapper {
      .signin_active {
        transform: translateX(100%);
        opacity: 0;
      }

      .signup_active {
        -webkit-animation: show 0.6s;
        opacity: 1;
        animation: show 0.6s;
        transform: translateX(100%);
        z-index: 5;
      }

      .overlay_wrapper {
        transform: translateX(-100%);

        .overlay {
          transform: translateX(50%);

          .overlay_left {
            transform: translateX(0);
          }

          .overlay_right {
            transform: translateX(20%);
          }
        }
      }
    }
  }
  .isPad {
    width: 90%;
    .sign {
      width: 100%;
    }
    .overlay_wrapper {
      display: none;
    }
  }
}

@-webkit-keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}
</style>
