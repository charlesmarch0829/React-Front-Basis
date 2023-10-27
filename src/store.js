import axios from 'axios';
import { observable, computed, makeObservable } from 'mobx';
import { configure } from 'mobx';

configure({ enforceActions: 'never' });

class appStore {
  @observable profile = {};
  @observable isLoggedIn = false;

  editor;

  constructor() {
    makeObservable(this);
    this.init();
  }

  init = async () => {
    try {
      const profile = localStorage.getItem('profile');
      const token = localStorage.getItem('token');

      if (profile && token) {
        this.profile = JSON.parse(profile);
        this.isLoggedIn = true;
        // this.refreshTokenAndProfile();
      }
    } catch (err) {
      console.log(err);
    }
  };

  loginWithDataTokenAndProfile = async (data) => {
    this.setToken(data.token);
    this.setProfile(data.profile);
    this.isLoggedIn = true;
  };

  // refreshTokenAndProfile = async () => {
  //   try {
  //     let data = await this.api
  //       .post('/user/refresh/profile')
  //       .then(({ data }) => data);
  //     if (data) {
  //       this.setProfile(data.profile);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     this.handleLogout();
  //   }
  // };

  setToken = async (token) => {
    // this.api.defaults.headers.common['x-access-token'] = token;
    axios.defaults.headers.common['x-access-token'] = token;
    localStorage.setItem('token', token);
  };

  setProfile = async (profile) => {
    this.profile = profile;
    localStorage.setItem('profile', JSON.stringify(profile));
  };

  handleLogout = () => {
    this.isLoggedIn = false;
    this.profile = {};
    axios.defaults.headers.common['x-access-token'] = '';
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
  };
}

export default appStore;
