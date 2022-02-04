import localeWinners from '@/pages/winners/locale/zh-CN';
import localeProfile from '@/pages/profile/locale/zh-CN';
import localeProfileInfo from '@/pages/profileInfo/locale/zh-CN';
import localeDonate from '@/pages/donate/locale/zh-CN';
import localeRoadmap from '@/pages/roadmap/locale/zh-CN';
import localeFaq from '@/pages/faq/locale/zh-CN';

import localeMessageBox from '@/components/message-box/locale/zh-CN';

import locale403 from '@/pages/exception/403/locale/zh-CN';
import locale404 from '@/pages/exception/404/locale/zh-CN';
import locale500 from '@/pages/exception/500/locale/zh-CN';

import localeSettings from './zh-CN/settings';

export default {
  'menu.dashboard': '仪表盘',
  'navbar.action.locale': '切换为中文',
  'http.error': '服务器繁忙，请刷新或者重新输入信息',
  ...localeSettings,
  ...localeMessageBox,
  ...localeWinners,
  ...localeProfile,
  ...localeProfileInfo,
  ...localeDonate,
  ...localeRoadmap,
  ...localeFaq,
  ...locale403,
  ...locale404,
  ...locale500,
};
