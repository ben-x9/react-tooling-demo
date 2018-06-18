import {React} from "react-tooling"

export interface State {
  id: number
  english: string
  japanese: string
}

export const State = (id = 0, english = "", japanese = "") => ({
  id,
  english,
  japanese
})

import "card.scss"

export const HomeView = (state: State) => (
  <div className="card">
    <div>{state.english}</div>
    <div>{state.japanese}</div>
  </div>
)

export const PlayView = ({show, ...state}: State & {show: boolean}) => (
  <div className="card">
    <div className="english">{state.english}</div>
    {show ? <div className="japanese">{state.japanese}</div> : null}
  </div>
)
