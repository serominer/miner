import React from 'react';
import './Miner.css';
import { Button, Modal } from 'antd';
import logo from '../../images/logo.png';
import head from '../../images/head.png';
import user from '../../images/user.png';
import myinfo from '../../images/myinfo.png';


interface Miners {
  withdrawvisible: boolean,
  upgradevisible: boolean
}


class Miner extends React.Component<any, Miners> {
  state: Miners = {
    withdrawvisible: false,
    upgradevisible: false
  }

  componentDidMount() {
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
                  <p>当前用户</p>
                </div>
              </div>
              <div className="userinfo">
                <div className="username">
                  <p>agduahdkjadjakdhakda</p>
                </div>
                <div className="usermoney">
                  <p>500 SERO</p>
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
                    <img src={user} alt="" />
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
                    <Button onClick={()=>this.openupgrade()}>升级</Button>
                  </div>
                  <Modal
                    className="upgradebox"
                    visible={this.state.upgradevisible}
                    onCancel={() => this.closeupgrade()}
                    footer={null}
                    centered={true}
                  >
                    <div>
                      
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