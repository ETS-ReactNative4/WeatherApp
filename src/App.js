import React, { Component } from 'react';
import '../public/fadein.js';
import './App.css';
import WOW from "wowjs";
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

        const wow = new WOW.WOW();
        wow.init();
        wow.sync();
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
      
        console.log(City);
        console.log(State);
        
        //Your API weatherbit key here
        const API_KEY = "b6a7024fce944c3a8f969cc60b3c0141";
        
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
            else if(this.state.condition === "Broken clouds" ||
                    this.state.condition ===  "Overcast clouds" ||
                    this.state.condition === "Scattered clouds" ||
                    this.state.condition === "Few clouds"
                    ){

                    document.getElementById("imageContainer").innerHTML="<img src='overcast.jpg' />";
            }
            else if(this.state.condition === "Heavy rain" ||
                    this.state.condition === "Light rain" ||
                    this.state.condition === "Moderate rain")
                    
                    {

                document.getElementById("imageContainer").innerHTML="<img src='heavyrain.jpg' />";
            }
        });


    }
    render() {
        var { isLoaded, } = this.state;
        if (!isLoaded) {
            return <div>Data Loading.. Please Wait...</div>;
        }
        return (
            <div className="App wow fadeInDownBig">
                <h1 className="title">What's your Weather?</h1>
                <div className="app-container wow rotateIn" data-wow-delay="1.2s">
                  <div className="weather-container">
                  
                    <div className="weather-child temp">{this.state.cityName} {this.state.stateName}</div>  
                    <div className="weather-child temp">{this.state.temp}</div>
                    <div className="weather-child">{this.state.condition}</div> 
                    <div className="weather-child temp">{this.state.wind}</div> 
                   
                    <div id="imageContainer" ></div>

                  </div>


                  <div className="wrap">
               
                  <h1 className="string">Enter City</h1>
                    <input className="input2" onChange={this.onCityChange}  type="text"  id="city" placeholder="City" name="City" />
                  <h1 className="string">Enter State</h1>
                    <input className="input2" onChange={this.onStateChange} type="text" id="state" placeholder="State" name="State" />
                  
                    <br/>
                    <button className="submit-button wow fadeInDownBig" data-wow-delay="1.5s" onClick={this.updateCity}>Submit</button>
                    
                 
                 </div>
                 {/* End Wrap Div */}
                </div>
            </div>
        );

       
    }
}
export default App;