function getTimeStamp() {
    return Math.round(new Date() / 1000)
  }
  
  export function getSession() {
    if (localStorage) {
      const data = localStorage.getItem('session');
      if (data) {
        let [session, expriseTime] = data.split('-');
        if (getTimeStamp > parseInt(expriseTime)) {
          return '';
        } else {
          return session;
        }
      }
    }
  
    return '';
  }
  
  export function setSession(session, expriseTime) {
    if (!expriseTime) {
      expriseTime = getTimeStamp + 1800 //30分钟
    }
    if (localStorage) {
      localStorage.setItem('session', `${session}-${expriseTime}`)
    }
  }