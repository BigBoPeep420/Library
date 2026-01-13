import { Book } from './book.module.js'

let lib = [];

function addToLibrary(tit, auth, pgs, desc, rd){
    lib.push(new Book(tit, auth, pgs, desc, rd));
}

export { addToLibrary, lib };