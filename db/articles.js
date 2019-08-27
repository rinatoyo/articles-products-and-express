let articleList = {
  articles: []
};

//set first product ID
// let idNumber = 1;

//product POST function
function create(obj) {
  // obj.id = idNumber;
  console.log("obj in create func", obj);
  articleList.articles.push(obj);
  // idNumber++;
  console.log("inside my articles array", articleList.articles);
  return articleList.articles;
}

function getArt(paramTitle) {
  let lengthOfArticles = articleList.articles.length;
  for (let i = 0; i < lengthOfArticles; i++) {
    if (articleList.articles[i].title === paramTitle) {
      return articleList.articles[i];
    }
  }
}

function edit(title, body, author) {
  let artTitle = getArt(title);
  if (title === artTitle.title) {
    artTitle.title = title;
    artTitle.body = body;
    artTitle.author = author;
  }
  return artTitle;
}

function deleteArt(reqTitle) {
  let deleteObj = getArt(reqTitle);
  let artIndex = articleList.articles.indexOf(deleteObj);
  articleList.articles.splice(artIndex, 1);
}

//get completed list
function retrieveAll() {
  return articleList.articles;
}

module.exports = {
  articleList,
  create,
  getArt,
  edit,
  deleteArt,
  retrieveAll
};
