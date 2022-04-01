
// function tigerNftSort(tigerNftList: any) {
//     const tigerNfts = tigerNftList.sort((a,b) => {
//       return Number(a.tokenId) - Number(b.tokenId);
//     });
//     console.log("tigerNfts", tigerNfts);
//   }
  
  
//   function tigerNftRarity(tigerNftList: any) {
//       const background = {
//           RED: 0.272,
//           BLACK: 0.335,
//           BLUE: 0.1927,
//           BROWN: 0.0617,
//           GREEN: 0.1387
//       }
//       const weapons = {
//           BLANK: 0.2913,
//           WEAPON: 0.7087
//       }
//       const skintone = {
//           ORANGE: 0.2633,
//           BROWN: 0.0733,
//           GREEN: 0.1887,
//           PINK: 0.3353,
//           BLUE: 0.1393
//       }
//       const clothes = {
//           SHIRT: 0.277,
//           ARMOR: 0.1363,
//           ROBE: 0.3157,
//           SLEEVELESS: 0.1987,
//           MONK: 0.0723
//       }
//       const face = {
//           NONE: 0.2887,
//           'NOSE RING': 0.2253,
//           '3D GLASSES': 0.1987,
//           'EXPLODING EYES': 0.1007,
//           'BLOODY EYES': 0.0477,
//           'GUN GLASSES': 0.139
//       }
//       const headwear = {
//           HAT: 0.7203,
//           NONE: 0.2797
//       }
//       const hands = {
//           NONE: 0.2837,
//           HANDS: 0.6247,
//           HANDS2:0.0917
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
  