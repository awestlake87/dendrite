import styles from "./app.css"

import React, { Component } from "react"
import { render } from "react-dom"

import { DragDropContext } from "react-dnd"
import HTML5Backend from "react-dnd-html5-backend"

import { GraphView, LobePalette } from "./cortical"
import { EditorView } from "./views"

let model = {
  type: "split",
  split: "vertical",
  size: 200,
  pane1: {
    type: "widget",
    widget: <LobePalette />
  },
  pane2: {
    type: "split",
    split: "horizontal",
    size: 400,
    pane1: {
      type: "widget",
      widget: <GraphView className="cortical-graph" />
    },
    pane2: {
      type: "widget",
      widget: <div />
    }
  }
}

@DragDropContext(HTML5Backend)
class App extends Component {
  render() {
    return <EditorView model={model} />
  }
}

render(<App />, document.getElementById("app"))
