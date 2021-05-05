import React from 'react'

export default function Form(props) {
    return (
        <form onSubmit={props.formHandler}>
            <input
                type="text"
                placeholder="Add a task...."
            />
            <button>+</button>
        </form>

    )
}