import React from 'react'
import { link } from 'react-router-dom'

export const Navitems = [
  {
    title: 'Search',
    url: '#',
    cName: 'nav-links'
  },
  {
    title: 'Log In',
    url: '#',
    cName: 'nav-links'
  },
  {
    title: 'Sign In',
    url: <link to="/register"></link>,
    cName: 'nav-links'
  },
  {
    title: 'Cart',
    url: '#',
    cName: 'nav-links'
  },
]