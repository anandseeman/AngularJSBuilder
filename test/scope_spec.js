'use strict';
var Scope = require('../src/Scope');
describe('Scope', function() {
    it('can be constructed and used as an object', function() {
        var myScope = new Scope();
        myScope.AnyNewRandomProperty = 1;
        expect(myScope.AnyNewRandomProperty).toBe(1);
    });
});