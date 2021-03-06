import * as React from 'react';
import {Input, Icon, Button} from 'antd';
import {Link} from "react-router-dom";
import axios from 'src/config/axios'
import './Login.scss'

interface ILoginState {
  account: string,
  password: string,
}

class Login extends React.Component<any, ILoginState> {
  private accountInput: any;

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      password: '',
    }
  }

  emitEmpty = () => {
    this.accountInput.focus();
    this.setState({account: ''});
  }

  onChange = (key: keyof ILoginState, value: string) => {
    const newState = {}
    newState[key] = value
    this.setState(newState)
  }

  submit = async()=> {
    const { account, password,} = this.state
    try{
      await axios.post('sign_in/user', {
        account,
        password,
      })
      this.props.history.push('/')
    }catch (e) {
      throw new Error(e)
    }
  }

  render() {
    const {account, password} = this.state;
    const suffix = account ? <Icon type="close-circle" onClick={this.emitEmpty}/> : null;
    return (
      <div className="Login" id="Login">
        <h1>番茄闹钟登录</h1>
        <Input placeholder="请输入你的用户名"
               prefix={<Icon type="user"/>}
               suffix={suffix}
               value={account}
               onChange={(e)=> this.onChange('account',e.target.value)}
               ref={node => this.accountInput = node}
        />
        <Input.Password placeholder="请输入密码"
                        value={password}
                        onChange={(e)=> this.onChange('password',e.target.value)}
        />
        <Button type="primary"  className="LoginButton" onClick={this.submit}>
          登录
        </Button>
        <p>如果你没有账号，请立即<Link to="/signUp/">注册</Link></p>
      </div>
    );
  }
}

export default Login