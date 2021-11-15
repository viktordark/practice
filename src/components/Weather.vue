<template>
   <div class="main">
    <div class="block">   
        <div class="head">  
            <div>
                <h2 class="title">Город:</h2>  
            </div>
            <div>
                <h2>{{weather.name}}</h2>                
            </div>     
        </div>

            <div class="card">
                <h2>Погода </h2>
                <p>Основная: {{weather.weather[0].main}}</p>
                <p>Описание: {{weather.weather[0].description}}</p>
                <p>Температура: {{weather.main.temp}} °C</p>
                <p>Ощущается: {{weather.main.feels_like}} °C</p>
                <p>Сегодня: {{weather.main.temp_min}} °C - {{weather.main.temp_max}} °C</p>
                <p>Скорость ветра: {{weather.wind.speed}} м/с</p>
                <p>Градус ветра: {{weather.wind.deg}}°</p>
                <p>Давление: {{weather.main.pressure}} мбар</p>
                <p>Влажность: {{weather.main.humidity}} %</p>
                <p>Рассвет: {{weather.sys.sunrise}}</p>
                <p>Закат: {{weather.sys.sunset}}</p>
                <p>Часовой пояс: {{weather.timezone}}</p>
            </div>
        </div>            
    </div>
</template>

<script>
import axios from 'axios'
export default {
    props: {
        city: '',
    },
    data: function() {
        return {
            weather: [],
            API_KEY: '0e46206d6a6297fcc13660833176ccc9',
            URL: "http://api.openweathermap.org/data/2.5/weather?",
        }
    },
    mounted: function(){
        axios.get(`${this.URL}q=${this.city}&appid=${this.API_KEY}`)
            .then( res => {
                this.weather = res.data;
                console.log(`${this.URL}${this.myLocation}&appid=${this.API_KEY}`)
            })
            .then(() => {
                this.weather.main.temp -= 273.15;
                this.weather.main.temp = this.weather.main.temp.toFixed(1);
                this.weather.main.feels_like -= 273.15;
                this.weather.main.feels_like = this.weather.main.feels_like.toFixed(1);
                this.weather.main.temp_max -= 273.15;
                this.weather.main.temp_max = this.weather.main.temp_max.toFixed(1);
                this.weather.main.temp_min -= 273.15;
                this.weather.main.temp_min = this.weather.main.temp_min.toFixed(1);
                let date = new Date(this.weather.sys.sunrise *1000);
                let hours = date.getHours() + this.weather.timezone/3600;
                let minutes = date.getMinutes();
                let seconds = date.getSeconds();
                this.weather.sys.sunrise = `${hours}:${minutes}:${seconds}`
                
                date = new Date (this.weather.sys.sunset * 1000)
                hours = date.getHours() + this.weather.timezone/3600;
                minutes = date.getMinutes();
                seconds = date.getSeconds();
                this.weather.sys.sunset = `${hours}:${minutes}:${seconds}`                  
                this.weather.timezone = `UTC${this.return_char()}${this.weather.timezone/3600}`
            })
    },
}
</script>