import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getUserInfo} from '../../../Redux/Actions'



class BiographyBody extends Component{
    constructor(props){
      super(props);

      this.state = {
        id: this.props.id,
        name : '',
        surname : '',
        birthDate : '',
        hometown : '',
        maidenName: '',
        sex: '',
        birthtown: '',
        maritalstatus: '',
        something: '',
      } 
    }

    componentWillReceiveProps(newProps){
      if (newProps.id != this.props.id){
        newProps.getUserInfo(newProps.id);      
      }

      //первоначальная версия для вывода даты
      var months = ['янваврь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];

      //определяем месяц
      var month = Number(newProps.user.birthDate.substr(5,2)) -1;
      //определяем день
      var day = Number(newProps.user.birthDate.substr(8));
      //определяем год
      var year = Number(newProps.user.birthDate.substr(0,4));
      //выводим дату
      var date = day + ' ' + months[month] + ' ' + year;

      document.title = 'Настройки биографии';
      
      this.setState({
        id: this.props.id,
        name: newProps.user.name,
        surname: newProps.user.surname,
        birthDate: date,
        hometown : newProps.user.hometown,
        sex: newProps.user.sex,
        birthtown: newProps.user.birthtown,
        maritalstatus: newProps.user.maritalstatus,
      });
    }

    componentWillMount(){
      //первоначальная версия для вывода даты
      var months = ['янваврь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];

      //определяем месяц
      var month = Number(this.props.user.birthDate.substr(5,2)) -1;
      //определяем день
      var day = Number(this.props.user.birthDate.substr(8));
      //определяем год
      var year = Number(this.props.user.birthDate.substr(0,4));
      //выводим дату
      var date = day + ' ' + months[month] + ' ' + year;

      document.title = 'Настройки биографии';

      this.setState({
        id: this.props.id,
        name: this.props.user.name,
        surname: this.props.user.surname,
        birthDate: date,
        hometown : this.props.user.hometown,
        sex: this.props.user.sex,
        birthtown: this.props.user.birthtown,
        maritalstatus: this.props.user.maritalstatus,
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

    saveBiography(Page){
      var Oname = Page.state.name;
      var Osurname = Page.state.surname;
      var Ohometown = Page.state.hometown;
      var OmaidenName = Page.state.maidenName;
      var Obirthtown = Page.state.birthtown;
      var Omonths = '';  var Oday = '';

      if (document.getElementsByName('name')[0].value != '') { Oname = document.getElementsByName('name')[0].value};
      if (document.getElementsByName('surname')[0].value != '') { Osurname = document.getElementsByName('surname')[0].value};
      if (document.getElementsByName('maidenName')[0].value != '') { OmaidenName = document.getElementsByName('maidenName')[0].value};
      if (document.getElementsByName('hometown')[0].value != '') { Ohometown = document.getElementsByName('hometown')[0].value};
      if (document.getElementsByName('birthtown')[0].value != '') { Obirthtown = document.getElementsByName('birthtown')[0].value};

      if(document.getElementsByName('months')[0].value < 10){Omonths = '0'+document.getElementsByName('months')[0].value}
        {Omonths = document.getElementsByName('months')[0].value};

      if(document.getElementsByName('day')[0].value < 10){Oday = '0'+document.getElementsByName('day')[0].value}
        {Oday = document.getElementsByName('day')[0].value};

      fetch('/api/savebiography',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'JWT ' + localStorage.getItem('token'),
            },
            body:JSON.stringify({
              id: Page.state.something,
              name: Oname,
              surname: Osurname,
              birthDate: document.getElementsByName('year')[0].value + '-' + Omonths + '-' + Oday,
              hometown: Ohometown,
              maidenName: OmaidenName,
              sex: document.getElementsByName('sex')[0].value,
              birthtown: Obirthtown,
              maritalstatus: document.getElementsByName('maritalstatus')[0].value,
            })
      })
      .then((response)=>{return response.json();})
      .then((data) =>{
        if (data['status']){
          Page.state.something = Page.state.something;
        }
      });
    }

    render(){
        var months = ['янваврь', 'февраль', 'март',
                      'апрель', 'май', 'июнь', 'июль',
                      'август', 'сентябрь', 'октябрь',
                     'ноябрь', 'декабрь'];

        var userBirthDate = this.state.birthDate.split(' ');
        var arrayDay = []; var arrayPol = [];
        var arrayMonth = []; var arrayPolValue =['Не указан','Мужской','Женский'];
        var arrayYear = [];  var arrayStatus =[];
        var arrayTYears = [];
        var arrayStatusValue = ['Не указано','Не замужем/не женат','Замужем/женат',
                              'Встречаюсь','Гражданский брак','Всё сложно',
                              'Всё просто','В активном поиске']; 
        
        var Page = this;                     

        for (var i = 1; i < 32; i++) {
          if (i != userBirthDate[0]) {
            arrayDay.push(<option value={i}>{i}</option>)
          } else {
            arrayDay.push(<option selected="selected" value={userBirthDate[0]}>{userBirthDate[0]}</option>)
          }
        }

        for (var i = 0; i < 12; i++) {
          if (months[i] != userBirthDate[1]) {
            arrayMonth.push(<option value={i+1}>{months[i]}</option>)
          } else {
            arrayMonth.push(<option selected="selected" value={i+1}>{userBirthDate[1]}</option>)
          }
        }
        
        for (var i = 1900; i < 2004; i++) {
          if (i != userBirthDate[2]) {
            arrayYear.push(<option value={i}>{i}</option>)
          } else {
            arrayYear.push(<option selected="selected" value={userBirthDate[2]}>{userBirthDate[2]}</option>)
          }
        }

        for (var i = 0; i < 3; i++) {
          if (i != this.state.sex) {
            arrayPol.push(<option value={i}>{arrayPolValue[i]}</option>)
          } else {
            arrayPol.push(<option selected="selected" value={i}>{arrayPolValue[i]}</option>)
          }
        }

        for (var i = 0; i < 8; i++) {
          if (i != this.state.maritalstatus) {
            arrayStatus.push(<option value={i}>{arrayStatusValue[i]}</option>)
          } else {
            arrayStatus.push(<option selected="selected" value={i}>{arrayStatusValue[i]}</option>)
          }
        }

        for (var i = 1900; i < 2004; i++) {
          arrayTYears.push(<option value={i}>{i}</option>)
        }

        return(
            <div>
            <div className="col-lg-8 col-md-8 col-sm-9 col-xs-12 content">
              <div className="contentTuning container-fluid">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="contentTuning__tit">Общая информация</div>
                    <div className="contentTuning__new">
                      <div className="contentTuning__infinity">&infin;  </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-5 col-xs-4 contentTuning__parameter">Имя</div>
                  <div className="col-lg-8 col-md-8 col-sm-7 col-xs-8">
                    <input className="contentTuning__input contentTuning__oldParameter" name="name" placeholder={this.state.name}></input>
                    <div className="contentTuning__delimiter"></div>
                    <div className="contentTuning__delimiter"></div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-5 col-xs-4 contentTuning__parameter">Фамилия</div>
                  <div className="col-lg-8 col-md-8 col-sm-7 col-xs-8">
                    <input className="contentTuning__input contentTuning__oldParameter" name="surname" placeholder={this.state.surname}></input>
                    <div className="contentTuning__delimiter"></div>
                    <div className="contentTuning__delimiter"></div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-5 col-xs-4 contentTuning__parameter">Девичья фамилия</div>
                  <div className="col-lg-8 col-md-8 col-sm-7 col-xs-8">
                    <input className="contentTuning__input contentTuning__oldParameter" name="maidenName" placeholder={this.state.maidenName}></input>
                    <div className="contentTuning__delimiter"></div>
                    <div className="contentTuning__delimiter"></div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-5 col-xs-4 contentTuning__parameter">Пол</div>
                  <div className="col-lg-8 col-md-8 col-sm-7 col-xs-8">
                    <select className="contentTuning__input contentTuning__oldParameter" name="sex">
                      {arrayPol}
                    </select>
                    <div className="contentTuning__delimiter"></div>
                    <div className="contentTuning__delimiter"></div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-5 col-xs-4 contentTuning__parameter">Дата рождения</div>
                  <div className="col-lg-8 col-md-8 col-sm-7 col-xs-8">
                    <div className="row">
                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 contentTuning__select">
                        <select className="contentTuning__input contentTuning__oldParameter" name="day">
                          {arrayDay}
                        </select>
                        <div className="contentTuning__delimiter"></div>
                        <div className="contentTuning__delimiter"></div>
                      </div>
                      <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 contentTuning__select">
                        <select className="contentTuning__input contentTuning__oldParameter" name="months">
                          {arrayMonth}
                        </select>
                        <div className="contentTuning__delimiter"></div>
                        <div className="contentTuning__delimiter"></div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 contentTuning__select">
                        <select className="contentTuning__input contentTuning__oldParameter" name="year">
                          {arrayYear}
                        </select>
                        <div className="contentTuning__delimiter"></div>
                        <div className="contentTuning__delimiter"></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-8 col-sm-7 col-xs-12 col-lg-offset-4 col-md-offset-4 col-sm-offset-5">
                    <select className="contentTuning__input contentTuning__oldParameter">
                      <option defaultValue="selected" value="">Показывать дату рождения</option>
                      <option value="">Показывать только месяц и день</option>
                      <option value="">Не показывать дату рождения</option>
                    </select>
                    <div className="contentTuning__delimiter"></div>
                    <div className="contentTuning__delimiter"></div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-5 col-xs-4 contentTuning__parameter">Родной город</div>
                  <div className="col-lg-8 col-md-8 col-sm-7 col-xs-8">
                    <input className="contentTuning__input contentTuning__oldParameter" name="birthtown" placeholder={this.state.birthtown}></input>
                    <div className="contentTuning__delimiter"></div>
                    <div className="contentTuning__delimiter"></div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-5 col-xs-4 contentTuning__parameter">Город проживания</div>
                  <div className="col-lg-8 col-md-8 col-sm-7 col-xs-8">
                    <input className="contentTuning__input contentTuning__oldParameter" name="hometown" placeholder={this.state.hometown}></input>
                    <div className="contentTuning__delimiter"></div>
                    <div className="contentTuning__delimiter"></div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-5 col-xs-4 contentTuning__parameter">Семейное положение</div>
                  <div className="col-lg-8 col-md-8 col-sm-7 col-xs-8">
                    <select className="contentTuning__input contentTuning__oldParameter" name="maritalstatus">
                      {arrayStatus}
                    </select>
                    <div className="contentTuning__delimiter"></div>
                    <div className="contentTuning__delimiter"></div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="contentTuning__new">
                      <div className="contentTuning__infinity">&infin;</div>
                    </div>
                    <div className="contentTuning__tit">Общее и среднее образование</div>
                    <div className="contentTuning__new">
                      <div className="contentTuning__infinity">&infin;</div>
                    </div>
                    <div className="contentTuning__school">
                      <div className="col-lg-4 col-md-4 col-sm-5 col-xs-4 contentTuning__parameter">Страна</div>
                      <div className="col-lg-8 col-md-8 col-sm-7 col-xs-8">
                        <input className="contentTuning__input contentTuning__oldParameter" placeholder=""></input>
                        <div className="contentTuning__delimiter"></div>
                        <div className="contentTuning__delimiter"></div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-5 col-xs-4 contentTuning__parameter">Город</div>
                      <div className="col-lg-8 col-md-8 col-sm-7 col-xs-8">
                        <input className="contentTuning__input contentTuning__oldParameter" placeholder=""></input>
                        <div className="contentTuning__delimiter"></div>
                        <div className="contentTuning__delimiter"></div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-5 col-xs-4 contentTuning__parameter">Школа№</div>
                      <div className="col-lg-8 col-md-8 col-sm-7 col-xs-8">
                        <input className="contentTuning__input contentTuning__oldParameter" placeholder=""></input>
                        <div className="contentTuning__delimiter"></div>
                        <div className="contentTuning__delimiter"></div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-5 col-xs-4 contentTuning__parameter">Год поступления</div>
                      <div className="col-lg-8 col-md-8 col-sm-7 col-xs-8">
                        <select className="contentTuning__input contentTuning__oldParameter">
                          {arrayTYears}
                        </select>
                        <div className="contentTuning__delimiter"></div>
                        <div className="contentTuning__delimiter"></div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-5 col-xs-4 contentTuning__parameter">Год окончания</div>
                      <div className="col-lg-8 col-md-8 col-sm-7 col-xs-8">
                        <select className="contentTuning__input contentTuning__oldParameter">
                          {arrayTYears}
                        </select>
                        <div className="contentTuning__delimiter"></div>
                        <div className="contentTuning__delimiter"></div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-5 col-xs-4 contentTuning__parameter">Год выпуска</div>
                      <div className="col-lg-8 col-md-8 col-sm-7 col-xs-8">
                        <select className="contentTuning__input contentTuning__oldParameter">
                          {arrayTYears}
                        </select>
                        <div className="contentTuning__delimiter"></div>
                        <div className="contentTuning__delimiter"></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <button className="contentTuning__button center-block" name="buttonSchool">Добавить школу</button>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="contentTuning__new">
                      <div className="contentTuning__infinity">&infin;</div>
                    </div>
                    <div className="contentTuning__tit">Средне-специальное и высшее образование. Аспирантура.</div>
                    <div className="contentTuning__new">
                      <div className="contentTuning__infinity">&infin;        </div>
                    </div>
                    <div className="contentTuning__institute">
                      <div className="col-lg-4 col-md-4 col-sm-5 col-xs-4 contentTuning__parameter">Страна</div>
                      <div className="col-lg-8 col-md-8 col-sm-7 col-xs-8">
                        <input className="contentTuning__input contentTuning__oldParameter" placeholder=""></input>
                        <div className="contentTuning__delimiter"></div>
                        <div className="contentTuning__delimiter"></div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-5 col-xs-4 contentTuning__parameter">Город</div>
                      <div className="col-lg-8 col-md-8 col-sm-7 col-xs-8">
                        <input className="contentTuning__input contentTuning__oldParameter" placeholder=""></input>
                        <div className="contentTuning__delimiter"></div>
                        <div className="contentTuning__delimiter"></div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-5 col-xs-4 contentTuning__parameter">Название учебного заведения</div>
                      <div className="col-lg-8 col-md-8 col-sm-7 col-xs-8">
                        <input className="contentTuning__input contentTuning__oldParameter" placeholder=""></input>
                        <div className="contentTuning__delimiter"></div>
                        <div className="contentTuning__delimiter"></div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-5 col-xs-4 contentTuning__parameter">Факультет</div>
                      <div className="col-lg-8 col-md-8 col-sm-7 col-xs-8">
                        <input className="contentTuning__input contentTuning__oldParameter" placeholder=""></input>
                        <div className="contentTuning__delimiter"></div>
                        <div className="contentTuning__delimiter"></div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-5 col-xs-4 contentTuning__parameter">Кафедра</div>
                      <div className="col-lg-8 col-md-8 col-sm-7 col-xs-8">
                        <input className="contentTuning__input contentTuning__oldParameter" placeholder=""></input>
                        <div className="contentTuning__delimiter"></div>
                        <div className="contentTuning__delimiter"></div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-5 col-xs-4 contentTuning__parameter">Форма обучения</div>
                      <div className="col-lg-8 col-md-8 col-sm-7 col-xs-8">
                        <select className="contentTuning__input contentTuning__oldParameter">
                          <option defaultValue="selected" value="">Очная</option>
                          <option value="2002">Очно-заочная</option>
                          <option value="2001">Заочная</option>
                          <option value="2000">Дистанционная</option>
                          <option value="1999">Экстернат</option>
                        </select>
                        <div className="contentTuning__delimiter"></div>
                        <div className="contentTuning__delimiter"></div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-5 col-xs-4 contentTuning__parameter">Статус</div>
                      <div className="col-lg-8 col-md-8 col-sm-7 col-xs-8">
                        <input className="contentTuning__input contentTuning__oldParameter" placeholder=""></input>
                        <div className="contentTuning__delimiter"></div>
                        <div className="contentTuning__delimiter"></div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-5 col-xs-4 contentTuning__parameter">Год поступления</div>
                      <div className="col-lg-8 col-md-8 col-sm-7 col-xs-8">
                        <select className="contentTuning__input contentTuning__oldParameter">
                          {arrayTYears}
                        </select>
                        <div className="contentTuning__delimiter"></div>
                        <div className="contentTuning__delimiter"></div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-5 col-xs-4 contentTuning__parameter">Год окончания</div>
                      <div className="col-lg-8 col-md-8 col-sm-7 col-xs-8">
                        <select className="contentTuning__input contentTuning__oldParameter">
                          {arrayTYears}
                        </select>
                        <div className="contentTuning__delimiter"></div>
                        <div className="contentTuning__delimiter"></div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-5 col-xs-4 contentTuning__parameter">Год выпуска</div>
                      <div className="col-lg-8 col-md-8 col-sm-7 col-xs-8">
                        <select className="contentTuning__input contentTuning__oldParameter">
                          {arrayTYears}
                        </select>
                        <div className="contentTuning__delimiter"></div>
                        <div className="contentTuning__delimiter"></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <button className="contentTuning__button center-block" name="buttonInstitute">Добавить учебное заведение</button>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="contentTuning__new">
                      <div className="contentTuning__infinity">&infin;</div>
                    </div>
                    <div className="contentTuning__tit">Военная служба</div>
                    <div className="contentTuning__new">
                      <div className="contentTuning__infinity">&infin;</div>
                    </div>
                    <div className="contentTuning__army">
                      <div className="col-lg-4 col-md-4 col-sm-5 col-xs-4 contentTuning__parameter">Военская часть</div>
                      <div className="col-lg-8 col-md-8 col-sm-7 col-xs-8">
                        <input className="contentTuning__input contentTuning__oldParameter" placeholder=""></input>
                        <div className="contentTuning__delimiter"></div>
                        <div className="contentTuning__delimiter"></div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-5 col-xs-4 contentTuning__parameter">Год начала службы</div>
                      <div className="col-lg-8 col-md-8 col-sm-7 col-xs-8">
                        <select className="contentTuning__input contentTuning__oldParameter">
                          {arrayTYears}
                        </select>
                        <div className="contentTuning__delimiter"></div>
                        <div className="contentTuning__delimiter"></div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-5 col-xs-4 contentTuning__parameter">Год окончания службы</div>
                      <div className="col-lg-8 col-md-8 col-sm-7 col-xs-8">
                        <select className="contentTuning__input contentTuning__oldParameter">
                          {arrayTYears}
                        </select>
                        <div className="contentTuning__delimiter"></div>
                        <div className="contentTuning__delimiter"></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <button className="contentTuning__button center-block" name="buttonArmy">Добавить место службы</button>
                    <div className="contentTuning__new">
                      <div className="contentTuning__infinity">&infin;      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <button className="contentTuning__button center-block" onClick={(event) => {this.saveBiography(Page)}}>Сохранить</button>
                  </div>
                </div>
              </div>
            </div>
            </div>
        )
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
export default connect(mapToStateProps, matchDispatchToProps)(BiographyBody)

