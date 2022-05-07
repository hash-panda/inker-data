export default [
  {
    path: 'dashboard',
    name: 'dashboard',
    component: () => import('@/pages/dashboard/index.vue'),
    meta: {
      locale: 'menu.dashboard',
      icon: 'icon-dashboard',
      keepAlive: true,
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
    path: 'check-profile',
    name: 'checkProfile',
    component: () => import('@/pages/profileInfo/checkProfile/index.vue'),
    meta: {
      locale: 'menu.profileInfo.checkProfile',
      icon: 'icon-user',
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
    path: 'party',
    name: 'party',
    component: () => import('@/pages/party/index.vue'),
    meta: {
      locale: 'menu.party',
      icon: 'icon-code-square',
      keepAlive: true,
    },
  },
  {
    path: 'nft',
    name: 'nft',
    component: () => import('@/pages/nft/list/index.vue'),
    meta: {
      locale: 'menu.nft',
      icon: 'icon-code-square',
      keepAlive: true,
    },
  },
  {
    path: 'prosper-nft',
    name: 'prosperNft',
    component: () => import('@/pages/prosperNft/list/index.vue'),
    meta: {
      locale: 'menu.prosper.nft',
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
      keepAlive: true,
    },
  },
  {
    path: 'roadmap',
    name: 'roadmap',
    component: () => import('@/pages/roadmap/index.vue'),
    meta: {
      locale: 'menu.roadmap',
      icon: 'icon-cloud',
      keepAlive: true,
    },
  },
  {
    path: 'airdrop',
    name: 'airdrop',
    component: () => import('@/pages/airdrop/index.vue'),
    meta: {
      locale: 'menu.airdrop',
      icon: 'icon-heart',
      keepAlive: true,
    },
  },
  {
    path: 'donate',
    name: 'donate',
    component: () => import('@/pages/donate/index.vue'),
    meta: {
      locale: 'menu.donate',
      icon: 'icon-gift',
      keepAlive: true,
    },
  },
];
