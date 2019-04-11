import React, { Component } from 'react';
import { Button, List, ListItemText, ListItem, Typography, Divider } from '@material-ui/core';
import { getBook as getBookSer } from '../../service';

import './details.css';

class Details extends Component {
  constructor(props) {

    console.log(arguments)
    super();
    const { id: bookId } = props.match.params;
    this.state = {
      bookId
    }

    this.getBookDetails();
  }
  render() {
    const { bookInfo = {}, otherNum, result = {} } = this.state; 

    return (
      <div className="details-container">
        <div className="book-info">
          <div>
            <img className="poster-img" src= {bookInfo.coverImg || 'https://material-ui.com/static/images/cards/paella.jpg'} />
          </div>
          <div className="right">
            <p>{bookInfo.bookName}<span>{bookInfo.status || '未知'}</span></p>
            <p>{bookInfo.bookIntro}</p>
            <div className="btn-area">
              <Button variant="contained" color="primary" onClick={()=>this.readBook()}>开始阅读</Button>
              <Button variant="contained" color="primary">章节目录</Button>
              <Button variant="contained" color="primary">加入书架</Button>
              <Button variant="contained" color="primary" disabled >txt下载</Button>
            </div>
          </div>
        </div>
        <div>
          <Typography variant="h5" >查看章节</Typography>
          <List>
            {(result.top || []).map(item =>
              <div key={item.chapterNum} onClick={()=>this.readBook(item.chapterNum)}>
                <ListItem>
                  <ListItemText
                    primary={item.chapterName}
                    secondary={item.time}
                  />
                </ListItem>
                <Divider />
              </div>
            )}
          </List>
          <Button color="primary">查看更多章节</Button>
        </div>
      </div>
    )
  }

  readBook(chapterNum = 1) {
    this.props.history.push(`/reader/${this.state.bookId}/${chapterNum}`);
  }

  async getBookDetails() {
    try {
      const res = await getBookSer(this.state.bookId);
      this.setState({
        ...res
      })
    } catch (error) {
      
    }

  }
}

// export default withRouter(Details)
export default Details