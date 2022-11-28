import { Observable, Observer, Subscription } from 'rxjs';

let invocation_counter = 0;

//Observable is unicast
let observable:Observable<number> = new Observable(function subscribe(observer) {

  // emits a random number in every seconds for five times

  console.log("Observable invocation count: "+ ++invocation_counter );

  observer.next(Math.random());
  let timeout = null;
  let counter = 0;
  (function pushData() {
    console.log('Iteration: ' +counter);
    timeout = setTimeout(
      () => {
        if(counter++ < 5) {
          observer.next(Math.random());
          pushData();
        }
        else{
          observer.complete();
        }
      },
      1000 //Delay
    );
  })();
  
  // clear any pending timeout on teardown
  return () => {
    console.log('Teardown Logic: clearing timeout');
    clearTimeout(timeout);
  }
})


let subscription:Subscription = observable.subscribe( {
  next: function next(res){
    console.log('subscription a :', res); 
  },
  error: function error(_err){
    console.log("Observer Error!!")
  }, 
  complete: function completed(){
    console.log("Observer Completed!!")
  }
} as Observer<number> );

// subscription.unsubscribe(); 

setTimeout(() => {
  observable.subscribe(res=>{
    console.log('subscription b :', res); 
   });
}, 7000);


/* The subscribe function is called when the Observable is subscribed to. 
This function is given a Subscriber(https://rxjs.dev/api/index/class/Subscriber), 
to which new values can be nexted, or an error method can be called to raise an 
error, or complete can be called to notify of a successful completion.  
https://github.com/amal-pn */

