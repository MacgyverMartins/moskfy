'use strict';
import Reflux from 'reflux';
import AppActions from '../actions/AppActions';
import loader from '../utils/loader';

const PagesListStore = Reflux.createStore({

  init() { },

    listenables: AppActions,

    onShowSnackbar(msg) {
      this.trigger({payload: 'showSnackbar', msg: msg});
    },

    throwError(err) {
      this.trigger(err);
    },

});

export default PagesListStore;
