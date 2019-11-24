import React, {Component} from 'react';
import Form from './Form'
import Result from './Result'
import './App.css';

// Klucz do API /zmiana API
const APIKey = '6ca87870f831da81c52974e4940ffc32'

class App extends Component {

    //stany początkowe
    state = {
        value: '',
        date: '',
        city: '',
        sunrise: '',
        sunset: '',
        temp: '',
        pressure: '',
        wind: '',
        err: false,
    }

    //metoda pobiera wpisywane value i ponownie renderuje komponent z nową wartością value (komponent kontrolowany)

    handleInputChange = e => {
        this.setState({
            value: e.target.value
        })
    }

    handleCitySubmit = e => {
        e.preventDefault()
        //przekazanie tej metody do formularza


        const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=${APIKey}`;
            
        //metoda asynchroniczna
        fetch(API)
            .then(response => {
                if(response.ok) {
                    return response
                }
                throw Error("Nie udało się")
            })
            //dostanie się do json aby pobrać właściwości(przypisać do state)
            .then(response => response.json())
            .then(data => {
                const time = new Date().toLocaleString()

                //używam aktualnej wartości w city, dlatego przekazuje funkcje, która zwraca nam obiekt
                //(a nie sam obiekt) może to uchronić przed ewentualnymi błędami
                this.setState(state => ({
                    err: false, 
                    date: time,
                    sunrise: data.sys.sunrise,
                    sunset: data.sys.sunset,
                    temp: data.main.temp,
                    pressure: data.main.pressure,
                    wind: data.wind.speed,
                    city: state.value,
               }))
            })
            .catch(err => {
                console.log(err)
                this.setState(state => ({
                    err: true,
                    city: this.state.value
                }))
            })
    }

    render() {
      return (
            <div className="App">
                <Form
                    value={this.state.value}
                    change={this.handleInputChange}
                    submit={this.handleCitySubmit}
                />
                <Result weather={this.state} />
            </div>
        );
    }
}


export default App;