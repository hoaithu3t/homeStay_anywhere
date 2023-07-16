<template>
  <a-button ghost @click="showModal" class="mx-3">Register</a-button>
  <a-modal v-model:visible="visible" @ok="onFinish" :footer="null">
    <h1>Register</h1>
    <p class="text-danger">{{ errorMesage }}</p>
    <a-form :model="formState" v-bind="layout" name="nest-messages" :validate-messages="validateMessages"
      @finish="onFinish">
      <a-form-item name="name" label="Name" :rules="[{ required: true }]">
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item name="email" label="Email" :rules="[{ type: 'email' }]">
        <a-input v-model:value="formState.email" />
      </a-form-item>
      <a-form-item name="phone_number" label="Phone number" :rules="[{ type: 'string' }]">
        <a-input v-model:value="formState.phone_number" />
      </a-form-item>
      <a-form-item name="gender" label="Gender" :rules="[{ type: 'number' }]">
        <a-radio-group v-model:value="formState.gender">
          <a-radio :value=0>Male</a-radio>
          <a-radio :value=1>Female</a-radio>
          <a-radio :value=2>Other</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item name="birthday" label="Birthday">
        <a-date-picker v-model:value="formState.birthday" format="YYYY-MM-DD" />
      </a-form-item>
      <a-form-item name="role" label="Role" :rules="[{ type: 'number' }]">
        <a-radio-group v-model:value="formState.role">
          <a-radio :value=1>Owner</a-radio>
          <a-radio :value=2>Customer</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="Password" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
        <a-input-password v-model:value="formState.password" />
      </a-form-item>
      <a-form-item label="Confirm password" name="c_password"
        :rules="[{ required: true, message: 'Please input your password!' }]">
        <a-input-password v-model:value="formState.c_password" />
      </a-form-item>

      <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
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

    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };
    const validateMessages = {
      required: '${label} is required!',
      types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
      },
      number: {
        range: '${label} must be between ${min} and ${max}',
      },
    };
    const formState = reactive({
      name: '',
      birthday: undefined,
      email: '',
      phone_number: '',
      gender: 0,
      role: 1,
      password: '',
      c_password: ''
    });
    const dateFormat = 'YYYY-MM-DD';

    const onFinish = values => {
      axios.post("http://127.0.0.1:8000/api/register", { ...values, birthday: values.birthday.format(dateFormat) })
        .then((response) => {
          if (response.data.success) {
            message.success(response.data.message);
            visible.value = false;
            useUser().onChangeName(response.data.data.name)
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

    return {
      formState,
      onFinish,
      layout,
      validateMessages,
      showModal,
      visible,
      errorMesage,
      dateFormat
    };
  },
});


</script>
