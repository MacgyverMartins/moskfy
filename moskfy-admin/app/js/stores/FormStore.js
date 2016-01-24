'use strict';

import Reflux from 'reflux';
import FormActions from '../actions/FormActions';
import loader from '../utils/loader';

//api.addRequestInterceptor(function(config) {
  //loader.emit('loading', true);
//});
//api.addResponseInterceptor(function(config) {
  //loader.emit('loading', false);
//});

const FormStore = Reflux.createStore({

  init() {},

    listenables: FormActions,

    onSaveCompleted(res) {
      let form = res.body;
      this.trigger({ payload: 'onSave', data: form });
    },

    onSaveFailed(err) {
      console.error(err);
    },

    onGetCompleted(res) {
      let form = res.body;
      this.trigger({ payload: 'onGet', data: form });
    },

    onGetFailed(err) {
      console.error(err);
    },

});

export default FormStore;
