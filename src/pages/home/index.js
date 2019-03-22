import React, { Component } from 'react';
import './home.css'

import AppBar from '../../component/AppBar';
import BottomNavigation from '../../component/BottomNavigation';
import BookCard from '../../component/BookCard';

class Home extends Component {
  render() {
    return (
      <div>
        <AppBar />
        <article className="content">
          {new Array(15).fill(1).map((item, i) =>
            <BookCard key={i} />)}
        </article>
        <BottomNavigation />
      </div>
    )
  }
}

export default Home