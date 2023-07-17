<template>
  <a-button ghost @click="setShowLogin(true)">Login</a-button>
  <a-modal :visible="showLogin" @ok="onFinish" :footer="null" @cancel="setShowLogin(false)">
    <h1>Login</h1>
    <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }" :model="formState" name="login-form" @finish="onFinish"
      @finishFailed="onFinishFailed">
      <a-form-item label="Email" name="email" :rules="[{ required: true, message: 'Please input your username!' }]">
        <a-input v-model:value="formState.email">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item label="Password" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
        <a-input-password v-model:value="formState.password">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>
      <br />
      <p class="text-danger">{{ errorMesage }}</p>


      <div class="d-flex justify-content-between">
        <p class="fst-italic">You don't have an account, register
          <a @click="changeModalRegister">here</a>
        </p>
        <a-button :disabled="disabled" type="primary" html-type="submit">Log in</a-button>
      </div>
    </a-form>
  </a-modal>
</template>

<script>
import { ref, defineComponent, reactive, computed } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { useUser } from '../../stores/use-user';

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
  },
  props: ["showLogin", "setShowLogin", "setShowRegister"],
  setup({ setShowLogin, setShowRegister }) {
    const errorMesage = ref('')
    const changeModalRegister = () => {
      setShowLogin(false);
      setShowRegister(true);
    }

    const formState = reactive({
      email: '',
      password: '',
    });
    const onFinish = values => {
      axios.post("http://127.0.0.1:8000/api/login", values)
        .then((response) => {
          if (response.data.success) {
            message.success(response.data.message);
            useUser().onChange(response.data.data)

            // console.log(useUser().id, 'user-info')
            setShowLogin(false);
            //   router.push({name: "admin-users"});
          }

          else {
            message.error(response.data.message)
          }
        })
        .catch((error) => {
          if (error?.response?.status === 401) {
            errorMesage.value = "Email or password not correct";
            message.error("Email or password not correct")
          }

          else {
            message.error("Some think error")
          }


        });

    };
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };
    const disabled = computed(() => {
      return !(formState.email && formState.password);
    });


    return {
      formState,
      onFinish,
      onFinishFailed,
      disabled,
      errorMesage,
      changeModalRegister
    };
  },
});


</script>
