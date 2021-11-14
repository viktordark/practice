<template>
    <div class="Information ex">
        <div class="student-photo">
            <img :src="student.photo">
        </div>
        <div class="student-aboutit">
            <p>Name: {{student.name}}</p>
            <p>Group: {{student.group}}</p>
            <p>Mark: {{student.mark}}</p>
            <p><a href="/">Main</a></p>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
export default {
    props: {
        id: '',
    },
    data: function() {
        return {
            student: {},
        }
    },
    mounted: function(){
        axios.get("http://46.101.212.195:3000/students/"+this.id)
            .then(res => {
                console.log(res.data)
                this.student = res.data
            })
    }
}
</script>