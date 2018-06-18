import {Dispatcher, React, isActionOf, Goto} from "react-tooling"
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

export enum ActionType {
  ShowInput = "ShowInput"
}

export interface ShowInput {
  type: ActionType.ShowInput
}
export const ShowInput = {
  type: ActionType.ShowInput
}

export type Action = ShowInput | Cards.Add

export const reactsTo = isActionOf<Action>(
  ActionType.ShowInput,
  Cards.ActionType.Add
)

export const update = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.ShowInput:
      return {...state, showInput: true}
    case Cards.ActionType.Add:
      return {
        ...state,
        showInput: false,
        cards: Cards.update(state.cards, action)
      }
  }
}

import "./home.scss"
import {play} from "routes"

export const View = ({dispatch, ...state}: State & Dispatcher) => (
  <div className="home-view">
    <div className="buttons">
      <button className="add" onClick={() => dispatch(ShowInput)}>
        Add
      </button>
      <button className="play" onClick={() => dispatch(Goto(play))}>
        Play
      </button>
    </div>
    <div className="cards">
      {state.showInput ? <InputView dispatch={dispatch} /> : null}
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

export const InputView = ({dispatch}: Dispatcher) => (
  <div className="card list-item input">
    <input type="text" placeholder="英語" />
    <input type="text" placeholder="日本語" />
    <button
      onClick={e =>
        dispatch(Cards.Add(getValues(e.target as HTMLButtonElement)))
      }
    >
      OK
    </button>
  </div>
)
