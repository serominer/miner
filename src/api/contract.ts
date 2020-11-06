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

    async details(mainPKr: string){
        const res=await this.call("details",[],mainPKr)
        return res;
    }
    
    async call(method: string, args: Array<any>, from: string): Promise<any> {
        const packData: any = this.contract.packData(method, args, true)
        const contract = this.contract;
        return new Promise((resolve, reject) => {
            const params: Params = {
                to: this.contract.address
            }
            params.from = from
            params.data = packData;

            service.rpc("sero_call", [params, "latest"]).then(data => {
                if (data != "0x") {
                    const rest: any = contract.unPackDataEx(method, data)
                    resolve(rest)
                } else {
                }
            }).catch(err => {
                reject(err)
            })

        })
    }

    async balanceOf(): Promise<any> {
        return new Promise((resolve, reject) => {
            service.rpc("sero_getBalance", [config.address, "latest"]).then(data => {
                if (data != "0x") {
                    resolve(data)
                } else {
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