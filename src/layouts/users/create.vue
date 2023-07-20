<template>
    <TheHeader />
    <a-card title="Create Room" class="mt-5" style="width: 850px; margin-left: auto; margin-right: auto;">
        <a-form :model="room" :label-col="{ span: 6 }" :wrapper-col="{ span: 12, offset : 1}" @finish="onFinish"
            name="nest-messages" :validate-messages="validateMessages">
            <div class="row mb-3">

                <div class="col-12">
                    <a-form-item name="name" label="Name" :rules="[{ required: true }]">
                        <a-input v-model:value="room.name" class="input" />
                    </a-form-item>
                    <a-form-item name="adults" label="Adults" :rules="[{ required: true }]">
                        <a-input-number id="inputNumber" v-model:value="room.adults" :min="1" class="input" />
                    </a-form-item>
                    <a-form-item name="child" label="Children" :rules="[{ required: true }]">
                        <a-input-number id="inputNumber" v-model:value="room.child" :min="0"  class="input"/>
                    </a-form-item>
                    <a-form-item name="double_bed" label="Double Bed" :rules="[{ required: true }] ">
                        <a-input-number id="inputNumber" v-model:value="room.double_bed" :min="0" class="input" />
                    </a-form-item>
                    <a-form-item name="single_bed" label="Single Bed" :rules="[{ required: true }]">
                        <a-input-number id="inputNumber" v-model:value="room.single_bed" :min="0"  class="input"/>
                    </a-form-item>
                    <a-form-item name="price" label="Price" :rules="[{ required: true }]">
                        <a-input-number id="inputNumber" v-model:value="room.price" :min="0" addon-after="VND" class="input" />
                    </a-form-item>
                    <a-form-item name="count" label="Count" :rules="[{ required: true }]">
                        <a-input-number id="inputNumber" v-model:value="room.count" :min="1"  class="input"/>
                    </a-form-item>
                </div>
            </div>
            <div class="row">
                <div class="col-12 d-grid d-sm-flex justify-content-sm-end mx-auto">
                    <a-button @click="$router.back()" class="me-0 me-sm-2 mb-3 mb-sm-0">
                        <!-- <router-link :to="{ name: 'rooms', params :{ homestay_id : route} }"> -->
                            <span>Hủy</span>
                        <!-- </router-link> -->
                    </a-button>

                    <a-button type="primary" html-type="submit">
                        <span>Lưu</span>
                    </a-button>
                </div>
            </div>
        </a-form>
    </a-card>
</template>
<script>
import TheHeader from "../../components/TheHeader.vue";
import { reactive } from "vue"
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";


import { message } from 'ant-design-vue';

export default {
    components: {
        TheHeader,

    },
    setup() {
        const router = useRouter();
        const route = useRoute();
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
    
        const room = reactive({
            homestay_id: route.params.id,
            name: '',
            adults: 1,
            child: 0,
            double_bed: 0,
            single_bed: 0,
            price: 0,
            count: 1,

        });
        
        const onFinish = values => {
            axios.post("http://127.0.0.1:8000/api/rooms",
                room
                , {
                    headers: {
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userData')).token}`
                    }
                })
                .then((response) => {

                    console.log(response.data)
                    message.success(response.data.message);
                    // useUser().onChangeName(response.data.data.name)
                    router.push({ name: "rooms", params: {id : route.params.id} });

                })
                .catch((error) => {
                    console.log(error)
                    message.error("Some think error")
                });

        };
        return {
            room,
            onFinish,
            validateMessages,
        }
    },
}
</script>
<style scoped>
.input{
    width: 250px;
}
</style>
