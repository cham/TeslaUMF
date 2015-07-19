'use strict';

var sinon = require('sinon');
var api = require('../../../api/api');
var threadController = require('../../../controllers/thread');

describe('thread controller', function(){
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
        expect(typeof threadController).toEqual('object');
    });

    it('exposes a single property', function(){
        expect(Object.keys(threadController).length).toEqual(1);
    });

    it('exposes a getThread function', function(){
        expect(typeof threadController.getThread).toEqual('function');
    });

    describe('getThread', function(){
        var getThreadThen;
        var getThreadCatch;
        var fakeUrlName;

        beforeEach(function(){
            fakeUrlName = 'some-thread';
            req.param = sandbox.stub().returns(fakeUrlName);
            res.send = sandbox.stub();
            res.status = sandbox.stub().returns({
                send: res.send
            });

            getThreadCatch = sandbox.stub();
            getThreadThen = sandbox.stub().returns({
                catch: getThreadCatch
            });

            sandbox.stub(api.threads, 'getThread').returns({
                then: getThreadThen
            });

            threadController.getThread(req, res);
        });

        it('calls getThread on api.threads', function(){
            expect(api.threads.getThread.calledOnce).toEqual(true);
        });

        describe('when getThread resolves with no error', function(){
            var data;

            beforeEach(function(){
                data = {
                    foo: true
                };
                getThreadThen.yield(data);
            });

            it('calls res.send once', function(){
                expect(res.send.calledOnce).toEqual(true);
            });

            it('passes the returned data with the res.send call', function(){
                expect(res.send.calledWith(data)).toEqual(true);
            });
        });

        describe('when getThread resolves with an error', function(){
            var err;

            beforeEach(function(){
                err = new Error('foo');
                getThreadCatch.yield(err);
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
