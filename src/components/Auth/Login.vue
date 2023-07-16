<template>
  <a-button ghost @click="showModal">Login</a-button>
  <a-modal v-model:visible="visible" @ok="onFinish" :footer="null">
    <h1>Login</h1>
    <p class="text-danger">{{ errorMesage }}</p>
    <a-form :model="formState" name="login-form" layout="inline" autocomplete="off" @finish="onFinish"
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

      <a-button :disabled="disabled" type="primary" html-type="submit">Log in</a-button>
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
  setup() {
    const visible = ref(false);
    const errorMesage = ref('')

    const showModal = () => {
      visible.value = true;
    };
    const formState = reactive({
      email: '',
      password: '',
    });
    const onFinish = values => {
      axios.post("http://127.0.0.1:8000/api/login", values)
        .then((response) => {
          if (response.data.success) {
            message.success(response.data.message);
            useUser().onChangeName(response.data.data.name)
            localStorage.setItem('userData', JSON.stringify(response.data.data))
            // console.log(useUser().id, 'user-info')
            visible.value = false;
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
      showModal,
      visible,
      errorMesage
    };
  },
});


</script>
