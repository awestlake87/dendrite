import React, { Component, PropTypes } from "react"

import autoBind from "autobind-decorator"

import { Graph } from "./graph"

export class Editor extends Component {
  state = {
    editor: undefined,
    graph: undefined,

    scale: 1,
  }

  @autoBind
  _onRef(editor) {
    if (editor && editor !== this.state.editor) {
      this.setState({ editor })
    }
  }

  @autoBind
  _onGraphRef(graph) {
    if (graph && graph != this.state.graph) {
      this.setState({ graph })
    }
  }

  @autoBind
  _zoomIn() {
    let scale = this.state.scale + .1

    this.state.graph.scale(scale, scale)
    this.setState({ scale })
  }

  @autoBind
  _zoomOut() {
    let scale = this.state.scale - .1

    this.state.graph.scale(scale, scale)
    this.setState({ scale })
  }

  render() {
    return (
      <div ref={this._onRef} className="cortical-editor">
        <div className="cortical-palette">
          <button onClick={this._zoomIn}> + </button>
          <button onClick={this._zoomOut}> - </button>
        </div>
        <Graph ref={this._onGraphRef} className="cortical-graph" />
      </div>
    )
  }
}
