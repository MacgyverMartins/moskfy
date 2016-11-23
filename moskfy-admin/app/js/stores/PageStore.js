'use strict';
import Reflux from 'reflux';
import PageActions from '../actions/PageActions';
import loader from '../utils/loader';

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

    onGetTemplatesCompleted(res) {
      let templates = res.body;
      this.trigger({
        payload: 'onGetTemplates',
        data: templates
      })
    },

    onGetTemplatesFailed() {
     console.error(err);
    },

    throwError(err) {
      this.trigger(err);
    },

});

export default PageStore;
