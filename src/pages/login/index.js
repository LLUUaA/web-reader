import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import { setSession } from '../../utils/session';
import  * as loginSer from '../../service';

const style = {
  container: {
    maxWidth: '414px',
    textAlign: 'center',
    margin: '200px auto'
  },
  input: {
  }
}

let account,password;

class Login extends Component {
  constructor() {
    super();
    console.log('LoginSer',loginSer);
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
    loginSer.login(btoa(`${account}:${password}`))
    .then(res=>{
      setSession(res.session);
      const location = {
        pathname: '/somewhere',
        state: { fromDashboard: true }
      }
    },err=>{
      alert(err.data.msg)
    })
  }
}

export default Login