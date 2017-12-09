import React, { Component } from "react"
import PropTypes from "prop-types"

import { DropTarget } from "react-dnd"

import autoBind from "autobind-decorator"
import joint from "jointjs"

import { DragTypes, Events } from "../core"
import { createLobe } from "./lobe"

export class Graph extends Component {
  state = {
    element: undefined,
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
  _onRef(elem) {
    if (elem && elem !== this.state.element) {
      this.setState({ element: elem })
    }
  }

  componentWillUpdate(next_props, next_state) {
    if (!this.state._graph) {
      if (next_state.element) {
        this._createGraph(next_state.element)
      }
    }
  }

  _createGraph(element) {
    this._graph = new joint.dia.Graph
    this._paper = new joint.dia.Paper({
      el: element,
      width: "100%",
      height: "100%",
      model: this._graph,
      gridSize: 10,
      drawGrid: "fixedDot",
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

    let budgeter = createLobe({
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

  scale(sx, sy) {
    this._paper.scale(sx, sy)
  }

  addCell(cell) {
    this._graph.addCell(cell)
  }

  render() {
    return (
      <div ref={this._onRef} className={this.props.className} />
    )
  }
}

@DropTarget(
  DragTypes.LOBE_PALETTE_LOBE,
  {
    canDrop(props) {
      return true
    },
    drop(props) {
      Events.addLobe()
    }
  },
 (connect, monitor) => ({
   connectDropTarget: connect.dropTarget(),
   isOver: monitor.isOver(),
   canDrop: monitor.canDrop(),
   dropResult: monitor.getClientOffset(),
 })
)
export class GraphView extends Component {
  _subs = { }
  state = {
    graph: undefined
  }

  @autoBind
  _onGraphRef(graph) {
    if (graph && graph !== this.state.graph) {
      this.setState({ graph })
    }
  }

  @autoBind
  _addLobe() {
    this.state.graph.addCell(
      createLobe({
        name: "Budgeter",
        req_inputs: [ "FrameData" ],
        outputs: [ "Budget", "ResourceClusters" ],
        pos: { x: 50, y: 50 },
        dim: { w: 150, h: 150 },
      })
    )
  }

  componentWillMount() {
    this._subs = {
      addLobe: Events.addLobe.subscribe(this._addLobe)
    }
  }

  componentWillUnmount() {
    for (var i in this._subs) {
      this._subs[i].unsubscribe()
    }
  }

  render() {
    let { connectDropTarget, isOver, canDrop, className } = this.props

    return connectDropTarget(
      <div className="fill">
        <Graph ref={this._onGraphRef} className={className} />
      </div>
    )
  }
}
