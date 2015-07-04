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
        var resSendStub;

        beforeEach(function(){
            res.send = resSendStub = sandbox.stub();

            listingController.getIndex({}, res);
        });

        it('calls res.send once', function(){
            expect(resSendStub.calledOnce).toEqual(true);
        });

        it('sends the text "index"', function(){
            expect(resSendStub.calledWith('index')).toEqual(true);
        });
    });
});
