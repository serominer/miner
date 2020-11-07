import React from 'react';
import './Miner.css';
import { InputNumber, message, Spin, Alert, Button, Modal, Input, Select, List } from 'antd';
import service from '../../api/service';
import contract from '../../api/contract';
import BigNumber from 'bignumber.js'
import { LoadingOutlined, CloseCircleOutlined, CheckCircleOutlined, CopyOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard'

import logo from '../../images/logo.png';
import head from '../../images/head.png';
import user from '../../images/user.png';
import myinfo from '../../images/myinfo.png';
import grouphead from '../../images/grouphead.png';
import groupbtn from '../../images/groupbtn.png';
import footerbtn from '../../images/footerbtn.png';
import level1 from '../../images/level1.png';
import level2 from '../../images/level2.png';
import level3 from '../../images/level3.png';
import level4 from '../../images/level4.png';
import level5 from '../../images/level5.png';
import head_bg from '../../images/head_bg.jpg';
import body_bg from '../../images/body_bg.jpg';
import foot_bg from '../../images/foot_bg.jpg';

const { Option } = Select;
const errIcon = <CloseCircleOutlined style={{ fontSize: 24 }} />
const successIcon = <CheckCircleOutlined style={{ fontSize: 24 }} />
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
interface Miners {
  data: Array<any>,
  withdrawvisible: boolean,
  upgradevisible: boolean,
  uservisible: boolean,
  showusername: string,
  showusermainpkr: string,
  account: object,
  mainpkr: string,
  serobalance: string,
  myid: string,
  amount: number,
  allNodeNum: number,
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
}

class Miner extends React.Component<any, Miners> {
  state: Miners = {
    data: [],
    withdrawvisible: false,
    upgradevisible: false,
    uservisible: false,
    showusername: "",
    showusermainpkr: "",
    account: {},
    mainpkr: "",
    serobalance: "0",
    myid: "0",
    recommendid: 0,
    amount: 0,
    allNodeNum: 0,
    sendnum: 0,
    sendcy: "SUSD_T",
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
    withdrawcy: "SUSD_T",
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
      console.log("user", userobj);
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
      })
      that.getdetail(userobj.MainPKr);
      that.loading("loadingbox", false, "", null);
    })
  }

  getdetail = (mainpkr: string) => {
    const that = this;
    contract.details(mainpkr).then((res) => {
      console.log(res[0], res[1], res[2]);
      that.level(fromValue(res[2].amount, 18).toNumber());
      that.setState({
        myid: res[0],
        recommendid: res[1],
        referralcode: res[1],
        allNodeNum: parseFloat(fromValue(res[2].allNodeNum, 18).toNumber().toFixed(2)),
        returnAmount: parseFloat(fromValue(res[2].returnAmount, 18).toNumber().toFixed(2)),
        canWithdrawAmount: parseFloat(fromValue(res[2].canWithdrawAmount, 18).toNumber().toFixed(2)),
        returnnowday: parseFloat(fromValue(res[2].amount, 18).multipliedBy(0.003).toNumber().toFixed(2)),
        amount: parseFloat(fromValue(res[2].amount, 18).toNumber().toFixed(2)),
        lastreturntime: that.formatTime(res[2][9] * 1000, 'M/D h:m'),
        recommendProfit: parseFloat(fromValue(res[2].recommendProfit, 18).toNumber().toFixed(2)),
        nodeProfit: parseFloat(fromValue(res[2].nodeProfit, 18).toNumber().toFixed(2)),
        communityProfit: parseFloat(fromValue(res[2].communityProfit, 18).toNumber().toFixed(2))
      })
    })
  }

  level = (v: number) => {
    const that = this;
    if (v >= 300 && v < 800) {
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
    that.setState({
      withdrawvisible: true,
      withdrawChangenum: that.state.canWithdrawAmount
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
        that.loading("loading", false, "SUCCESSFULLY", successIcon)
        setTimeout(function () {
          that.gatdata();
        }, 1500);
      })

    })
  }

  referralcodeChange(e: any) {
    console.log(e.target.value)
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
      upgradevisible: true
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

  sendnum(e: any) {
    const that = this;
    that.setState({
      sendTxtnumber: 0,
      sendTxt: "",
      sendnum: e,
    })
    contract.investCall(that.state.account, "hAYBo5yIHmP", that.state.sendcy, "0x" + new BigNumber(e).multipliedBy(10 ** 18).toString(16)).then((res) => {
      if (res !== "") {
        let num = parseFloat(fromValue(res, 18).toNumber().toFixed(2));
        that.setState({
          sendTxtnumber: num,
          sendTxt: "可兑换" + num + "SUSD"
        })
      } else {
      }
    })
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
    if (that.state.referralcode.length !== 0) {
      if (that.state.level !== 0) {
        if (that.state.sendnum === 0) {
          message.warning('请输入你要升级的金额')
        } else {
          that.setState({
            upgradevisible: false
          })
          contract.invest(that.state.account, that.state.referralcode, that.state.sendcy, "0x" + new BigNumber(that.state.sendnum).multipliedBy(10 ** 18).toString(16)).then((hash) => {
            that.loading("loading", true, "", "")
            service.getTransactionReceipt(hash).then((res) => {
              that.loading("loading", false, "SUCCESSFULLY", successIcon)
              setTimeout(function () {
                that.gatdata();
              }, 1500);
            })
          })
        }
      } else {
        if (that.state.sendTxtnumber >= 300) {
          that.setState({
            upgradevisible: false
          })
          contract.invest(that.state.account, that.state.referralcode, that.state.sendcy, "0x" + new BigNumber(that.state.sendnum).multipliedBy(10 ** 18).toString(16)).then((hash) => {
            that.loading("loading", true, "", "")
            service.getTransactionReceipt(hash).then((res) => {
              that.loading("loading", false, "SUCCESSFULLY", successIcon)
              setTimeout(function () {
                that.gatdata();
              }, 1500);
            })
          })
        } else {
          message.error('首次创建需要输入大于等于300的SUSD');
        }
      }
    } else {
      message.error('请填写推荐码');
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
    const miner = this.state;
    return (
      <div className="miner">
        <div className="bg">
          <div className="bg1" >
            <img src={head_bg} alt="" />
          </div>
          <div className="bg2">
            <img src={body_bg} alt="" />
          </div>
          <div className="bg3">
            <img src={foot_bg} alt="" />
          </div>
        </div>
        <div className="content">
          <div className="logobox">
            <img src={logo} alt="" />
          </div>
          <div className="headerbox">
            <img src={head} alt="" />
          </div>
          <div className="userbox">
            <div className="usercontent">
              <div className="users">
                <div className="img">
                  <img src={user} alt="" />
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
              </div>
              <div className="userbtn">
                <div className="switchbtn">
                  <Button onClick={() => this.openuser()}>切换</Button>
                </div>
                <Modal
                  className="userboxs"
                  title="切换用户"
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
                    <p>会员级别</p>
                  </div>
                  <div className="levelimg">
                    {
                      miner.level === 0 ? <div><img src={level1} alt="" /></div> : <div>{miner.level === 1 ? <div> <img src={level1} alt="" /></div> : <div>{miner.level === 2 ? <img src={level2} alt="" /> : <div>{miner.level === 3 ? <img src={level3} alt="" /> : <div>{miner.level === 4 ? <img src={level4} alt="" /> : <div> <img src={level5} alt="" /></div>}</div>}</div>}</div>}</div>
                    }

                  </div>
                  <div className="leveltitle">
                    {
                      miner.level === 0 ? <div><p>普通</p></div> : <div>{miner.level === 1 ? <div><p>白银</p></div> : <div>{miner.level === 2 ? <p>黄金</p> : <div>{miner.level === 3 ? <p>白金</p> : <div>{miner.level === 4 ? <p>钻石</p> : <div><p>皇冠</p></div>}</div>}</div>}</div>}</div>
                    }
                  </div>
                </div>
                <div className="right">
                  <div className="left">
                    <div> <p>预计总收益：{miner.amount * miner.levelnum}</p></div>
                    <div><p>已收益：{miner.returnAmount}</p></div>
                  </div>
                  <div className="right">
                    {
                      miner.level === 0 ? <Button onClick={() => this.openupgrade()}>加入会员</Button> : <Button onClick={() => this.openupgrade()}>升级</Button>
                    }
                  </div>
                  <Modal
                    className="upgradebox"
                    visible={this.state.upgradevisible}
                    onCancel={() => this.closeupgrade()}
                    footer={null}
                    centered={true}
                  >
                    <div className="upgradeboxcontent">
                      <div className="head">
                        <div className="img">
                          <img src={grouphead} alt="" />
                        </div>
                      </div>
                      <div className="listbox">
                        <div className={miner.levelborder[1].name}>
                          <div className="detailinfo">
                            <p>300 SUSD-799 SUSD</p>
                          </div>
                          <div className="levelinfo">
                            <img src={level1} alt="" />
                            <p>白银会员</p>
                          </div>
                        </div>
                        <div className={miner.levelborder[2].name}>
                          <div className="detailinfo">
                            <p>800 SUSD-1999 SUSD</p>
                          </div>
                          <div className="levelinfo">
                            <img src={level1} alt="" />
                            <p>黄金会员</p>
                          </div>
                        </div>
                        <div className={miner.levelborder[3].name}>
                          <div className="detailinfo">
                            <p>2000 SUSD-4999 SUSD</p>
                          </div>
                          <div className="levelinfo">
                            <img src={level3} alt="" />
                            <p>白金会员</p>
                          </div>
                        </div>
                        <div className={miner.levelborder[4].name}>
                          <div className="detailinfo">
                            <p>5000 SUSD-9999 SUSD</p>
                          </div>
                          <div className="levelinfo">
                            <img src={level4} alt="" />
                            <p>钻石会员</p>
                          </div>
                        </div>

                        <div className={miner.levelborder[5].name}>
                          <div className="detailinfo">
                            <p>10000 SUSD</p>
                          </div>
                          <div className="levelinfo">
                            <img src={level5} alt="" />
                            <p>皇冠</p>
                          </div>
                        </div>

                        <div className="listitem">
                          <div className="box">
                            <Select defaultValue="SUSD_T" style={{ width: 100 }} onChange={(e) => this.sendChange(e)}>
                              <Option value="SUSD_T">SUSD_T</Option>
                              <Option value="SERO">SERO</Option>
                            </Select>
                            <InputNumber min={0} placeholder="输入金额" onChange={(e) => this.sendnum(e)} />
                          </div>
                          <div>
                            <p>{miner.sendTxt}</p>
                          </div>
                        </div>
                        <div className="listitem">
                          {
                            miner.level === 0 ? <Input placeholder="请填写推荐码" onChange={(e) => this.referralcodeChange(e)} /> : <Input disabled={true} value={miner.recommendid} />
                            // placeholder={miner.recommendid}
                          }


                        </div>
                      </div>
                      <div className="footer">
                        <div className="img" onClick={() => this.levelbtn()}>
                          <img src={groupbtn} alt="" />
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
                      <p>当日固定返还(SUSD)</p>
                    </div>
                    <div className="right">
                      <p></p>
                    </div>
                  </div>
                  <div className="rightbox">
                    <div className="left">
                      <p>
                      </p>
                    </div>
                    <div className="right">
                      <p>{miner.returnnowday}</p>
                    </div>
                  </div>
                </div>

                <div className="rowbox">
                  <div className="leftbox">
                    <div className="left">
                      <p>当日推荐奖励</p>

                    </div>
                    <div className="right">
                      <p></p>
                    </div>
                  </div>
                  <div className="rightbox">
                    <div className="left">
                      <p>
                        奖励：
                      </p>
                    </div>
                    <div className="right">
                      <p>{miner.recommendProfit}</p>
                    </div>
                  </div>
                </div>

                <div className="rowbox">
                  <div className="leftbox">
                    <div className="left">
                      <p>当日节点</p>

                    </div>
                    <div className="right">
                      <p></p>
                    </div>
                  </div>
                  <div className="rightbox">
                    <div className="left">
                      <p>
                        奖励：
                      </p>
                    </div>
                    <div className="right">
                      <p>{miner.nodeProfit}</p>
                    </div>
                  </div>
                </div>

                <div className="rowbox">
                  <div className="leftbox">
                    <div className="left">
                      <p>当日社区(
                        {
                          <span>v2</span>
                        }
                        )</p>
                    </div>
                    <div className="right">
                      <p></p>
                    </div>
                  </div>
                  <div className="rightbox">
                    <div className="left">
                      <p>
                        管理奖励：
                      </p>
                    </div>
                    <div className="right">
                      <p>{miner.communityProfit}</p>
                    </div>
                  </div>
                </div>

                <div className="rowbox">
                  <div className="leftbox">
                    <div className="left">
                      <p>总共可提现(SUSD)</p>
                    </div>
                    <div className="right">
                      <p>{miner.canWithdrawAmount}</p>
                    </div>
                  </div>
                  <div className="rightbox">
                    <div className="left">
                      <p>
                      </p>
                    </div>
                    <div className="right">
                      <Button onClick={() => this.openwithdraw()}>提现</Button>
                      <Modal
                        className="withdrawbox"
                        title="提币"
                        visible={this.state.withdrawvisible}
                        onCancel={() => this.closewithdraw()}
                        centered={true}
                        footer={null}
                      >
                        <div className="withdrawboxcontent">
                          <div><p>提币数量</p></div>
                          <div className="contentitem">
                            <div className="left">
                              <Select defaultValue="SUSD_T" style={{ width: 100 }} onChange={(e) => this.withdrawChange(e)}>
                                <Option value="SUSD_T">SUSD_T</Option>
                                <Option value="SERO">SERO</Option>
                              </Select>
                            </div>
                            <div className="right">
                              <p>可兑换额度：{miner.withdrawChangenum} {miner.withdrawcy}</p>
                            </div>
                          </div>

                          <div className="footer">
                            <div className="footerbtn" >
                              <img src={footerbtn} onClick={() => this.withdraw()} alt="" />
                            </div>
                          </div>
                        </div>
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="contractbox">
            <div className="contractcontent">
              {/* <p>合约当天总返还数： 300000 SUSD_T     (等值SERO)</p> */}
              <p>合约地址:</p>
              <p>{contract.contract.address}</p>
            </div>
          </div>

          <div className="myinformation">
            <div className="myinformationcontent">
              <div className="head">
                <img src={myinfo} alt="" />
                <div>
                  <p>我的合约信息</p>
                </div>
              </div>
              <div>

                <p>ID:{miner.myid}
                  {
                    miner.myid === "" ? <div></div> : <CopyOutlined onClick={() => this.copytext()} style={{ fontSize: 14 }} />
                  }
                </p>
              </div>
              <div>
                <p>推荐伙伴ID：{miner.recommendid}</p>
              </div>
              <div>
                <p>最近结算时间：{miner.lastreturntime} </p>
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


function toValue(v: number | string | undefined, d: number): BigNumber {
  if (v) {
    return new BigNumber(v).multipliedBy(10 ** d)
  } else {
    return new BigNumber(0)
  }
}
export default Miner;