'use strict';

//import {camelizeKeys} from 'humps';
import request        from 'superagent';
const prefix = require('superagent-prefix')('http://localhost:3000/api');

const APIUtils = {

  root: '//localhost:3000/api/',

  //normalizeResponse(response) {
    //return camelizeKeys(response.body);
  //},

  get(path) {
    return new Promise((resolve, reject) => {
      request.get(path)
      .use(prefix)
      .end((err, res) => {
        if ( err || !res.ok ) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  },

  post(path, body) {
    return new Promise((resolve, reject) => {
      request.post(path)
      .send(body)
      .use(prefix)
      .end((err, res) => {
        if ( err || !res.ok ) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  },

  patch(path, body) {
    return new Promise((resolve, reject) => {
      request.patch(this.root + path, body)
      .withCredentials()
      .end((err, res) => {
        if ( err || !res.ok ) {
          reject(this.normalizeResponse(err || res));
        } else {
          resolve(this.normalizeResponse(res));
        }
      });
    });
  },

  put(path, body) {
    return new Promise((resolve, reject) => {
      request.put(path)
      .use(prefix)
      .send(body)
      .end((err, res) => {
        if ( err || !res.ok ) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  },

  del(path) {
    return new Promise((resolve, reject) => {
      request.del(this.root + path)
      .end((err, res) => {
        if ( err || !res.ok ) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

};

export default APIUtils;
