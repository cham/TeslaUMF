'use strict';
define([
    'lib/domNode'
],
function(
    domNode
){

    var sandbox = sinon.sandbox.create();

    describe('domNode', function(){
        it('returns an HTMLElement', function(){
            expect(domNode() instanceof HTMLElement).toEqual(true);
        });

        it('returns a div', function(){
            expect(domNode() instanceof HTMLDivElement).toEqual(true);
        });

        it('the node has an empty className property', function(){
            expect(domNode().className).toEqual('');
        });

        describe('when passed a type option', function(){
            var typeOptions;

            beforeEach(function(){
                typeOptions = {
                    type: 'input'
                };
            });

            it('returns a node of that type', function(){
                expect(domNode(typeOptions) instanceof HTMLInputElement).toEqual(true);
            });
        });

        describe('when passed a className option', function(){
            var classNameOptions;

            beforeEach(function(){
                classNameOptions = {
                    className: 'some classes here'
                };
            });

            it('applies the given className to the node\'s className', function(){
                expect(domNode(classNameOptions).className).toEqual('some classes here');
            });
        });
    });

});
