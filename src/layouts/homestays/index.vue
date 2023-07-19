<template>
  <TheHeader />

  <a-card class="container mt-5" title="Homestay List" style="width: 100%">
    <div class="row mb-3">
      <div class="col-12 d-flex justify-content-end">
        <a-button type="primary">
          <router-link :to="{ name: 'homestays-create' }">
            <i class="fa-solid fa-plus"></i>
          </router-link>
        </a-button>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <a-table :dataSource="homestays" :columns="columns" :scroll="{ x: 576}">
          <template #bodyCell="{ column, index, record }">
            <template v-if="column.key === 'index'">
              <span>{{ index + 1 }}</span>
            </template>

            <template v-if="column.key === 'status'">
              <span v-if="record.status_id == 1" class="text-primary">{{
                record.status
              }}</span>
              <span v-else-if="record.status_id == 2" class="text-danger">{{
                record.status
              }}</span>
            </template>

            <template v-if="column.key === 'action'">
              <router-link :to="{ name: 'homestays-edit', params: { id: record.id } }">
                <a-button type="primary">
                  <i class="fa-solid fa-pen-to-square"></i>
                </a-button>

              </router-link>

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
import { defineComponent, ref } from "vue";

import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode } from 'vue';
import { Modal, message } from 'ant-design-vue';
import axios from "axios";

export default defineComponent({
  components: {
    TheHeader,
  },
  setup() {
    const homestays = ref([]);
    const columns = [
      {
        title: "#",
        key: "index",
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Location",
        dataIndex: "location_name",
        key: "location_name",
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
      },
      {
        title: "Description",
        dataIndex: "desc",
        key: "desc",
        // responsive: ["sm"],
      },
      // {
      //   title: "Vai trò",
      //   key: "roles",
      // },
      // {
      //   title: "Tình trạng",
      //   dataIndex: "status",
      //   key: "status",
      // },
      {
        title: "Công cụ",
        key: "action",
        fixed: "right",
      },
    ];
    const getHomestays = () => {
      axios
        .get(`http://127.0.0.1:8000/api/homestays?user_id=${JSON.parse(localStorage.getItem('userData')).id}`)
        .then((response) => {
          // console.log(response);
          homestays.value = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getHomestays();
    const showConfirm = (id) => {
      Modal.confirm({
        title: 'Do you want to delete this homestay?',
        icon: createVNode(ExclamationCircleOutlined),
        content: createVNode('div', {
          style: 'color:red;',
        }, ''),
        onOk() {
          console.log('OK');

          axios.delete(`http://127.0.0.1:8000/api/homestays/${id}`, {
            headers: {
              'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userData')).token}`
            }
          }).then(function (response) {
            // xử trí khi thành công
            console.log(response);
            message.success(response.data.message);
            getHomestays();

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
      homestays,
      columns,
      showConfirm,
    };
  },
});
</script>
