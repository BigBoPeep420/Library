import { Book } from './book.module.js'

function Library(){
    this.lib = [];
    this.addToLibrary = function(tit, auth, pgs, desc, rd){
        this.lib.push(new Book(tit, auth, pgs, desc, rd));
    }
    this.removeFromLibrary = function(id){
        const index = this.lib.findIndex(book => book.id === id);
        if(index > -1){
            this.lib.splice(index, 1);
        }
    }
    this.getBook = function(id){
        const index = this.lib.findIndex(book => book.id === id)
        if(index > -1){
            return this.lib[index];
        }else{
            console.error('Book not found in this.lib');
        }
    }
}

export { Library };