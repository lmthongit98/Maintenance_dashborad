import React, { useState } from 'react'

export default function DemoHookUseState(props) {

    let [state, setState] = useState({ like: 0 })

    //Khi setState thi chay lai het function
    const handleLike = () => {
        setState({
            like: state.like + 1
        })
    }

    return (
        <div>
            <div className="card text-left">
                <img className="card-img-top" src="https://picsum.photos/200/200" alt="picture" />
                <div className="card-body">
                    <p className="card-text" style={{ color: 'red' }}>{state.like} like</p>
                </div>
            </div>
            <button className="btn btn-danger" onClick={() => { handleLike() }}>Like di nao :D</button>
        </div>

    )
}
