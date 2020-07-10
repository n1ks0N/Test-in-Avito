import React from 'react'
import './style.css'
// import { useHistory } from 'react-router-dom'
import { GetRepActionCreater } from '../redux/state'

function Page(props) {
    debugger

    // const history = useHistory()

    // if ((props.page.lastGetUrl !== history.location.pathname) && (history.location.pathname !== '')) {
    //     console.log(history.location.pathname)
    //     const name = history.location.pathname.split('/')[3]
    //     const owner = history.location.pathname.split('/')[2]

    //     console.log(name + ' ; ' + owner)
    //     props.dispatch(GetRepActionCreater(name, owner))
    // }

    return (
        <div className='Page'>
            <h1>{props.page.name}<span className='page__title_size'>stars:{props.page.stars}</span></h1>
            <h6>{props.page.date}</h6>
            <div>
                <img src={props.page.avatar} />
                <p>{props.page.nickname}</p>
            </div>
            {/* <p>Languages:</p>
            <ul>
                {props.page.languages.map(data => <li>{data.lang}</li>)}
            </ul> */}
        </div>
    )
}

export default Page