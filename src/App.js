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
            image:'',
            className: ''
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
        
        // const API_CALL = `https://api.weatherbit.io/v2.0/current?city=${City},${State}&key=${API_KEY}`;
         const API_CALL = `http://api.weatherbit.io/v2.0/forecast/daily?city=${City},${State}&key=${API_KEY}`; 
  
        fetch(API_CALL)
        .then(res => res.json())
        .then(json  => {

            this.setState({
                className:'cards',
        })
            let local_date = new Date() ;
            let today = local_date.getDay() ;
            let week = {
                0:"Monday" + local_date.getDay(),
                1:"Tuesday",
                2:"Wednesday",
                3:"Thursday",
                4:"Friday",
                5:"Saturday",
                6:"Sunday"
            }

            this.setState({
                items: json,
                cityName: json.data[0].city_name,
                stateName:json.data[0].state_code,

                //DAY 1
                temp: Math.floor(json.data[1].max_temp * 9/5 + 32) + " Degrees - High",
                tempL: Math.floor(json.data[1].min_temp * 9/5 + 32) + " Degrees - Low",
                condition: json.data[1].weather.description,
                date:week[today] + " " + json.data[1].datetime,
                

                //DAY 2
                temp2: Math.floor(json.data[2].max_temp * 9/5 + 32) + " Degrees - High",
                temp2L: Math.floor(json.data[2].min_temp * 9/5 + 32) + " Degrees - Low",
                condition2: json.data[2].weather.description,
                date2: week[today + 1] + " " + json.data[2].datetime,
  

                //DAY 3
                temp3: Math.floor(json.data[3].max_temp * 9/5 + 32) + " Degrees - High",
                temp3L: Math.floor(json.data[3].min_temp * 9/5 + 32) + " Degrees - Low",
                condition3: json.data[3].weather.description,
                date3: week[today + 2] + " " + json.data[3].datetime,

                //DAY 4
                temp4: Math.floor(json.data[4].max_temp * 9/5 + 32) + " Degrees - High",
                temp4L: Math.floor(json.data[4].min_temp * 9/5 + 32) + " Degrees - Low",
                condition4: json.data[4].weather.description,
                date4: week[today + 3] + " " + json.data[4].datetime,

                //DAY 5
                temp5: Math.floor(json.data[5].max_temp * 9/5 + 32) + " Degrees - High",
                temp5L: Math.floor(json.data[5].min_temp * 9/5 + 32) + " Degrees - Low",
                condition5: json.data[5].weather.description,
                date5: week[today + 4] + " " + json.data[5].datetime,
                
            })
        });
    }
   

    render() {
        let icons = {
            "Clear Sky": "sunny.svg",
            "Sunny": "sunny.svg",
    
            "Overcast clouds":"overcast.svg",
            "Scattered clouds":"partlyCloudy.svg",
            "Broken clouds":"partlyCloudy.svg",
            "Few clouds":"partlyCloudy.svg",
    
            "Mix snow/rain":"rain.svg",
            "Light rain":"rain.svg",
            "Thunderstorm with rain":"thunderstorm.svg"
        };

        let { isLoaded, } = this.state;
        if (!isLoaded) {
            return <div>Data Loading.. Please Wait...</div>;
        }
        return (
            <div className="App wow fadeInDownBig">
            
                <h1 className="title">5 Day Weather Forecast</h1>
                <div id="demo"></div>
                <div className="app-container wow rotateIn" data-wow-delay="1.2s">
                  <div className="weather-container">
                  
                    {/* <div className="weather-child temp">{this.state.cityName}  {this.state.stateName}</div>   */}
                     {/* <div className="weather-child temp">{this.state.wind}</div>  */}

                <div className={this.state.className}>
                    <div className="weather-child temp">{this.state.temp}</div>
                    <div className="weather-child temp">{this.state.tempL}</div>
                    <div className="weather-child">{this.state.condition}</div> 
                    <div className="weather-child temp">{this.state.date}</div>
                    <br/>
                    <div className="imageContainer" > <img src={icons[this.state.condition]}></img></div>
        
                </div>
                    
                <div className={this.state.className}>
                    <div className="weather-child temp">{this.state.temp2}</div>
                    <div className="weather-child temp">{this.state.temp2L}</div>
                    <div className="weather-child">{this.state.condition2}</div> 
                    <div className="weather-child temp">{this.state.date2}</div>
                    <br/>
                    <div className="imageContainer" > <img src={icons[this.state.condition2]}></img></div>
            
                </div>

                <div className={this.state.className}>
                    <div className="weather-child temp">{this.state.temp3}</div>
                    <div className="weather-child temp">{this.state.temp3L}</div>
                    <div className="weather-child">{this.state.condition3}</div> 
                    <div className="weather-child temp">{this.state.date3}</div>
                    <br/>
                    <div className="imageContainer" > <img src={icons[this.state.condition3]}></img></div>
    
                </div>

                <div className={this.state.className}>
                    <div className="weather-child temp">{this.state.temp4}</div>
                    <div className="weather-child temp">{this.state.temp4L}</div>
                    <div className="weather-child">{this.state.condition4}</div> 
                    <div className="weather-child temp">{this.state.date4}</div>
                    <br/>
                    <div className="imageContainer" > <img src={icons[this.state.condition4]}></img></div>
         
          
                    
                </div>

                <div className={this.state.className}>
                    <div className="weather-child temp">{this.state.temp5}</div>
                    <div className="weather-child temp">{this.state.temp5L}</div>
                    <div className="weather-child">{this.state.condition5}</div> 
                    <div className="weather-child temp">{this.state.date5}</div>
                    <br/>
                    <div className="imageContainer" > <img src={icons[this.state.condition5]}></img></div>
            
                  
                    
                </div>
                    
                   
                    

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