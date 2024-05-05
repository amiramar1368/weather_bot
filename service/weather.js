import axios from "axios";
import { createCanvas } from "canvas";

axios.defaults.baseURL = process.env.BASE_URL;

async function getWeatherByCityName(city) {
  try {
    const { data } = await axios.get(`/current.json?key=${process.env.API_KEY}&q=${city}&aqi=no`);
    return data;
  } catch (err) {
    return false;
  }
}

export async function makeImage(city) {
  
  const data = await getWeatherByCityName(city);
  
  const canvas = createCanvas(400, 200);
  const ctx = canvas.getContext("2d");
  let text;
  if (data.error) {
    text = data.error.message;
  } else if (data.location) {
    text = `
      city : ${data.location.name}
      region :${data.location.region}
      country :${data.location.country}
      current temp : ${data.current.temp_c}
      wind speed : ${data.current.wind_kph}
      wind dir : ${data.current.wind_dir}
      humidity : ${data.current.humidity}
  `;
  } else {
  text = "an error accured";
  }

  // canvas style
  const fontSize = 20;
  const textWidth = ctx.measureText(text).width;

  canvas.width = textWidth + 150;
  canvas.height = 230;

  ctx.fillStyle = "#048";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.font = `${fontSize}px Times New Roman`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText(text, canvas.width/2, 0);

  const buffer = canvas.toBuffer();
  return buffer;
}
