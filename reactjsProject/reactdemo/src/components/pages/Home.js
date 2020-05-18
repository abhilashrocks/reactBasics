import React, { Fragment } from 'react';
import Users from '../users/Users';
import Search from '../users/search';

export const Home = () => {
    return (
        <Fragment>
            <Search />
            <Users />
        </Fragment>
    )
}
export default Home
