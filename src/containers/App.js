import React, { /*PropTypes*/ } from 'react'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import Form from '../components/Form'
// import * as TodoActions from '../actions'

const App = (/*{}*/) => (
  <div>
    <Header />
    <Form />
  </div>
)

// App.propTypes = {}

// const mapStateToProps = state => ({})

// const mapDispatchToProps = dispatch => ({})

export default connect(
  // mapStateToProps,
  // mapDispatchToProps
)(App)