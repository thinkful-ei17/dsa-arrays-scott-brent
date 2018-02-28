const Memory = require('./memory.js');

const memory = new Memory;

class Array {
    constructor(){
       this.length = 0;
       this._capacity = 10;
       this.ptr = memory.allocate(this.length); 
    }

   push(value){

        // if current length + 1 >= capacity - 1, need to resize.
        if (this.length + 1 >= this._capacity - 1){
            _resize(this.length + 1);
        }
        //put our value at the end of the array
             // assign value to ptr address + current length
        memory.set(this.ptr + this.length, value);     
       // set this.length = this.length++
       this.length++;
       // return this.length
       return this.length;

   }
   
   
   _resize(size){}


   get(idex){}

   pop(){}

   insert(index, value){}

   remove(index){}
}

const test = new Array();
console.log('before:', test.length);
console.log(test.push(75));
console.log('after:', test.length);

