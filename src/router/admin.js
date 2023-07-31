const admin = [
  {
    path: "/",
    component: () => import("../layouts/home.vue"),
    name: "home",
  },
  {
    path: "/admin",
    component: () => import("../layouts/admin.vue"),
    children: [
      // Quản lý Users
      {
        path: "users",
        name: "admin-users",
        component: () => import("../pages/admin/users/index.vue"),
      },
      {
        path: "users/create",
        name: "admin-users-create",
        component: () => import("../pages/admin/users/create.vue"),
      },
      {
        path: "users/:id/edit",
        name: "admin-users-edit",
        component: () => import("../pages/admin/users/edit.vue"),
      },

      // Quản lý Roles
      {
        path: "roles",
        name: "admin-roles",
        component: () => import("../pages/admin/roles/index.vue"),
      },

      // Quản lý Settings
      {
        path: "settings",
        name: "admin-settings",
        component: () => import("../pages/admin/settings/index.vue"),
      },
    ],
  },
  {
    path: "/profile",
    component: () => import("../layouts/profile.vue"),
    name: "profile",
  },
  {
    path: "/homestays",
    component: () => import("../layouts/homestays/index.vue"),
    name: "homestays",
  },
  {
    path: "/homestays/create",
    name: "homestays-create",
    component: () => import("../layouts/homestays/create.vue"),
  },
  {
    path: "/homestays/:id/edit",
    name: "homestays-edit",
    component: () => import("../layouts/homestays/edit.vue"),
  },
  {
    path: "/homstays/:id/rooms",
    component: () => import("../layouts/rooms/index.vue"),
    name: "rooms",
  },
  {
    path: "/homstays/:id/rooms/create",
    name: "rooms-create",
    component: () => import("../layouts/rooms/create.vue"),
  },
  {
    path: "/rooms/:id/edit",
    name: "rooms-edit",
    component: () => import("../layouts/rooms/edit.vue"),
  },
  {
    path: "/users",
    component: () => import("../layouts/users/index.vue"),
    name: "user-manager",
  },
  {
    path: "/users/create",
    component: () => import("../layouts/users/create-update.vue"),
    name: "user-create",
  },
  {
    path: "/users/:id/edit",
    component: () => import("../layouts/users/create-update.vue"),
    name: "user-update",
  },
  {
    path: "/change-password",
    component: () => import("../layouts/changePassword.vue"),
    name: "change-password",
  },
  {
    path: "/locations",
    component: () => import("../layouts/locations/index.vue"),
    name: "location-manager",
  },
  
];

export default admin;
