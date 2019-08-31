let articleList = {
  articles: []
};

let urlTitle = null;

//article POST function
function create(obj) {
  obj.urlTitle = obj.title.replace(/ /g, "-");
  articleList.articles.push(obj);
  return articleList.articles;
}

function getArt(paramTitle) {
  let formattedTitle = paramTitle
    .split(" ")
    .join("")
    .toLowerCase();
  let lengthOfArticles = articleList.articles.length;
  for (let i = 0; i < lengthOfArticles; i++) {
    if (
      articleList.articles[i].title
        .split(" ")
        .join("")
        .toLowerCase() === formattedTitle
    ) {
      return articleList.articles[i];
    }
  }
}

function edit(title, body, author) {
  let artTitle = getArt(title);
  if (title === artTitle.title) {
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
  return articleList;
}

module.exports = {
  articleList,
  create,
  getArt,
  edit,
  deleteArt,
  retrieveAll
};
