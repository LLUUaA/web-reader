import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import { setSession } from '../../utils/session';
import  { login as loginSer} from '../../service';
import * as history from 'history';
const style = {
  container: {
    maxWidth: '414px',
    textAlign: 'center',
    margin: '200px auto'
  },
  input: {
  }
}

class Login extends Component {
  constructor() {
    super();
  }
  
  render() {
    return (
      <div style={style.container}>
        <TextField
          style={style.input}
          onChange={(event)=>this.inputChange(event)}
          fullWidth
          autoFocus
          label="账号"
          placeholder="输入您的账号"
          name="account"
          autoComplete=""
          margin="normal"
          variant="filled"
        />
        {/* <Divider /> */}
        <TextField
          style={style.input}
          onChange={(event)=>this.inputChange(event)}
          fullWidth
          label="密码"
          placeholder="输入您的密码"
          type="password"
          name="password"
          margin="normal"
          variant="filled"
        />

        <Button fullWidth variant="contained" color="primary" onClick={()=>this.login()}>
        登陆
      </Button>
      </div>
    )
  }

  inputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]:value
    })
  }

  login() {
    const { account = '',password='' } = this.state;
    loginSer(btoa(`${account}:${password}`))
    .then(res=>{
      setSession(res.session);
      // window.location = '/home'
      this.props.history.push('/home');
    },err=>{
      alert(err && err.data && err.data.msg || '请求失败')
    })
  }
}

export default Login