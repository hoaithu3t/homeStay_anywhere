<template>
    <a-card hoverable style="width: 300px" class="card-homestay mb-3">
        <template #cover>
            <img src="http://127.0.0.1:8000/storage/locations/check-in-hue-1.jpg" />
        </template>
        <a-card-meta>
            <template #title> {{ homestay.name }}</template>
            <template #description>
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
                <div class="top-homestay-price d-flex justify-content-end mt-2">
                    <div>VND {{ formatMoney(homestay.min_price) }}</div>
                </div>
            </template>
        </a-card-meta>
    </a-card>
</template>
<style>
.card-homestay .ant-card-body {
    text-align: left !important;
}

.top-homestay-price {
    color: var(--bold);
    font-size: 16px;
    font-weight: 500;
}
</style>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    // components: {
    //     UserOutlined,
    //     LockOutlined,
    // },
    props: ["homestay"],
    setup() {
        const formatMoney = (value) => {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }
        return {
            formatMoney
        };
    },
});


</script>
