var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var BackendStore = require('../lib/BackendStore') && global.BackendStore;
var BackendStoreClass = BackendStore.BackendStore;

describe('base', function () {
  describe('sync', function () {
    var store;
    beforeEach(function () {
      store = new BackendStoreClass();
    });
    it('should well', function () {
      store.set('foo', 123);
      store.set('bar', 'a');
      expect(store.get('foo')).to.be.equal(123);
      expect(store.get('bar')).to.be.equal('a');
      expect(store.get('baz')).to.be.undefined;
    });
  });
  describe('async', function () {
    var store, spy;
    beforeEach(function () {
      store = new BackendStoreClass();
      spy = {
        callCount: 0
      };
    });
    it('should well', function (done) {
      setTimeout(function () {
        store.set('foo', 123);
        store.ready();
      }, 0);
      setTimeout(function () {
        expect(store.get('foo')).to.be.equal(123);
        spy.callCount++;
      }, 0);
      expect(store.get('foo')).to.be.undefined;
      spy.callCount++;
      store.ready(function (s) {
        expect(store.get('foo')).to.be.equal(123);
        expect(store.get('baz')).to.be.undefined;
        spy.callCount++;
      });
      store.get('foo', function (foo) {
        expect(foo).to.be.equal(123);
        spy.callCount++;
      });
      store.get('baz', function (baz) {
        expect(baz).to.be.undefined;
        spy.callCount++;
      });
      setTimeout(function () {
        expect(spy.callCount).to.be.equal(5);
        done();
      }, 10);
    });
  });
});