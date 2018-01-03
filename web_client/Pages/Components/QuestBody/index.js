import React, { Component } from 'react'

class QuestBody extends Component {
  componentDidMount() {
    var head = document.getElementById('head');
    var script = document.createElement('script');
    script.src = "static/js/scripts.min.js";
    head.appendChild(script);
  }

  render() {
    return (
      <div>
        <div className="col-lg-8 col-md-8 col-sm-9 col-xs-12 content">
          <div className="contentQuest">
            <div className="contentQuest__circle">
              <div className="contentQuest_found">
                <div className="contentQuest__tit">Собеседник выбран</div>
                <div className="contentQuest__avatarX"><img src="static/img/nav/1_nav.png" /></div>
                <button className="contentQuest__buttonStart">Начать переписку</button>
              </div>

              <button className="contentQuest__buttonQuest_get">Выбрать собеседника</button>
              <div className="contentQuest_avatarxxxWrap">
                <div className="contentQuest_avatarxxx"><img src="static/img/nav/1_nav.png" /></div>
                <div className="contentQuest_avatarxxx"><img src="static/img/nav/1_nav.png" /></div>
                <div className="contentQuest_avatarxxx"><img src="static/img/nav/1_nav.png" /></div>
                <div className="contentQuest_avatarxxx"><img src="static/img/nav/1_nav.png" /></div>
                <div className="contentQuest_avatarxxx"><img src="static/img/nav/1_nav.png" /></div>
                <div className="contentQuest_avatarxxx"><img src="static/img/nav/1_nav.png" /></div>
                <div className="contentQuest_avatarxxx"><img src="static/img/nav/1_nav.png" /></div>
                <div className="contentQuest_avatarxxx"><img src="static/img/nav/1_nav.png" /></div>
                <div className="contentQuest_avatarxxx"><img src="static/img/nav/1_nav.png" /></div>
                <div className="contentQuest_avatarxxx"><img src="static/img/nav/1_nav.png" /></div>
                <div className="contentQuest_avatarxxx"><img src="static/img/nav/1_nav.png" /></div>
                <div className="contentQuest_avatarxxx"><img src="static/img/nav/1_nav.png" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default QuestBody
