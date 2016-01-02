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

    onGetPageCompleted(data) {
      let page = data.body;
      this.trigger({
        payload: 'onGetPage',
        data: page
      })
    },

    onGetPageFailed(err) {
      console.error(err);
    },

    onSavePageCompleted(res) {
      let page = res.body;
      this.trigger({ payload: 'onPageSave', data: page });
    },

    onSavePageFailed(err) {
      console.error(err);
    },

    onDeletePageCompleted(id) {
      this.trigger({payload: 'onDeletePage'});
    },

    onDeletePageFailed(err) {
      console.error('err', err);
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
