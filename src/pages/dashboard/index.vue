<template>
    <div class="container">
        <div class="left-side">
            <a-space direction="vertical" fill>
                <a-alert type="warning">{{ $t('alert.info') }}</a-alert>
                <div class="panel">
                    <DataPanel :players-count="playersCount" :personal-players="personalPlayers" :black-amount="blackAmount" :num2500="num2500" />
                </div>
                <div class="panel">
                    <ContentChart :chart-data="chart1" />
                </div>
                <div class="panel">
                    <CyoiChart />
                </div>
                <div class="panel">
                    <PrizeInfo />
                </div>
                <div><TotalDepositChart /></div>
                <div><PlayersChart /></div>
                <!-- <div class="panel">
                    <PartyDepositChart :chart-data="chart1" />
                </div> -->
                <div><PartyChart /></div>
            </a-space>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { queryPlayers, Player, queryBlacklistAddress } from '@/api/dashboard'
import { queryDepositInfo } from '@/api/profile-info'
import { getActualAmount, getAmount, partyAndAccountAddressGroup } from '@/utils'
import { accAdd } from '@/utils/amount'
import { usePartyState } from '@/store'
import PlayersChart from '@/components/analysis/players-chart.vue'
import TotalDepositChart from '@/components/analysis/total-deposit-chart.vue'
import PartyChart from '@/components/analysis/party-chart.vue'
// import PartyDepositChart from '@/components/analysis/party-deposit-chart.vue';
import DataPanel from './components/data-panel.vue'
import ContentChart from './components/content-chart.vue'
import PrizeInfo from './components/prize-info.vue'
import CyoiChart from './components/cyoi-chart.vue'

export default defineComponent({
    components: {
        DataPanel,
        ContentChart,
        PartyChart,
        PlayersChart,
        TotalDepositChart,
        PrizeInfo,
        CyoiChart,
    },
    setup() {
        interface PlayerAmountNumber {
            address: string
            amount: number
        }
        const players = ref([] as Player[])
        const playersCount = ref(0)
        const personalPlayers = ref(0)
        const blacklistAddressCount = ref(0)
        // const averageDeposit = ref(0);
        const blackAmount = ref(0)
        const sortPlayers = ref([] as PlayerAmountNumber[])
        const isGetAllPlayer = ref(false)
        const chart1 = ref({})
        const partyState = usePartyState()
        const num2500 = ref(0)

        partyState.getPartyInfo()

        const playersSortByAmount = (allPlayer: PlayerAmountNumber[]): PlayerAmountNumber[] => {
            return allPlayer.sort((a, b) => {
                return b.amount - a.amount
            })
        }
        const playersAmountConvertNumber = (allPlayer: Player[]): PlayerAmountNumber[] => {
            return allPlayer.map(item => {
                return {
                    address: item.address,
                    amount: getAmount(getActualAmount(item.amount)),
                }
            })
        }

        const playersConvertCharts1Data = (allPlayer: PlayerAmountNumber[]) => {
            // -----
            // const partyInfoAddress = partyState.getPartyInfoAddress;
            const resultGroup = allPlayer.reduce((prev: any, current) => {
                const setGroupInfo = (key: any) => {
                    if (!prev[key]) {
                        prev[key] = {
                            sum: 0,
                            count: 0,
                        }
                    }
                    prev[key].sum = getAmount(accAdd(prev[key].sum, current.amount))
                    prev[key].count += 1
                }
                // if (!partyInfoAddress.includes(current.address)) {
                if (current.amount < 11) {
                    setGroupInfo('< 11')
                } else if (current.amount >= 11 && current.amount < 100) {
                    setGroupInfo('[11, 100)')
                } else if (current.amount >= 100 && current.amount < 200) {
                    setGroupInfo('[100, 200)')
                } else if (current.amount >= 200 && current.amount < 500) {
                    setGroupInfo('[200, 500)')
                } else if (current.amount >= 500 && current.amount < 1000) {
                    setGroupInfo('[500, 1000)')
                } else if (current.amount >= 1000 && current.amount < 5000) {
                    setGroupInfo('[1000, 5000)')
                } else if (current.amount >= 5000 && current.amount < 1000000) {
                    setGroupInfo('[5000, 1000000)')
                } else {
                    setGroupInfo('>= 1000000(赞助商)')
                }
                // }
                return prev
            }, {})

            chart1.value = {
                x: Object.keys(resultGroup),
                amounts: Object.values(resultGroup).map((v: any) => v.sum),
                count: Object.values(resultGroup).map((v: any) => v.count),
            }
        }
        const convertPlayersData = (players: Player[]) => {
            const tempAmountNumber = playersAmountConvertNumber(players)
            sortPlayers.value = playersSortByAmount(tempAmountNumber)
            // num2500.value = sortPlayers.value[2499].amount
            playersConvertCharts1Data(sortPlayers.value)
        }

        watch(
            () => [isGetAllPlayer.value, partyState.isNeedCheck],
            () => {
                // if (isGetAllPlayer.value && !partyState.isNeedCheck) {
                const allRecord = partyAndAccountAddressGroup([
                    ...players.value,
                    // ...partyState.partyDeposits,
                ])
                playersCount.value = allRecord.length
                personalPlayers.value = players.value.length
                convertPlayersData(allRecord)
                // }
            },
        )

        const fetchData = async (startAddress: string | null) => {
            try {
                const playersRes = await queryPlayers(startAddress)
                const tempPlayers = playersRes.data?.result?.players
                if (tempPlayers.length === 1 && tempPlayers[0]?.address === startAddress) {
                    isGetAllPlayer.value = true
                    return
                }
                // 第二次开始查询时 上次的最后一条和这次的第一条一样，需要去除
                if (startAddress) {
                    tempPlayers.splice(0, 1)
                }
                players.value = [...players.value, ...tempPlayers]
                isGetAllPlayer.value = false
                fetchData(tempPlayers[tempPlayers.length - 1].address)
            } catch (e) {
                /* eslint-disable no-console */
                console.log('dashboard err', e)
            }
        }

        fetchData(null)

        const fetchBlacklistAddressData = async () => {
            try {
                const blacklistAddress = await queryBlacklistAddress()
                blackAmount.value = 0
                blacklistAddressCount.value = blacklistAddress.data?.result?.addresses.length
                blacklistAddress.data?.result?.addresses.forEach(async item => {
                    const depositInfo = await queryDepositInfo(item)
                    blackAmount.value = accAdd(blackAmount.value, getActualAmount(depositInfo.data?.result?.asset?.amount))
                })
            } catch (e) {
                /* eslint-disable no-console */
                console.log('fetchBlacklistAddressData err', e)
            }
        }
        fetchBlacklistAddressData()
        return {
            personalPlayers,
            blackAmount,
            playersCount,
            chart1,
            num2500,
        }
    },
})
</script>

<style lang="less" scoped>
.container {
    background-color: var(--color-fill-2);
    padding: 16px 20px;
    padding-bottom: 0;
    display: flex;
}

.left-side {
    flex: 1;
    overflow: auto;
}
.panel {
    background-color: var(--color-bg-2);
    border-radius: 4px;
    overflow: auto;
}
:deep(.panel-border) {
    margin-bottom: 0;
    border-bottom: 1px solid rgb(var(--gray-2));
}
</style>
