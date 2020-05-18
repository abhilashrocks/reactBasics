import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import { CLEAR_USERS, GET_REPOS, GET_USER, SEARCH_USERS, SET_LOADING } from '../types';

let gitHubClientId;
let gitHubClientSecret;

if (process.env.NODE_ENV !== 'Production') {
    gitHubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    gitHubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
    gitHubClientId = process.env.GITHUB_CLIENT_ID;
    gitHubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}
const GithubState = props => {

    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }
    const [state, dispatch] = useReducer(GithubReducer, initialState)

    const setLoading = () => dispatch({ type: SET_LOADING });

    const searchUsers = async (text) => {
        setLoading();
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&clien_id=
      ${gitHubClientId}&client_secret=${gitHubClientSecret}`);
        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        })
    }

    const getUser = async (userName) => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${userName}?clien_id=
      ${gitHubClientId}&client_secret=${gitHubClientSecret}`);
        dispatch({
            type: GET_USER,
            payload: res.data
        })
    }

    const getUserRepos = async (userName) => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&clien_id=
      ${gitHubClientId}&client_secret=${gitHubClientSecret}`);
        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    }

    const clearUsers = () => dispatch({ type: CLEAR_USERS });

    return <GithubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos
        }}
    >
        {props.children}
    </GithubContext.Provider>
}
export default GithubState;