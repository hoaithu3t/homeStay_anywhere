<template>
  <div style="background: linear-gradient(56deg, rgba(255,140,0,1) 0%, rgba(255,169,0,1) 81%)">
    <div class="container">
      <div class="row text-white py-3">
        <!-- <div
        class="col-1 d-flex d-sm-none align-items-center justify-content-center"
      >
        <span @click="showDrawer()">
          <i class="fa-solid fa-align-justify"></i>
        </span>
      </div> -->
        <div class="d-flex container align-items-center justify-content-between">
          <router-link :to="{ name: 'home' }">
            <div class="d-flex align-items-center justify-content-center text-white">
              <i class="fas fa-home" style="width: 30px; font-size: 20px;"></i>
              <span class="d-none d-sm-flex text-logo">Anywhere</span>

            </div>
          </router-link>


          <div class="
          align-items-center
          justify-content-sm-end
        ">
            <!-- <a-button ghost>Đăng nhập</a-button> -->
            <div v-if="userData === null || userData === undefined">
              <Register :showRegister="showRegister" :setShowLogin="setShowLogin" :setShowRegister="setShowRegister" />
              <Login :showLogin="showLogin" :setShowLogin="setShowLogin" :setShowRegister="setShowRegister" />
            </div>
            <div v-else class="d-flex align-items-center">
              <div>
                <h3 style="line-height: 30px; color: white;">Hello, {{ JSON.parse(userData).name }}</h3>
              </div>
              <SubMenu />
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-logo {
  font-size: 25px;
  font-weight: bold;
  font-family: "Comic Sans MS", cursive, sans-serif;
}
</style>

<script>
import TheMenu from "../components/TheMenu.vue";
import Login from "../components/Auth/Login.vue";
import Register from "../components/Auth/Register.vue";
import { useUser } from "../stores/use-user";
import SubMenu from "./Auth/SubMenu.vue";

import { defineComponent, ref, toRefs } from "vue";
export default defineComponent({
  components: {
    TheMenu,
    Login,
    Register,
    SubMenu
  },
  setup() {
    const userStore = useUser();
    const visible_user = ref(false);
    const showLogin = ref(false);
    const showRegister = ref(false);

    const setShowLogin = (value) => {
      showLogin.value = value;
    }

    const setShowRegister = (value) => {
      showRegister.value = value;
    }



    return {
      visible_user,
      ...toRefs(userStore),
      showLogin,
      showRegister,
      setShowLogin,
      setShowRegister,
    };
  },
});
</script>