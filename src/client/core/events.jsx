import CustomEvent from "custom-event"

function createEvent(name) {
  let dispatch = (detail) => window.dispatchEvent(
    new CustomEvent(name, { detail })
  )

  dispatch.subscribe = (listener) => {
    let hdl = ({ detail }) => listener(detail)

    hdl.unsubscribe = () => {
      window.removeEventListener(name, this)
    }

    window.addEventListener(name, hdl)

    return hdl
  }

  return dispatch
}

export const addLobe = createEvent("addLobe")
