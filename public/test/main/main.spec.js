'use strict';
define([
    'bogus'
],
function(
    bogus
){

    var sandbox = sinon.sandbox.create();

    describe('main', function(){
        var main;
        var newAppViewStub;
        var appViewInstance;
        var appendChildSpy;

        before(function(done){
            appViewInstance = {
                render: sandbox.stub(),
                el: document.createElement('div')
            };

            newAppViewStub = sandbox.stub().returns(appViewInstance);

            bogus.stub('views/AppView', newAppViewStub);

            bogus.requireWithStubs('main', function(module){
                main = module;
                done();
            });
        });

        beforeEach(function(){
            appendChildSpy = sandbox.spy(HTMLElement.prototype, 'appendChild');
        });

        afterEach(function(){
            sandbox.restore();
        });

        after(function(done){
            appViewInstance.el.remove();
            bogus.reset(done);
        });

        it('creates a single new AppView', function(){
            expect(newAppViewStub.calledOnce).toEqual(true);
        });

        it('appends the new AppView\'s el to the document body', function(){
            var childNodes = Array.prototype.slice.call(document.body.children);
            var elNodesInDocument = childNodes.filter(function(node){
                return node === appViewInstance.el;
            });

            expect(elNodesInDocument.length).toEqual(1);
        });

        it('renders the new AppView once', function(){
            expect(appViewInstance.render.calledOnce).toEqual(true);
        });
    });

});
