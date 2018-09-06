import {React, Dispatcher} from "react-tooling"
import {List} from "functools-ts"
import * as Card from "Card"

export interface State {
  index: number
  show: boolean
}
export const State: State = {
  index: 0,
  show: false
}

const next = (cards: List<Card.State>) => (state: State): State => ({
  show: false,
  index: state.index === cards.length - 1 ? 0 : state.index + 1
})

const show = (state: State): State => ({
  ...state,
  show: true
})

import "play.scss"

type Props = {cards: List<Card.State>} & State

export const View = ({
  dispatch,
  cards,
  ...state
}: Props & Dispatcher<State>) => (
  <div className="play-view">
    <Card.PlayView {...cards[state.index]} show={state.show} />
    <div className="buttons">
      <button onClick={() => dispatch(show)}>Show</button>
      <button onClick={() => dispatch(next(cards))}>Next</button>
    </div>
  </div>
)
