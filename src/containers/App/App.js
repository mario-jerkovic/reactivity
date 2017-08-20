import React from 'react'
import Route from 'react-router-dom/Route'
import Helmet from 'react-helmet'
import universal from 'react-universal-component'
import Menu from 'components/Menu/Menu'
import Loading from 'components/Loading/Loading'
import Redirect from 'react-router-dom/Redirect'
import NotFound from '../NotFound'
import Hero from '../Hero/Hero'
import config from '../../config'
import style from './App.scss'

function cap(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

const UniversalComponent = universal(props => import(`../${props.page}/${props.page}`), {
  loading: Loading,
  error: NotFound
})

const App = () => (
  <div>
    <Helmet {...config.head} />
    <Hero />

    <Menu />
    <div className={style.container}>
      <Route path="/:page" render={({ match }) => <UniversalComponent page={cap(match.params.page)} />} />
      { /* <Route path="/shell" component={Loading} exact /> */ }
    </div>
    <Route path="/" render={() => <Redirect to="/home" />} />
  </div>
)

export default App
