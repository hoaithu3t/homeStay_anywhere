<template>
  <TheHeader />

  <a-card class="container mt-5" title="Location List" style="width: 100%">
    <div class="row mb-3">
      <div class="col-12 d-flex justify-content-end">
        <a-button type="primary" @click="showAddModal">
          <!-- <router-link :to="{ name: 'location-create' }"> -->
          <i class="fa-solid fa-plus"></i>
          <!-- </router-link> -->
        </a-button>
        <a-modal v-model:visible="visible" centered :footer="null" :width="600">
          <h1 class="text-center mb-4">Create Location</h1>
          <a-form :model="formState" :label-col="{ span: 7 }" :wrapper-col="{ span: 17 }" @finish="onFinish" class="px-4">
            <a-form-item name="name" label="Name" :rules="[{ required: true }]">
              <a-input v-model:value="formState.name" />
            </a-form-item>

            <a-form-item label="Thumbnail" name="thumbnail" :rules="[{ required: true }]">
              <a-upload v-model:file-list="thumbnailList" name="image" list-type="picture-card" class="avatar-uploader"
                :show-upload-list="false" action="http://localhost:8000/api/upload-image" :before-upload="beforeUpload"
                @change="thumbnailChange">
                <img v-if="formState.thumbnail" :src="'http://localhost:8000/storage/' + formState.thumbnail"
                  alt="thumbnail" style="width: 102px;height: 102px; object-fit: contain;" />
                <div v-else>
                  <loading-outlined v-if="loading"></loading-outlined>
                  <plus-outlined v-else></plus-outlined>
                  <div class="ant-upload-text">Upload</div>
                </div>
              </a-upload>
            </a-form-item>
            <a-form-item name="description" label="Description" :rules="[{ required: true }]">
              <a-textarea v-model:value="formState.description" />
            </a-form-item>
            <div class="d-flex justify-content-end">
              <a-button class="me-2" @click="visible = false"> Cancel</a-button>
              <a-button type="primary" html-type="submit">Save</a-button>
            </div>
          </a-form>
        </a-modal>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <a-table :dataSource="locations" :columns="columns" :pagination="pagination" @change="handleTableChange"
          :scroll="{ x: 576 }">
          <template #bodyCell="{ column, index, record }">
            <template v-if="column.key === 'index'">
              <span>{{ pagination.pageSize * (pagination.current - 1) + (index + 1) }}</span>
            </template>



            <template v-if="column.key === 'action'">
              <!-- <router-link :to="{ name: 'location-edit', params: { id: record.id } }"> -->
              <a-button type="primary" @click="showEditModal(record.id)">
                <i class="fa-solid fa-pen-to-square"></i>
              </a-button>

              <!-- </router-link> -->

              <a-button type="primary" class="ms-3" @click="showConfirm(record.id)">
                <i class="fa-solid fa-trash"></i>
              </a-button>



            </template>
          </template>
        </a-table>
      </div>
    </div>
  </a-card>
</template>
<script>
import TheHeader from "../../components/TheHeader.vue";
import { defineComponent, ref, reactive } from "vue";

import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode } from 'vue';
import { Modal, message } from 'ant-design-vue';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import axios from "axios";

export default defineComponent({
  components: {
    TheHeader,

  },
  setup() {
    const locations = ref([]);
    const columns = [
      {
        title: "#",
        key: "index",
        width: '8%',
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: '20%',
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        ellipsis: true,
      },
      {
        title: "Công cụ",
        key: "action",
        fixed: "right",
        width: '15%',
      },
    ];
    const pagination = ref({
      current: 1,
      pageSize: 10
    });
    const mode = ref();
    const visible = ref(false);
    const location_id = ref();
    const formState = reactive({
      name: '',
      description: '',
      thumbnail: null,
    });
    const thumbnailList = ref([]);
    const loading = ref(false);

    
    const getLocations = () => {
      axios
        .get(`http://127.0.0.1:8000/api/locations`)
        .then((response) => {
          // console.log(response);
          locations.value = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const handleTableChange = (pag, filters, sorter) => {
      console.log("handleTableChange", pag, sorter)
      pagination.value = {
        current: pag.current,
        pageSize: pag.pageSize
      };

    };
    const thumbnailChange = info => {

      if (info.file.status === 'uploading') {
        loading.value = true;
        return;
      }
      if (info.file.status === 'done') {

        // Get this url from response in real world.
        formState.thumbnail = info.file.response.data;
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
    getLocations();
    const showAddModal = () => {
      mode.value = 0
      visible.value = true
      formState.name = ''
      formState.description = ''
      formState.thumbnail = null
    }
    const showEditModal = (id) => {
      mode.value = 1
      visible.value = true
      location_id.value = id
      getLocation(id);
    }
    const getLocation = (id) => {
      axios
        .get(`http://127.0.0.1:8000/api/locations/${id}`)
        .then((response) => {
          // console.log(response);

          formState.name = response.data.data.name;
          formState.description = response.data.data.description;
          formState.thumbnail = response.data.data.thumbnail;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    
    const onFinish = values => {
      if(mode.value == 0){
        axios.post("http://127.0.0.1:8000/api/locations",
        values,
        {
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userData')).token}`
          }
        }
      )
        .then((response) => {
          message.success(response.data.message);
          visible.value = false;
          getLocations();
          
        })
        .catch((error) => {
          console.log(error, error.response.data.data);
          errors.value = error.response.data.data;
        });
      }else{
        axios.put(`http://127.0.0.1:8000/api/locations/${location_id.value}`,
        values,
        {
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userData')).token}`
          }
        }
      )
        .then((response) => {
          message.success(response.data.message);
          visible.value = false;
          getLocations();
        })
        .catch((error) => {
          console.log(error, error.response.data.data);
          errors.value = error.response.data.data;
        });
      }
      
    };
    const showConfirm = (id) => {
      Modal.confirm({
        title: 'Do you want to delete this location?',
        icon: createVNode(ExclamationCircleOutlined),
        content: createVNode('div', {
          style: 'color:red;',
        }, ''),
        onOk() {
          console.log('OK');

          axios.delete(`http://127.0.0.1:8000/api/locations/${id}`, {
            headers: {
              'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userData')).token}`
            }
          }).then(function (response) {
            // xử trí khi thành công
            console.log(response);
            message.success(response.data.message);
            getLocations();

          })
            .catch(function (error) {
              // xử trí khi bị lỗi
              console.log(error);
            })
        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'test',
      });
    };

    return {
      locations,
      columns,
      pagination,
      visible,
      formState,
      thumbnailList,
      loading,
      handleTableChange,
      showAddModal,
      showEditModal,
      showConfirm,
      thumbnailChange,
      beforeUpload,
      onFinish


    };
  },
});
</script>