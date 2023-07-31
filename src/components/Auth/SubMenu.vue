<template>
    <div id="components-dropdown-demo-placement">
        <a-dropdown placement="bottomRight">
            <img v-if="JSON.parse(userData).avatar" :src="'http://localhost:8000/storage/' + JSON.parse(userData).avatar"
                alt="avatar" class="img-avt mx-3" />
            <img v-else src="/Avatar.jpg" class="img-avt mx-3">
            <template #overlay>
                <a-menu>
                    <a-menu-item key="profile">
                        <router-link :to="{ name: 'profile' }">
                            Profile
                        </router-link>
                    </a-menu-item>
                    <a-menu-item v-if="JSON.parse(userData).role === 2">
                        <router-link :to="{ name: 'homestays' }">
                            My homestays
                        </router-link>
                    </a-menu-item>
                    <a-menu-item v-if="JSON.parse(userData).role === 0">
                        <router-link :to="{ name: 'user-manager' }">
                            User Manager
                        </router-link>
                    </a-menu-item>
                    <a-menu-item v-if="JSON.parse(userData).role === 0">
                        <router-link :to="{ name: 'location-manager' }">
                            Location Manager
                        </router-link>
                    </a-menu-item>
                    <a-menu-item>
                        <router-link :to="{ name: 'change-password' }">
                            Change password
                        </router-link>
                    </a-menu-item>
                    <a-menu-item>
                        <a @click="logout">
                            Logout
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
import { defineComponent, toRefs } from 'vue';
import { useUser } from '../../stores/use-user';

export default defineComponent({
    setup() {
        const userStore = useUser();
        const logout = () => {
            useUser().onChange(undefined)
        }

        return {
            logout,
            ...toRefs(userStore),
        };
    },
});
</script>