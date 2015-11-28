'use strict';

import Reflux             from 'reflux';

import PageActions from '../actions/PageActions';
import restful, { fetchBackend } from 'restful.js';
import loader from '../utils/loader';

const api = restful('http://localhost:3000', fetchBackend(fetch));
const endpoint = 'pages';

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
    this.listenTo(PageActions.savePage, this.savePage);
  },

  listPages() {
    var self = this;
    api.all(endpoint).getAll().then(function(rs){
      var pages = rs.body();
      self.trigger(pages);
    });
  },

  savePage(data) {
    let self = this;
    api.custom(endpoint).post(data).then(function(rs){
      let page = rs.body().data();
      self.trigger();
    });
  },

  throwError(err) {
    this.trigger(err);
  },

});

export default PageStore;
