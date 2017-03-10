'use strict';
var Scope = require('../src/Scope');
describe('Scope', function() {
    it('can be constructed and used as an object', function() {
        var myScope = new Scope();
        myScope.AnyNewRandomProperty = 1;
        expect(myScope.AnyNewRandomProperty).toBe(1);
    });

    describe('digest', function() {
        var scope;
        beforeEach(function() {
            scope = new Scope();
        });
        it('calls the watch function on the first digest', function() {
            var watchFn = function() {
                return 'watch';
            };
            var listenerFn = jasmine.createSpy();
            scope.$watch(watchFn, listenerFn);
            scope.$digest();
            expect(listenerFn).toHaveBeenCalled();
        });
        it('calls the watch function with scope as an argument', function() {
            var watchFn = jasmine.createSpy();
            var listenerFn = function() {};
            scope.$watch(watchFn, listenerFn);
            scope.$digest();
            expect(watchFn).toHaveBeenCalledWith(scope);
        });
        it('calls the listener function when the watched value changes', function() {
            scope.someValue = 'a';
            scope.counter = 0;
            scope.$watch(
                function(scope) { return scope.someValue; },
                function(newValue, oldValue, scope) { scope.counter++; }
            );
            expect(scope.counter).toBe(0);

            scope.$digest();
            expect(scope.counter).toBe(1);

            scope.$digest();
            expect(scope.counter).toBe(1);

            scope.someValue = 'b';
            expect(scope.counter).toBe(1);

            scope.$digest();
            expect(scope.counter).toBe(2);
        });
        it('calls listener when watch value is first undefined', function() {
            scope.counter = 0;
            scope.$watch(
                function(scope) { return scope.someValue; },
                function(newValue, oldValue, scope) { scope.counter++; }
            );
            scope.$digest();
            expect(scope.counter).toBe(1);
        });
    });
});