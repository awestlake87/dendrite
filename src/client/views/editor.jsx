import React, { Component } from "react"

import SplitPane from "react-split-pane"

export class EditorView extends Component {
  render() {
    let { model } = this.props

    switch (model.type) {
      case "split":
        return (
          <SplitPane
            className="debug"
            paneClassName="editor-pane"
            split={model.split}
            defaultSize={model.size}
            minSize={100}
            maxSize={-100}
          >
            <EditorView model={model.pane1} />
            <EditorView model={model.pane2} />
          </SplitPane>
        )
      case "widget":
        return model.widget
    }
  }
}
