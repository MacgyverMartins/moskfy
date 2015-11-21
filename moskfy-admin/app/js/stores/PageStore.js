'use strict';

import Reflux             from 'reflux';

import PageActions from '../actions/PageActions';
import restful, { fetchBackend } from 'restful.js';
import loader from '../utils/loader';

const api = restful('http://localhost:3000', fetchBackend(fetch));

api.addRequestInterceptor(function(config){
  loader.emit('loading', true);
});
api.addResponseInterceptor(function(config){
  loader.emit('loading', false);
});

const PageStore = Reflux.createStore({

  init() {
    //this.user = null;
    //this.hasBeenChecked = false;

    this.listenTo(PageActions.listPages, this.listPages);
  },

  listPages() {
    var self = this;
    api.all('pages').getAll().then(function(rs){
      var pages = rs.body();
      self.trigger(pages);
    });
  },

  setUser(user) {
    this.user = user;
    this.trigger(null, this.user);
  },

  throwError(err) {
    this.trigger(err);
  },

  checkLoginStatus() {
    if ( this.user ) {
      this.setUser(this.user);
    } else {
      AuthAPI.checkLoginStatus().then(user => {
        this.hasBeenChecked = true;
        this.setUser(user);
      }).catch(err => {
        this.hasBeenChecked = true;
        this.throwError(err);
      });
    }
  },

  loginUser(user) {
    AuthAPI.login(user).then(user => {
      this.setUser(user);
    }).catch(err => {
      this.throwError(err);
    });
  },

  logoutUser() {
    AuthAPI.logout(this.user).then(() => {
      this.setUser(null);
    });
  }

});

export default PageStore;
