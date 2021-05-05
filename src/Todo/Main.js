import React, { Component } from 'react'
import Form from './Form'
import ListTasks from './ListTasks'
import SearchList from './SearchList'

export default class Main extends Component {

    constructor() {
        super()
        this.state = {
            tasks: [
            ],
            searchedTask: [],
        }
    }

    componentDidMount() {
        const tasks = JSON.parse(localStorage.getItem('tasks'))
        this.setState({
            tasks: tasks ? tasks : [
                {
                    id: 0,
                    task: 'Be nice',
                    date: new Date().toDateString().split(' ').splice(1, 2).join(' '),
                    completed: false
                }

            ]
        })
    }

    showAll = () => this.setState({ searchedTask: [] })

    clearHandler = () => this.setLocalStorage([], [])

    setLocalStorage = (tasks, searchedTask = this.state.searchedTask) => this.setState({ tasks, searchedTask }, () => localStorage.setItem('tasks', JSON.stringify(tasks)))

    changeDone = (event) => {
        const id = parseInt(event.target.parentElement.id)
        const tasks = this.state.tasks.map(task => {
            task.id === id && (task.completed = !task.completed)
            return task
        })

        this.setLocalStorage(tasks)
    }

    deleteHandler = event => {
        const id = parseInt(event.target.parentElement.id)
        const tasks = this.state.tasks.filter(task => task.id !== id)

        this.setLocalStorage(tasks)
    }


    formHandler = (event) => {
        event.preventDefault()

        const newTask = event.target.children[0].value.trim()

        const task = newTask && {
            id: Date.now(),
            task: newTask,
            date: new Date().toDateString().split(' ').splice(1, 2).join(' '),
            completed: false
        }

        const tasks = [...this.state.tasks]
        tasks.push(task)
        this.setLocalStorage(tasks)

        event.target.children[0].value = ''
    }

    radioHandler = event => {
        const searchedTask = [...this.state.tasks].filter(task => task.completed === JSON.parse(event.target.value))
        this.setState({ searchedTask })
    }

    changeTaskInput = (event) => {
        const eveValue = event.target.value.trim()
        const searchedTask = [...this.state.tasks].filter(task => task.task.includes(eveValue.length ? eveValue : ''))
        this.setState({ searchedTask })
    }

    render() {
        return (
            <>
                <main>

                    <Form formHandler={this.formHandler} />

                    <SearchList
                        changeTaskInput={this.changeTaskInput}
                        showAll={this.showAll}
                        clearHandler={this.clearHandler}
                        radioHandler={this.radioHandler}
                    />
                </main>

                <ListTasks
                    tasks={this.state.tasks}
                    changeDone={this.changeDone}
                    deleteHandler={this.deleteHandler}
                    searchedTask={this.state.searchedTask}
                />
            </>
        )
    }
}