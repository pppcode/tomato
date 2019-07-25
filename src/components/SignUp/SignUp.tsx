import * as React from 'react';
import {Input, Icon, Button} from 'antd';
import axios from 'src/config/axios'

interface ISignUpState {
  account: string,
  password: string,
  passwordConformation: string,
}

class SignUp extends React.Component<any, ISignUpState> {
  private accountInput: any;

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      password: '',
      passwordConformation: '',
    }
  }

  emitEmpty = () => {
    this.accountInput.focus();
    this.setState({account: ''});
  }

  onChangeAccount = (e) => {
    this.setState({account: e.target.value});
  }

  onChangePassword = (e) => {
    this.setState({password: e.target.value})
  }

  onChangePasswordConformation = (e)=> {
    this.setState({passwordConformation:e.target.value})
  }

  submit = async()=> {
    const { account, password, passwordConformation } = this.state
    try{
      await axios.post('sign_up/user', {
        account,
        password,
        password_confirmation :passwordConformation
      })
      console.log('成功')
    }catch (e) {
      throw new Error(e)
    }
  }

  render() {
    const {account, password, passwordConformation} = this.state;
    const suffix = account ? <Icon type="close-circle" onClick={this.emitEmpty}/> : null;
    return (
      <div className="SingUp">
        <Input placeholder="请输入你的用户名"
               prefix={<Icon type="user"/>}
               suffix={suffix}
               value={account}
               onChange={this.onChangeAccount}
               ref={node => this.accountInput = node}
        />
        <Input.Password placeholder="请输入密码"
                        value={password}
                        onChange={this.onChangePassword}
        />
        <Input.Password placeholder="请确认密码"
                        value={passwordConformation}
                        onChange={this.onChangePasswordConformation}
        />
        <Button type="primary" onClick={this.submit}>
          注册
        </Button>
      </div>
    );
  }
}

export default SignUp