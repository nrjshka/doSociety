import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getUserInfo} from '../../../Redux/Actions'


class IdeologyBody extends Component{
	constructor(props){
		super(props);

		this.state = {
        	id: this.props.id,
        	politicalBeliefs: '',
        	religiousBeliefs: '',
        	citations: '',
        	something: '',
          arrays: [],
      }
	}

	componentWillReceiveProps(newProps){
      if (newProps.id != this.props.id){
        newProps.getUserInfo(newProps.id);      
      }

      document.title = 'Настройки мировоззрения';
      
      this.setState({
        id: this.props.id,
        politicalBeliefs: newProps.user.politicalBeliefs,
        religiousBeliefs: newProps.user.religiousBeliefs,
        citations: newProps.user.citations,
      });
    }

    componentWillMount(){

      document.title = 'Настройки мировоззрения';
      
      this.setState({
        id: this.props.id,
        politicalBeliefs: this.props.user.politicalBeliefs,
        religiousBeliefs: this.props.user.religiousBeliefs,
        citations: this.props.user.citations,
      });
    }

    componentWillMount(){
      fetch('/api/getid/', {
              method: 'GET',
              headers : {
                'Authorization' : 'JWT ' + localStorage.getItem('token'),
              },
      })
      .then((response) => {return response.json();
      })
      .then((data) => {
          this.props.getUserInfo(data['id']);
          this.setState({
              something : data['id'],
            });
      });
    }

    saveIdeology(Page){
    	fetch('/api/saveideology',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'JWT ' + localStorage.getItem('token'),
            },
            body:JSON.stringify({
            	id: Page.state.something,
            	politicalBeliefs: document.getElementsByName('POLITICAL')[0].value,
            	religiousBeliefs: document.getElementsByName('RELIGIOUS')[0].value,
            })
      	})
      	.then((response)=>{return response.json();})
      	.then((data) =>{
        	if (data['status']){
          		Page.state.something = Page.state.something;
        	}
      	});
    }

    addCitation(Page,arrayCitations){
    	fetch('/api/addcitation',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'JWT ' + localStorage.getItem('token'),
            },
            body:JSON.stringify({
            	id: Page.state.something,
            	citation: document.getElementsByName('citation')[0].value,
            })
      	})
      	.then((response)=>{return response.json();})
      	.then((data) =>{
        	if (data['status']){
        		document.getElementsByName('citation')[0].value='';
         	}
      	});
    }

    deleteCitation(Page,ButtId){
    	var blockId = '__'+ButtId;
    	fetch('/api/deletecitation',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'JWT ' + localStorage.getItem('token'),
            },
            body:JSON.stringify({
            	id: Page.state.something,
            	num: Page.state.citations[ButtId],
            })
      	})
      	.then((response)=>{return response.json();})
      	.then((data) =>{
        	if (data['status']){
          		var blockId = '_'+ButtId;
				var FriendsBlock = document.getElementById(blockId);
				FriendsBlock.style.display = 'none'
        	}
      	});	
    }

    showCitation(Page){
      fetch('/api/showcitation',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'JWT ' + localStorage.getItem('token'),
            },
        })
        .then((response)=>{return response.json();})
        .then((data) =>{
          Page.state.arrays.push(data['citations']);
        });
    }

	render(){
		var arrayPolitical = [];	var arrayPoliticalValue = ['Не выбраны','Индифферентные','Коммунистические',
										'Социалистические','Умеренные','Либеральные','Консервативные',
										'Ультраконсервативные','Либертарианские','Другие']; 
		var arrayReligious = [];	var arrayReligiousValue = ['Не выбраны','Православие','Иудаизм','Католицизм',
										'Протестанизм','Ислам','Буддизм','Конфуцианство','Пастафарианство','Другие']; 

		var arrayCitations = []; 

    for (var i = 0; i < 10; i++) {
			if (i != this.state.politicalBeliefs) {
				arrayPolitical.push(<option key={i} value={i}>{arrayPoliticalValue[i]}</option>)
			} else {
				arrayPolitical.push(<option key={i} selected="selected" value={i}>{arrayPoliticalValue[i]}</option>)
			}
		}

		for (var i = 0; i < 10; i++) {
			if (i != this.state.religiousBeliefs) {
				arrayReligious.push(<option key={i} value={i}>{arrayReligiousValue[i]}</option>)
			} else {
				arrayReligious.push(<option key={i} selected="selected" value={i}>{arrayReligiousValue[i]}</option>)
			}
		}

    var Page = this;

    this.showCitation(Page);
    let quoteText = Page.state.arrays.pop();
    if (quoteText != undefined) {
		  for (var i = 0; i < quoteText.length; i++) {
        var blockId = '_'+i;
	       var citationId = '__'+i;
		    arrayCitations.push(<div style={{'display': 'block','marginLeft': '35%'}} key={i} id={blockId}>
                      <input id={citationId} value={quoteText[i]}></input>
                     <button id={i} onClick={(event)=>{this.deleteCitation(Page,event.target.id)}}>[x]</button>
			 					</div>)
		  }
    }

		return(
		<div>
			<div className="col-lg-8 col-md-8 col-sm-9 col-xs-12 content">
			<div className="contentTuning container-fluid">
					<div className="contentTuning__new">
						<div className="contentTuning__infinity">&infin;</div>
					</div>
				<div className="row">
					<div className="col-lg-4 col-md-4 col-sm-5 col-xs-4 contentTuning__parameter">Политические убеждения</div>
				  	<div className="col-lg-8 col-md-8 col-sm-7 col-xs-8">
						<select className="contentTuning__input contentTuning__oldParameter" name="POLITICAL">
					  		{arrayPolitical}
						</select>
						<div className="contentTuning__delimiter"></div>
						<div className="contentTuning__delimiter"></div>
				  	</div>
				</div>
				<div className="contentTuning__new">
					<div className="contentTuning__infinity">&infin;</div>
				</div>
				<div className="row">
					<div className="col-lg-4 col-md-4 col-sm-5 col-xs-4 contentTuning__parameter">Религиозные убеждения</div>
					<div className="col-lg-8 col-md-8 col-sm-7 col-xs-8">
						<select className="contentTuning__input contentTuning__oldParameter" name="RELIGIOUS">
							{arrayReligious}
						</select>
						<div className="contentTuning__delimiter"></div>
						<div className="contentTuning__delimiter"></div>
					</div>
				</div>
				<div className="contentTuning__new">
					<div className="contentTuning__infinity">&infin;</div>
				</div>
				<div className="row">
					<div className="col-lg-4 col-md-4 col-sm-5 col-xs-4 contentTuning__parameter">Любимые цитаты</div>
					<div className="col-lg-8 col-md-8 col-sm-7 col-xs-8">
						<div className="contentTuning__quote">
							<input className="contentTuning__input contentTuning__oldParameter" name="citation"></input>
							<div className="contentTuning__delimiter"></div>
							<div className="contentTuning__delimiter"></div>
						</div>
					</div>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<button className="contentTuning__button center-block" id="buttonQuote" onClick={(event)=>{this.addCitation(Page,arrayCitations)}}>Добавить</button>
					</div>
            {arrayCitations}
				</div>
				<div className="contentTuning__new">
					<div className="contentTuning__infinity">&infin;</div>
				</div>
				<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<button className="contentTuning__button center-block" onClick={(event) => {this.saveIdeology(Page)}}>Сохранить</button>
					</div>
				</div>
			</div>
			</div>
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
export default connect(mapToStateProps, matchDispatchToProps)(IdeologyBody)
