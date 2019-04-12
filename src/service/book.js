import request from '../utils/request';

// 获取首页书架
export function getBookShelf() {
  return request({
    url: `book/bookshelf`
  });
}

//添加书籍
export function addBookShelf(data) {
  return request({
    url: `book/bookshelf`,
    data,
    method:'post'
  });
}

//获取热门书籍
export function getHotBook() {
   return request({
    url: `book/home`
  });
}

//获取书籍
export function getBook(bookId,onlyBookInfo=true) {
  return request({
    url: `book/chapter/${bookId}`,
    data:{
      onlyBookInfo
    }
  });
}

/**
 * @function {*} readBook
 * @param {Number} bookId 
 * @param {Number} chapterNum 
 */
export function readBook(bookId, chapterNum = 1) {
  return request({
    url: `book/chapter/details/${bookId}/${chapterNum}`
  });
}


/**
 * @function searchBook
 * @param {Object} data //request data
 */
export function searchBook(data) {
  data = Object.assign({
    pageIndex: 1
  }, data);
  return request({
    url: `book/search/${data.keyword}`,
    data: data
  });
}

/**
 * @param {Number} bookId 
 * @param {Number} pageIndex 
 */
export function getChapterList(bookId, pageIndex = 1) {
  return request({
    url: `book/chapter/other/${bookId}/${pageIndex}`
  });
}

export function getBookType (type){
  return request({
    url: `book${type}`
  });
}

//获取作者相关书籍
export function getAuthorBook (author) {
  return request({
    url: `book/author/${author}`
  });
}


//获取上一次阅读的位置（没有加入书架时）
export function getLastRead(bookId) {
  return request({
    url: `book/lastRead`,
    data:{
      bookId: bookId
    }
  });
}