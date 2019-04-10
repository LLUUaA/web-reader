import React, { Component } from 'react';
import { Button, List, ListItemText, ListItem, Typography, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';

import './details.css';

const readerLink = (props)=><Link to="/reader" {...props} />

class Details extends Component {
  render() {
    return (
      <div className="details-container">
        <div className="book-info">
          <div>
            <img className="poster-img" src="https://material-ui.com/static/images/cards/paella.jpg" />
          </div>
          <div className="right">
            <p>《完美世界》<span>完结</span></p>
            <p>一粒尘可填海，一根草斩尽日月星辰，弹指间天翻地覆。群雄并起，万族林立，诸圣争霸，乱天动地。问苍茫大地，谁主沉浮？！一个少年从大荒中走出，一切从这里开始……</p>
            <div className="btn-area">
              <Button variant="contained" color="primary" component={readerLink}>开始阅读</Button>
              <Button variant="contained" color="primary">章节目录</Button>
              <Button variant="contained" color="primary">加入书架</Button>
              <Button variant="contained" color="primary" disabled >txt下载</Button>
            </div>
          </div>
        </div>
        <div>
          <Typography variant="h5" >查看章节</Typography>
          <List>
            {[0, 1, 2].map(item =>
              <div>
                <ListItem>
                  <ListItemText
                    primary={item + "Single-line item"}
                    secondary="Secondary text"
                  />
                </ListItem>
                <Divider />
              </div>
            )}
          </List>
          
          <Button variant="" color="primary">查看更多章节</Button>
        </div>
      </div>
    )
  }
}

export default Details