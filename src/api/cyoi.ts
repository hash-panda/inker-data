import axios from 'axios'

export function queryCyoiList() {
    const queryMsg = {
        vault_deposits: {},
    }
    const encodeQueryMsg = JSON.stringify(queryMsg)
    const requestParams = {
        params: {
            query_msg: encodeQueryMsg,
        },
    }
    return axios.get<any>('https://fcd.terra.dev/wasm/contracts/terra1v579mvp2xxw3st7glgaurfla5pxses0jdwedde/store', requestParams)
}
