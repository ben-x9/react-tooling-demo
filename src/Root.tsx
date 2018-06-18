import {React, Dispatcher, isActionOf, GotoType, Goto} from "react-tooling"
import moize from "moize"
import {Route, RouteType, home, play} from "routes"
import * as initReactFastclick from "react-fastclick"
import "font-awesome-webpack"
import * as NotFound from "NotFound"
import * as Home from "Home"
import * as Play from "Play"
import * as Cards from "Cards"
import {shuffle} from "lodash"

initReactFastclick()

// STATE

export interface State {
  route: Route
  home: Home.State
  play: Play.State
  cards: Cards.State
}
export const State: State = {
  route: home,
  home: Home.State,
  play: Play.State,
  cards: Cards.State
}

// UPDATE

export type Action = Goto<Route> | Home.Action

export const reactsTo = isActionOf<Action>(
  GotoType,
  Home.reactsTo,
  Play.reactsTo
)

export const update = (state: State, action: Action): State => {
  switch (action.type) {
    case GotoType:
      if (action.route === play) {
        return {...state, cards: shuffle(state.cards)}
      }
      return state
    default:
      if (Home.reactsTo(action)) {
        const home = Home.update({...state.home, cards: state.cards}, action)
        return {...state, home, cards: home.cards}
      }
      if (Play.reactsTo(action)) {
        const play = Play.update({...state.play, cards: state.cards}, action)
        return {...state, play, cards: play.cards}
      }
      return state
  }
}

// VIEW

import "normalize.css"
import "./root.scss"

const Root = ({dispatch, ...state}: State & Dispatcher) => {
  switch (state.route.type) {
    case RouteType.NotFound:
      return <NotFound.View />
    case RouteType.Home:
      return (
        <Home.View {...state.home} cards={state.cards} dispatch={dispatch} />
      )
    case RouteType.Play:
      return (
        <Play.View {...state.play} cards={state.cards} dispatch={dispatch} />
      )
  }
}

export const View = moize.reactSimple(Root)
