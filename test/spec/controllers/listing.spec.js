'use strict';

var sinon = require('sinon');
var api = require('../../../api/api');
var listingController = require('../../../controllers/listing');

describe('listing controller', function(){
    var sandbox = sinon.sandbox.create();
    var req;
    var res;

    beforeEach(function(){
        req = {};
        res = {};
    });

    afterEach(function(){
        sandbox.restore();
    });

    it('is an object', function(){
        expect(typeof listingController).toEqual('object');
    });

    it('exposes a single property', function(){
        expect(Object.keys(listingController).length).toEqual(1);
    });

    it('exposes a getIndex function', function(){
        expect(typeof listingController.getIndex).toEqual('function');
    });

    describe('getIndex', function(){
        var getThreadsThen;
        var getThreadsCatch;

        beforeEach(function(){
            res.send = sandbox.stub();
            res.status = sandbox.stub().returns({
                send: res.send
            });

            getThreadsCatch = sandbox.stub();
            getThreadsThen = sandbox.stub().returns({
                catch: getThreadsCatch
            });
            sandbox.stub(api.threads, 'getThreads').returns({
                then: getThreadsThen
            });

            listingController.getIndex({}, res);
        });

        it('calls getThreads on api.threads', function(){
            expect(api.threads.getThreads.calledOnce).toEqual(true);
        });

        describe('when getThreads resolves with no error', function(){
            var data;

            beforeEach(function(){
                data = {
                    foo: true
                };
                getThreadsThen.yield(data);
            });

            it('calls res.send once', function(){
                expect(res.send.calledOnce).toEqual(true);
            });

            it('passes the returned data with the res.send call', function(){
                expect(res.send.calledWith(data)).toEqual(true);
            });
        });

        describe('when getThreads resolves with an error', function(){
            var err;

            beforeEach(function(){
                err = new Error('foo');
                getThreadsCatch.yield(err);
            });

            it('calls res.status once', function(){
                expect(res.status.calledOnce).toEqual(true);
            });

            it('passes 500 to res.status', function(){
                expect(res.status.calledWith(500)).toEqual(true);
            });

            it('calls res.send once', function(){
                expect(res.send.calledOnce).toEqual(true);
            });

            it('passes the Error with the res.send call', function(){
                expect(res.send.calledWith(err)).toEqual(true);
            });

            it('calls res.status before res.send', function(){
                expect(res.status.calledBefore(res.send)).toEqual(true);
            });
        });
    });
});
