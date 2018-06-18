import * as Root from "Root"
import {load} from "react-tooling"
import {Route, toUri, fromUri} from "routes"
import * as fastclick from "fastclick"

load<Root.State, Root.Action, Route, {}>(
  Root.State,
  Root.reactsTo,
  Root.update,
  Root.View,
  toUri,
  fromUri,
  module,
  {
    onLoad: () => {
      (fastclick as any).attach(document.body)
    }
  }
)
