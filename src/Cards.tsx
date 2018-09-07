import * as Card from "Card"
import {Omit} from "react-tooling"
import {last, sortBy} from "lodash"
import {List} from "functools-ts"

export type State = List<Card.State>
export const State = [
  Card.State(1, "hello", "こんにちは"),
  Card.State(2, "affadavit", "供述書"),
  Card.State(3, "security camera", "防犯カメラ"),
  Card.State(4, "judgement", "鑑識"),
  Card.State(5, "search", "捜査"),
  Card.State(6, "prosecute", "起訴"),
  Card.State(7, "inspection", "検問"),
  Card.State(8, "suprise attack", "不意打ち"),
  Card.State(9, "detective", "刑事"),
  Card.State(10, "urine test", "尿検査")
]

type NewCard = Omit<Card.State, "id">

export const add = (card: NewCard) => (state: State): State => [
  {...card, id: last(sortBy(state, "id"))!.id + 1},
  ...state
]
