<template>
  <TheHeader />
  <!-- <img src="../assets/bien.jpg" style="width: 100%; height: 320px; object-fit: cover;" /> -->
  <div class="background-gradient" style="height: 264px;">
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
                <a-input-number id="inputNumber" v-model:value="adults" :min="1" @change="changeAdults" style="width: 100%;" />
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
                <a-input-number id="inputNumber" v-model:value="room_count" :min="1" @change="changeRoomCount" style="width: 100%;" />
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-12">
                <a-button @click="isShow = false" style="width: 100%" :size="size">OK</a-button>
              </div>

            </div>
          </div>
        </div>

        <a-button class="col-1 search-item btn-search " type="primary" @click="search">Search</a-button>
      </div>
    </div>
  </div>
  <div class="content">
    <div class="container">
      <div class="section top-destinations" style="">
        <div class="section-title py-2">Top destinations in Vietnam</div>
        <div class="mt-4 d-flex justify-content-between">
          <a href="" class="destination" v-for="location in topLocations">
            <img :src="'http://localhost:8000/storage/' + location.thumbnail"
              style="width: 124px; height: 124px; border-radius: 50%;" />
            <p class="destination-name mt-2">{{ location.name }}</p>
          </a>

        </div>
      </div>
      <div class="section top-homestays " style="padding: 40px 0 ; text-align: center;">
        <div class="section-title pb-3">Top homestays recommended for you</div>


        <!-- <div class="d-flex flex-wrap justify-content-between">
          <div v-for="homestay in topHomestays.slice(0, 4)" class="top-homestay">
            <img class="top-homestay-img" src="http://127.0.0.1:8000/storage/locations/check-in-hue-1.jpg" />
            <div class="d-flex flex-column justify-content-between p-2 " style="height: 126px;">
              <div>
                <h4 class="top-homestay-name mb-0">{{ homestay.name }}</h4>
                <div class="top-homestay-location d-flex align-items-center">
                  <i class="fa-solid fa-location-dot"></i>
                  <span class="ms-2">{{ homestay.location_name }}</span>
                </div>
                <div v-if="homestay.countz > 0" class="d-flex align-items-center mt-1">
                  <div class="d-flex justify-content-center  align-items-center top-homestay-point me-1">{{
                    homestay.pointz }}
                  </div>
                  <div v-if="homestay.pointz >= 9.5" class="me-1" style="color: var(--bold);">Xuất sắc - </div>
                  <div v-else-if="homestay.pointz >= 9" class="me-1" style="color: var(--bold);">Tuyệt vời - </div>
                  <div v-else-if="homestay.pointz >= 8.5" class="me-1" style="color: var(--bold);">Rất tốt - </div>
                  <div v-else-if="homestay.pointz >= 8" class="me-1" style="color: var(--bold);">Tốt - </div>
                  <div style="color: var(--light);">{{ homestay.countz }} đánh giá</div>
                </div>
                <div v-else class="text-start">Chưa có đánh giá</div>
              </div>
              <div class="top-homestay-price d-flex justify-content-end mt-2">
                <div>VND {{ formatMoney(homestay.min_price) }}</div>
              </div>
            </div>
          </div>
        </div> -->
        <!-- <div class="d-flex flex-wrap justify-content-between">
          <div v-for="homestay in topHomestays.slice(4)" class="top-homestay">
            <img class="top-homestay-img" src="http://127.0.0.1:8000/storage/locations/check-in-hue-1.jpg" />
            <div class="d-flex flex-column justify-content-between p-2 " style="height: 126px;">
              <div>
                <h4 class="top-homestay-name mb-0">{{ homestay.name }}</h4>
                <div class="top-homestay-location d-flex align-items-center">
                  <i class="fa-solid fa-location-dot"></i>
                  <span class="ms-2">{{ homestay.location_name }}</span>
                </div>
                <div v-if="homestay.countz > 0" class="d-flex align-items-center mt-1">
                  <div class="d-flex justify-content-center  align-items-center top-homestay-point me-1">{{
                    homestay.pointz }}
                  </div>
                  <div v-if="homestay.pointz >= 9.5" class="me-1" style="color: var(--bold);">Xuất sắc - </div>
                  <div v-else-if="homestay.pointz >= 9" class="me-1" style="color: var(--bold);">Tuyệt vời - </div>
                  <div v-else-if="homestay.pointz >= 8.5" class="me-1" style="color: var(--bold);">Rất tốt - </div>
                  <div v-else-if="homestay.pointz >= 8" class="me-1" style="color: var(--bold);">Tốt - </div>
                  <div style="color: var(--light);">{{ homestay.countz }} đánh giá</div>
                </div>
                <div v-else class="text-start">Chưa có đánh giá</div>
              </div>
              <div class="top-homestay-price d-flex justify-content-end mt-2">
                <div>VND {{ formatMoney(homestay.min_price) }}</div>
              </div>
            </div>
          </div>
        </div> -->
        <div class="d-flex justify-content-between">
          <CardHomeStay v-for="homestay in topHomestays" :homestay="homestay" />
        </div>


      </div>

    </div>
    <div class="picture">
      <img src="../assets/banner1.jpg" style="width: 100%; height: 300px; object-fit: cover;" />
      <div class="picture-text">To travel is to live</div>
    </div>
  </div>
  <TheFooter />
</template>
<script>
import TheHeader from "../components/TheHeader.vue";
import TheFooter from "../components/TheFooter.vue";
import CardHomeStay from "../components/HomeStay/Card.vue"
import dayjs from 'dayjs';
import { defineComponent, ref } from 'vue';
import { onClickOutside } from '@vueuse/core'

// import 'vue3-carousel/dist/carousel.css';
// import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';
export default {
  components: {
    TheHeader,
    TheFooter,
    LeftCircleOutlined,
    RightCircleOutlined,
    CardHomeStay
  },
  setup() {
    console.log('hhhhhhh', dayjs('2015/01/01', 'YYYY/MM/DD'))
    const target = ref(null);
    onClickOutside(target, (event) => isShow.value = false)

    const locations = ref([]);
    const location_id = ref(4);
    let defaultStartDate = new Date();
    let defaultEndDate = new Date();
    defaultEndDate.setDate(defaultEndDate.getDate() + 1);
    console.log('df',defaultStartDate,'fff',defaultEndDate )
    const date = ref([
    dayjs(defaultStartDate),
    dayjs(defaultEndDate)
    ]);
    const topLocations = ref([])
    const topHomestays = ref([])

    const adults = ref(1);
    const child = ref(0);
    const room_count = ref(1);
    const changeAdults = () => {
      // console.log('changeRoomCount')
      if(room_count.value > adults.value) room_count.value = adults.value;
    }
    const changeRoomCount = () => {
      // console.log('changeRoomCount')
      if(room_count.value > adults.value) adults.value = room_count.value;
    }
    const isShow = ref(false)
    const dateFormat = 'YYYY-MM-DD';
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
    const getTopLocations = () => {
      axios.get("http://127.0.0.1:8000/api/top-locations")
        .then((response) => {
          // console.log(response);
          topLocations.value = response.data.data;
          // users_status.value = response.data.users_status;
          // departments.value = response.data.departments;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const getTopHomestays = () => {
      axios.get("http://127.0.0.1:8000/api/top-homestays")
        .then((response) => {
          // console.log(response);
          topHomestays.value = response.data.data;
          // users_status.value = response.data.users_status;
          // departments.value = response.data.departments;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const formatMoney = (value) => {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
    const disabledDate = current => {
      // console.log(current);
      // Can not select days before today and today
      return current && current < dayjs().startOf('day');
    };
    getLocations();
    getTopLocations();
    getTopHomestays();
    
    const search = () => {
      console.log('search');
      if (location_id.value == undefined) {
        Modal.warning({
          title: 'Location...',
          content: 'Please enter the name of a location or city to proceed.',
        });
        return;
      }
      if(date.value == null){
        Modal.warning({
          title: 'Date...',
          content: 'Please select the start date and end date to proceed.',
        });
        return;
      }
      console.log({
        //  ...values, birthday: values.birthday.format(dateFormat) 
         location_id : location_id.value,
         start_date: date.value[0].format(dateFormat),
         end_date: date.value[1].format(dateFormat),
         room_count: room_count.value


        })
      // axios.get("http://127.0.0.1:8000/api/search", {
      //   //  ...values, birthday: values.birthday.format(dateFormat) 
      //    location_id : location_id.value,
      //    start_date: date.value[0].format(dateFormat),
      //    start_date: date.value[0].format(dateFormat),


      //   })
      //   .then((response) => {
      //     if (response.data.success) {
      //       message.success(response.data.message);
      //       setShowRegister(false);
      //       useUser().onChange(response.data.data)
      //       //   router.push({name: "admin-users"});
      //     }
      //     else {
      //       message.error(response.data.message)
      //     }
      //   })
      //   .catch((error) => {
      //     // if (error?.response?.status === 401) {
      //     //   errorMesage.value = "Email or password not correct";
      //     //   message.error("Email or password not correct")
      //     // }

      //     // else {
      //     //   message.error("Some think error")
      //     // }
      //     console.log(error, error.response.data.data);
      //     errors.value = error.response.data.data;
      //     // console.log(errors.email)


      //   });
      
    }
    return {
      target,
      locations,
      location_id,
      topLocations,
      topHomestays,
      formatMoney,
      filterOption,
      date,
      disabledDate,
      size: ref('large'),
      adults,
      child,
      room_count,
      changeAdults,
      changeRoomCount,
      isShow,
      search,
    }
  }
};
</script>

<style scoped>
@import "../assets/css/home.css";
</style>

  