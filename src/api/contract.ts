import BigNumber from 'bignumber.js';
import * as config from './config';
import service from "./service";
const serojs = require("serojs");
const seropp = require("sero-pp");

export interface Params {
    from?: string
    to: string
    cy?: string
    value?: string
    gas?: string
    gasPrice?: string
    data?: string
}
class Contract {
    contract: any;

    constructor() {
        this.contract = serojs.callContract(config.abi, config.address)
    }

    async details(mainPKr: string) {
        const res = await this.call("details", [], mainPKr)
        return res;
    }

    async canwithdraw(account: any, cy: string) {
        const res = await this.execute("withdrawBalance", [cy], account);
        return res;
    }
    async canwithdrawCall(account: any, cy: string) {
        const res = await this.call("withdrawBalance", [cy], account.MainPKr);
        return res;
    }

    async invest(account: any, arg: any, cy: string, value: string) {
    
        const res = await this.execute("invest", [arg], account, cy, value);
        return res;
    }

    async investCall(account: any, arg: any, cy: string, value?: string) {
        const res = await this.call("invest", [arg], account.MainPKr, cy, value);
        return res;
    }

    async isExist(account: any, code: string) {
        const res = await this.call("invest", [code], account.MainPKr, "SUSD_T", "0x" + new BigNumber(3e24).toString(16));
        if (res == "0x") {
            return false;
        }
        return true;
    }

    async call(method: string, args: Array<any>, from: string, cy?: string, value?: string): Promise<any> {
        const packData: any = this.contract.packData(method, args, true)
        const contract = this.contract;
        return new Promise((resolve, reject) => {
            const params: Params = {
                to: this.contract.address
            }
            params.from = from
            params.data = packData;
            if (cy) {
                params.cy = cy;
            }
            if (value) {
                params.value = value;
            }
            service.rpc("sero_call", [params, "latest"]).then(data => {
                if (data != "0x") {
                    const rest: any = contract.unPackDataEx(method, data);
                    if (rest.__length__ > 0) {
                        resolve(rest)
                    } else {
                        resolve(data)
                    }
                } else {
                    resolve(data)
                }
            }).catch(err => {
                reject(err)
            })

        })
    }

    async execute(method: string, args: Array<any>, account: any, cy?: string, value?: string): Promise<any> {
        const packData: any = this.contract.packData(method, args, true)
        return new Promise((resolve, reject) => {
            const params: Params = {
                to: this.contract.address
            }
            params.from = account.MainPKr
            params.data = packData;
            if (cy) {
                params.cy = cy;
            }
            if (value) {
                params.value = value;
            }
            service.rpc("sero_estimateGas", [params]).then((data: any) => {
                params.gas = data;
                params.from = account.PK
                seropp.executeContract(params, function (hash: any, err: any) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(hash)
                    }
                })
            }).catch(e => {
                reject(e)
            })
        })
    }
}
const contract = new Contract();

export default contract;