import React from 'react';
import './Miner.css';
import {InputNumber, message, Spin, Alert, Button, Modal, Input, Select, List, Row, Col} from 'antd';
import service from '../../api/service';
import contract from '../../api/contract';
import BigNumber from 'bignumber.js'
import i18n from '../../i18n'
import {LoadingOutlined, CheckCircleOutlined, CopyOutlined} from '@ant-design/icons';
import copy from 'copy-to-clipboard'
import CountDown from "../countdown";

import logo from '../../images/logo.png';
import head from '../../images/head.png';
import user from '../../images/user.png';
import myinfo from '../../images/myinfo.png';
import level1 from '../../images/level1.png';
import level2 from '../../images/level2.png';
import level3 from '../../images/level3.png';
import level4 from '../../images/level4.png';
import level5 from '../../images/level5.png';
import head_bg from '../../images/head_bg.jpg';
import body_bg from '../../images/body_bg.jpg';
import foot_bg from '../../images/foot_bg.jpg';

const {Option} = Select;

const successIcon = <CheckCircleOutlined style={{fontSize: 24}}/>
const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

interface Miners {
    data: Array<any>,
    withdrawvisible: boolean,
    upgradevisible: boolean,
    redeemvisible: boolean,
    uservisible: boolean,
    showusername: string,
    showusermainpkr: string,
    account: object,
    mainpkr: string,
    serobalance: string,
    susdbalance: string,
    myid: string,
    amount: number,
    achievement: number,
    allNodeNum: number,
    directNodeNum: number,
    recommendid: number,
    sendnum: number
    sendcy: string
    returnAmount: number,
    canWithdrawAmount: number,
    returnnowday: number,
    communityProfit: number,
    nodeProfit: number,
    recommendProfit: number,
    level: number,
    levelnum: number,
    lastreturntime: string,
    referralcode: string,
    withdrawcy: string,
    loading: any,
    withdrawChangenum: number,
    sendTxt: string,
    sendTxtnumber: number,
    levelborder: any,
    redeeming: number,
    redeemTime: number
}

class Miner extends React.Component<any, Miners> {
    codeInput = React.createRef<Input>();
    sendnumInput = React.createRef<Input>();
    state: Miners = {
        data: [],
        withdrawvisible: false,
        upgradevisible: false,
        uservisible: false,
        redeemvisible: false,
        showusername: "",
        showusermainpkr: "",
        account: {},
        mainpkr: "",
        serobalance: "0",
        susdbalance: "0",
        myid: "0",
        recommendid: 0,
        amount: 0,
        achievement: 0,
        allNodeNum: 0,
        directNodeNum: 0,
        sendnum: 0,
        sendcy: "SUSD",
        returnAmount: 0,
        canWithdrawAmount: 0,
        returnnowday: 0,
        communityProfit: 0,
        nodeProfit: 0,
        recommendProfit: 0,
        level: 0,
        levelnum: 0,
        lastreturntime: "",
        referralcode: "",
        withdrawcy: "SUSD",
        redeeming: 0,
        redeemTime: 0,
        loading: {
            loadingbox: "loadingbox",
            status: false,
            description: "",
            message: null
        },
        withdrawChangenum: 0,
        sendTxt: "",
        sendTxtnumber: 0,
        levelborder: [
            {
                name: "listitem"
            },
            {
                name: "listitem"
            },
            {
                name: "listitem"
            },
            {
                name: "listitem"
            },
            {
                name: "listitem"
            },
            {
                name: "listitem"
            }
        ],
    }

    componentDidMount() {
        const that = this;
        that.gatdata();
        let interId: any = sessionStorage.getItem("interId");
        if (interId) {
            clearInterval(interId)
        }
        interId = setInterval(() => that.getdetail(that.state.mainpkr), 10 * 10 ** 3);
        sessionStorage.setItem("interId", interId)
    }

    gatdata = () => {
        const that = this;
        service.accountList().then((res: any) => {
            let userobj: any = {};
            if (sessionStorage.getItem("userName")?.length === undefined) {
                userobj = res.find(function (item: any) {
                    return item.IsCurrent === true;
                })
            } else {
                userobj = res.find(function (item: any) {
                    return item.Name === sessionStorage.getItem("userName");
                })
            }
            let strmainpk: string = userobj.MainPKr;
            let length = strmainpk.length;
            let startmainpkr = strmainpk.substring(0, 5);
            let endmainpkr = strmainpk.substring(length - 5, length)
            let strmainpkr = startmainpkr + "....." + endmainpkr;

            that.setState({
                data: res,
                showusername: userobj.Name,
                showusermainpkr: strmainpkr,
                mainpkr: userobj.MainPKr,
                account: userobj,
                serobalance: new BigNumber(userobj.Balance.get("SERO")).dividedBy(10 ** 18).toFixed(2),
                susdbalance: new BigNumber(userobj.Balance.get("SUSD")).dividedBy(10 ** 18).toFixed(2),
            })
            that.getdetail(userobj.MainPKr);
            that.loading("loadingbox", false, "", null);
        })
    }

    getdetail = (mainpkr: string) => {
        const that = this;
        contract.details(mainpkr).then((res) => {
            that.level(fromValue(res[2].amount, 18).toNumber());
            // let recommendProfit = 0;
            // let nodeProfit = 0;
            // let communityProfit = 0;
            // if (Math.floor(res[2].dynamicTimestamp / 600) == Math.floor(new Date().getTime() / 1000 / 600)) {
            //   recommendProfit = parseFloat(fromValue(res[2].recommendProfit, 18).toNumber().toFixed(2));
            //   nodeProfit = parseFloat(fromValue(res[2].nodeProfit, 18).toNumber().toFixed(2));
            //   communityProfit = parseFloat(fromValue(res[2].communityProfit, 18).toNumber().toFixed(2));
            // }


            that.setState({
                achievement: parseFloat(fromValue(res[2].achievement, 18).toNumber().toFixed(2)),
                myid: res[0],
                recommendid: res[1],
                referralcode: res[1],
                allNodeNum: res[2].allNodeNum,
                directNodeNum: res[2].directNodeNum,
                returnAmount: parseFloat(fromValue(res[2].returnAmount, 18).toNumber().toFixed(2)),
                canWithdrawAmount: parseFloat(fromValue(res[2].canWithdrawAmount, 18).toNumber().toFixed(2)),
                returnnowday: parseFloat(fromValue(res[2].amount, 18).multipliedBy(0.003).toNumber().toFixed(2)),
                amount: parseFloat(fromValue(res[2].amount, 18).toNumber().toFixed(2)),
                lastreturntime: that.formatTime(res[2][9] * 1000, 'M/D h:m'),

                recommendProfit: parseFloat(fromValue(res[2].recommendProfit, 18).toNumber().toFixed(2)),
                nodeProfit: parseFloat(fromValue(res[2].nodeProfit, 18).toNumber().toFixed(2)),
                communityProfit: parseFloat(fromValue(res[2].communityProfit, 18).toNumber().toFixed(2)),

                redeeming: res[2].redeeming,
                redeemTime: res[2].redeemTime,
                // recommendProfit: recommendProfit,
                // nodeProfit: nodeProfit,
                // communityProfit: communityProfit
            })
        })
    }

    level = (v: number) => {
        const that = this;
        if (v >= 100 && v < 800) {
            that.setState({
                level: 1,
                levelnum: 3
            })
        } else if (v >= 800 && v < 2000) {
            that.setState({
                level: 2,
                levelnum: 3.5
            })
        } else if (v >= 2000 && v < 5000) {
            that.setState({
                level: 3,
                levelnum: 4
            })
        } else if (v >= 5000 && v < 10000) {
            that.setState({
                level: 4,
                levelnum: 4.5
            })
        } else if (v >= 10000) {
            that.setState({
                level: 5,
                levelnum: 5
            })
        } else {
            that.setState({
                level: 0,
                levelnum: 0
            })
        }
        that.levelborder(that.state.level)
    }

    levelborder = (v: number) => {
        const that = this;
        let levelBorder = [
            {
                name: "listitem"
            },
            {
                name: "listitem"
            },
            {
                name: "listitem"
            },
            {
                name: "listitem"
            },
            {
                name: "listitem"
            },
            {
                name: "listitem"
            }
        ]
        for (let i = 0; i < levelBorder.length; i++) {
            if (i === v) {
                levelBorder[i].name = "listitem listboxitemin"
            }
        }
        that.setState({
            levelborder: levelBorder
        })
    }

    closewithdraw() {
        const that = this;
        that.setState({
            withdrawvisible: false
        })
    }

    openwithdraw() {
        const that = this;

        contract.canwithdrawCall(that.state.account, that.state.withdrawcy).then((res) => {
            that.setState({
                withdrawvisible: true,
                withdrawChangenum: parseFloat(fromValue(res[0], 18).toNumber().toFixed(2))
            })
        })
    }

    withdrawChange(value: any) {
        const that = this;
        contract.canwithdrawCall(that.state.account, value).then((res) => {
            that.setState({
                withdrawcy: value,
                withdrawChangenum: parseFloat(fromValue(res[0], 18).toNumber().toFixed(2))
            })
        })
    }

    withdraw() {
        const that = this;
        that.setState({
            withdrawvisible: false
        })
        contract.canwithdraw(that.state.account, that.state.withdrawcy).then((hash) => {
            that.loading("loading", true, "", "")
            service.getTransactionReceipt(hash).then((res) => {
                that.loading("loading", false, `${i18n.t("success")}`, successIcon)
                setTimeout(function () {
                    that.gatdata();
                }, 1500);
            })
        })
    }

    referralcodeChange(e: any) {
        const that = this;
        that.setState({
            referralcode: e.target.value
        })
    }

    closeupgrade() {
        const that = this;
        that.setState({
            upgradevisible: false
        })
    }

    openupgrade() {
        const that = this;
        that.setState({
            upgradevisible: true,
        })
    }

    closeuser() {
        const that = this;
        that.setState({
            uservisible: false
        })
    }

    openuser() {
        const that = this;
        that.setState({
            uservisible: true
        })
    }

    redeem() {

    }

    sendnum(e: any) {
        const that = this;
        that.setState({
            sendTxtnumber: 0,
            sendTxt: "",
            sendnum: e,
        })
        if (e >= 0) {
            contract.investCall(that.state.account, "hAYBo5yIHmP", that.state.sendcy, "0x" + new BigNumber(e).multipliedBy(10 ** 18).toString(16)).then((res) => {
                if (res !== "") {
                    let num = parseFloat(fromValue(res[0], 18).toNumber().toFixed(2));
                    that.setState({
                        sendTxtnumber: num,
                        sendTxt: `${i18n.t("Convertible")}` + num + "SUSD"
                    })

                } else {

                }
            })
        } else {

        }
    }

    sendChange(value: any) {
        const that = this;
        that.setState({
            sendcy: value,
            sendTxt: ""
        })
    }

    levelbtn() {
        const that = this;
        let referralcode = that.state.referralcode;
        let sendnum = this.sendnumInput.current?.state.value;
        if (that.state.level === 0) {
            referralcode = this.codeInput.current?.state.value;
        }

        if (referralcode === undefined) {
            message.error(`${i18n.t("fillinthereferralcode")}`)
        } else {
            contract.isExist(that.state.account, referralcode).then((res) => {
                if (res) {
                    if (that.state.level !== 0) {
                        if (sendnum === 0) {
                            message.warning(`${i18n.t("Upgradedamount")}`)
                        } else {
                            that.setState({
                                upgradevisible: false
                            })
                            contract.invest(that.state.account, referralcode, that.state.sendcy, "0x" + new BigNumber(sendnum).multipliedBy(10 ** 18).toString(16)).then((hash) => {
                                that.loading("loading", true, "", "")
                                service.getTransactionReceipt(hash).then((res) => {
                                    that.loading("loading", false, `${i18n.t("success")}`, successIcon)
                                    setTimeout(function () {
                                        that.gatdata();
                                    }, 1500);
                                })
                            })
                        }
                    } else {
                        if (that.state.sendTxtnumber >= 100) {
                            that.setState({
                                upgradevisible: false
                            })
                            contract.invest(that.state.account, referralcode, that.state.sendcy, "0x" + new BigNumber(sendnum).multipliedBy(10 ** 18).toString(16)).then((hash) => {
                                that.loading("loading", true, "", "")
                                service.getTransactionReceipt(hash).then((res) => {
                                    that.loading("loading", false, `${i18n.t("success")}`, successIcon)
                                    setTimeout(function () {
                                        that.gatdata();
                                    }, 1500);
                                })
                            })
                        } else {
                            message.error(`${i18n.t("Upgradedamount")}` + '100SUSD');
                        }
                    }
                } else {
                    message.error(`${i18n.t("fillinthecorrectreferralcode")}`)
                }
            })
        }
    }

    selectName(mainPkr: any, name: any) {
        const that = this;
        that.getdetail(mainPkr);
        let userobj = that.state.data.find(function (item: any) {
            return item.Name === name;
        })

        let userName = name;
        sessionStorage.setItem("userName", userName);
        let strmainpk: string = userobj.MainPKr;
        let length = strmainpk.length;
        let startmainpkr = strmainpk.substring(0, 5);
        let endmainpkr = strmainpk.substring(length - 5, length)
        let strmainpkr = startmainpkr + "..." + endmainpkr;
        that.setState({
            uservisible: false,
            showusername: userobj.Name,
            showusermainpkr: strmainpkr,
            mainpkr: userobj.MainPKr,
            account: userobj,
            serobalance: new BigNumber(userobj.Balance.get("SERO")).dividedBy(10 ** 18).toFixed(2),
            susdbalance: new BigNumber(userobj.Balance.get("SUSD")).dividedBy(10 ** 18).toFixed(2)
        })
    }

    loading = (loadingbox: string, status: boolean, description: string, message: any) => {
        let that = this;
        let Loading = that.state.loading;
        Loading.loadingbox = loadingbox;
        Loading.status = status;
        Loading.description = description;
        Loading.message = message;
        that.setState({
            loading: Loading
        })
    }

    formatNumber(n: any) {
        n = n.toString()
        return n[1] ? n : '0' + n;
    }

    formatTime(number: number, format: any) {
        let time = new Date(number)
        let newArr = []
        let formatArr = ['Y', 'M', 'D', 'h', 'm', 's'];
        newArr.push(time.getFullYear());
        newArr.push(this.formatNumber(time.getMonth() + 1));
        newArr.push(this.formatNumber(time.getDate()));
        newArr.push(this.formatNumber(time.getHours()));
        newArr.push(this.formatNumber(time.getMinutes()));
        newArr.push(this.formatNumber(time.getSeconds()));
        for (let i in newArr) {
            format = format.replace(formatArr[i], newArr[i]);
        }
        return format;
    }

    copytext() {
        if (copy(this.state.myid)) {
            message.info("success");
        }
    }

    render() {
        const that = this;
        const miner = this.state;
        const allnum = miner.allNodeNum;
        const directnum = miner.directNodeNum;
        let canRedeem = this.state.redeeming != 2 && this.state.amount > this.state.returnAmount;
        return (
            <div className="miner">
                <div className="bg">
                    <div className="bg1">
                        <img src={head_bg} alt=""/>
                    </div>
                    <div className="bg2">
                        <img src={body_bg} alt=""/>
                    </div>
                    <div className="bg3">
                        <img src={foot_bg} alt=""/>
                    </div>
                </div>
                <div className="content">
                    <div className="logobox">
                        <img src={logo} alt=""/>
                    </div>
                    <div className="headerbox">
                        <img src={head} alt=""/>
                    </div>
                    <div className="userbox">
                        <div className="usercontent">
                            <div className="users">
                                <div className="img">
                                    <img src={user} alt=""/>
                                </div>
                                <div>
                                    <p>{miner.showusername}</p>
                                </div>
                            </div>
                            <div className="userinfo">
                                <div className="username">
                                    <p>{miner.showusermainpkr}</p>
                                </div>
                                <div className="usermoney">
                                    <p>{miner.serobalance === 'NaN' ? 0 : miner.serobalance} SERO</p>
                                </div>
                                <div className="usermoney">
                                    <p>{miner.susdbalance === 'NaN' ? 0 : miner.susdbalance} SUSD</p>
                                </div>
                            </div>
                            <div className="userbtn">
                                <div className="switchbtn">
                                    <Button onClick={() => this.openuser()}>
                                        {i18n.t("Switch")}
                                    </Button>
                                </div>
                                <Modal
                                    className="userboxs"
                                    title={i18n.t("Switchuser")}
                                    visible={this.state.uservisible}
                                    onCancel={() => this.closeuser()}
                                    footer={null}
                                    centered={true}
                                >
                                    <List
                                        size="small"
                                        className="userlistbox"
                                        itemLayout="horizontal"
                                        dataSource={this.state.data}
                                        renderItem={item => (
                                            <List.Item
                                                onClick={() => this.selectName(item.MainPKr, item.Name)}
                                            >
                                                <List.Item.Meta
                                                    description={`${item.Name}     ${item.MainPKr.substring(0, 5)}.....${item.MainPKr.substring(item.MainPKr.length - 5, item.MainPKr.length)}`}
                                                />
                                            </List.Item>
                                        )}
                                    />
                                </Modal>
                            </div>
                        </div>
                    </div>
                    <div className="listbox">
                        <div className="listcontent">
                            <div className="top">
                                <div className="left">
                                    <div className="level">
                                        <p>
                                            {i18n.t("Membershiplevel")}
                                        </p>
                                    </div>
                                    <div className="levelimg">
                                        {
                                            miner.level === 0 ? <div><img src={level1} alt=""/></div> :
                                                <div>{miner.level === 1 ? <div><img src={level1} alt=""/></div> :
                                                    <div>{miner.level === 2 ? <img src={level2} alt=""/> :
                                                        <div>{miner.level === 3 ? <img src={level3} alt=""/> :
                                                            <div>{miner.level === 4 ? <img src={level4} alt=""/> :
                                                                <div><img src={level5} alt=""/>
                                                                </div>}</div>}</div>}</div>}</div>
                                        }

                                    </div>
                                    <div className="leveltitle">
                                        {
                                            miner.level === 0 ? <div><p>{i18n.t("ordinary")}</p></div> :
                                                <div>{miner.level === 1 ? <div><p>{i18n.t("silver")}</p></div> :
                                                    <div>{miner.level === 2 ? <p>{i18n.t("gold")}</p> :
                                                        <div>{miner.level === 3 ? <p>{i18n.t("platinum")}</p> :
                                                            <div>{miner.level === 4 ? <p>{i18n.t("diamond")}</p> :
                                                                <div><p>{i18n.t("Crown")}</p>
                                                                </div>}</div>}</div>}</div>}</div>
                                        }
                                    </div>
                                </div>
                                <div className="right">
                                    <div className="left">
                                        <div>
                                            <p>
                                                {i18n.t("Estimatedtotalrevenue")}
                                                ：{miner.amount * miner.levelnum}
                                            </p>
                                        </div>
                                        <div>
                                            <p>
                                                {i18n.t("Earned")}
                                                ：{miner.returnAmount}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <div>
                                            {
                                                this.state.redeeming == 0 && <div>
                                                    {
                                                        miner.level === 0 ? <Button
                                                                onClick={() => this.openupgrade()}>{i18n.t("Joinmember")}</Button> :
                                                            <Button
                                                                onClick={() => this.openupgrade()}>{i18n.t("upgrade")}</Button>
                                                    }
                                                </div>
                                            }
                                            <div style={{paddingTop: '15px'}}>
                                                {
                                                  canRedeem &&
                                                  <Button onClick={() => {
                                                      if (this.state.redeeming == 0) {
                                                          that.setState({redeemvisible: true});
                                                      } else if (this.state.redeeming == 1) {
                                                          contract.end(that.state.account);
                                                      }
                                                  }}>{
                                                      this.state.redeeming == 0 ?
                                                          <span>{i18n.t("redeem")}</span> : <span>{
                                                              <CountDown
                                                                  endTime={(Number(this.state.redeemTime) + 90 * 24 * 3600) * 1000}/>
                                                          }
                                                    </span>
                                                  }</Button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        canRedeem &&
                                        <Modal className="upgradebox"
                                               visible={that.state.redeemvisible}
                                               // footer={null}
                                               onOk={() => {
                                                   if (this.state.redeeming == 0) {
                                                       contract.redeem(that.state.account);
                                                   } else {
                                                       contract.end(that.state.account);
                                                   }
                                               }}
                                               onCancel={() => {
                                                   that.setState({redeemvisible: false});
                                               }}>
                                            <p style={{color: 'white'}}>
                                                  <span>{i18n.t("redeem")}：
                                                      {new BigNumber((this.state.amount - this.state.returnAmount) * 0.75/2).toFixed(3)}
                                                  </span>
                                            </p>
                                        </Modal>
                                    }

                                    <Modal
                                        className="upgradebox"
                                        visible={this.state.upgradevisible}
                                        onCancel={() => this.closeupgrade()}
                                        footer={null}
                                        centered={true}
                                    >
                                        <div className="upgradeboxcontent">
                                            <div className="head">
                                                <div className="headertitle">
                                                    <h2>{i18n.t("upgrademember")}</h2>
                                                </div>
                                            </div>
                                            <div className="listbox">
                                                <div className={miner.levelborder[1].name}>
                                                    <div className="detailinfo">
                                                        <p>100 SUSD-799 SUSD</p>
                                                    </div>
                                                    <div className="levelinfo">
                                                        <img src={level1} alt=""/>
                                                        <p>{i18n.t("Silvermember")}</p>
                                                    </div>
                                                </div>
                                                <div className={miner.levelborder[2].name}>
                                                    <div className="detailinfo">
                                                        <p>800 SUSD-1999 SUSD</p>
                                                    </div>
                                                    <div className="levelinfo">
                                                        <img src={level2} alt=""/>
                                                        <p>{i18n.t("Goldmember")}</p>
                                                    </div>
                                                </div>
                                                <div className={miner.levelborder[3].name}>
                                                    <div className="detailinfo">
                                                        <p>2000 SUSD-4999 SUSD</p>
                                                    </div>
                                                    <div className="levelinfo">
                                                        <img src={level3} alt=""/>
                                                        <p>{i18n.t("PlatinumMember")}</p>
                                                    </div>
                                                </div>
                                                <div className={miner.levelborder[4].name}>
                                                    <div className="detailinfo">
                                                        <p>5000 SUSD-9999 SUSD</p>
                                                    </div>
                                                    <div className="levelinfo">
                                                        <img src={level4} alt=""/>
                                                        <p>{i18n.t("Diamondmembership")}</p>
                                                    </div>
                                                </div>

                                                <div className={miner.levelborder[5].name}>
                                                    <div className="detailinfo">
                                                        <p>10000 SUSD</p>
                                                    </div>
                                                    <div className="levelinfo">
                                                        <img src={level5} alt=""/>
                                                        <p>{i18n.t("Crown")}</p>
                                                    </div>
                                                </div>

                                                <div className="listitem">
                                                    <div className="box">
                                                        <Select defaultValue="SUSD" style={{width: 100}}
                                                                onChange={(e) => this.sendChange(e)}>
                                                            <Option value="SUSD">SUSD</Option>
                                                            <Option value="SERO">SERO</Option>
                                                        </Select>
                                                        <InputNumber min={0} placeholder={i18n.t("Entertheamount")}
                                                                     ref={this.sendnumInput}
                                                                     onChange={(e) => this.sendnum(e)}/>
                                                    </div>
                                                    {
                                                        miner.sendcy === "SUSD" ? <div></div> : <div>
                                                            <p>{miner.sendTxt}</p>
                                                        </div>
                                                    }
                                                </div>
                                                <div className="listitem">
                                                    {
                                                        miner.level === 0 ?
                                                            <Input placeholder={i18n.t("Pleasefillinthereferralcode")}
                                                                   ref={this.codeInput}/> :
                                                            <Input disabled={true} value={miner.recommendid}/>
                                                    }
                                                </div>
                                            </div>
                                            <div className="footer">
                                                <div className="footerbtn" onClick={() => this.levelbtn()}>
                                                    {
                                                        miner.myid === "" ? <p>{i18n.t("Joinmember")}</p> :
                                                            <p>{i18n.t("upgrade")}</p>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </Modal>
                                </div>
                            </div>
                            <div className="bottom">
                                <div className="rowbox">
                                    <div className="leftbox">
                                        <div className="left">
                                            <p>{i18n.t("Totalperformance")} :</p>
                                        </div>
                                        <div className="right">
                                            <p></p>
                                        </div>
                                    </div>
                                    <div className="rightbox">
                                        <div className="right">
                                            <p>{miner.achievement} SUSD</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rowbox">
                                    <div className="leftbox">
                                        <div className="left">
                                            <p>{i18n.t("Fixeddayreturn")} :</p>
                                        </div>
                                        <div className="right">
                                            <p></p>
                                        </div>
                                    </div>
                                    <div className="rightbox">
                                        <div className="right">
                                            <p>
                                                {miner.returnAmount >= miner.amount * miner.levelnum ? 0 :
                                                    <span> {miner.returnnowday}</span>} SUSD</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rowbox">
                                    <div className="leftbox">
                                        <div className="left">
                                            <p>{i18n.t("Referralrewardsoftheday")} :</p>
                                        </div>
                                        <div className="right">
                                            <p></p>
                                        </div>
                                    </div>
                                    <div className="rightbox">
                                        <div className="right">
                                            <p>{miner.recommendProfit} SUSD</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rowbox">
                                    <div className="leftbox">
                                        <div className="left">
                                            <p>{i18n.t("Nodeoftheday")} :</p>
                                        </div>
                                        <div className="right">
                                            <p></p>
                                        </div>
                                    </div>
                                    <div className="rightbox">
                                        <div className="right">
                                            <p>{miner.nodeProfit} SUSD</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rowbox">
                                    <div className="leftbox">
                                        <div className="left">

                                            <p>{i18n.t("Communityoftheday")} :
                                                {
                                                    miner.achievement >= 500 * 300 && allnum >= 500 && directnum >= 30 ?
                                                        <span>
                            {
                                miner.achievement >= 2900000 ? <span>(vip)</span> : <span>(v3)</span>
                            }
                          </span> : <span>
                              {
                                  miner.achievement >= 300 * 300 && allnum >= 300 && directnum >= 20 ?
                                      <span>(v2)</span> : <span>
                                  {
                                      miner.achievement >= 100 * 300 && allnum >= 100 && directnum >= 10 ?
                                          <span>(v1)</span> : <span></span>
                                  }
                                </span>
                              }
                            </span>
                                                }
                                            </p>
                                        </div>
                                        <div className="right">
                                            <p></p>
                                        </div>
                                    </div>
                                    <div className="rightbox">
                                        <div className="right">
                                            <p>{miner.communityProfit} SUSD</p>
                                        </div>
                                    </div>
                                </div>

                                {
                                    this.state.redeeming == 0 && <div className="rowbox">
                                        <div className="leftbox">
                                            <div className="left">
                                                <p>{i18n.t("Totalwithdrawal")} :</p>
                                            </div>
                                            <div className="right">
                                                <p>{miner.canWithdrawAmount}</p>
                                            </div>
                                        </div>
                                        <div className="rightbox">
                                            <div className="right">
                                                {
                                                    miner.canWithdrawAmount === 0 ?
                                                        <Button className="nowithdrawbtn">{i18n.t("withdraw")}</Button> :
                                                        <Button
                                                            onClick={() => this.openwithdraw()}>{i18n.t("withdraw")}</Button>
                                                }
                                                <Modal
                                                    className="withdrawbox"
                                                    title={i18n.t("currency")}
                                                    visible={this.state.withdrawvisible}
                                                    onCancel={() => this.closewithdraw()}
                                                    centered={true}
                                                    footer={null}
                                                >
                                                    <div className="withdrawboxcontent">
                                                        <div><p>{i18n.t("Numberofwithdrawals")}</p></div>
                                                        <div className="contentitem">
                                                            <div className="left">
                                                                <Select defaultValue="SUSD" style={{width: 100}}
                                                                        onChange={(e) => this.withdrawChange(e)}>
                                                                    <Option value="SUSD">SUSD</Option>
                                                                    <Option value="SERO">SERO</Option>
                                                                </Select>
                                                            </div>
                                                            <div className="right">
                                                                <p>
                                                                    {i18n.t("Convertiblequota")}
                                                                    ：{miner.withdrawChangenum} {miner.withdrawcy}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="footer">
                                                            <div className="footerbtn">
                                                                <Button type="primary"
                                                                        onClick={() => this.withdraw()}>{i18n.t("withdrawmoney")}</Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Modal>
                                            </div>
                                        </div>
                                    </div>
                                }


                            </div>
                        </div>
                    </div>

                    <div className="contractbox">
                        <div className="contractcontent">
                            <p>{i18n.t("Contractaddress")}:</p>
                            <p>{contract.contract.address}</p>
                        </div>
                    </div>

                    <div className="myinformation">
                        <div className="myinformationcontent">
                            <div className="head">
                                <img src={myinfo} alt=""/>
                                <div>
                                    <p>{i18n.t("Mycontractinformation")}</p>
                                </div>
                            </div>
                            <div>
                                <p>
                                    {i18n.t("Myrecommendation")}ID
                                    :{miner.myid}
                                    {
                                        miner.myid === "" ? <div></div> :
                                            <CopyOutlined onClick={() => this.copytext()} style={{fontSize: 14}}/>
                                    }
                                </p>
                            </div>
                            <div>
                                <p>{i18n.t("Recommendedpartner")}ID：{miner.recommendid}</p>
                            </div>
                            <div>
                                <p>
                                    {i18n.t("Lastsettlementtime")}
                                    ：{miner.lastreturntime}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={this.state.loading.loadingbox}>
                    <Spin indicator={antIcon} spinning={this.state.loading.status} tip="PENDING...">
                        <Alert
                            message={this.state.loading.message}
                            description={this.state.loading.description}
                            type="info"
                        />
                    </Spin>
                </div>
            </div>
        )
    }
}

function fromValue(v: number | string | undefined, d: number): BigNumber {
    if (v) {
        return new BigNumber(v).dividedBy(10 ** d)
    } else {
        return new BigNumber(0)
    }
}

// function toValue(v: number | string | undefined, d: number): BigNumber {
//   if (v) {
//     return new BigNumber(v).multipliedBy(10 ** d)
//   } else {
//     return new BigNumber(0)
//   }
// }
export default Miner;