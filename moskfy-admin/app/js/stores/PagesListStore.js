'use strict';
import Reflux from 'reflux';
import PageActions from '../actions/PageActions';

//const nocache = require('superagent-no-cache');
const request = require('superagent');
const prefix = require('superagent-prefix')('http://localhost:3000/api');


//import restful, {
  //fetchBackend
//}
//from 'restful.js';
import loader from '../utils/loader';

//const api = restful('http://localhost:3000/api', fetchBackend(fetch));
//const endpoint = 'pages';

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

    //onListPages() {
      ////let self = this;
      ////api.all(endpoint).getAll().then(function(rs) {
        ////let response = rs.body();
        ////let pages = [];

        ////let array = response.length;
        ////for (let i = 0; i < array; i++) {
          ////pages[i] = response[i].data();
        ////}

        ////self.data = self.data.concat(response);
        ////self.pages = self.pages.concat(pages);
        ////self.trigger(self.pages);
      ////});

      //loader.emit('loading', true);
      //setTimeout(function() {
        //request.get('/pages')
        //.use(prefix)
        ////.use(nocache)
        //.end(function(err, res){
          //loader.emit('loading', false);
        //});
      //}.bind(this), 5000);
    //},

    onListPagesCompleted(pages) {
      console.log('pages ==>', pages);
    },

    onListPagesFailed(err) {
      console.log('ERRO ', err);
    },

    onClearData() {
      this.data = [];
      this.pages = [];
    },

    throwError(err) {
      this.trigger(err);
    },

});

export
default PagesListStore;
