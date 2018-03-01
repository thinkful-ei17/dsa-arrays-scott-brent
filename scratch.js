const Memory = require('./memory.js');

const memory = new Memory;

class Array {
  constructor() {
    this._sizeRatio = 2;
    this.length = 0;
    this._capacity = 0;
    this.ptr = memory.allocate(this.length);
  }

  push(value) {
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * this._sizeRatio);
    }
    memory.set(this.ptr + this.length, value); 
    this.length++;
    return this.length;
  }
   
  _resize(size) {
    const oldPtr = this.ptr;
    this.ptr = memory.allocate(size);
    if (this.ptr !== null) { 
      memory.copy(this.ptr, oldPtr, this.length);
      this._capacity = size * this._sizeRatio;
      memory.free(oldPtr);
    }
    else {
      throw new Error('Out of memory');
    }
  }
  
  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index not found');
    }
    return memory.get(this.ptr + index);
  }

  pop() {
    if (this.length === 0) {
      throw new Error('Nothing to pop');
    }
    const poppedElement = this.get(this.length -1);
    this.length--;
    return poppedElement;
  }

  insert(index, value) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index not found');
    }

    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * this._sizeRatio);
    }

    if (index !== this.length) {
      const currentIndex = this.ptr + index;
      const size = this.length - index;
      memory.copy(currentIndex + 1, currentIndex, size);
    }
    memory.set(this.ptr + index, value);
    this.length++;
  }

  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index not found');
    }
    const currentIndex = this.ptr + index;
    const size = this.length - index - 1;
    memory.copy(currentIndex, currentIndex + 1, size);
    this.length--;
  }
}






const test = new Array();
test.push(75);
console.log(test.length, test._capacity);
test.push(76);
console.log(test.length, test._capacity);
test.push(77);
console.log(test.length, test._capacity);
test.push(31);
console.log(test.length, test._capacity);
test.push(79);
console.log(test.length, test._capacity);
test.push(1);
console.log(test.length, test._capacity);
console.log(test.get(0));
console.log('this should be 7', test.insert(1, 24));
console.log(test.length, test._capacity);
console.log(test.length, test._capacity);



// The growth pattern is: 0, 4, 8, 16, 25, 35, 46, 58, 72, 88, ...

// new_allocated = newsize + (newsize/8) + (newsize < 9 ? 3 : 6);
