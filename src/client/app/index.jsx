import React, { Component } from "react"
import { render } from "react-dom"

import autoBind from "autobind-decorator"

import joint from "jointjs"

class App extends Component {
  state = {
    interactive: undefined,
    overview: undefined
  }

  @autoBind
  _onInteractiveRef(elem) {
    if (elem && elem !== this.state.interactive) {
      this.setState({ interactive: elem })
    }
  }

  @autoBind
  _onOverviewRef(elem) {
    if (elem && elem !== this.state.overview) {
      this.setState({ overview: elem })
    }
  }

  componentWillUpdate(next_props, next_state) {
    if (!this.state._graph) {
      if (next_state.interactive && next_state.overview) {
        this._createGraph(next_state.interactive, next_state.overview)
      }
    }
  }

  _createGraph(interactive, overview) {
    this._graph = new joint.dia.Graph
    this._interactive_paper = new joint.dia.Paper({
      el: interactive,
      width: "100%",
      height: 200,
      model: this._graph,
      gridSize: 1,
    })
    this._overview_paper = new joint.dia.Paper({
      el: overview,
      width: "100%",
      height: 200,
      model: this._graph,
      gridSize: 1,
    })
    this._overview_paper.scale(.5)

    let rect = new joint.shapes.basic.Rect({
      position: { x: 100, y: 30 },
      size: { width: 100, height: 30 },
      attrs: {
        rect: { fill: "blue" },
        text: { text: "my box", fill: "white" }
      },
    })

    let rect2 = rect.clone()
    rect2.translate(300)

    let link = new joint.dia.Link({
      source: { id: rect.id },
      target: { id: rect2.id }
    })

    this._graph.addCells([ rect, rect2, link ])
  }

  render() {
    return (
      <div>
        <div
          ref={this._onInteractiveRef}
          style={{ border: "1px solid black" }}
        />
        <div
          ref={this._onOverviewRef}
          style={{
            border: "1px solid black",
            pointerEvents: "none"
          }}
        />
      </div>
    )
  }
}

render(<App />, document.getElementById("app"))
