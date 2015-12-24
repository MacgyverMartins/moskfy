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

const PagesListStore = Reflux.createStore({

  init() {
      this.data = [];
      this.pages = [];
      this.listenTo(PageActions.listPages, this.listPages);
      this.listenTo(PageActions.clearData, this.clearData);
    },

    listPages() {
      let self = this;
      api.all(endpoint).getAll().then(function(rs) {
        let response = rs.body();
        let pages = [];

        let array = response.length;
        for (let i = 0; i < array; i++) {
          pages[i] = response[i].data();
        }

        self.data = self.data.concat(response);
        self.pages = self.pages.concat(pages);
        self.trigger(self.pages);
      });
    },

    clearData() {
      this.data = [];
      this.pages = [];
    },

    throwError(err) {
      this.trigger(err);
    },

});

export
default PagesListStore;
