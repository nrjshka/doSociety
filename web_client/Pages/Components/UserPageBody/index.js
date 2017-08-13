import React, { Component } from 'react'

class UserPageBody extends Component{

	render(){
		return(
			<div>
	          <div className="col-lg-8 col-md-8 col-sm-9 col-xs-12 content">
	            <div className="contentProfile">
	              <div className="row">
	                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
	                  <div className="contentProfile__avatarCover">
	                    <div className="contentProfile__avatar"><img src="static/img/avatar/avatar.JPG" />
	                      <div className="contentProfile__newFoto">&uarr; Обновить фото</div>
	                    </div>
	                    <div className="contentProfile__newFotoHide">&times</div>
	                  </div>
	                  <div className="contentProfile__status">Online</div>
	                </div>
	                <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
	                  <div className="contentProfile__name">Фрося Бурлакова</div>
	                  <div className="row contentProfile__info">
	                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 contentProfile__parameter">День рождения:</div>
	                    <div className="col-lg-9 col-md-9 col-sm-9 col-xs-8 contentProfile__value">25 июля 1995г.</div>
	                  </div>
	                  <div className="row contentProfile__info">
	                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 contentProfile__parameter">Город:</div>
	                    <div className="col-lg-9 col-md-9 col-sm-9 col-xs-8 contentProfile__value">Ярославль</div>
	                  </div>
	                  <div className="row contentProfile__info">
	                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 contentProfile__parameter">Образование:</div>
	                    <div className="col-lg-9 col-md-9 col-sm-9 col-xs-8 contentProfile__value">ЯГПУ им.Ушинского`17</div>
	                  </div>
	                  <div className="row contentProfile__info">
	                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 contentProfile__parameter">Место работы:</div>
	                    <div className="col-lg-9 col-md-9 col-sm-9 col-xs-8 contentProfile__value">Группа компаний "Метро" | Недвижимость Ярославля</div>
	                  </div>
	                </div>
	              </div>
	            </div>
	          </div>

	          <div className="col-lg-2 col-md-2 hidden-sm hidden-xs hidden-smNo">
	            <aside className="sidebar">
	            </aside>
	          </div>
          </div>
		);
	}
}

export default UserPageBody