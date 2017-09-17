import React, { Component } from 'react'



class IdeologyBody extends Component{
	constructor(props){
		super(props);
	}

	changeReligion(){

	}

	changePoliticVision(){

	}

	addQuote(){
		var newQuote = document.getElementsByclassNameName("")[0].value;


	}

	save(){

	}

	render(){
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
						<select className="contentTuning__input contentTuning__oldParameter">
					  		<option value="">Не выбраны</option>
					  		<option value="">Индифферентные</option>
					  		<option value="">Коммунистические</option>
					  		<option value="">Социалистические</option>
					  		<option value="">Умеренные</option>
					  		<option value="">Либеральные</option>
					  		<option value="">Консервативные</option>
					  		<option value="">Ультраконсервативные</option>
					  		<option value="">Либертарианские</option>
					  		<option value="">Другие</option>
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
						<select className="contentTuning__input contentTuning__oldParameter">
							<option value="">Не выбраны</option>
							<option value="">Православие</option>
							<option value="">Иудаизм</option>
							<option value="">Католицизм</option>
							<option value="">Протестанизм</option>
							<option value="">Ислам</option>
							<option value="">Буддизм</option>
							<option value="">Конфуцианство</option>
							<option value="">Пастафарианство</option>
							<option value="">Другие</option>
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
							<input className="contentTuning__input contentTuning__oldParameter"></input>
							<div className="contentTuning__delimiter"></div>
							<div className="contentTuning__delimiter"></div>
						</div>
					</div>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<button className="contentTuning__button center-block" id="buttonQuote">Добавить</button>
					</div>
				</div>
				<div className="contentTuning__new">
					<div className="contentTuning__infinity">&infin;</div>
				</div>
				<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<button className="contentTuning__button center-block">Сохранить</button>
					</div>
				</div>
			</div>
			</div>
		</div>
		);
	}
}


export default IdeologyBody
