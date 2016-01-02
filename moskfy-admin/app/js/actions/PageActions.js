'use strict';
import Reflux from 'reflux';
import APIUtils from '../utils/APIUtils';

const PageActions = Reflux.createActions({
  'listPages': { asyncResult: true },
  'getPage': { asyncResult: true },
  'getNewPage': {},
  'savePage': { asyncResult: true },
  'deletePage': { asyncResult: true }
  //'getTemplates',
  //'clearData'
});

PageActions.listPages.listen(function() {
  APIUtils.get('/pages').then(pages => {
    this.completed(pages);
  }).catch(err => {
    this.failed(err)
  });
});

PageActions.getPage.listen(function(route) {
  let url = '/pages/' + route.params.id;
  APIUtils.get(url).then(page => {
    this.completed(page);
  }).catch(err => {
    this.failed(err)
  });
});

PageActions.savePage.listen(function(data) {
  let url, type;
  if (data._id) {
    url = '/pages/' + data._id;
    type = 'put';
  } else {
    url = '/pages';
    type = 'post';
  }
  APIUtils[type](url, data).then(page => {
    this.completed(page);
  }).catch(err => {
    this.failed(err)
  });
});

PageActions.deletePage.listen(function(id) {
  let url = '/pages/' + id;
  APIUtils.del(url).then(data => {
    this.completed(data);
  }).catch(err => {
    this.failed(err)
  });
});

export default PageActions;
