const Memory = require('./memory.js');

const memory = new Memory;

class Array {
  constructor(){
    this.length = 0;
    this._capacity = 0;
    this.ptr = memory.allocate(this.length);
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
    const oldPtr = this.ptr;
    this.ptr = memory.allocate(size * 3);
    if (this.ptr !== null) { 
        memory.copy(this.ptr, oldPtr, this.length);
        this._capacity = size * 3;
        memory.free(oldPtr)
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

  pop(){
    const poppedElement = this.get(this.length -1);
    this.length--;
    return poppedElement;
  }

  insert(index, value){
    //check that this.length + 1 is not greater this.capacity
      //if it is, we call resize first
    if (this.length + 1 >= this._capacity){
        this._resize(this.length + 1);
      }

    if (index !== this.length){
     //copy everything from the index forward one index with memory.copy
        const oldIndex = this.ptr + index;
        const newIndex = oldIndex + 1;
        const size = this.length - index;
        memory.copy(newIndex, oldIndex, size);
    }
    //overwrite the index the new value
    memory.set(this.ptr + index, value);
    //increase length by one
    this.length++;
    return this.length;
  }

  remove(index){}
}




const test = new Array();
test.push(75);
test.push(76);
test.push(77);
// test.push(31);
// test.push(79);
// test.push(1);
console.log('this should be 4', test.insert(1, 24));
console.log('should be 24', test.get(1));



// The growth pattern is: 0, 4, 8, 16, 25, 35, 46, 58, 72, 88, ...

// new_allocated = newsize + (newsize/8) + (newsize < 9 ? 3 : 6);
