//  Напиши скрипт который будет сохранять текущее время воспроизведения видео
//  в локальное хранилище и,
// при перезагрузке страницы, продолжать воспроизводить видео с этого времени.

import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const CURRENT_TIME = 'videoplayer-current-time';

player.on('play', function (data) {
  console.log('played the video!');
  //   console.log(data);
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

player.on('timeupdate', throttle(saveVideoStopTime, 1000));

function saveVideoStopTime(data) {
  localStorage.setItem(CURRENT_TIME, data.seconds);
}

function setVideoTime() {
  if (!localStorage.getItem(CURRENT_TIME)) {
    return;
  }
  player.setCurrentTime(localStorage.getItem(CURRENT_TIME));
}

console.log(setVideoTime());
