/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useState, useEffect } from 'react'
import { useLocation } from '@reach/router'
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"

import '../style.css'
import '../new-moon.css'
import '../light-theme.css'
import '../sepia-theme.css'

function setDarkTheme(setTheme) {
  localStorage.setItem('theme', 'dark')
  setTheme('dark')
  document.body.style.backgroundColor = '#252525'
}

function setLightTheme(setTheme) {
  localStorage.setItem('theme', 'light')
  setTheme('light')
  document.body.style.backgroundColor = 'white'
}

function setSepiaTheme(setTheme) {
  localStorage.setItem('theme', 'sepia')
  setTheme('sepia')
  document.body.style.backgroundColor = '#f1e2c0'
}

function getMainClass(theme, collapsed) {
  let classString = theme

  if (collapsed) {
    classString += ' collapsed'
  }

  return classString
}

const Layout = ({ children }) => {
  const location = useLocation()
  const [theme, setTheme] = useState('dark')
  const [collapsed, setCollapsed] = useState(true)
  const slug = location.pathname

  const onUpdateTheme = (theme) => {
    if (theme === 'dark') {
      setSepiaTheme(setTheme)
    } else if (theme === 'light') {
      setDarkTheme(setTheme)
    } else if (theme === 'sepia') {
      setLightTheme(setTheme)
    }
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')

    if (savedTheme === 'dark') setDarkTheme(setTheme)
    if (savedTheme === 'sepia') setSepiaTheme(setTheme)
    if (savedTheme === 'light') setLightTheme(setTheme)
  }, [])

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div>
      <div className={getMainClass(theme, collapsed, slug)}>
        <Header
          setCollapsed={setCollapsed}
          onUpdateTheme={() => onUpdateTheme(theme)}
          theme={theme}
          siteTitle={data.site.siteMetadata?.title || `Title`} />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0 1.0875rem 1.45rem`,
          }}
        >
          <main>{children}</main>
          <footer
            style={{
              marginTop: `2rem`,
            }}
          >
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.com">Gatsby</a>
          </footer>
        </div>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
