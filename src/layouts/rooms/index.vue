<template>
  <TheHeader />

  <a-card class="container mt-5" title="Room List" style="width: 100%">
    <div class="row mb-3">
      <div class="col-12 d-flex justify-content-end">
        <a-button type="primary">
          <router-link :to="{ name: 'rooms-create' , params : {id : route.params.id}}">
            <i class="fa-solid fa-plus"></i>
          </router-link>
        </a-button>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <a-table :dataSource="rooms" :columns="columns" :scroll="{ x: 576 }">
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
              <router-link :to="{ name: 'rooms-edit', params: { id: record.id } }">
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
import { useRoute } from 'vue-router';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode } from 'vue';
import { Modal, message } from 'ant-design-vue';
import axios from "axios";

export default defineComponent({
  components: {
    TheHeader,
  },
  setup() {
    const route = useRoute();
    const rooms = ref([]);
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
        title: "Adults",
        dataIndex: "adults",
        key: "adults",
      },
      {
        title: "Children",
        dataIndex: "child",
        key: "child",
      },
      {
        title: "Double Bed",
        dataIndex: "double_bed",
        key: "double_bed",
      },
      {
        title: "Single Bed",
        dataIndex: "single_bed",
        key: "single_bed",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Count",
        dataIndex: "count",
        key: "count",
      },
      {
        title: "Công cụ",
        key: "action",
        fixed: "right",
      },
    ];
    const getRooms = () => {
      
      axios
        .get(`http://127.0.0.1:8000/api/rooms?homestay_id=${route.params.id}`)
        .then((response) => {
          console.log(response);
          rooms.value = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getRooms();
    const showConfirm = (id) => {
      Modal.confirm({
        title: 'Do you want to delete this room?',
        icon: createVNode(ExclamationCircleOutlined),
        content: createVNode('div', {
          style: 'color:red;',
        }, ''),
        onOk() {
          console.log('OK');

          axios.delete(`http://127.0.0.1:8000/api/rooms/${id}`, {
            headers: {
              'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userData')).token}`
            }
          }).then(function (response) {
            // xử trí khi thành công
            console.log(response);
            message.success(response.data.message);
            getRooms();

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
      rooms,
      columns,
      showConfirm,
      route,
    };
  },
});
</script>
