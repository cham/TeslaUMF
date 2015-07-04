'use strict';
define([
    'views/AppView'
],
function(
    AppView
){

    describe('AppView', function(){
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

                it('el is an instance of HTMLElement', function(){
                    expect(view.el instanceof HTMLElement).toEqual(true);
                });
            });
        });
    });

});
