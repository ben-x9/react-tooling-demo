import {React, Dispatcher, List, isActionOf} from "react-tooling"
import * as Card from "Card"

export interface State {
  index: number
  cards: List<Card.State>
  show: boolean
}
export const State: State = {
  index: 0,
  cards: [],
  show: false
}

export enum ActionType {
  Next = "Next",
  Show = "Show"
}

export interface Next {
  type: ActionType.Next
}
export const Next = {
  type: ActionType.Next
}

export interface Show {
  type: ActionType.Show
}
export const Show = {
  type: ActionType.Show
}

export type Action = Next | Show

export const reactsTo = isActionOf<Action>(ActionType.Next, ActionType.Show)

export const update = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.Next:
      return {
        ...state,
        show: false,
        index: state.index === state.cards.length - 1 ? 0 : state.index + 1
      }
    case ActionType.Show:
      return {...state, show: true}
  }
}

import "play.scss"

export const View = ({dispatch, ...state}: State & Dispatcher) => (
  <div className="play-view">
    <Card.PlayView {...state.cards[state.index]} show={state.show} />
    <div className="buttons">
      <button onClick={() => dispatch(Show)}>Show</button>
      <button onClick={() => dispatch(Next)}>Next</button>
    </div>
  </div>
)
