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
    this.listenTo(PageActions.savePage, this.savePage);
    this.listenTo(PageActions.getPage, this.getPage);
  },

  savePage(data) {
    let self = this;
    api.custom(endpoint).post(data).then(function(rs){
      let page = rs.body().data();
      self.trigger({payload: 'onPageSave', data: page});
    });
  },

  getPage(id) {
    let self = this;
    api.one(endpoint, id).get().then(function(rs) {
      let page = rs.body().data();
      self.trigger({payload:'onGetPage', data: page});
    });
  },

  throwError(err) {
    this.trigger(err);
  },

});

export default PageStore;
