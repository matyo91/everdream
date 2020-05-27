import React from 'react'
import { Home, Blog } from '../views'
import { withPage } from '../helpers'

export default ({ location }) => {
  const HomePage = withPage(Blog, 'home', {
    location: location,
    title: 'Mateafox',
    description: 'Unified Workflow Automation Tool',
  })

  return <HomePage />
}
