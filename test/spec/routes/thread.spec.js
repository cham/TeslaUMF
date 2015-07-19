'use strict';

var sinon = require('sinon');
var express = require('express');
var threadRouter = require('../../../routes/thread');
var threadController = require('../../../controllers/thread');

describe('thread router', function(){
    var sandbox = sinon.sandbox.create();
    var router;
    var req;
    var res;

    var getThreadStub;

    beforeEach(function(){
        res = {};

        getThreadStub = sandbox.stub(threadController, 'getThread');

        router = new express.Router();

        threadRouter(router);
    });

    afterEach(function(){
        sandbox.restore();
    });

    it('is a function', function(){
        expect(typeof threadRouter).toEqual('function');
    });

    describe('get /api/1.0/thread/:urlname', function(){
        beforeEach(function(){
            req = {
                method: 'get',
                url: '/api/1.0/thread/some-thread-name'
            };

            router(req, res);
        });

        it('calls getIndex on listingController once', function(){
            expect(getThreadStub.calledOnce).toEqual(true);
        });

        it('passes req and res to listingController', function(){
            expect(getThreadStub.calledWith(req, res)).toEqual(true);
        });
    });
});
