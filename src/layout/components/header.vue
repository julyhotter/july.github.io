<script setup lang="ts"  name="HeaderCom">
import { onBeforeMount, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useThemeStore } from '@/store/modules/theme'
const themeStore = useThemeStore()
const getDarkTheme = computed(() => {
  return themeStore.theme
})

const setTheme = (val: string) => {
  sessionStorage.setItem('theme', val)
  themeStore.setTheme(val)
}
const router = useRouter()
const route = useRoute()
const login = () => {
  router.push(`/login?redirect=${route.path}`)
}
</script>
<template>
  <div class="header_wrapper">
    <div class="logo">
      <div>
        <img alt="logo" src="../../assets/logo2.png" />
      </div>
      <div>
        <img alt="logo" src="../../assets/logo1.png" />
      </div>
    </div>
    <div class="info">
      <var-space :size="[10, 10]">
        <div class="detail">
          <p>
            <span>昵称15911077279</span>
            <var-icon name="menu-down" />
          </p>
          <div class="dropdown">
            <ul>
              <li>个人中心</li>
              <li>发文章</li>
            </ul>
          </div>
        </div>
        <div class="theme">
          <var-button block color="#069a57" size="small" type="primary" @click="login">
            皮肤
          </var-button>
        </div>
      </var-space>
    </div>
  </div>
</template>

<style lang="less" scoped>
.header_wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px 0 16px;
  color: #fff;
  border-bottom: 1px solid #eee;
  .logo {
    width: 200px;
    user-select: none;
    position: relative;
    transform: translateY(-10px);
    div:nth-of-type(1) {
      width: 100%;
      img {
        width: 100%;
      }
    }
    div:nth-of-type(2) {
      position: absolute;
      bottom: -16px;
      right: -2px;
      width: 120px;
      transform: translateX(-28px);
      img {
        width: 100%;
      }
    }
  }
  .info {
    .detail {
      padding: 0 8px;
      background-color: #069a57;
      border-radius: 4px;
      position: relative;
      cursor: pointer;
      font-size: 12px;
      line-height: 28px;
      > p {
        display: flex;
      }
      .dropdown {
        padding-top: 8px;
        width: 130px;
        position: absolute;
        top: 28px;
        left: 0;
        > ul {
          transition: ease-in-out 0.3s;
          overflow: hidden;
          height: 0;
          background-color: #069a57;
          border-radius: 4px;
          text-align: left;
          > li {
            padding: 8px 12px;
            &:hover {
              background-color: #5abd91;
            }
          }
        }
      }
      &:hover .dropdown {
        > ul {
          height: 150px;
        }
      }
    }
  }
}
</style>
