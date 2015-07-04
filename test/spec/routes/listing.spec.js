'use strict';

var sinon = require('sinon');
var express = require('express');
var listingRouter = require('../../../routes/listing');
var listingController = require('../../../controllers/listing');

describe('listing router', function(){
    var sandbox = sinon.sandbox.create();
    var router;
    var req;
    var res;

    var getIndexStub;

    beforeEach(function(){
        res = {};

        getIndexStub = sandbox.stub(listingController, 'getIndex');

        router = new express.Router();

        listingRouter(router);
    });

    afterEach(function(){
        sandbox.restore();
    });

    it('is a function', function(){
        expect(typeof listingRouter).toEqual('function');
    });

    describe('get /api/1.0/threads', function(){
        beforeEach(function(){
            req = {
                method: 'get',
                url: '/api/1.0/threads'
            };

            router(req, res);
        });

        it('calls getIndex on listingController once', function(){
            expect(getIndexStub.calledOnce).toEqual(true);
        });

        it('passes req and res to listingController', function(){
            expect(getIndexStub.calledWith(req, res)).toEqual(true);
        });
    });
});
