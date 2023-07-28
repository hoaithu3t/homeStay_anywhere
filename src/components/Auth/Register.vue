<template>
  <a-button ghost @click="setShowRegister(true)" class="mx-3">Register</a-button>
  <a-modal :visible="showRegister" @ok="onFinish" @cancel="setShowRegister(false)" :footer="null" :width="600">
    <h1 class="text-center mb-4">Register</h1>
    <a-form :model="formState" :label-col="{ span: 7 }" :wrapper-col="{ span: 17 }" name="nest-messages"
      :validate-messages="validateMessages" @finish="onFinish" class="px-4">
      <a-form-item name="name" label="Name" :rules="[{ required: true }]">
        <a-input v-model:value="formState.name" />
      </a-form-item>

      <a-form-item name="email" label="Email" :rules="[{ required: true }, { type: 'email' }]">
        <a-input v-model:value="formState.email" @change="onChangeEmail" />
        <div v-if="errors.email" class="text-danger">{{ errors.email[0] }}</div>
      </a-form-item>
      <a-form-item name="phone_number" label="Phone number" :rules="[{ type: 'string' }, { min: 10 }]">
        <a-input v-model:value="formState.phone_number" />
      </a-form-item>
      <a-form-item name="gender" label="Gender" :rules="[{ required: true }, { type: 'number' }]">
        <a-radio-group v-model:value="formState.gender">
          <a-radio :value=0>Male</a-radio>
          <a-radio :value=1>Female</a-radio>
          <a-radio :value=2>Other</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item name="birthday" label="Birthday" :rules="[{ required: true }]">
        <a-date-picker v-model:value="formState.birthday" format="YYYY-MM-DD" />
      </a-form-item>
      <a-form-item name="role" label="Role" :rules="[{ required: true }, { type: 'number' }]">
        <a-radio-group v-model:value="formState.role">
          <a-radio :value=1>Customer</a-radio>
          <a-radio :value=2>Owner</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="Password" name="password"
        :rules="[{ required: true, message: 'Please input your password!' }, { min: 8 }]">
        <a-input-password v-model:value="formState.password" />
      </a-form-item>
      <a-form-item label="Confirm password" name="c_password"
        :rules="[{ required: true, validator: validatePass2, trigger: 'change' }]">
        <a-input-password v-model:value="formState.c_password" />
      </a-form-item>
      <!-- <p class="text-danger">{{ errorMesage }}</p> -->
      <div class="d-flex justify-content-between">
        <p class="fst-italic text-center">You already have an account, log in
          <a @click="changeModalLogin">here</a>
        </p>
        <a-button type="primary" html-type="submit">Submit</a-button>
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
  props: ["showRegister", "setShowLogin", "setShowRegister"],
  setup({ setShowLogin, setShowRegister }) {

    const errorMesage = ref('')
    const changeModalLogin = () => {
      setShowRegister(false);
      setShowLogin(true)
    }
    let validatePass2 = async (rule, value) => {
      if (value === '') {
        return Promise.reject('Please input the password again');
      } else if (value !== formState.password) {
        return Promise.reject("Two inputs don't match!");
      } else {
        return Promise.resolve();
      }
    };
    const onChangeEmail = () => {
      console.log('onChangeEmail');
      errors.value.email = []
    }
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
    // const formState = reactive({
    //   name: '',
    //   birthday: undefined,
    //   email: '',
    //   phone_number: '',
    //   gender: 0,
    //   role: 1,
    //   password: '',
    //   c_password: ''
    // });
    const formState = reactive({
      name: 'aaa',
      birthday: undefined,
      email: 'b@gmail.com',
      phone_number: '',
      gender: 0,
      role: 1,
      password: '12345678',
      c_password: '12345678'
    });
    const dateFormat = 'YYYY-MM-DD';
    const errors = ref({});

    const onFinish = values => {
      console.log(values);
      console.log("birthsay", values.birthday);
      console.log("birthsay 3");
      console.log("birthsay 2", values.birthday.format(dateFormat));
      axios.post("http://127.0.0.1:8000/api/register", { ...values, birthday: values.birthday.format(dateFormat) })
        .then((response) => {
          if (response.data.success) {
            message.success(response.data.message);
            setShowRegister(false);
            useUser().onChange(response.data.data)
            //   router.push({name: "admin-users"});
          }
          else {
            message.error(response.data.message)
          }
        })
        .catch((error) => {
          // if (error?.response?.status === 401) {
          //   errorMesage.value = "Email or password not correct";
          //   message.error("Email or password not correct")
          // }

          // else {
          //   message.error("Some think error")
          // }
          console.log(error, error.response.data.data);
          errors.value = error.response.data.data;
          // console.log(errors.email)


        });

    };

    return {
      formState,
      errors,
      onFinish,
      layout,
      validateMessages,
      errorMesage,
      dateFormat,
      changeModalLogin,
      validatePass2,
      onChangeEmail,
    };
  },
});


</script>
