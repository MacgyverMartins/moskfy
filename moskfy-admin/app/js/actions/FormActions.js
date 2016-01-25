'use strict';
import Reflux from 'reflux';
import APIUtils from '../utils/APIUtils';
import _ from 'lodash';

const FormActions = Reflux.createActions({
  'save': { asyncResult: true },
  'get': { asyncResult: true },
  'getList': { asyncResult: true }
});

FormActions.save.listen(function(data) {
  let url, type;
  if (data._id) {
    url = '/forms/' + data._id;
    type = 'put';
  } else {
    url = '/forms';
    type = 'post';
  }
  APIUtils[type](url, data).then(form => {
    this.completed(form);
  }).catch(err => {
    this.failed(err)
  });
});

FormActions.get.listen(function(data) {
  let url, id
  if (_.has(data, 'params.id')) {
    id = data.params.id;
  } else {
    id = data;
  }
  url = '/forms/' + id;

  APIUtils.get(url).then(form => {
    this.completed(form);
  }).catch(err => {
    this.failed(err)
  });
});

FormActions.getList.listen(function() {
  APIUtils.get('/forms').then(forms => {
    this.completed(forms);
  }).catch(err => {
    this.failed(err)
  });
});

//PageActions.deletePage.listen(function(id) {
  //let url = '/pages/' + id;
  //APIUtils.del(url).then(data => {
    //this.completed(data);
  //}).catch(err => {
    //this.failed(err)
  //});
//});

//PageActions.getTemplates.listen(function(id) {
  //APIUtils.get('/templates').then(res => {
    //this.completed(res);
  //}).catch(err => {
    //this.failed(err)
  //});
//});

export default FormActions;
