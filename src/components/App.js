import React, {Component} from 'react';
import Form from './Form'
import Result from './Result'

import './App.css';

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
        err: '',
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


        const API =
            `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=efa2ef11f117f7485b2fca8e87a3a2f5&units=metric`

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
            .then(data => console.log(data))
            .catch(err => console.log(err))

    }

    render() {
        return (
            <div className="App">
                <Form
                    value={this.state.value}
                    change={this.handleInputChange}
                    submit={this.handleCitySubmit}
                />
                <Result/>
            </div>
        );
    }
}


export default App;
