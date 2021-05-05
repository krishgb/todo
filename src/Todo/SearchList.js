import React from 'react'

export default function SearchList(props) {
    const { showAll, clearHandler, radioHandler, changeTaskInput } = props
    return (
        <>
            <div>

                <input
                    onChange={changeTaskInput}
                    type="text"
                    placeholder="Search your tasks"
                />
                <button onClick={showAll}>All</button>

                <label>
                    <input
                        type="radio"
                        name="show"
                        value="true"
                        onClick={radioHandler}
                    />Finished
                </label>

                <label>

                    <input
                        type="radio"
                        name="show"
                        value="false"
                        onClick={radioHandler}
                    />Ongoing
                </label>
            </div>

            <button onClick={clearHandler}>Clear All</button>

        </>
    )
}