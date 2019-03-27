import React, { Component } from 'react';
import './details.css';

class Details extends Component {
  render() {
    return (
      <div className="details-container">
        <div className="book-info">
          <div>
            <img src="https://material-ui.com/static/images/cards/paella.jpg" />
          </div>

          <div >
            <p>《完美世界》<span>完结</span></p>
            <p>一粒尘可填海，一根草斩尽日月星辰，弹指间天翻地覆。群雄并起，万族林立，诸圣争霸，乱天动地。问苍茫大地，谁主沉浮？！一个少年从大荒中走出，一切从这里开始……</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Details