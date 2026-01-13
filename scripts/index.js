import { Book } from "./modules/book.module.js";
import { Library } from "./modules/library.module.js";

const library = new Library();
const addBookDialog = document.getElementById('dialogAddBook');
const bookInfoDialog = document.getElementById('dialogBookInfo');

addBookDialog.querySelector('form').addEventListener('submit', e => {
    const formData = new FormData(e.target);
    if(!e.target.checkValidity()){
        e.target.preventDefault();
        e.target.reportValidity();
    }else{
        const data = Object.fromEntries(formData.entries());
        library.addToLibrary(data['title'], data['author'], data['pages'], 
            data['description'], data['read']);
        fillBookCards();
    }
})
document.getElementById('addBook').addEventListener('click', e => {
    showAddBook(true);
})
bookInfoDialog.querySelector('.read').addEventListener('mouseenter', e => {
    const read = bookInfoDialog.querySelector('.read').dataset.read;
    let readTxt = '';
    switch(read){
        case 'yes':
            readTxt = 'been read';
            break;
        case 'no':
            readTxt = 'not been read';
            break;
        case 'started':
            readTxt = 'been started';
            break;
    }
    bookInfoDialog.querySelector('.tooltip').textContent = `This book has ${readTxt}!`;
})



library.addToLibrary('The Hobbit and The Lost', 'hob', 23, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non ipsa sit, enim praesentium repudiandae ipsam reiciendis. Dolores qui similique omnis ut mollitia sunt, asperiores officiis. Et eius nemo repudiandae enim.', 'yes');
fillBookCards();
showAddBook(true);

function makeBookCard(book){
    const card = document.createElement('div');
    card.classList.add('bookCard');
    card.dataset.bookId = book.id;
    for (let attr in book){
        if(attr == 'id'){
            card.dataset.bookId = book.id
        }else{
            const elem = document.createElement('p');
            elem.classList.add(`${attr}`);
            if(attr == 'pages') {
                elem.textContent = `${book[attr]}`;
                const pg = document.createElement('span');
                pg.textContent = 'pg';
                elem.append(pg);
            }else if(attr != 'read') {
                elem.textContent = `${book[attr]}`;
            }
            card.append(elem);
        }
    }
    const rd = document.createElement('p');
    rd.classList.add('read');
    card.dataset.read = `${book.read}`;
    rd.textContent = '⏺';
    card.append(rd)
    const del = document.createElement('button');
    del.classList.add('delete');
    del.textContent = '❌';
    del.addEventListener('click', e => {
        library.removeFromLibrary(e.target.closest('.bookCard').dataset.bookId);
        fillBookCards();
    })
    card.append(del);
    document.getElementById('books').append(card);
    card.addEventListener('click', e => {
        e.preventDefault();
        const target = e.target.closest('.bookCard');
        console.log(e.target)
        showBookInfo(true, library.getBook(target.dataset.bookId));
    })
}
function fillBookCards(){
    const bookCards = document.getElementById('books').querySelectorAll('.bookCard');
    bookCards.forEach(element => {
        element.remove();
    });
    for(const book in library.lib){
        makeBookCard(library.lib[book]);
    }
}
function showAddBook(bool){
    if(bool === true){
        addBookDialog.inert = true;
        addBookDialog.querySelector('form').reset();
        addBookDialog.showModal();
        addBookDialog.inert = false;
    }else addBookDialog.close();
}
function showBookInfo(bool, book){
    if(bool && book){
        bookInfoDialog.inert = true;
        bookInfoDialog.querySelector('.title').textContent = book.title;
        bookInfoDialog.querySelector('.author').textContent = book.author;
        bookInfoDialog.querySelector('.pages').textContent = book.pages;
        const pg = document.createElement('span');
        pg.textContent = 'pg';
        bookInfoDialog.querySelector('.pages').appendChild(pg);
        bookInfoDialog.querySelector('.description').textContent = book.description;
        bookInfoDialog.querySelector('.read').dataset.read = book.read;
        bookInfoDialog.showModal();
        bookInfoDialog.inert = false;
    }else if(bool == false){
        bookInfoDialog.close();
    }
}
