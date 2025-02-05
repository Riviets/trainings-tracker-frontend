import react, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

function Navigation(){
    return(
        <div className="navigation">
            <ul className="navigation_list">
                <li className="navigation__list-item">
                    <Link to='/'>Users</Link>
                </li>
                <li className="navigation__list-item">
                    <Link to='/trainings'>Trainings</Link>
                </li>
                <li className="navigation__list-item">
                    <Link to='/other'>Other</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navigation