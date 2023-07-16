<template>
    <div id="components-dropdown-demo-placement">
        <a-dropdown placement="bottomRight">
            <img src="/Avatar.jpg" class="img-avt mx-3">
            <template #overlay>
                <a-menu>
                    <a-menu-item key="profile">
                        <router-link :to="{ name: 'profile' }">
                            <span>
                                Profile
                            </span>
                        </router-link>
                    </a-menu-item>

                    <a-menu-item>
                        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                            HomeStay Manager
                        </a>
                    </a-menu-item>
                    <a-menu-item>
                        <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                            User Manager
                        </a>
                    </a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
    </div>
</template>

<style scoped>
#components-dropdown-demo-placement .ant-btn {
    margin-right: 8px;
    margin-bottom: 8px;
}

.img-avt {
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
</style>


<script>
// export default defineComponent({
//     components: {
//         UserOutlined
//     },
//     // setup() {
//     //     const store = useMenu();

//     //     return {
//     //         ...storeToRefs(store),
//     //     };
//     // },
// });
</script>