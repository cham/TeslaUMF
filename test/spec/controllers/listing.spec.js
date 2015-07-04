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
        var renderStub;

        beforeEach(function(){
            res.render = renderStub = sandbox.stub();

            listingController.getIndex({}, res);
        });

        it('calls res.render once', function(){
            expect(renderStub.calledOnce).toEqual(true);
        });

        it('sends the view name "index" to res.render', function(){
            expect(renderStub.calledWith('index')).toEqual(true);
        });
    });
});
