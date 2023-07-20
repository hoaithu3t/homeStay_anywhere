<template>
  <TheHeader />

  <a-form :model="formState" @finish="onFinish" name="nest-messages" :validate-messages="validateMessages"
    :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
    <a-card title="My profile" style="width: 100%">
      <div class="row mb-3">
        <div class="col-12 col-sm-4 mb-3 ">
          <div class="col-12 d-flex justify-content-center align-items-center mb-3">
            <div class="">
              <a-upload v-model:file-list="avatarList" name="image" list-type="picture-card" class="avatar-uploader"
                :show-upload-list="false" action="http://localhost:8000/api/upload-image" :before-upload="beforeUpload"
                @change="avatarChange">
                <img v-if="formState.avatar" :src="'http://localhost:8000/storage/' + formState.avatar" alt="avatar"
                  style="width: 200px;height: 200px; object-fit: contain;" />
                <div v-else>
                  <loading-outlined v-if="loading"></loading-outlined>
                  <plus-outlined v-else></plus-outlined>
                  <div class="ant-upload-text">Upload</div>
                </div>
              </a-upload>
            </div>
          </div>
          <div class="col-12 d-flex justify-content-center align-items-center " style="font-size: 16px;">Avatar</div>


          <!-- <div class="row">
            <div class="col-12 d-flex justify-content-center mb-3">
              <a-avatar shape="square" :size="200">
                <template #icon>
                  <img src="/Avatar.jpg" alt="Avatar" />
                </template>
              </a-avatar>
             
            </div>

            <div class="col-12 d-flex justify-content-center">
              <a-button type="primary">
                <i class="fa-solid fa-plus me-2"></i>
                <span>Choose image</span>
              </a-button>
            </div>

          </div> -->
        </div>

        <div class="col-12 col-sm-8">
          <a-form-item name="name" label="Name" :rules="[{ required: true }]">
            <a-input v-model:value="formState.name" />
          </a-form-item>
          <a-form-item name="email" label="Email" :rules="[{ type: 'email' }]">
            <a-input v-model:value="formState.email" />
          </a-form-item>
          <a-form-item name="phone_number" label="Phone number" :rules="[{
            pattern: /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
          }]">
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
            <a-date-picker v-model:value="formState.birthday" format="DD-MM-YYYY" />
          </a-form-item>

        </div>
      </div>

      <div class="row">
        <div class="col-12 d-grid d-sm-flex justify-content-sm-end mx-auto">
          <a-button class="me-0 me-sm-2 mb-3 mb-sm-0">
            <router-link :to="{ name: 'admin-users' }">
              <span>Hủy</span>
            </router-link>
          </a-button>

          <a-button type="primary" html-type="submit">
            <span>Lưu</span>
          </a-button>
        </div>
      </div>
    </a-card>
  </a-form>
</template>
<script>
import { ref, reactive } from "vue"
import TheHeader from "../components/TheHeader.vue";
import dayjs from "dayjs";
// import { useUser } from "../stores/use-user";
import { message } from 'ant-design-vue';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';

export default {
  components: {
    TheHeader,
    LoadingOutlined,
    PlusOutlined,
  },
  setup() {
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
      avatar: null,
      phone_number: '',
      gender: 0,
    });
    const avatarList = ref([]);
    const loading = ref(false);

    const getProfile = () => {
      axios.get("http://127.0.0.1:8000/api/profile", {
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userData')).token}`
        }
      })
        .then(({ data }) => {
          formState.name = data.data.name
          formState.birthday = dayjs(data.data.birthday)
          formState.email = data.data.email
          formState.avatar = data.data.avatar
          formState.phone_number = data.data.phone_number
          formState.gender = data.data.gender
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const avatarChange = info => {
      console.log('avatarChange', info)

      if (info.file.status === 'uploading') {
        loading.value = true;
        return;
      }
      if (info.file.status === 'done') {

        // Get this url from response in real world.
        formState.avatar = info.file.response.data;
        loading.value = false;

      }
      if (info.file.status === 'error') {
        loading.value = false;
        message.error('upload error');
      }
    };
    const beforeUpload = file => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG or PNG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
      }
      return isJpgOrPng && isLt2M;
    };
    JSON.parse(localStorage.getItem('userData')).token && getProfile();
    const onFinish = () => {
      axios.put("http://127.0.0.1:8000/api/profile",
        { ...formState, birthday: formState.birthday.format('YYYY-MM-DD') }
        , {
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userData')).token}`
          }
        })
        .then((response) => {
          if (response.data.success) {
            console.log(response.data)
            message.success(response.data.message);
            // useUser().onChangeName(response.data.data.name)
            //   router.push({name: "admin-users"});
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
      avatarList,
      loading,
      avatarChange,
      beforeUpload,
    }
  },

};
</script>
<style>
.avatar-uploader>.ant-upload {
  width: 200px;
  height: 200px;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>