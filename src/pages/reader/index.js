import React, { Component } from 'react';
import { readBook as readBookSer } from '../../service'

const style = {
  content: {
    maxWidth:750,
    textAlign:'left',
    margin:'0 auto',
    padding: '0 20px',
    color:'#333'
  }
}

class Reader extends Component {
  constructor(props) {
    super();
    const { bookId, chapterNum } = props.match.params;
    this.state = {
      bookId,
      chapterNum
    }

    this.readBook();
  }
  render() {

    const { chapterContent } = this.state;
    return (
      <div style={style.content}>
        {(chapterContent || []).map((item,index)=> <p key={index}>{item}</p> )}
      </div>
    )
  }

  async readBook() {
    const { bookId, chapterNum } = this.state;
    try {
      const res = await readBookSer(bookId,chapterNum);
      this.setState({
        ...res
      })
    } catch (error) {
      
    }
  }
}




export default Reader