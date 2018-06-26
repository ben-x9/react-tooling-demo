import {View, Update, Omit, List, JSXElement} from "react-tooling"

export interface Story<State> {
  name: string
  view: (state: State) => JSXElement
  update: Update<State, any, any>
  chapters: List<Chapter<State>>
}

export type AnyStory = Story<{}>

interface Chapter<State> {
  name: string
  state: Omit<State, "dispatch">
}

export const stories: Story<{}>[] = []

export const story = <State>(
  name: string,
  view: View<State>,
  update?: Update<State, any, any>
) => {
  let story = stories.find(story => name === story.name)!
  if (!story) {
    story = {
      name,
      view,
      update,
      chapters: []
    } as Story<State>
    stories.push(story)
  }
  function add(name: string, state: Omit<State, "dispatch">) {
    (story.chapters as Chapter<State>[]).push({name, state})
    return {add}
  }
  return {add}
}
