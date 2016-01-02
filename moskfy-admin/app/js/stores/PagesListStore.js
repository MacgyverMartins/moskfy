'use strict';
import Reflux from 'reflux';
import PageActions from '../actions/PageActions';

//const nocache = require('superagent-no-cache');
const request = require('superagent');
const prefix = require('superagent-prefix')('http://localhost:3000/api');


import loader from '../utils/loader';

//api.addRequestInterceptor(function(config) {
  //loader.emit('loading', true);
//});
//api.addResponseInterceptor(function(config) {
  //loader.emit('loading', false);
//});

const PagesListStore = Reflux.createStore({

  init() {
      this.data = [];
      this.pages = [];
    },

    listenables: PageActions,

    onListPagesCompleted(res) {
      this.trigger(res.body);
    },

    onListPagesFailed(err) {
      console.error('ERRO no request', err);
    },

    throwError(err) {
      this.trigger(err);
    },

});

export default PagesListStore;
