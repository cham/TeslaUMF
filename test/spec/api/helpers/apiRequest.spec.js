'use strict';

var SandboxedModule = require('sandboxed-module');
var sinon = require('sinon');
var request = require('request');
var apiRequest;

describe('apiRequest', function(){
    var sandbox = sinon.sandbox.create();
    var requestStub;

    before(function(){
        requestStub = sandbox.stub();

        apiRequest = SandboxedModule.require('../../../../api/helpers/apiRequest', {
            requires: {
                'request': requestStub
            }
        });

        apiRequest({
            url: '/foo/bar'
        });
    });

    afterEach(function(){
        sandbox.restore();
    });

    it('is a function', function(){
        expect(typeof apiRequest).toEqual('function');
    });

    it('calls request once', function(){
        expect(requestStub.calledOnce).toEqual(true);
    });

    it('passes options to request', function(){
        expect(typeof requestStub.args[0][0]).toEqual('object');
    });

    it('options contains a URL parameter', function(){
        expect(requestStub.args[0][0].url).toBeDefined();
    });

    it('url is the url passed in options, prepended with the API host', function(){
        expect(requestStub.args[0][0].url).toEqual('http://localhost:3100/foo/bar');
    });
});
