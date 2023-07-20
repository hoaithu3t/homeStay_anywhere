<template>
  <TheHeader />
  <!-- <img src="../assets/bien.jpg" style="width: 100%; height: 320px; object-fit: cover;" /> -->
  <div class="" style="background: linear-gradient(56deg, rgb(255, 140, 0) 0%, rgb(255, 169, 0) 81%); height: 264px;">
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
        <div ref="target" class="col-4 dropdown">
          <a-button @click="isShow = !isShow" class="col-12 search-item">{{ adults }} Adults - {{ child }} Children - {{
            room_count }}
            Rooms</a-button>
          <div v-show="isShow" class="dropdown-content">
            <div class="row align-items-center mb-3">
              <div class="col-6">Adults</div>
              <div class="col-6">
                <a-input-number id="inputNumber" v-model:value="adults" :min="1" style="width: 100%;" />
              </div>
            </div>
            <div class="row align-items-center mb-3">
              <div class="col-6">Children</div>
              <div class="col-6">
                <a-input-number id="inputNumber" v-model:value="child" :min="0" style="width: 100%;" />
              </div>
            </div>
            <div class="row align-items-center mb-4">
              <div class="col-6">Rooms</div>
              <div class="col-6">
                <a-input-number id="inputNumber" v-model:value="room_count" :min="1" style="width: 100%;" />
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-12">
                <a-button @click="isShow = false" style="width: 100%" :size="size">OK</a-button>
              </div>

            </div>
          </div>
        </div>

        <a-button class="col-1 search-item btn-search " type="primary">Tìm</a-button>
      </div>
    </div>
  </div>
  <div class="content">
    <div class="container">
      <div class="section top-destinations" style="">
        <div class="py-2">Top destinations in Vietnam</div>
        <div class="mt-4 d-flex justify-content-between">
          <a href="" class="destination" v-for="location in locations.slice(0, 7)">
            <img :src="'http://localhost:8000/storage/' + location.thumbnail"
              style="width: 124px; height: 124px; border-radius: 50%;" />
            <p class="destination-name mt-2">{{ location.label }}</p>
          </a>

        </div>
      </div>
      <div class="section top-homestays " style="padding: 40px 0 ; text-align: center;">
        <div class="py-2">Top homestays recommended for you</div>
        <div class="mt-4 d-flex justify-content-between">
          <a href="" class="destination" v-for="location in locations.slice(0, 7)">
            <img :src="'http://localhost:8000/storage/' + location.thumbnail"
              style="width: 124px; height: 124px; border-radius: 50%;" />
            <p class="destination-name mt-2">{{ location.label }}</p>
          </a>
        </div>
      </div>

    </div>
    <div class="picture">
      <img src="../assets/hinh-anh-bien-dep_1.jpg" style="width: 100%; height: 500px; object-fit: cover;" />
      <div class="picture-text">To travel is to live</div>
    </div>
  </div>
  <TheFooter />
</template>
<script>
import TheHeader from "../components/TheHeader.vue";
import TheFooter from "../components/TheFooter.vue";
import dayjs from 'dayjs';
import { defineComponent, ref } from 'vue';
import { onClickOutside } from '@vueuse/core'
// import 'vue3-carousel/dist/carousel.css';
// import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';
export default {
  components: {
    TheHeader,
    TheFooter,
    LeftCircleOutlined,
    RightCircleOutlined,
  },
  setup() {
    const target = ref(null);
    onClickOutside(target, (event) => isShow.value = false)

    const locations = ref([]);
    const location_id = ref(null);

    const adults = ref(1);
    const child = ref(0);
    const room_count = ref(1);
    const isShow = ref(false)
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
      target,
      locations,
      location_id,
      filterOption,
      date: ref(),
      disabledDate,
      size: ref('large'),
      adults,
      child,
      room_count,
      isShow,
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

.dropdown {
  position: relative;
}

.dropdown-content {
  position: absolute;
  width: 100%;
  height: 250px;
  padding: 32px;
  background-color: white;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.btn-search {
  border-color: white white white #d9d9d9 !important;
}

.section {
  padding: 40px 0;
  text-align: center;
  font-size: 24px;
  color: #181a25;
}



.destination {
  color: #646262;
  /* margin-right: 42px; */
}

.destination-name {
  font-size: 14px;
}

.picture {
  position: relative;
}

.picture-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 100px;
  font-weight: bold;
  font-family: "Comic Sans MS", cursive, sans-serif;
  color: white;
}
</style>

  