import React from 'react'
import './style.css'

function Page(props) {


    return (
        <div className='Page'>
            <h1>{props.page.name}<span className='page__title_size'>stars:{props.page.stars}</span></h1>
            <h6>{props.page.date}</h6>
            <div>
                <img src={props.page.avatar} />
                <p>{props.page.nickname}</p>
            </div>
        </div>
    )
}

export default Page