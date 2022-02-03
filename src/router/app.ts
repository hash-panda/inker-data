export default [
  {
    path: 'dashboard',
    name: 'dashboard',
    component: () => import('@/pages/dashboard/index.vue'),
    meta: {
      locale: 'menu.dashboard',
      requiresAuth: true,
      icon: 'icon-dashboard',
      role: ['*'],
    },
  },
  {
    path: 'profile',
    name: 'profile',
    component: () => import('@/pages/profile/index.vue'),
    meta: {
      locale: 'menu.profile',
      requiresAuth: true,
      icon: 'icon-apps',
      role: ['*'],
    },
  },
  {
    path: 'check-account',
    name: 'checkAccount',
    component: () => import('@/pages/profileInfo/checkAccount/index.vue'),
    meta: {
      locale: 'menu.profileInfo.checkAccount',
      requiresAuth: true,
      icon: 'icon-align-center',
      role: ['*'],
    },
  },
  {
    path: 'check-profile',
    name: 'checkProfile',
    component: () => import('@/pages/profileInfo/checkProfile/index.vue'),
    meta: {
      locale: 'menu.profileInfo.checkProfile',
      requiresAuth: true,
      icon: 'icon-user',
      role: ['*'],
    },
  },
  {
    path: 'winners',
    name: 'winners',
    component: () => import('@/pages/winners/index.vue'),
    meta: {
      locale: 'menu.winners',
      requiresAuth: true,
      icon: 'icon-code-square',
      role: ['*'],
    },
  },
  {
    path: 'faq',
    name: 'faq',
    component: () => import('@/pages/faq/index.vue'),
    meta: {
      locale: 'menu.faq',
      requiresAuth: true,
      icon: 'icon-question-circle',
      role: ['*'],
    },
  },
  {
    path: 'roadmap',
    name: 'roadmap',
    component: () => import('@/pages/roadmap/index.vue'),
    meta: {
      locale: 'menu.roadmap',
      requiresAuth: true,
      icon: 'icon-cloud',
      role: ['*'],
    },
  },
  {
    path: 'donate',
    name: 'donate',
    component: () => import('@/pages/donate/index.vue'),
    meta: {
      locale: 'menu.donate',
      requiresAuth: true,
      icon: 'icon-gift',
      role: ['*'],
    },
  },
];
