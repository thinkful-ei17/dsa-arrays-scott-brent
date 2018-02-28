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
   

  get(index){
      //check it's a valid index
    const index2 = this.ptr + index;
    if( index2 < this.ptr || index2 > this.ptr + this.length - 1){
          return new Error('Not a valid index');
      }
    //memory.get value at this.pointer + index
    return memory.get(this.ptr + index);
}

  pop(){}

  insert(index, value){}

  remove(index){}
}




const test = new Array();
test.push(75);
test.push(76);
test.push(77);
console.log('should be 76', test.get(3));



