const GET_METHOD = 'GET-METHOD'
const GET_REP = 'GET-REP'

let store = {

    _render() { },

    _state: {
        main: {
            totalCount: 0, // для пагинации
            list: [], // для промежуточного пуша
            url: 'search?q=+language:&sort=stars&order=desc&page=1&per_page=10', // для history
            num: 0, // для пагинации
            card: [{
                id: 0,
                name: ['Example'],
                url: ['https://example.com'],
                stars: ['9999'],
                date: ['12.12.2012']
            }]
        },
        page: {
            name: 'Example',
            stars: '9999',
            date: '12.12.2012',
            avatar: 'https://example.com',
            nickname: 'user',
            userUrl: 'https://example.com',
            languages: 'JavaScript',
            description: 'Lorem ipsum',
            contributers: 'user1',
            lastGetUrl: '/repos/name/name'
        }
    },

    getState() {
        return (
            this._state
        )
    },

    dispatch(action) {
        switch (action.type) {
            case 'GET-METHOD':
                const urlApi = `https://api.github.com/search/repositories?q=${action.valRep}+language:&sort=stars&order=desc&page=${action.num}&per_page=10`
                const main = this._state.main
                main.url = '/search?' + urlApi.split('?')[1];
                if ((main.num !== action.num) || (action.num === 1)) {
                    fetch(urlApi).then(res => res.json())
                        .then(result => {
                            if (!result.message) {
                                if ((result.total_count > 0)) {
                                    console.log(result)
                                    main.card = []
                                    main.totalCount = result.total_count
                                    main.num = action.num
                                    for (let i = 0; i < result.items.length; i++) {
                                        const add = {
                                            id: i,
                                            name: result.items[i].name,
                                            url: result.items[i].html_url,
                                            stars: result.items[i].stargazers_count,
                                            date: result.items[i].updated_at,
                                            owner: result.items[i].owner.login
                                        }
                                        main.card.push(add)
                                    }
                                    if (result.total_count <= 100) {
                                        const count = Math.ceil(result.total_count / 10)
                                        main.list = []
                                        for (let i = 1; i <= count; i++) {
                                            const add = {
                                                id: i
                                            }
                                            main.list.push(add)
                                        }
                                    } else {
                                        main.list = []
                                        for (let i = 1; i <= 10; i++) {
                                            const add = {
                                                id: i
                                            }
                                            main.list.push(add)
                                        }
                                    }
                                    this._render(this._state)
                                } else {
                                    fetch(`https://api.github.com/search/repositories?q=+language:&sort=stars&order=desc&page=1&per_page=10`).then(res => res.json())
                                        .then(result => {
                                            main.card = []
                                            main.totalCount = 10
                                            main.num = 0
                                            for (let i = 0; i < 10; i++) {
                                                const add = {
                                                    id: i,
                                                    name: result.items[i].name,
                                                    url: result.items[i].html_url,
                                                    stars: result.items[i].stargazers_count,
                                                    date: result.items[i].updated_at,
                                                    owner: result.items[i].owner.login
                                                }
                                                main.card.push(add)
                                            }
                                            main.list = []
                                            const add = {
                                                id: 1
                                            }
                                            main.list.push(add)
                                            this._render(this._state)
                                        })
                                }
                            } else {
                                alert('504 Gateway Timeout')
                                main.url = 'search?q=+language:&sort=stars&order=desc&page=1&per_page=10'
                                main.totalCount = 0
                                main.num = 0
                                main.list = []
                                this._render(this._state)
                            }
                        })
                }
                break
            case 'GET-REP':
                const repApi = `https://api.github.com/repos/${action.owner}/${action.name}`
                const page = this._state.page
                fetch(repApi).then(res => res.json())
                    .then(result => {
                        console.log(result)
                        page.name = result.name
                        page.stars = result.stargazers_count
                        page.date = result.updated_at
                        page.avatar = result.owner.avatar_url
                        page.nickname = result.owner.login
                        page.userUrl = result.owner.url
                        page.languages = result.language
                        page.description = result.description
                        page.lastGetUrl = `/repos/${action.owner}/${action.name}`
                        console.log(page.lastGetUrl)
                        this._render(this._state)
                    })
                break
            default:
                console.log('503 Service Unavailable')
        }
    },

    subscriber(observer) {
        this._render = observer
    }
}

export const GetActionCreater = (valRep, num) => ({ type: GET_METHOD, valRep: valRep, num: num })
export const GetRepActionCreater = (name, owner) => ({ type: GET_REP, name: name, owner: owner })

export default store
window.store = store