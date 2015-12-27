'use strict';

import Reflux from 'reflux';

import PageActions from '../actions/PageActions';
import restful, {
  fetchBackend
}
from 'restful.js';
import loader from '../utils/loader';

const api = restful('http://localhost:3000/api', fetchBackend(fetch));
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
    },

    listenables: PageActions,

    onSavePage(data) {
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

    onGetPage(data) {
      let id = data.params.id;
      let self = this;
      PageActions.getTemplates();
      api.one(endpoint, id).get().then(function(rs) {
        self.page = rs.body();
        let page = self.page.data();
        self.trigger({
          payload: 'onGetPage',
          data: page
        });
      });
    },

    onGetNewPage() {
      this.page = {}
      this.trigger({
        payload: 'onGetNewPage',
        data: this.page
      });
    },

    onDeletePage(id) {
      let self = this;
      api.one(endpoint, id).delete().then(function(rs) {
        self.trigger({payload: 'onDeletePage'});
      });
    },

    onGetTemplates() {
      let self = this;
      api.all('templates').getAll().then(function(rs) {
        let templates = rs.body();

        let array = templates.length;
        for (let i=0; i < array; i++) {
          templates[i] = templates[i].data();
        }

        self.trigger({
          payload: 'onGetTemplates',
          data: templates
        })
      });
    },

    throwError(err) {
      this.trigger(err);
    },

});

export
default PageStore;
