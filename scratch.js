const Memory = require('./memory.js');

const memory = new Memory;

class Array {
  constructor(){
    this.length = 0;
    this._capacity = 0;
    this.ptr = memory.allocate(this.length);
    this.counter = 0; 
  }

  push(value){
    // if current length + 1 >= capacity - 1, need to resize.
    if (this.length + 1 >= this._capacity - 1){
      this._resize(this.length + 1);
    }
    //put our value at the end of the array
    // assign value to ptr address + current length
    memory.set(this.ptr + this.length, value);     
    // set this.length = this.length++
    this.length++;
    // return this.length
    return this.length;
  }
   
   
  _resize(size){
    this.counter++;
    this.ptr = memory.allocate(size * 3);
    if (this.ptr !== null) {
      this._capacity = size * 3;
    }
  }
   

  get(idex){}

  pop(){}

  insert(index, value){}

  remove(index){}
}




const test = new Array();
console.log(test.push(75));
console.log(test.push(76));
console.log(test.push(77));
console.log(test.push(78));
console.log(test.push(79));
console.log(test.push(74));
console.log(test.push(75));
console.log(test.push(76));
console.log(test.push(77));
console.log(test.push(78));
console.log(test.push(79));
console.log(test.push(74));
console.log(test.push(75));
console.log(test.push(76));
console.log(test.push(77));
console.log(test.push(78));
console.log(test.push(79));
console.log(test.push(74));

