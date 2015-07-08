'use strict';

define([
    'q',
    'lib/fetch'
],
function(
    Q,
    fetch
){

    var sandbox = sinon.sandbox.create();

    describe('fetch', function(){
        var xhr;

        beforeEach(function(){
            xhr = sinon.useFakeXMLHttpRequest();
        });

        afterEach(function(){
            xhr.restore();
            sandbox.restore();
        });

        it('is a function', function(){
            expect(typeof fetch).toEqual('function');
        });

        it('has an arity of 1', function(){
            expect(fetch.length).toEqual(1);
        });

        describe('when passed a url', function(){
            var deferStub;
            var resolveStub;
            var fakePromise;
            var result;

            beforeEach(function(){
                resolveStub = sandbox.stub();
                fakePromise = {
                    promise: true
                };

                deferStub = sandbox.stub(Q, 'defer').returns({
                    resolve: resolveStub,
                    promise: fakePromise
                });

                result = fetch('http://foo.bar');
            });

            it('calls Q.defer once', function(){
                expect(deferStub.calledOnce).toEqual(true);
            });

            it('returns the deferred object\'s promise', function(){
                expect(result).toEqual(fakePromise);
            });

            it('opens a new XMLHttpRequest', function(){

            });

            describe('when the XMLHttpRequest resolves without error', function(){

            });
        });
    });
/*
fetch(url){
    var deferred = Q.defer();

    var req = new XMLHttpRequest();
    req.responseType = 'json';

    req.onload = function(){
        deferred.resolve(this.response);
    };

    req.open('get', url, true);
    req.send();

    return deferred.promise;
}
*/
});
