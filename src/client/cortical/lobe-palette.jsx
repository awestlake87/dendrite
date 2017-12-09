import React, { Component } from "react"
import PropTypes from "prop-types"

import { DragSource } from "react-dnd"

import { DragTypes } from "../core"

@DragSource(
  DragTypes.LOBE_PALETTE_LOBE,
  {
    beginDrag: () => ({ })
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })
)
class Lobe extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
  }
  render() {
    let { connectDragSource, isDragging } = this.props

    return connectDragSource(
      <div className="cortical-lobe-icon">
        <span>Lobe</span>
      </div>
    )
  }
}

export class LobePalette extends Component {
  _renderLobes() {
    return [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ].map(
      (n) => <Lobe key={n} />
    )
  }

  render() {
    return (
      <div className="cortical-lobe-palette">
        <span className="cortical-lobe-palette-label">Lobe Palette</span>

        <div className="cortical-lobe-box">
          {this._renderLobes()}
          <div className="cortical-lobe-icon-pad" />
        </div>
      </div>
    )
  }
}
