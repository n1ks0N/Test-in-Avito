import React from 'react'
import './style.css'
import { NavLink, useHistory } from 'react-router-dom'
import { GetRepActionCreater } from '../redux/state'

function Card(props) {

    const history = useHistory();

    function GetRep(e) {
        props.dispatch(GetRepActionCreater(e.target.dataset.name, e.target.dataset.owner))
        history.location = ''
    }

    return (
        <div className='Card'>
            <NavLink to={`repos/${props.owner}/${props.name}`} className='Card__title' onClick={GetRep} data-owner={props.owner} data-name={props.name}>{props.name}</NavLink>
            <a href={props.url} target='_blank' rel='noopener noreferrer' className='Card__url'>{props.url}</a>
            <p className='Card__stars'><span role="img" aria-label="&#9733;">&#9733;</span> {props.stars}</p>
            <p className='Card__date'><span role="img" aria-label="&#9733;">&#8986;</span> {props.date}</p>
        </div>
    )
}

export default Card