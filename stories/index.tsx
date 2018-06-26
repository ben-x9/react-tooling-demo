import {story, begin} from "storybook"
import * as Card from "Card"
import * as Play from "Play"
import * as Home from "Home"
import "Root"

begin()

story("home card", Card.HomeView)
  .add("hello", {id: 1, english: "hello", japanese: "こんにちは"})
  .add("goodbye", {id: 2, english: "goodbye", japanese: "さようなら"})

story("play card", Card.PlayView)
  .add("hide", {id: 1, english: "hello", japanese: "こんにちは", show: false})
  .add("show", {id: 1, english: "hello", japanese: "こんにちは", show: true})

story("play", Play.View, Play.update).add("", {
  ...Play.State,
  cards: [
    {id: 1, english: "hello", japanese: "こんにちは"},
    {id: 2, english: "goodbye", japanese: "さようなら"},
    {id: 3, english: "goodnight", japanese: "おやすみ"}
  ]
})

story("home", Home.View, Home.update).add("", {
  ...Home.State,
  cards: [
    {id: 1, english: "hello", japanese: "こんにちは"},
    {id: 2, english: "goodbye", japanese: "さようなら"},
    {id: 3, english: "goodnight", japanese: "おやすみ"}
  ]
})
