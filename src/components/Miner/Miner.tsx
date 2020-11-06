import React from 'react';
import './Miner.css';
import { Button, Modal } from 'antd';
import service from '../../api/service';
// import contract from '../../api/contract';
// import { BigNumber } from "bignumber";




import logo from '../../images/logo.png';
import head from '../../images/head.png';
import user from '../../images/user.png';
import myinfo from '../../images/myinfo.png';
import grouphead from '../../images/grouphead.png';
import groupbtn from '../../images/groupbtn.png';
import level1 from '../../images/level1.png';
import level3 from '../../images/level3.png';
import level4 from '../../images/level4.png';
import level5 from '../../images/level5.png';


interface Miners {
  withdrawvisible: boolean,
  upgradevisible: boolean,
  showusername: string,
  showusermainpkr: string,
  account: object,
  mainpkr: string,
  serobalance:string
}


class Miner extends React.Component<any, Miners> {
  state: Miners = {
    withdrawvisible: false,
    upgradevisible: false,
    showusername: "",
    showusermainpkr: "",
    account: {},
    mainpkr: "",
    serobalance:""
  }

  componentDidMount() {
    const that = this;
    that.gatdata()
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
      let strmainpkr = startmainpkr + "..." + endmainpkr;

      that.setState({
        showusername: userobj.Name,
        showusermainpkr: strmainpkr,
        mainpkr: userobj.MainPKr,
        account: userobj,
        // serobalance: new BigNumber(userobj.Balance.get("SERO")).dividedBy(10 ** 18).toFixed(2),
      })
      console.log(userobj, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
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
      withdrawvisible: true
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


  render() {
    const miner=this.state;
    return (
      <div className="miner">
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
                  <p>{miner.serobalance} SERO</p>
                </div>
              </div>
              <div className="userbtn">
                <div className="switchbtn">
                  <Button>切换</Button>
                </div>
                <div className="methodbtn">
                  <Button>获取方式</Button>
                </div>
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
                    <img src={level1} alt="" />
                  </div>
                  <div className="leveltitle">
                    <p>黄金</p>
                  </div>
                </div>
                <div className="right">
                  <div className="left">
                    <div> <p>预计总收益：1500</p></div>
                    <div><p>SUSD  等值  SERO</p></div>
                  </div>
                  <div className="right">
                    <Button onClick={() => this.openupgrade()}>升级</Button>
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
                        <div className="listitem">
                          <div className="detailinfo">
                            <p>300 SUSD-799 SUSD</p>
                          </div>
                          <div className="levelinfo">
                            <img src={level1} alt="" />
                            <p>白银会员</p>
                          </div>
                        </div>
                        <div className="listitem">
                          <div className="detailinfo">
                            <p>300 SUSD-799SUSD</p>
                          </div>
                          <div className="levelinfo">
                            <img src={level1} alt="" />
                            <p>黄金会员</p>
                          </div>
                        </div>
                        <div className="listitem">
                          <div className="detailinfo">
                            <p>300 SUSD-799 SUSD</p>
                          </div>
                          <div className="levelinfo">
                            <img src={level3} alt="" />
                            <p>白金会员</p>
                          </div>
                        </div>
                        <div className="listitem">
                          <div className="detailinfo">
                            <p>300 SUSD-799 SUSD</p>
                          </div>
                          <div className="levelinfo">
                            <img src={level4} alt="" />
                            <p>钻石会员</p>
                          </div>
                        </div>


                        <div className="listitem">
                          <div className="detailinfo">
                            <p>300 SUSD-799 SUSD</p>
                          </div>
                          <div className="levelinfo">
                            <img src={level5} alt="" />
                            <p>皇冠</p>
                          </div>
                        </div>

                        <div className="listitem">
                          <p>输入金额</p>
                        </div>
                        <div className="listitem">
                          <p>填写邀请码</p>
                        </div>
                      </div>
                      <div className="footer">
                        <div className="img">
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
                      <p>当日固定返还(SERO)</p>

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
                      <p>10</p>
                    </div>
                  </div>
                </div>

                <div className="rowbox">
                  <div className="leftbox">
                    <div className="left">
                      <p>当日节点(黄金)</p>

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
                      <p>209</p>
                    </div>
                  </div>
                </div>

                <div className="rowbox">
                  <div className="leftbox">
                    <div className="left">
                      <p>当日社区(V2)</p>

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
                      <p>209</p>
                    </div>
                  </div>
                </div>

                <div className="rowbox">
                  <div className="leftbox">
                    <div className="left">
                      <p>总共可提现(SERO)</p>

                    </div>
                    <div className="right">
                      <p>150</p>
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
                        footer={null}
                        centered={true}
                      >
                        <div className="withdrawboxcontent"></div>





                      </Modal>




                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="contractbox">
            <div className="contractcontent">
              <p>合约当天总返还数： 300000 SUSD     (等值SERO)</p>
              <p>合约地址:adsasdasda456a4d564as5d5asd</p>
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
                <p>ID:12121212</p>
              </div>
              <div>
                <p>推荐伙伴ID：330000</p>
              </div>
              <div>
                <p>最近结算时间：07/20 15：39</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}


export default Miner;