<template>
    <router-view></router-view>
</template>
<style>
.ant-btn-primary {
    background-color: orange !important;
    border-color: orange !important;
}

.ant-btn.ant-btn-background-ghost:focus {
    color: orange;
    border-color: orange;
}

:root {
    --bold: #262626;
    --light: #6b6b6b
}

.background-gradient {
    background: linear-gradient(56deg, rgba(185, 79, 43, 1) 0%, rgba(223, 79, 39, 1) 10%, rgba(225, 130, 19, 1) 60%, rgba(255, 169, 0, 1) 97%);
}
</style>

