import React from 'react'
import PropTypes from 'prop-types'

const Navbar = ({ icon, title }) => {
    return (
        <div>
            <nav className="navbar bg-primary">
                <h1>
                    <i className={icon}></i>
                    {title}</h1>
            </nav>
        </div>
    )
}

Navbar.defaultProps = {
    title: "default",
    icon: "fab fa-github"
};
Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
}
export default Navbar
