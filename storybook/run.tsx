import {
  load,
  isActionOf,
  AnyAction,
  List,
  Dispatch,
  Dispatcher,
  React
} from "react-tooling"
import * as fastclick from "fastclick"

import * as Routes from "./routes"

import "stories/index"
import {stories, AnyStory, begin} from "./index"

import "normalize.css"
import "./run.scss"

interface State {
  selectedStory: string
  selectedChapter: string
  stories: List<AnyStory>
  route: Routes.Route
}

const State = {
  selectedStory: "play",
  selectedChapter: "",
  stories,
  route: Routes.home
}

const selectedStory = (state: State) =>
  state.stories.find(story => story.name === state.selectedStory)!

const selectedChapter = (state: State) =>
  selectedStory(state).chapters.find(
    chapter => chapter.name === state.selectedChapter
  )!

export enum ActionType {
  SelectStory = "SelectStory",
  SelectChapter = "SelectChapter",
  ComponentAction = "ComponentAction"
}

export interface SelectStory {
  type: ActionType.SelectStory
  name: string
}
export const SelectStory = (name: string) => ({
  type: ActionType.SelectStory,
  name
})

export interface SelectChapter {
  type: ActionType.SelectChapter
  name: string
}
export const SelectChapter = (name: string) => ({
  type: ActionType.SelectChapter,
  name
})

export interface ComponentAction {
  type: ActionType.ComponentAction
  action: AnyAction
}
export const ComponentAction = (action: AnyAction) => ({
  type: ActionType.ComponentAction,
  action
})

export type Action = SelectStory | SelectChapter | ComponentAction

export const reactsTo = isActionOf<Action>(
  ActionType.SelectStory,
  ActionType.SelectChapter,
  ActionType.ComponentAction
)

const update = (state: State, action: Action, dispatch: Dispatch): State => {
  switch (action.type) {
    case ActionType.SelectStory:
      return {
        ...state,
        selectedStory: action.name,
        selectedChapter: state.stories.find(
          story => story.name === action.name
        )!.chapters[0].name
      }
    case ActionType.SelectChapter:
      return {...state, selectedChapter: action.name}
    case ActionType.ComponentAction:
      return {
        ...state,
        stories: List.set(
          state.stories,
          {name: state.selectedStory},
          story => ({
            ...story,
            chapters: List.set(
              story.chapters,
              {name: state.selectedChapter},
              chapter => ({
                ...chapter,
                state: story.update(chapter.state, action.action, dispatch)
              })
            )
          })
        )
      }
  }
}

const View = (state: State & Dispatcher) => (
  <div className="run">
    {state.stories.map(story => (
      <div key={story.name} className="story">
        <div
          className={`name${
            story.name === state.selectedStory ? " selected" : ""
          }`}
          onClick={() => state.dispatch(SelectStory(story.name))}
        >
          {story.name}
        </div>
        {story.name === state.selectedStory &&
          story.chapters.map(chapter => (
            <div key={chapter.name} className="chapter">
              {story.chapters.length > 1 ? (
                <div
                  className={`name${
                    chapter.name === state.selectedChapter ? " selected" : ""
                  }`}
                  onClick={() => state.dispatch(SelectChapter(chapter.name))}
                >
                  {chapter.name || "-"}
                </div>
              ) : null}
              {chapter.name === state.selectedChapter ? (
                <div className="component">
                  {selectedStory(state).view({
                    ...selectedChapter(state).state,
                    dispatch: (action: AnyAction) =>
                      state.dispatch(ComponentAction(action))
                  })}
                </div>
              ) : null}
            </div>
          ))}
      </div>
    ))}
  </div>
)

load<State, Action, any, {}>(
  State,
  reactsTo,
  update,
  View,
  Routes.toUri,
  Routes.fromUri,
  module,
  {
    onLoad: () => {
      (fastclick as any).attach(document.body)
    }
  }
)
