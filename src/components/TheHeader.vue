<template>
  <div class="containter">
    <div
      class="row text-white"
      style="background: linear-gradient(56deg, rgba(255,140,0,1) 0%, rgba(255,169,0,1) 81%); padding: 1rem"
    >
      <!-- <div
        class="col-1 d-flex d-sm-none align-items-center justify-content-center"
      >
        <span @click="showDrawer()">
          <i class="fa-solid fa-align-justify"></i>
        </span>
      </div> -->
<div class="d-flex container align-items-center justify-content-between px-5">
      <div
        class="
        d-flex
          align-items-center
          justify-content-center justify-content-sm-start
        "
      >
        <!-- <img
          src="../assets/logo.png"
          alt="Logo"
          height="32"
          width="34"
          class="ms-3 me-3"
        /> -->
        <i class="fas fa-home" style="width: 30px; font-size: 20px;"></i>
        <span class="d-none d-sm-flex text-logo">Anywhere</span>
      </div>

      <div
        class="
          align-items-center
          justify-content-sm-end
        "
      >
        <a-button ghost class="mx-3">Đăng ký</a-button>
        <!-- <a-button ghost>Đăng nhập</a-button> -->
        <Login />
      </div>
      </div>

      <!-- <div
        class="col-1 d-flex d-sm-none align-items-center justify-content-center"
      >
        <span @click="showDrawerUser()">
          <i class="fa-solid fa-user"></i>
        </span>
      </div> -->
    </div>
  </div>

  <a-drawer v-model:visible="visible" title="DANH MỤC" placement="left">
    <TheMenu />
  </a-drawer>

  <a-drawer v-model:visible="visible_user" title="ADMIN" placement="right">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-drawer>
</template>

<style scoped>
  .text-logo{
    font-size: 25px;
    font-weight: bold;
    font-family: "Comic Sans MS", cursive, sans-serif;
  }

</style>

<script>
import TheMenu from "../components/TheMenu.vue";
import Login from "../components/Auth/Login.vue";

import { defineComponent, ref } from "vue";
export default defineComponent({
  components: {
    TheMenu,
    Login
  },
  setup() {
    const visible = ref(false);
    const visible_user = ref(false);

    const showDrawer = () => {
      visible.value = true;
    };

    const showDrawerUser = () => {
      visible_user.value = true;
    };

    return {
      visible,
      visible_user,
      showDrawer,
      showDrawerUser,
    };
  },
});
</script>