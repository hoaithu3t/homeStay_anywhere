<template>
  <a-button ghost @click="showModal">Đăng nhập</a-button>
  <a-modal v-model:visible="visible" @ok="onFinish" :footer="null">
     <a-form
    :model="formState"
    name="login-form"
    layout="inline"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="Username"
      name="username"
      :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <a-input v-model:value="formState.username">
        <template #prefix>
          <UserOutlined class="site-form-item-icon" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item
      label="Password"
      name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="formState.password">
        <template #prefix>
          <LockOutlined class="site-form-item-icon" />
        </template>
      </a-input-password>
    </a-form-item>

      <a-button :disabled="disabled" type="primary" html-type="submit">Log in</a-button>
  </a-form>
  </a-modal>
</template>

<script>
import { ref, defineComponent, reactive, computed } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
  },
  setup() {
    const visible = ref(false);

    const showModal = () => {
      visible.value = true;
    };
    const formState = reactive({
      username: '',
      password: '',
    });
    const onFinish = values => {
      axios.post("http://127.0.0.1:8000/api/users", values)
      .then((response) => {
        if(response.status == 200) {
          message.success("Tạo mới thành công!");
        //   router.push({name: "admin-users"});
        }
      })
      .catch((error) => {
        errors.value = error.response.data.errors;
      });

    };
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };
    const disabled = computed(() => {
      return !(formState.username && formState.password);
    });

    
    return {
      formState,
      onFinish,
      onFinishFailed,
      disabled,
      showModal,
      visible
    };
  },
});


</script>
