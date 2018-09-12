import {
  Dispatcher,
  React,
  DispatchUpdate,
  createDispatch,
  SetRoute
} from "react-tooling"
import * as Card from "Card"
import * as Cards from "Cards"

export interface State {
  showInput: boolean
  cards: Cards.State
}
export const State: State = {
  showInput: false,
  cards: Cards.State
}

import "./home.scss"
import {play, Route} from "routes"
import {Lens} from "monocle-ts"

const showInput = (state: State): State => ({
  ...state,
  showInput: true
})

const inputDispatch = (
  dispatch: DispatchUpdate<State>
): DispatchUpdate<Cards.State> =>
  createDispatch(dispatch, Lens.fromProp<State, "cards">("cards"))

export type HomeDispatcher = {
  setRoute: DispatchUpdate<Route>
} & Dispatcher<State>

export const View = ({
  dispatch,
  setRoute,
  ...state
}: State & Dispatcher<State> & SetRoute<Route>) => (
  <div className="home-view">
    <div className="buttons">
      <button className="add" onClick={() => dispatch(showInput)}>
        Add
      </button>
      <button className="play" onClick={() => setRoute(play)}>
        Play
      </button>
    </div>
    <div className="cards">
      {state.showInput ? (
        <InputView dispatch={inputDispatch(dispatch)} />
      ) : null}
      {state.cards.map(card => <Card.HomeView {...card} key={card.id} />)}
    </div>
  </div>
)

const getValues = (button: HTMLButtonElement) => {
  const parent = button.parentElement!
  const inputs = parent.getElementsByTagName("input")!
  const english = inputs[0].value
  const japanese = inputs[1].value
  return {english, japanese}
}

export const InputView = ({dispatch}: Dispatcher<Cards.State>) => (
  <div className="card list-item input">
    <input type="text" placeholder="英語" />
    <input type="text" placeholder="日本語" />
    <button
      onClick={e =>
        dispatch(Cards.add(getValues(e.target as HTMLButtonElement)))
      }
    >
      OK
    </button>
  </div>
)
