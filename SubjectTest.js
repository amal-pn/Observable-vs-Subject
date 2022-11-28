"use strict";
exports.__esModule = true;
var rxjs_1 = require("rxjs");
/* A Subject is like an Observable, but can multicast to many Observers.
Subjects are like EventEmitters: they maintain a registry of many listeners. */
var subject = new rxjs_1.Subject();
// Subject implements both the Observable and the Observer 
subject.subscribe({
    next: function (v) { return console.log('observer A: ' + v); }
});
subject.subscribe({
    next: function (v) { return console.log('observer B: ' + v); }
});
subject.next(Math.random());
/* !!! Here next() is called on the subject.
  In case of observables Next is called on the Observer.  Not on the observable. */
subject.next(Math.random());
//Notice that Both the subscribers re getting same random numbers.
// Further ref. Observable vs Subject - https://stackoverflow.com/a/60094820/7319320
// https://github.com/amal-pn