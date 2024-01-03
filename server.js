const { default: axios } = require("axios");
const express = require("express");
const app = express();

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve the public folder as static files
app.use(express.static("public"));
const config = require("./config/config");
const apiKey = config.apiKey;
// Render the index template with default values for weather and error
app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

// Handle the /weather route
app.get("/weather",async (req, res) => {
  const city = req.query.city;


  let weather;

  let error = null
  try{

    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather',{params:{
      q:city,
      units:'imperial',
      appid:apiKey,
    }});
    weather = response.data;
    console.log(response.data);
  }catch(error){
    console.error(error);
    weather = null;
    error = "error please try again";  
  }
  res.render("index", { weather, error });


});

// Start the server and listen on port 3000 or the value of the PORT environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
