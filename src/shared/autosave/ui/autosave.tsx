import diff from 'object-diff'
import React from 'react'
import { FormSpy } from 'react-final-form'

class AutoSave extends React.Component<any> {
  // @ts-expect-error becase
  constructor(props) {
    super(props)
    this.state = { values: props.values, submitting: false } as any
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps() {
    // @ts-expect-error becase
    if (this?.timeout) {
      // @ts-expect-error becase
      clearTimeout(this?.timeout)
    }
    // @ts-expect-error becase
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.timeout = setTimeout(() => this.save(), this.props.debounce)
  }

  save = async () => {
    // @ts-expect-error becase
    if (this.promise) {
      // @ts-expect-error becase
      await this.promise
    }
    const { values, save } = this.props

    // This diff step is totally optional
    // @ts-expect-error becase
    const difference = diff(this.state.values, values)
    if (Object.keys(difference).length) {
      // values have changed
      this.setState({ submitting: true, values })

      // @ts-expect-error becase
      this.promise = save(values)
      // @ts-expect-error becase
      await this.promise
      // @ts-expect-error becase
      delete this.promise
      this.setState({ submitting: false })
    }
  }

  render() {
    // This component doesn't have to render anything, but it can render
    // submitting state.
    // @ts-expect-error becase
    return this.state.submitting && <div className="submitting">Submitting...</div>
  }
}

// Make a HOC
// This is not the only way to accomplish auto-save, but it does let us:
// - Use built-in React lifecycle methods to listen for changes
// - Maintain state of when we are submitting
// - Render a message when submitting
// - Pass in debounce and save props nicely
// eslint-disable-next-line react/display-name
export default (props: any) => {
  return <FormSpy {...props} subscription={{ values: true }} component={AutoSave} />
}
