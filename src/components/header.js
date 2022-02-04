import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import moon from '../images/moon.png'

const Header = ({ siteTitle, onUpdateTheme, theme }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
        display: `flex`,
        justifyContent: `space-between`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <button onClick={onUpdateTheme} className="theme-switcher">
        <img src={moon} alt="Theme" />
        <span className="desktop-only">
          {theme === 'dark' && 'Dark'}
          {theme === 'light' && 'Light'}
          {theme === 'sepia' && 'Sepia'}
        </span>
      </button>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
