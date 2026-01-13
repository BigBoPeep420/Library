import { Book } from "./modules/book.module.js";
import { addToLibrary, lib } from "./modules/library.module.js";

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
            }else if(attr == 'read'){
                const rd = document.createElement('p');
                rd.classList.add('read');
                card.dataset.read = `${book[attr]}`;
                rd.textContent = '⏺';
                elem.append(rd)
            }else {
                elem.textContent = `${book[attr]}`;
            }
            card.append(elem);
        }
    }
    document.getElementById('books').append(card);
}
function fillBookCards(){
    for(const book in lib){
        makeBookCard(lib[book]);
    }
}

const jrt = addToLibrary('The Hobbit', 'JRR Tolkein', 300, 
    'A story about a Hobbit who leaves the comfort of his Shire behind to save the world ' +
    'and make new friends along the way.', 'yes');
fillBookCards();


const addBookDiag = document.getElementById('dialogAddBook');
addBookDiag.inert = true;
addBookDiag.showModal();
addBookDiag.inert = false;