import React, {useState} from 'react'

function Clicker(){
    const [count, setCount] = useState(0)
    const [click, setClick] = useState(1)

    const onClick = () => {
        setCount(count+click)
    }

    const upgradeClickValue = () => {
        setClick(click+1)
    }

    const resetValues = () => {
        setCount(0)
        setClick(1)
    }

    return (
        <div>
            <button onClick={onClick}>{count}</button>
            <p>Click value: {click}</p>
            <button onClick={upgradeClickValue}>Upgrade clcik Value</button>
            <button onClick={resetValues}>Reset</button>
        </div>
    )
    }

export default Clicker