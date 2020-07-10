import React from 'react'
import Card from './Card'
import './style.css'
import { GetActionCreater } from '../redux/state'
import { useHistory } from 'react-router-dom'

function Main(props) {

    const repInput = React.createRef()
    const history = useHistory();
    const hist = history.location.pathname + history.location.search

    if ((props.main.url !== hist) && (history.location.search !== '') && (history.location.pathname === '/search')) {
        const valRep = history.location.search.split('=')[1].split('+')[0]
        const num = history.location.search.split('&')[3].split('=')[1]

        props.dispatch(GetActionCreater(valRep, num))
    }

    function Search() {
        const valRep = repInput.current.value
        props.dispatch(GetActionCreater(valRep, 1))
        history.location = ''
        history.push(props.main.url); 
    }

    function Pagination(e) {
        const valRep = repInput.current.value
        if (e.target.dataset.page !== Number(props.main.num)) {
            props.dispatch(GetActionCreater(valRep, e.target.dataset.page))
            history.location = ''
            history.push(props.main.url)
        }
    }

    function Prev() {
        const valRep = repInput.current.value
        if (Number(props.main.num) !== 1) {
            props.dispatch(GetActionCreater(valRep, Number(props.main.num) - 1))
            history.location = ''
            history.push(props.main.url);
        }
    }
    function Next() {
        const valRep = repInput.current.value
        if ((Number(props.main.num) !== 10)) {
            props.dispatch(GetActionCreater(valRep, Number(props.main.num) + 1))
            history.location = ''
            history.push(props.main.url)
        }
    }

    return (
        <div className="Main">
            <input ref={repInput} placeholder="Repositories" />

            <button onClick={Search}>Search</button>

            <main>
                {props.main.card.map(data => 
                    <Card 
                        name={data.name} 
                        url={data.url} 
                        stars={data.stars} 
                        date={data.date} 
                        owner={data.owner} 
                        dispatch={props.dispatch}
                    />
                )}
            </main>

            <footer>
                <ul className="list" type="none">
                    <li onClick={Prev}>prev</li>
                        {props.main.list.map(data => 
                            <li 
                                data-page={data.id} 
                                onClick={Pagination}>{data.id}
                            </li>
                        )}
                    <li onClick={Next}>next</li>
                </ul>
            </footer>
        </div>
    )
}

export default Main