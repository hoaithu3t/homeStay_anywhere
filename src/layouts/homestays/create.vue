<template>
    <TheHeader />
    <a-card title="Create Homestay" class="container mt-5" >
        <a-form :model="formState" :label-col="{ span: 4 }" :wrapper-col="{ span: 12 }" @finish="onFinish"
            name="nest-messages" :validate-messages="validateMessages">
            <div class="row mb-3">

                <div class="col-12">
                    <a-form-item name="name" label="Name" :rules="[{ required: true }]">
                        <a-input v-model:value="formState.name" />
                    </a-form-item>
                    <a-form-item name="location_id" label="Location" :rules="[{ required: true }]">
                        <a-select show-search placeholder="Location" style="width: 100%" :options="locations"
                            :filter-option="filterOption" allow-clear v-model:value="formState.location_id">
                        </a-select>
                    </a-form-item>
                    <a-form-item name="address" label="Address" :rules="[{ required: true }]">
                        <a-input v-model:value="formState.address" />
                    </a-form-item>
                    <a-form-item label="Avatar" name="avatar" :rules="[{ required: true }]">
                        <a-upload v-model:file-list="avatarList" name="image" list-type="picture-card"
                            class="avatar-uploader" :show-upload-list="false"
                            action="http://localhost:8000/api/upload-image" :before-upload="beforeUpload"
                            @change="avatarChange">
                            <img v-if="formState.avatar" :src="'http://localhost:8000/storage/' + formState.avatar"
                                alt="avatar" style="width: 200px;height: 200px; object-fit: contain;" />
                            <div v-else>
                                <loading-outlined v-if="loading"></loading-outlined>
                                <plus-outlined v-else></plus-outlined>
                                <div class="ant-upload-text">Upload</div>
                            </div>
                        </a-upload>
                    </a-form-item>
                    <a-form-item label="Images" name="images">
                        <a-upload action="http://localhost:8000/api/upload-image" :multiple="true"
                            :file-list="formState.images" name="image" :before-upload="beforeUpload" @change="handleChange">
                            <a-button>
                                <upload-outlined></upload-outlined>
                                Upload
                            </a-button>
                        </a-upload>
                    </a-form-item>
                    <a-form-item name="desc" label="Description" :rules="[{ required: true }]">
                        <a-textarea v-model:value="formState.desc" />
                    </a-form-item>
                    <a-form-item name="utilities" label="Utilities">
                        <a-checkbox-group v-model:value="formState['utilities']">
                            <a-row>
                                <a-col :span="8">
                                    <a-checkbox :value="1" style="line-height: 32px">Restaurant</a-checkbox>
                                </a-col>
                                <a-col :span="8">
                                    <a-checkbox :value="2" style="line-height: 32px">Free Wifi</a-checkbox>
                                </a-col>
                                <a-col :span="8">
                                    <a-checkbox :value="3" style="line-height: 32px">Pool</a-checkbox>
                                </a-col>
                                <a-col :span="8">
                                    <a-checkbox :value="4" style="line-height: 32px">Spa</a-checkbox>
                                </a-col>
                                <a-col :span="8">
                                    <a-checkbox :value="5" style="line-height: 32px">Bar</a-checkbox>
                                </a-col>
                                <a-col :span="8">
                                    <a-checkbox :value="6" style="line-height: 32px">Breakfast</a-checkbox>
                                </a-col>
                            </a-row>
                        </a-checkbox-group>
                    </a-form-item>


                </div>
            </div>
            <div class="row">
                <div class="col-12 d-grid d-sm-flex justify-content-sm-end mx-auto">
                    <a-button class="me-0 me-sm-2 mb-3 mb-sm-0">
                        <router-link :to="{ name: 'homestays' }">
                            <span>Hủy</span>
                        </router-link>
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
import { ref, reactive } from "vue"
import { useRouter } from "vue-router";


import { message } from 'ant-design-vue';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { UploadOutlined } from '@ant-design/icons-vue';

export default {
    components: {
        TheHeader,
        LoadingOutlined,
        PlusOutlined,
        UploadOutlined

    },
    setup() {
        const router = useRouter();
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
        const locations = ref([]);
        const formState = reactive({
            name: '',
            location_id: null,
            address: '',
            avatar: null,
            images: [],
            desc: '',
            utilities: [],

        });
        const avatarList = ref([]);
        const loading = ref(false);

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
        const handleChange = info => {
            // console.log('handleChange', info)
            let resFileList = [...info.fileList];
            // console.log('[...info.fileList]', [...info.fileList])
            // console.log('resFileList', [...info.fileList])

            // // 1. Limit the number of uploaded files
            // //    Only to show two recent uploaded files, and old ones will be replaced by the new
            // //   resFileList = resFileList.slice(-2);``

            // // 2. read from response and show file link

            // //   console.log('resFileList ', resFileList);
            resFileList = resFileList.map(file => {
                if (file.response) {
                    // Component will show file.url as link
                    file.url = 'http://localhost:8000/storage/' + file.response.data;
                }
                return file;
            });
            formState.images = resFileList;
        };
        getLocations();

        const onFinish = values => {
            axios.post("http://127.0.0.1:8000/api/homestays",
                {
                    ...values,
                    images: values.images.map((image) => {
                        return image.url.substring(30);
                    })

                }
                , {
                    headers: {
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userData')).token}`
                    }
                })
                .then((response) => {

                    console.log(response.data)
                    message.success(response.data.message);
                    // useUser().onChangeName(response.data.data.name)
                    router.push({ name: "homestays" });

                })
                .catch((error) => {
                    console.log(error)
                    message.error("Some think error")
                });

        };
        return {
            formState,
            onFinish,
            validateMessages,
            locations,
            filterOption,
            avatarList,
            loading,
            avatarChange,
            handleChange,
            beforeUpload,
        }
    },
}
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