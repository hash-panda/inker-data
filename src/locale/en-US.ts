import localeDashboard from '@/pages/dashboard/locale/en-US';
import localeParty from '@/pages/party/locale/en-US';
import localeWinners from '@/pages/winners/locale/en-US';
import localeProfile from '@/pages/profile/locale/en-US';
import localeProfileInfo from '@/pages/profileInfo/locale/en-US';
import localeDonate from '@/pages/donate/locale/en-US';
import localeRoadmap from '@/pages/roadmap/locale/en-US';
import localeFaq from '@/pages/faq/locale/en-US';
import localeAirdrop from '@/pages/airdrop/locale/en-US';
import localeMessageBox from '@/components/message-box/locale/en-US';
import localeAnalysis from '@/components/analysis/locale/en-US';
import localeNft from '@/pages/nft/locale/en-US';
import localeProsperNft from '@/pages/prosperNft/locale/en-US';

import locale403 from '@/pages/exception/403/locale/en-US';
import locale404 from '@/pages/exception/404/locale/en-US';
import locale500 from '@/pages/exception/500/locale/en-US';

import localeSettings from './en-US/settings';

export default {
  'navbar.action.locale': 'Switch to English',
  'http.error': 'The server is busy. Refresh or re-enter the information',
  'alert.info':
    '1. Rarity Rank of Prosper Peacock NFT had released! 2. Prosper Peacock NFT giveaway winners had released, please Check Accout and Check Profile Awards on Menu!',
  ...localeNft,
  ...localeProsperNft,
  ...localeAnalysis,
  ...localeSettings,
  ...localeMessageBox,
  ...localeParty,
  ...localeDashboard,
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
