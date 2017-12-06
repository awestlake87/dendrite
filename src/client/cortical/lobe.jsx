import joint from "jointjs"

export function createLobe(
  {
    name,

    req_inputs,
    opt_inputs,
    var_inputs,

    outputs,

    pos,
    dim,
  } = { }
) {
  name = name || "Lobe"
  req_inputs = req_inputs || [ ]
  opt_inputs = opt_inputs || [ ]
  var_inputs = var_inputs || [ ]

  outputs = outputs || [ ]

  pos = pos || { x: 50, y: 50 }
  dim = dim || { w: 90, h: 90 }

  return new joint.shapes.devs.Model({
    position: { x: pos.x, y: pos.y },
    size: { width: dim.w, height: dim.h },
    inPorts: req_inputs.concat(opt_inputs).concat(var_inputs),
    outPorts: outputs,
    ports: {
      groups: {
        "in": {
          attrs: {
            ".port-body": {
              fill: "#16A085"
            }
          }
        },
        "out": {
          attrs: {
            ".port-body": {
              fill: "#E74C3C"
            }
          }
        }
      }
    },
    attrs: {
      ".label": {
        text: name,
        "ref-x": .5,
        "ref-y": .4
      }
    }
  })
}
