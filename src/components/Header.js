import React, { Component, /*PropTypes*/ } from 'react'

export default class Header extends Component {
  // static propTypes = {
  //
  // }
  //
  // static defaultProps = {
  //
  // }

  render () {
    return (
      <header className="header">
        <h1 className="header__title">Title</h1>
        <span className="header__logo">Logo</span>
      </header>
    )
  }
}