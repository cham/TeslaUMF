'use strict';

var sinon = require('sinon');
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

    describe('getIndex', function(){
        var endStub;

        beforeEach(function(){
            res.end = endStub = sandbox.stub();

            listingController.getIndex({}, res);
        });

        it('calls res.end once', function(){
            expect(endStub.calledOnce).toEqual(true);
        });
    });
});
