'use strict';

import Reflux from 'reflux';

import PageActions from '../actions/PageActions';
import restful, {
  fetchBackend
}
from 'restful.js';
import loader from '../utils/loader';

const api = restful('http://localhost:3000', fetchBackend(fetch));
const endpoint = 'pages';

api.addRequestInterceptor(function(config) {
  loader.emit('loading', true);
});
api.addResponseInterceptor(function(config) {
  loader.emit('loading', false);
});

const PageStore = Reflux.createStore({

  init() {
      this.page = {};

      this.listenTo(PageActions.savePage, this.savePage);
      this.listenTo(PageActions.getPage, this.getPage);
      this.listenTo(PageActions.getNewPage, this.getNewPage);
      this.listenTo(PageActions.deletePage, this.deletePage);
    },

    savePage(data) {
      let self = this;
      if (data._id) {
        api.one(endpoint, data._id).put(data).then(function(rs){
          let page = rs.body().data();
          self.trigger({
            payload: 'onPageSave',
            data: page
          });
        });
      } else {
        api.custom(endpoint).post(data).then(function(rs) {
          let page = rs.body().data();
          self.trigger({
            payload: 'onPageSave',
            data: page
          });
        });
      }
    },

    getPage(data) {
      let id = data.params.id;
      let self = this;
      api.one(endpoint, id).get().then(function(rs) {
        self.page = rs.body();
        let page = self.page.data();
        self.trigger({
          payload: 'onGetPage',
          data: page
        });
      });
    },

    getNewPage() {
      this.page = {}
      this.trigger({
        payload: 'onGetNewPage',
        data: this.page
      });
    },

    deletePage(id) {
      let self = this;
      api.one(endpoint, id).delete().then(function(rs) {
        self.trigger('onDeletePage');
      });
    },

    throwError(err) {
      this.trigger(err);
    },

});

export
default PageStore;
