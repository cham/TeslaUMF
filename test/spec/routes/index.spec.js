'use strict';

var sinon = require('sinon');
var express = require('express');
var indexRouter = require('../../../routes/index');

describe('index router', function(){
    var sandbox = sinon.sandbox.create();
    var router;
    var req;
    var res;

    beforeEach(function(){
        router = new express.Router();

        indexRouter(router);
    });

    afterEach(function(){
        sandbox.restore();
    });

    it('is a function', function(){
        expect(typeof indexRouter).toEqual('function');
    });

    describe('get /', function(){
        var renderStub;

        beforeEach(function(){
            renderStub = sandbox.stub();

            req = {
                method: 'get',
                url: '/'
            };

            res = {
                render: renderStub
            };

            router(req, res);
        });

        it('calls res.render once', function(){
            expect(renderStub.calledOnce).toEqual(true);
        });

        it('passes the view name of "index" to res.render', function(){
            expect(renderStub.calledWith('index')).toEqual(true);
        });
    });
});
