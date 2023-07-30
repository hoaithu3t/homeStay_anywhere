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

.background-gradient-1 {
    background: linear-gradient(56deg, rgba(223, 79, 39, 1) 50%, rgba(255, 169, 0, 1) 100%);
}

.background-gradient-2 {
    background: linear-gradient(160deg, rgba(223, 79, 39, 1) 50%, rgba(255, 169, 0, 1) 100%);
}
</style>

