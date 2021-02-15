import React, { useState, useEffect } from 'react'

export default function DemoHookUseEffect(props) {

    ////useEffect la ham chay sau khi giao dien render thay cho disupdate va dismount trong moi truong hop
    // useEffect(() => {
    //     console.log("dismount");
    //     console.log("disupdate");
    // })

    ////Cach viet thay cho component dismount, setState se ko chay lai
    // useEffect(() => {
    //     console.log("dismount");
    // }, [])

    let [number, setNumber] = useState(1);

    //Cach viet thay cho component disupdate
    useEffect(() => {
        console.log("Disupdate khi number(state) thay doi, mac dinh chay 1 lan dau tien sau render")
    }, [number])

    console.log("render");



    const handleIncrease = () => {
        setNumber(++number);
    }

    return (
        <div>
            <div>
                <div className="card text-left" style={{ width: '200px' }}>
                    <img className="card-img-top" src="https://picsum.photos/200/200" alt="picture" />
                    <div className="card-body">
                        <p className="card-text" style={{ color: 'red' }}>{number} like</p>
                    </div>
                </div>
                <button className="btn btn-danger" onClick={() => { handleIncrease() }}>Like di nao :D</button>
            </div>
        </div>
    )
}
