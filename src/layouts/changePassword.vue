<template>
  <TheHeader />
  <a-form :model="formState" @finish="onFinish" :validate-messages="validateMessages" :label-col="{ span: 4 }"
    :wrapper-col="{ span: 16 }" class="container">
    <a-card title="Change password">
      <a-form-item name="old_password" label="Old Password"
        :rules="[{ required: true, message: 'Please input your new password!' }]">
        <a-input-password v-model:value="formState.old_password" />
      </a-form-item>

      <a-form-item name="new_password" label="New Password"
        :rules="[{ required: true, message: 'Please input your new password!' }]">
        <a-input-password v-model:value="formState.new_password" />
      </a-form-item>

      <a-form-item label="Confirm new Password" name="c_new_password"
        :rules="[{ required: true, message: 'Please input your new password!' }]">
        <a-input-password v-model:value="formState.c_new_password" />
      </a-form-item>

      <div class="d-flex container justify-content-end">
        <a-button class="me-0 me-sm-2 mb-3 mb-sm-0">
          <router-link :to="{ name: 'admin-users' }">
            <span>Hủy</span>
          </router-link>
        </a-button>

        <a-button type="primary" html-type="submit">
          <span>Lưu</span>
        </a-button>
      </div>
    </a-card>
  </a-form>
</template>
<script>
import { ref, reactive } from "vue"
import TheHeader from "../components/TheHeader.vue"
import dayjs from "dayjs";
import { useRoute } from "vue-router";
import { message } from 'ant-design-vue';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';

export default {
  components: {
    TheHeader,
    LoadingOutlined,
    PlusOutlined,
  },
  setup() {
    const route = useRoute();
    const formState = reactive({
      old_password: '',
      new_password: '',
      c_new_password: '',
    });

    const onFinish = () => {
      axios.post(`http://127.0.0.1:8000/api/change-password`,
        formState, {
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userData')).token}`
        }
      })
        .then((response) => {
          if (response.data.success) {
            message.success(response.data.message);
          }
          else {
            message.error(response.data.message)
          }
        })
        .catch((error) => {
          message.error("Some think error")
        });
    };
    return {
      formState,
      onFinish,
    }
  },

};
</script>
<style></style>