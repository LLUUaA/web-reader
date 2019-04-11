import React, { Component } from 'react';
import { getHotBook as getHotBookSer } from '../../service';
import './home.css';

// import AppBar from '../../component/AppBar';
// import BottomNavigation from '../../component/BottomNavigation';
import BookCard from '../../component/BookCard';


class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    getHotBookSer()
      .then(res => {
        this.setState({
          ...res
        })
      }, err => {

      })
  }

  render() {
    return (
      <div className="home-container">
        <article className="content">
          {(this.state.hotBook || []).map((item) =>
            <BookCard book={item} key={item.bookId} />)}
        </article>
        {/* <BottomNavigation /> */}
      </div>
    )
  }
}

export default Home