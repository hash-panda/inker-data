export default [
  {
    path: 'dashboard',
    name: 'dashboard',
    component: () => import('@/pages/dashboard/index.vue'),
    meta: {
      locale: 'menu.dashboard',
      icon: 'icon-dashboard',
    },
  },
  {
    path: 'profile',
    name: 'profile',
    component: () => import('@/pages/profile/index.vue'),
    meta: {
      locale: 'menu.profile',
      icon: 'icon-apps',
    },
  },
  {
    path: 'check-account',
    name: 'checkAccount',
    component: () => import('@/pages/profileInfo/checkAccount/index.vue'),
    meta: {
      locale: 'menu.profileInfo.checkAccount',
      icon: 'icon-align-center',
      keepAlive: true,
    },
  },
  {
    path: 'check-profile',
    name: 'checkProfile',
    component: () => import('@/pages/profileInfo/checkProfile/index.vue'),
    meta: {
      locale: 'menu.profileInfo.checkProfile',
      icon: 'icon-user',
      keepAlive: true,
    },
  },
  {
    path: 'winners',
    name: 'winners',
    component: () => import('@/pages/winners/index.vue'),
    meta: {
      locale: 'menu.winners',
      icon: 'icon-code-square',
      keepAlive: true,
    },
  },
  {
    path: 'faq',
    name: 'faq',
    component: () => import('@/pages/faq/index.vue'),
    meta: {
      locale: 'menu.faq',
      icon: 'icon-question-circle',
    },
  },
  {
    path: 'roadmap',
    name: 'roadmap',
    component: () => import('@/pages/roadmap/index.vue'),
    meta: {
      locale: 'menu.roadmap',
      icon: 'icon-cloud',
    },
  },
  {
    path: 'donate',
    name: 'donate',
    component: () => import('@/pages/donate/index.vue'),
    meta: {
      locale: 'menu.donate',
      icon: 'icon-gift',
    },
  },
];
