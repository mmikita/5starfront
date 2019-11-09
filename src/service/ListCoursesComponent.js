import React, { Component } from 'react'
import CourseDataService from '../service/CourseDataService.js';
import Main from '../components/main.jsx';


const INSTRUCTOR = 'in28minutes'

class ListCoursesComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            courses: [],
            message: null
        }
        this.refreshCourses = this.refreshCourses.bind(this)
    }

    componentDidMount() {
        this.refreshCourses();
    }

    refreshCourses() {
        // CourseDataService.retrieveAllCourses(INSTRUCTOR)//HARDCODED
        //     .then(
        //         response => {
        //             this.setState({ courses: response.data })
        //         }
        //     )
    }


    render() {
        console.log('render')
        return (
        <Main/ >
        )
    }
}

export default ListCoursesComponent