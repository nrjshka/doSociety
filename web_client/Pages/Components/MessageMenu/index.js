import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getUserInfo} from '../../../Redux/Actions'

class MessageMenu extends Component{
	 constructor(props){
    super(props);

    this.state = {  
      id: this.props.id,
      friend: [],
    }
  }

  componentWillReceiveProps(newProps){
    if (newProps.id != this.props.id){
      newProps.getUserInfo(newProps.id);      
    }

    this.setState({
      id: this.props.id,
      listOfFriends : newProps.user.listOfFriends,
    });
  }

  getFriendInfo(Page){
    fetch('/api/getfriendsinfo',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'JWT ' + localStorage.getItem('token'),
            },
        })
        .then((response)=>{return response.json();})
        .then((data) =>{
      Page.state.friend.push(data['friend']);
      });
  }

  render(){
    let Page = this;
    var illusionObject = [];
    this.getFriendInfo(Page,illusionObject);
    let illusionList = Page.state.friend.pop(); 
    var friendBlock =[];  

    if (illusionList !== undefined) {
      for (var i = 0; i < illusionList.length; i++) {
        var Url = '/msg?to='+illusionList[i].id;
        var IdUrl ='/id'+illusionList[i].id;
        var blockId = '_'+illusionList[i].id;
        friendBlock.push(<ul>
                          <li>
                            <div className="sidebar__dialogChoice__avatar"><a href="#"><img src={illusionList[i].photo}/></a>
                              <div className="avatarOnline"></div>
                            </div>
                              <div className="sidebar__dialogChoice__name"><Link to={Url}>{illusionList[i].name} {illusionList[i].surname}</Link></div>
                          </li>
                        </ul>);
      }
    };

		return(
            <div className="col-lg-2 col-md-2 hidden-sm hidden-xs hidden-smNo">
              <aside className="sidebar">
                <form className="formSearchDialog" action="" method="get">
                  <input className="formSearchDialog__input" name="s" placeholder="Поиск..." type="search" required="" />
                  <button className="formSearchDialog__button" type="submit"><img src="static/img/search/search.png" /></button>
                  <button className="formSearchDialog__buttonAdd">&#10010;</button>
                </form>
                <nav className="sidebar__dialogChoice">
                  {friendBlock}
                </nav>
              </aside>
             </div>
        );
	}
}


function mapToStateProps(state){
  return {
    user: state.message
  };
}

function matchDispatchToProps(dispatch){
  return {
      getUserInfo: bindActionCreators(getUserInfo, dispatch),
  };
}
export default connect(mapToStateProps, matchDispatchToProps)(MessageMenu)

