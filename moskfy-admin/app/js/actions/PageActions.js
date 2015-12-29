'use strict';
import Reflux from 'reflux';
import APIUtils from '../utils/APIUtils';

const PageActions = Reflux.createActions({
  'listPages': { asyncResult: true }
  //'getPage',
  //'getNewPage',
  //'savePage',
  //'deletePage',
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

export default PageActions;
