import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/search';
class App extends React.Component {
  name = "veeresh";
  state = {
    users: [],
    loading: true
  }

  async componentDidMount() {
    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/users?clien_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_scrent=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ users: res.data, loading: false })
  }

  searchUsers = async (text) => {
    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&clien_id=
  ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_scrent=
  ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ users: res.data.items, loading: false })
  }
  render() {
    return (
      <div className="App">
        <Navbar title="GitHub Finder" icon="fab fa-github" />
        <Search searchUsers={this.searchUsers} />
        <div className="container">
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
