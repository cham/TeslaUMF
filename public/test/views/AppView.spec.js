'use strict';
define([
    'bogus'
],
function(
    bogus
){

    var sandbox = sinon.sandbox.create();
    var AppView;

    describe('AppView', function(){
        var domNodeStub;

        before(function(done){
            domNodeStub = sandbox.stub().returns(document.createElement('div'));
            bogus.stub('lib/domNode', domNodeStub);

            bogus.requireWithStubs('views/AppView', function(module){
                AppView = module;
                done();
            });
        });

        beforeEach(function(){
            domNodeStub.reset();
        });

        after(bogus.reset);

        describe('definition', function(){
            it('is a function', function(){
                expect(typeof AppView).toEqual('function');
            });

            it('has a render function', function(){
                expect(typeof AppView.prototype.render).toEqual('function');
            });

            it('has a remove function', function(){
                expect(typeof AppView.prototype.remove).toEqual('function');
            });
        });

        describe('when initialised', function(){
            var view;

            beforeEach(function(){
                view = new AppView();
            });

            describe('the el property', function(){
                it('has an el property', function(){
                    expect(view.el).toBeDefined();
                });

                it('calls domNode once', function(){
                    expect(domNodeStub.calledOnce).toEqual(true);
                });

                it('passes options to domNode', function(){
                    expect(typeof domNodeStub.args[0][0]).toEqual('object');
                });

                it('passes a type option of "div" to domNode', function(){
                    expect(domNodeStub.args[0][0].type).toEqual('div');
                });

                it('passes a className option of "AppView" to domNode', function(){
                    expect(domNodeStub.args[0][0].className).toEqual('AppView');
                });

                it('el is the node returned by domNode', function(){
                    expect(view.el).toEqual(domNodeStub.returnValues[0]);
                });
            });

            describe('remove', function(){
                var removeStub;

                beforeEach(function(){
                    removeStub = sandbox.stub(view.el, 'remove');
                    view.remove();
                });

                it('calls remove on it\'s el node once', function(){
                    expect(removeStub.calledOnce).toEqual(true);
                });
            });
        });
    });

});
