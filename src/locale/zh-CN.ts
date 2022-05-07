import localeDashboard from '@/pages/dashboard/locale/zh-CN';
import localeParty from '@/pages/party/locale/zh-CN';
import localeWinners from '@/pages/winners/locale/zh-CN';
import localeProfile from '@/pages/profile/locale/zh-CN';
import localeProfileInfo from '@/pages/profileInfo/locale/zh-CN';
import localeDonate from '@/pages/donate/locale/zh-CN';
import localeRoadmap from '@/pages/roadmap/locale/zh-CN';
import localeFaq from '@/pages/faq/locale/zh-CN';
import localeAirdrop from '@/pages/airdrop/locale/zh-CN';
import localeAnalysis from '@/components/analysis/locale/zh-CN';
import localeMessageBox from '@/components/message-box/locale/zh-CN';
import localeNft from '@/pages/nft/locale/zh-CN';
import localeProsperNft from '@/pages/prosperNft/locale/zh-CN';

import locale403 from '@/pages/exception/403/locale/zh-CN';
import locale404 from '@/pages/exception/404/locale/zh-CN';
import locale500 from '@/pages/exception/500/locale/zh-CN';

import localeSettings from './zh-CN/settings';

export default {
  'navbar.action.locale': '切换为中文',
  'http.error': '服务器繁忙，请刷新或者重新输入信息',
  'alert.info':
    '1. 孔雀稀有度已经发布！2. 孔雀 NFT 中奖名单已经发布！去「多账户中奖情况」和「查看账户」菜单查询吧！',
  ...localeNft,
  ...localeProsperNft,
  ...localeAnalysis,
  ...localeSettings,
  ...localeMessageBox,
  ...localeDashboard,
  ...localeParty,
  ...localeWinners,
  ...localeProfile,
  ...localeProfileInfo,
  ...localeDonate,
  ...localeRoadmap,
  ...localeFaq,
  ...localeAirdrop,
  ...locale403,
  ...locale404,
  ...locale500,
};
