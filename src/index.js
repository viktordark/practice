import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

new Vue({
    el: '#app',
    data: {
      students:[],
      search: ''
    },
    mounted: function(){
      console.log(this);
      axios.get("http://46.101.212.195:3000/students").then((response)=>{
        console.log(response.data)
        this.students = response.data;
      })
    },
    methods:{
      clickme: function(id){
        this.students = this.students.filter((element)=>{
          return element._id !== id;
        });;
      } 
    }
})