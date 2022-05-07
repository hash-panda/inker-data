// function prosperNftRarity(tigerNftList) {
//     const background = {
//       VIOLET: 0.1308,
//       YELLOW: 0.0696,
//       BLUE: 0.3285,
//       PINK: 0.1965,
//       GREEN: 0.2745,
//     };

//     const weapons = {
//       "MULTI FEATHERS": 0.2508,
//       "ORANGE FEATHERS": 0.2094,
//       "WEEDY FEATHERS": 0.1692,
//       "GREEN FEATHERS": 0.1422,
//       "VIOLET FEATHERS": 0.1143,
//       "YELLOW FEATHERS": 0.0762,
//       "RED FEATHERS": 0.0378,
//     };
//     const skintone = {
//       BODY: 1,
//     };
//     const clothes = {
//       BLANK: 0.2193,
//       SUIT: 0.1869,
//       PUNK: 0.1617,
//       "TRENCH COAT": 0.1458,
//       CEASAR: 0.1119,
//       PIMP: 0.0927,
//       SAILOR: 0.0531,
//       SHIRT: 0.0285,
//     };
//     const face = {
//       BLANK: 0.2262,
//       TONGUE: 0.1872,
//       "BUBBLE GUM": 0.1602,
//       ROSE: 0.1446,
//       WEED: 0.1119,
//       LOLLIPOP: 0.0819,
//       CIGARETTE: 0.0561,
//       "CANDY CANE": 0.0318,
//     };
//     const headwear = {
//       BLANK: 0.2115,
//       HEART: 0.1941,
//       EYEPATCH: 0.1791,
//       "3D GLASSES": 0.1311,
//       "SKULL EYES": 0.1071,
//       ZOMBIE: 0.0849,
//       SHADES: 0.0543,
//       CYCLOPS: 0.0378,
//     };
//     const hands = {
//       BLANK: 0.2115,
//       CAPTAIN: 0.1953,
//       PIRATE: 0.1698,
//       BANDANA: 0.1401,
//       PILOT: 0.1065,
//       RUSSIAN: 0.0876,
//       BARRETT: 0.0636,
//       TOPHAT: 0.0255,
//     };
//     const beak = {
//       BEAK: 1,
//     };
//     const tigerNfts = tigerNftList.map((v) => {
//       let score = 0;
//       const attr = v.attributes;
//       attr.forEach((item) => {
//         if (item.trait_type === "1 BACKGROUND") {
//           if (background[item.value]) {
//             score += 1.0 / background[item.value];
//           }
//         }
//         if (item.trait_type === "2 FEATHERS") {
//           if (weapons[item.value]) {
//             score += 1.0 / weapons[item.value];
//           }
//         }
//         if (item.trait_type === "3 BODY") {
//           if (skintone[item.value]) {
//             score += 1.0 / skintone[item.value];
//           }
//         }
//         if (item.trait_type === "4 CLOTHES") {
//           if (clothes[item.value]) {
//             score += 1.0 / clothes[item.value];
//           }
//         }
//         if (item.trait_type === "5 MOUTH") {
//           if (face[item.value]) {
//             score += 1.0 / face[item.value];
//           }
//         }
//         if (item.trait_type === "6 EYEWEAR") {
//           if (headwear[item.value]) {
//             score += 1.0 / headwear[item.value];
//           }
//         }
//         if (item.trait_type === "7 HEADWEAR") {
//           if (hands[item.value]) {
//             score += 1.0 / hands[item.value];
//           }
//         }
//         if (item.trait_type === "8 BEAK") {
//           if (beak[item.value]) {
//             score += 1.0 / beak[item.value];
//           }
//         }
//       });
//       return {
//         ...v,
//         score: Number(score.toFixed(3)),
//       };
//     });
//     const tigerNftsScoreSort = tigerNfts.sort((a, b) => {
//       return b.score - a.score;
//     });

//     console.log("tigerNfts", tigerNftsScoreSort);
//   }

//   prosperNftRarity(nfts)
