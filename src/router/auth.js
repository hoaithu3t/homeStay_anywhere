const auth = [
    {
        path: "/auth",
        component: () => import("../layouts/admin.vue"),
        children: [
            // Đăng nhập/ Đăng xuất
            {
                path: "login",
                name: "auth-login",
                component: () => import ("../pages/auth/login/index.vue")
            },
            {
                path: "register",
                name: "auth-register",
                component: () => import ("../pages/auth/register/index.vue")
            },
            {
                path: "users/:id/edit",
                name: "admin-users-edit",
                component: () => import ("../pages/admin/users/edit.vue")
            },

            // Quản lý Roles
            {
                path: "roles",
                name: "admin-roles",
                component: () => import ("../pages/admin/roles/index.vue")
            },

            // Quản lý Settings
            {
                path: "settings",
                name: "admin-settings",
                component: () => import ("../pages/admin/settings/index.vue")
            }
        ]
    }
];

export default auth;