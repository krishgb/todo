import React from 'react'

export default function ListTasks(props) {

    const { tasks,
        searchedTask,
        changeDone,
        deleteHandler
    } = props

    const listTask = (list) => list.map(li =>
        <li key={li.id} id={li.id}>
            <sub>{new Date(li.date).toDateString().split(' ').splice(1, 2).join(' ')}</sub>
            <input
                value={li.task}
                readOnly
                className={li.completed ? 'strike' : ''}
            />
            <button
                id="done"
                onClick={changeDone}
            >{li.completed ? 'Repeat' : 'Done'}</button>
            <button
                id="delete"
                onClick={deleteHandler}
            >Delete</button>
        </li>
    )
    return (
        <ul>
            {searchedTask.length ? listTask(searchedTask) : listTask(tasks)}

        </ul>
    )
}