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
      console.log("App init")
      return state
    },
    onRouteChanged: (route: Route, _: DispatchUpdate<Route>): Route => {
      console.log(route)
      return route
    }
  },
  {
    onLoad: () => {
      (fastclick as any).attach(document.body)
    }
  }
)
