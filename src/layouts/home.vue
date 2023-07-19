<template>
  <TheHeader />
  <!-- <img src="../assets/bien.jpg" style="width: 100%; height: 320px; object-fit: cover;" /> -->
  <div class="" style="background: linear-gradient(56deg, rgb(255, 140, 0) 0%, rgb(255, 169, 0) 81%); height: 300px;">
    <div class="container">
      <div class="" style="padding: 32px 0 36px;">
        <h1 class="text-white" style="font-size: 38px;">Tìm chỗ nghỉ tiếp theo</h1>
        <p class="text-white" style="font-size: 20px;">Tìm ưu đãi khách sạn, chỗ nghỉ dạng nhà và nhiều hơn nữa...</p>
      </div>
      <div class="d-flex " style="height: 40px;">
        <a-select class="col-3 search-item" :size="size" show-search placeholder="Location" :options="locations"
          :filter-option="filterOption" allow-clear v-model:value="location_id">
        </a-select>
        <a-range-picker class="col-4 search-item" v-model:value="date" :disabled-date="disabledDate" />
        <div class="col-4">
          <a-button class="col-12 search-item">{{ adults }} Adults - {{ child }} Children - {{ room_count }} Rooms</a-button>
          
        </div>
        
        <a-button class="col-1 search-item" type="primary">Tìm</a-button>
      </div>
    </div>
  </div>
</template>
<script>
import TheHeader from "../components/TheHeader.vue";
import dayjs from 'dayjs';
import { defineComponent, ref } from 'vue';
export default {
  components: {
    TheHeader,
  },
  setup() {

    const locations = ref([]);
    const location_id = ref(null);
    const adults = ref(1);
    const child = ref(0);
    const room_count = ref(1);
    const getLocations = () => {
      axios.get("http://127.0.0.1:8000/api/locations")
        .then((response) => {
          // console.log(response);
          locations.value = response.data.data;
          // users_status.value = response.data.users_status;
          // departments.value = response.data.departments;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const filterOption = (input, option) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    const disabledDate = current => {
      // Can not select days before today and today
      return current && current < dayjs().startOf('day');
    };
    getLocations();
    return {
      locations,
      location_id,
      filterOption,
      date: ref(),
      disabledDate,
      size: ref('large'),
    }
  }
};
</script>]

<style>
#components-dropdown-demo-placement .ant-btn {
  margin-right: 8px;
  margin-bottom: 8px;
}

.search-item {
  height: 100%;
  border-radius: 3px;
}
</style>

  