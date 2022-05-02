const getDate = document.querySelector('.date');
const getTime = document.querySelector('.time');

function updateDate() {
  const now = new Date();

  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const date = String(now.getDate()).padStart(2, '0');

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  getDate.innerHTML = `${year}年${month}月${date}日`;
  getTime.innerHTML = `${hours}:${minutes}:${seconds}`;
}

updateDate();
setInterval(updateDate, 1000);
