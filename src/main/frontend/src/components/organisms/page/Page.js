// @flow
import * as React from 'react'

type Props = {
  title: string,
  children?: React.Node
}

export default class Page extends React.Component<Props> {
  render() {
    return <div className="ui-g ui-fluid">
      <div className="ui-g-12">
        <div className="card card-w-title">
          <h1>{this.props.title}</h1>
          {this.props.children}
        </div>
      </div>
    </div>
  }
}
