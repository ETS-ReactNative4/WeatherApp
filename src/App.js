import React, { Component } from 'react';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            temp:"",
            condition:"",
            cityName:"",
            value: '',
            data:'',
            wind:'',
            image:''
        }
    }

    componentDidMount(API_CALL) {
        this.setState({
            isLoaded: true,
        })
    }

    onStateChange = event => {
        this.setState({ State: event.target.value});
    }

    onCityChange = event => {
        this.setState({ City: event.target.value});
    }
    
    updateCity = (e,items) => {
        const  {City}  = this.state;
        const  {State}  = this.state;
        event.preventDefault();
        console.log(City);
        console.log(State);
        
        //Your API weatherbit key here
        const API_KEY = "YOUR API KEY HERE";
        
        const API_CALL = `https://api.weatherbit.io/v2.0/current?city=${City},${State}&key=${API_KEY}`;
        // const API_CALL2 = `http://api.weatherbit.io/v2.0/forecast/daily?city=${City},${State}&key=${API_KEY}`; 16 day forecast
  
        fetch(API_CALL)
        .then(res => res.json())
        .then(json  => {
   
            this.setState({
                items: json,
                cityName: json.data[0].city_name,
                stateName:json.data[0].state_code,
                temp: json.data[0].temp * 9/5 + 32 + " Degrees",
                condition: json.data[0].weather.description,
                wind:"Wind Direction: " +  json.data[0].wind_cdir
                
            })
            if(this.state.condition === "Clear sky"){
                document.getElementById("imageContainer").innerHTML="<img src='clearSky.jpg' />";
            }
            else if(this.state.condition === "Fog"){
                document.getElementById("imageContainer").innerHTML="<img src='Fog.jpg' />";
            }
            else if(this.state.condition === "Broken clouds" || this.state.condition === "Overcast clouds"){
                document.getElementById("imageContainer").innerHTML="<img src='overcast.jpg' />";
            }
            else{
                document.getElementById("imageContainer").innerHTML=null; 
            }
        });


    }
    render() {
        var { isLoaded, } = this.state;
        if (!isLoaded) {
            return <div>Data Loading.. Please Wait...</div>;
        }
        return (
            <div className="App">
                <h1>What's your Weather?</h1>
                <div className="app-container">
                  <div className="weather-container">
                  
                    <div className="weather-child temp">{this.state.cityName} {this.state.stateName}</div>  
                    <div className="weather-child temp">{this.state.temp}</div>
                    <div className="weather-child">{this.state.condition}</div> 
                    <div className="weather-child temp">{this.state.wind}</div> 
                    <div id="imageContainer" > </div>
                  </div>


                  <div className="wrap">
                  <form onSubmit={this.onSubmit}>
                  <h1 className="string">Enter City</h1>
                    <input className="input2" onChange={this.onCityChange}  type="text"  id="city" placeholder="City" name="City" />
                  <h1 className="string">Enter State</h1>
                    <input className="input2" onChange={this.onStateChange} type="text" id="state" placeholder="State" name="State" />
                  
                    <br/>
                    <button className="submit-button" onClick={this.updateCity}>Submit</button>
                    
                  </form>
                 </div>
                 {/* End Wrap Div */}
                </div>
            </div>
        );
    }
}
export default App;