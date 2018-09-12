import * as Root from "Root"
import {load} from "react-tooling"
import {toUri, fromUri, Route} from "routes"
import * as fastclick from "fastclick"
import {DispatchUpdate} from "react-tooling/dist/dispatcher"

load(
  Root.State,
  Root.View,
  toUri,
  fromUri,
  module,
  {
    onInit: (state: Root.State, _: DispatchUpdate<Root.State>) => {
      console.log(state.home)
      console.log("App init")
    },
    onRouteChanged: (route: Route, _: DispatchUpdate<Root.State>) => {
      console.log(route)
    }
  },
  {
    onLoad: () => {
      (fastclick as any).attach(document.body)
    }
  }
)
