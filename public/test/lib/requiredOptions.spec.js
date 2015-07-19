'use strict';
define([
    'lib/requiredOptions'
],
function(
    requiredOptions
){
/*
    return function requiredOptions(options, id, required){
        required.forEach(function(key){
            if(!options[key]){
                throw new Error(id + ' requires ' + key);
            }
        });
    };
*/
    var sandbox = sinon.sandbox.create();

    describe('requiredOptions', function(){
        describe('when the options do not match the criteria', function(){
            var options;
            var required;

            beforeEach(function(){
                options = {};
                required = [
                    'foo',
                    'bar'
                ];
            });

            it('throws an error for the first key that fails', function(){
                var expectedError = 'some-module requires foo';
                expect(function(){
                    return requiredOptions(options, 'some-module', required);
                }).toThrow(expectedError);
            });
        });

        describe('when some of the options match the criteria', function(){
            var options;
            var required;

            beforeEach(function(){
                options = {
                    foo: 5
                };
                required = [
                    'foo',
                    'bar'
                ];
            });

            it('throws an error for the first key that fails', function(){
                var expectedError = 'some-module requires bar';
                expect(function(){
                    return requiredOptions(options, 'some-module', required);
                }).toThrow(expectedError);
            });
        });

        describe('when all of the options match the criteria', function(){
            var options;
            var required;

            beforeEach(function(){
                options = {
                    foo: 5,
                    bar: true
                };
                required = [
                    'foo',
                    'bar'
                ];
            });

            it('does not throw an error', function(){
                expect(function(){
                    return requiredOptions(options, 'some-module', required);
                }).not.toThrow();
            });
        });
    });

});
