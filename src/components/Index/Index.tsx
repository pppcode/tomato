import * as React from 'react';
import axios from 'src/config/axios'
import {Menu, Dropdown, Icon } from 'antd';
import './Index.scss'

interface IRouter {
  history: any
}

interface IIndexState {
  user: any
}


const menu = (
  <Menu>
    <Menu.Item key="1"><Icon type="user" />个人设置</Menu.Item>
    <Menu.Item key="2"><Icon type="logout" />注销</Menu.Item>
  </Menu>
);

class Index extends React.Component<IRouter,IIndexState> {

  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }

  async componentWillMount() {
    await this.getMe()
  }

  getMe = async () => {
    const response = await axios.get('me');
    this.setState({user:response.data})
  }

  logout = () => {
    localStorage.setItem('x-token','')
    this.props.history.push('/login')
  }

  render() {
    return (
      <div className="Index" id="Index">
        <header>
          <span className="logo">
            LOGO
          </span>
          <Dropdown overlay={menu}>
            <span>
               {this.state.user && this.state.user.account}
              <Icon type="down" style={{marginLeft: 8}} />
            </span>
          </Dropdown>
        </header>
        <main>
          123
        </main>
      </div>
    );
  }
}

export default Index