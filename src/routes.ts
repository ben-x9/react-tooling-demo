export type Route = Home | Play | NotFound

export enum RouteType {
  Home = "Home",
  Play = "Play",
  NotFound = "NotFound"
}

export interface Home {
  type: RouteType.Home
}
export const home: Home = {type: RouteType.Home}

export interface Play {
  type: RouteType.Play
}
export const play: Play = {type: RouteType.Play}

export interface NotFound {
  type: RouteType.NotFound
}
export const notFound: NotFound = {type: RouteType.NotFound}

export const toUri = (route: Route) => {
  switch (route.type) {
    case RouteType.Home:
      return ""
    case RouteType.Play:
      return "play"
    case RouteType.NotFound:
      return "not-found"
  }
}

export const fromUri = (uri: string): Route => {
  if (uri === "") {
    return home
  } else if (uri === "play") {
    return play
  } else {
    return notFound
  }
}
