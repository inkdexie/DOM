const form = document.querySelector('#book-form');
const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');
const ratingInput = document.querySelector('#rating-input');
const tip = document.querySelector('#tip');
const list = document.querySelector('#book-list');

let books = JSON.parse(localStorage.getItem('books') || '[]');

const save = () => localStorage.setItem('books', JSON.stringify(books));

const render = () => {
  list.innerHTML = '';
  if (books.length === 0) {
    const li = document.createElement('li');
    li.textContent = '暂无藏书';
    list.appendChild(li);
    return;
  }
  books.forEach((book, index) => {
    const li = document.createElement('li');
    const info = document.createElement('span');
    info.textContent = book.title + ' — ' + book.author;
    const right = document.createElement('span');
    const rating = document.createElement('span');
    rating.className = 'rating';
    rating.textContent = '评分: ' + book.rating;
    const del = document.createElement('span');
    del.className = 'del';
    del.textContent = '删除';
    del.addEventListener('click', () => {
      books.splice(index, 1);
      save();
      render();
    });
    right.appendChild(rating);
    right.appendChild(del);
    li.appendChild(info);
    li.appendChild(right);
    list.appendChild(li);
  });
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const rating = Number(ratingInput.value.trim());
  if (title === '') {
    tip.textContent = '书名不能为空';
    return;
  }
  if (author === '') {
    tip.textContent = '作者不能为空';
    return;
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    tip.textContent = '评分必须是1到5的整数';
    return;
  }
  books.push({ title: title, author: author, rating: rating });
  save();
  tip.textContent = '';
  titleInput.value = '';
  authorInput.value = '';
  ratingInput.value = '';
  render();
});

render();
