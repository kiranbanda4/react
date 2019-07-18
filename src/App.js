import React from "react";
import './App.css';
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "YOUR_RECIPE_KEY";

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    if (city && country) {
      console.log(data)
      this.setState({
        temperature: data.main ? data.main.temp: "unknown",
        city: data.name,
        country: data.sys ? data.sys.country: "Unknown",
        humidity: data.main ? data.main.humidity: "Unknown",
        description: data.weather ? data.weather[0].description : "Unknown",
        error: ""
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Enter the values."
      });
    }
  }
  render() {
    return (
      <div className="wrapper">
        <div className="main">
        <div className="container">
          <div className="row">
            <div className="col-xs-5 title-container">
                <Titles />
            </div>
                <div className="col-xs-7 form-container">
                <Form getWeather={this.getWeather} />
                <Weather className="col-xs-7 form-container"
                temperature={this.state.temperature} 
                humidity={this.state.humidity} 
                city={this.state.city}
                country={this.state.country}
                description={this.state.description}
                error={this.state.error}/>
                </div> 
           </div>   
          </div>  
        </div>
                </div>     
    );
  }
};

export default App;