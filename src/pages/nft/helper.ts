
// function tigerNftSort(tigerNftList: any) {
//     const tigerNfts = tigerNftList.sort((a,b) => {
//       return Number(a.tokenId) - Number(b.tokenId);
//     });
//     console.log("tigerNfts", tigerNfts);
//   }
  
  
//   function tigerNftRarity(tigerNftList: any) {
//       const background = {
//           RED: 0.28,
//           BLACK: 0.352,
//           BLUE: 0.156,
//           BROWN: 0.06,
//           GREEN: 0.152
//       }
//       const weapons = {
//           BLANK: 0.276,
//           WEAPON: 0.724
//       }
//       const skintone = {
//           ORANGE: 0.292,
//           BROWN: 0.05,
//           GREEN: 0.158,
//           PINK: 0.386,
//           BLUE: 0.114
//       }
//       const clothes = {
//           SHIRT: 0.314,
//           ARMOR: 0.11,
//           ROBE: 0.322,
//           SLEEVELESS: 0.19,
//           MONK: 0.064
//       }
//       const face = {
//           NONE: 0.256,
//           'NOSE RING': 0.222,
//           '3D GLASSES': 0.234,
//           'EXPLODING EYES': 0.114,
//           'BLOODY EYES': 0.05,
//           'GUN GLASSES': 0.124
//       }
//       const headwear = {
//           HAT: 0.74,
//           NONE: 0.26
//       }
//       const hands = {
//           NONE: 0.27,
//           HANDS: 0.636,
//           HANDS2:0.094
//       }
//       const tigerNfts = tigerNftList.map((v) => {
//           let score = 0
//           const attr = v.attributes
//           attr.forEach(item=>{
//               if (item.trait_type === '1 BACKGROUND') {
//                   if (background[item.value]){
//                     score += 1.0 / background[item.value]  
//                   } 
//               }
//               if (item.trait_type === '2 WEAPONS') {
//                   if (weapons[item.value]){
//                     score += 1.0 / weapons[item.value]  
//                   } 
//               }
//               if (item.trait_type === '3 SKINTONE') {
//                   if (skintone[item.value]){
//                     score += 1.0 / skintone[item.value]  
//                   } 
//               }
//               if (item.trait_type === '4 CLOTHES') {
//                   if (clothes[item.value]){
//                     score += 1.0 / clothes[item.value]  
//                   } 
//               }
//               if (item.trait_type === '5 FACE ATTRIBUTES') {
//                   if (face[item.value]){
//                     score += 1.0 / face[item.value]  
//                   } 
//               }
//               if (item.trait_type === '6 HEADWEAR') {
//                   if (headwear[item.value]){
//                     score += 1.0 / headwear[item.value]  
//                   } 
//               }
//               if (item.trait_type === '7 HANDS') {
//                   if (hands[item.value]){
//                     score += 1.0 / hands[item.value]  
//                   } 
//               }
//           })
//         return {
//             ...v,
//             score:Number(score.toFixed(3))
//         }
//       });
//       const tigerNftsScoreSort = tigerNfts.sort((a,b)=>{
//         return b.score - a.score
//       })
//       console.log("tigerNfts", tigerNftsScoreSort);
//     }
  