export type Route = Home | NotFound

export enum RouteType {
  Home = "Home",
  NotFound = "NotFound"
}

export interface Home {
  type: RouteType.Home
}
export const home: Home = {type: RouteType.Home}

export interface NotFound {
  type: RouteType.NotFound
}
export const notFound: NotFound = {type: RouteType.NotFound}

export const toUri = (route: Route) => {
  switch (route.type) {
    case RouteType.Home:
      return ""
    case RouteType.NotFound:
      return "not-found"
  }
}

export const fromUri = (uri: string): Route => {
  if (uri === "") {
    return home
  } else {
    return notFound
  }
}
