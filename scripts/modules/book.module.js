function Book(tit = '', auth = '', pgs = '', desc = '', rd = 'no') {
    this.id = crypto.randomUUID();
    this.title = tit;
    this.author = auth;
    this.pages = pgs;
    this.description = desc;
    this.read = rd;
}

export {Book};