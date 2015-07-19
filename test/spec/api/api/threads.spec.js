'use strict';

var SandboxedModule = require('sandboxed-module');
var sinon = require('sinon');
var threads;

describe('threads', function(){
    var sandbox = sinon.sandbox.create();
    var apiRequestStub;

    before(function(){
        apiRequestStub = sandbox.stub();

        threads = SandboxedModule.require('../../../../api/api/threads', {
            requires: {
                '../helpers/apiRequest': apiRequestStub
            }
        });
    });

    beforeEach(function(){
        apiRequestStub.reset();
    });

    afterEach(function(){
        sandbox.restore();
    });

    it('exports a getThreads function', function(){
        expect(typeof threads.getThreads).toEqual('function');
    });

    describe('getThreads', function(){
        var returnVal;

        beforeEach(function(){
            returnVal = threads.getThreads();
        });

        it('calls apiRequest once', function(){
            expect(apiRequestStub.calledOnce).toEqual(true);
        });

        it('returns the result of apiRequest', function(){
            expect(returnVal).toEqual(apiRequestStub.returnValues[0]);
        });

        it('passes options to apiRequest', function(){
            expect(typeof apiRequestStub.args[0][0]).toEqual('object');
        });

        it('passes a method option', function(){
            expect(apiRequestStub.args[0][0].method).toBeDefined();
        });

        it('passes a method of "get"', function(){
            expect(apiRequestStub.args[0][0].method).toEqual('get');
        });

        it('passes a url option', function(){
            expect(apiRequestStub.args[0][0].url).toBeDefined();
        });

        it('passes a url of "/threads"', function(){
            expect(apiRequestStub.args[0][0].url).toEqual('/threads');
        });
    });

    describe('getThread', function(){
        var returnVal;

        beforeEach(function(){
            returnVal = threads.getThread('some-thread-name');
        });

        it('calls apiRequest once', function(){
            expect(apiRequestStub.calledOnce).toEqual(true);
        });

        it('returns the result of apiRequest', function(){
            expect(returnVal).toEqual(apiRequestStub.returnValues[0]);
        });

        it('passes options to apiRequest', function(){
            expect(typeof apiRequestStub.args[0][0]).toEqual('object');
        });

        it('passes a method option', function(){
            expect(apiRequestStub.args[0][0].method).toBeDefined();
        });

        it('passes a method of "get"', function(){
            expect(apiRequestStub.args[0][0].method).toEqual('get');
        });

        it('passes a url option', function(){
            expect(apiRequestStub.args[0][0].url).toBeDefined();
        });

        it('passes a url of "/thread/:threadUrlName/complete"', function(){
            expect(apiRequestStub.args[0][0].url).toEqual('/thread/some-thread-name/complete');
        });
    });
});
