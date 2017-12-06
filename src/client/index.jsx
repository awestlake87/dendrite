import styles from "./app.css"

import React, { Component } from "react"
import { render } from "react-dom"

import { Editor } from "./cortical"

class App extends Component {
  render() {
    return <Editor />
  }
}

render(<App />, document.getElementById("app"))
