"use strict";
exports.__esModule = true;
var rxjs_1 = require("rxjs");
var invocation_counter = 0;
// Observer subscribes to Observable
var observable = new rxjs_1.Observable(function subscribe(observer) {
    // emits a random number in every seconds for five times
    console.log("Observable invocation count: " + ++invocation_counter);
    observer.next(Math.random());
    var timeout = null;
    var counter = 0;
    (function pushData() {
        console.log('Iteration: ' + counter);
        timeout = setTimeout(function () {
            if (counter++ < 5) {
                observer.next(Math.random());
                pushData();
            }
            else {
                observer.complete();
            }
        }, 1000 //Delay
        );
    })();
    // clear any pending timeout on teardown
    return function () {
        console.log('clearing timeout');
        clearTimeout(timeout);
    };
});
var subscription = observable.subscribe({
    next: function next(res) {
        console.log('subscription a :', res);
    },
    error: function error(_err) {
        console.log("Observer Error!!");
    },
    complete: function completed() {
        console.log("Observer Completed!!");
    }
});
// subscription.unsubscribe(); 
setTimeout(function () {
    observable.subscribe(function (res) {
        console.log('subscription b :', res);
    });
}, 7000);
//Observable is unicast by design
/*the subscribe function is called when the Observable is initially subscribed to.
This function is given a Subscriber(https://rxjs.dev/api/index/class/Subscriber),
to which new values can be nexted, or an error method can be called to raise an
error, or complete can be called to notify of a successful completion.
https://github.com/amal-pn */


