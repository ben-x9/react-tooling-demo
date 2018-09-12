import {React, createDispatch, RootDispatcher} from "react-tooling"
import moize from "moize"
import {Route, RouteType, home} from "routes"
import * as initReactFastclick from "react-fastclick"
import "font-awesome-webpack"
import * as NotFound from "NotFound"
import * as Home from "Home"
import * as Play from "Play"
import * as Cards from "Cards"
import {Lens} from "monocle-ts"

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
// VIEW

import "normalize.css"
import "./root.scss"

const homeLens = Lens.fromProp<State, "home">("home")
const playLens = Lens.fromProp<State, "play">("play")

const Root = ({
  dispatch,
  setRoute,
  ...state
}: State & RootDispatcher<State, Route>): JSX.Element => {
  switch (state.route.type) {
    case RouteType.NotFound:
      return <NotFound.View />
    case RouteType.Home:
      return (
        <Home.View
          {...state.home}
          cards={state.cards}
          dispatch={createDispatch(dispatch, homeLens)}
          setRoute={setRoute}
        />
      )
    case RouteType.Play:
      return (
        <Play.View
          {...state.play}
          cards={state.cards}
          dispatch={createDispatch(dispatch, playLens)}
        />
      )
  }
}

export const View = moize.reactSimple(Root)
