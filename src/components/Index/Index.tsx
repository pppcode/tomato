import * as React from 'react';
import { Button } from 'antd';

interface IRouter {
  history: any
}

class Component extends React.Component<IRouter> {

  constructor(props) {
    super(props);
  }


  isLogin = ()=> {
    this.props.history.push('Login')
  }

  render() {
    return (
      <div className="Component">
        <Button onClick={this.isLogin}>登录</Button>
      </div>
    );
  }
}

export default Component