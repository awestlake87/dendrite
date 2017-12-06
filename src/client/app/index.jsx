import styles from "./app.css"

import React, { Component } from "react"
import { render } from "react-dom"

import autoBind from "autobind-decorator"

import joint from "jointjs"

import { createLobe } from "./lobe"

class Paper extends Component {
  state = {
    interactive: undefined,
  }

  shouldComponentUpdate(next_props, next_state) {
    // component updates can jar the diagram a bit, so it's best not to update
    // unless something major happens, such as a callback change
    if (this.props.onLinkChange !== next_props.onLinkChange) {
      return true
    }
    else {
      // if we already have a graph and nothing else changed, don't update
      return !this._graph
    }
  }

  @autoBind
  _onInteractiveRef(elem) {
    if (elem && elem !== this.state.interactive) {
      this.setState({ interactive: elem })
    }
  }

  componentWillUpdate(next_props, next_state) {
    if (!this.state._graph) {
      if (next_state.interactive) {
        this._createGraph(next_state.interactive)
      }
    }
  }

  _createGraph(interactive) {
    this._graph = new joint.dia.Graph
    this._interactive_paper = new joint.dia.Paper({
      el: interactive,
      width: "100%",
      height: "100%",
      model: this._graph,
      gridSize: 1,
      validateConnection: this._validateConnection,
      snapLinks: { radius: 50 },
      markAvailable: true,
      defaultLink: new joint.dia.Link({
        smooth: true,
        attrs: {
          ".connection": { stroke: "grey" }
        }
      })
    })

    let budgeter = new createLobe({
      name: "Budgeter",
      req_inputs: [ "FrameData" ],
      outputs: [ "Budget", "ResourceClusters" ],
      pos: { x: 150, y: 50 },
      dim: { w: 150, h: 150 },
    })

    let base_locator = createLobe({
      name: "Base Locator",
      req_inputs: [ "ResourceClusters" ],
      outputs: [ "PotentialBaseLocations" ],
      pos: { x: 550, y: 50 },
      dim: { w: 150, h: 150 },
    })

    this._graph.addCells([ budgeter, base_locator ])
  }

  @autoBind
  _validateConnection(cell_src, magnet_src, cell_tgt, magnet_tgt, end, view) {
    // prevent linking from input ports
    if (magnet_src && magnet_src.getAttribute("port-group") === "in") {
      return false
    }

    // prevent linking to itself
    if (cell_src === cell_tgt) {
      return false
    }

    // prevent linking to output ports
    if (magnet_tgt && magnet_tgt.getAttribute("port-group") === "out") {
      return false
    }

    return true
  }

  render() {
    return (
      <div
        ref={this._onInteractiveRef}
        style={{
          border: "1px solid black",
          width: "100%",
          height: "100%",
        }}
      />
    )
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Paper />
      </div>
    )
  }
}

render(<App />, document.getElementById("app"))
