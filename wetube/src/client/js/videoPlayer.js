const video = document.querySelector('video');
const videoContainerGroup = document.querySelector('#videoControllerGroup');
const videoController = document.querySelector('#videoController');
const playBtn = document.querySelector('#playBtn');
const playBtnIcon = playBtn.querySelector('i');
const time = document.querySelector('#videoTime');
const current = document.querySelector('#currentTime');
const total = document.querySelector('#totalTime');
const timeline = document.querySelector('#timeline');

const muteBtn = document.querySelector('#muteBtn');
const volRange = document.querySelector('#volRange');
const muteBtnIcon = muteBtn.querySelector('i');

const fullScreen = document.querySelector('#fullScreen');
const fullScreenIcon = fullScreen.querySelector('i');

let timeoutId = null;
let moveTimeoutId = null;
let volValue = 0.5; // declare a global variable to return the previous volume when it has unmuted
video.volume = volValue;

// global func
const makeFull = () => {
  video.requestFullscreen();
  fullScreenIcon.classList = 'fa-solid fa-compress';
};

const exitFull = () => {
  document.exitFullscreen();
  fullScreenIcon.classList = 'fa-solid fa-expand';
};

// handle func
const handlePlay = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused
    ? 'fa-solid fa-play'
    : 'fa-solid fa-pause';
};

const handleMute = () => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }

  muteBtnIcon.classList = video.muted
    ? 'fa-solid fa-volume-xmark'
    : 'fa-solid fa-volume-low';
  // 음소거 버튼으로 음소거 시 음량을 0으로, 다시 누르면 원래 음량으로 돌아옴
  volRange.value = video.muted ? 0 : volValue;
};

const handleVolumeRange = (event) => {
  const {
    target: { value },
  } = event;
  // change the icon for each value
  if (value === '0') {
    muteBtnIcon.classList = 'fa-solid fa-volume-xmark';
  } else if (value < '0.5') {
    muteBtnIcon.classList = 'fa-solid fa-volume-low';
  } else if (value >= '0.5') {
    muteBtnIcon.classList = 'fa-solid fa-volume-high';
  }

  if (video.muted) {
    video.muted = false;
    muteBtnIcon.classList = 'fa-solid fa-volume-xmark';
  }
  video.volume = value; // update video volume when volRange value is changed
  volValue = value; // assign value to volValue
};

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substring(11, 19);

const handleLoadedMetadata = () => {
  total.innerHTML = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  current.innerHTML = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const handleTimeline = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

const handleKeydown = (event) => {
  const code = event.code;
  if (code === 'Space') {
    handlePlay();
  }
  if (code === 'KeyF') {
    makeFull();
  } else if (code === 'Escape') {
    exitFull();
  }
};

const handleClickScreen = () => {
  handlePlay();
};

const handleEnded = () => {
  const { id } = videoContainerGroup.dataset;
  fetch(`/api/videos/${id}/view`, {
    method: 'POST',
  });
};

const handleFullscreen = () => {
  const ele = document.fullscreenElement;
  if (ele) {
    exitFull();
  } else {
    makeFull();
  }
};

const hideControls = () => videoController.classList.remove('showing');

const handleMousemove = () => {
  // If mousemove is executed before setTimeout is executed after mouseleave event, clearTImeout() will be re-exectued.
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
  // 마우스가 움직이지 않으면 움직일 때 생성한 setTimeout의 ID를 clear한 후 null로 값을 초기화 -> 새로운 setTimeout을 생성, 실행
  if (moveTimeoutId) {
    clearTimeout(moveTimeoutId);
    moveTimeoutId = null;
  }
  // 마우스를 움직일 때마다 아래의 코드를 동작
  videoController.classList.add('showing');
  moveTimeoutId = setTimeout(hideControls, 2000);
};

const handleMouseleave = () => {
  // setTimout() returns id
  timeoutId = setTimeout(hideControls, 2000);
};

// event listener
playBtn.addEventListener('click', handlePlay);
muteBtn.addEventListener('click', handleMute);
volRange.addEventListener('input', handleVolumeRange);
video.readyState
  ? handleLoadedMetadata()
  : video.addEventListener('loadedmetadata', handleLoadedMetadata);
video.addEventListener('timeupdate', handleTimeUpdate);
timeline.addEventListener('input', handleTimeline);
window.addEventListener('timeupdate', handleTimeUpdate);
window.addEventListener('keydown', handleKeydown);
video.addEventListener('click', handleClickScreen);
video.addEventListener('ended', handleEnded);
fullScreen.addEventListener('click', handleFullscreen);
videoContainerGroup.addEventListener('mousemove', handleMousemove);
videoContainerGroup.addEventListener('mouseleave', handleMouseleave);
