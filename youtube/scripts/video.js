import * as util from './util.js';

const videoData = [
  {
    thumbnail_path: 'assets/images/thumbnails/bumsup.jpg',
    title: '[#WSWF] 메가 크루 미션 글로벌 대중 평가 | BUMSUP(범접)',
    author: 'The CHOOM (더 춤)',
    avatar_path: 'assets/images/avatars/the-choom.jpg',
    views: '691만회',
    uploaded: '1일 전',
    duration: '3:23'
  },
  {
    thumbnail_path: 'assets/images/thumbnails/wall.jpg',
    title: '벽바둑 재밌네요',
    author: '부젭중',
    avatar_path: 'assets/images/avatars/boo.jpg',
    views: '조회수 5.5만회',
    uploaded: '5일 전',
    duration: '12:34'
  },
  {
    thumbnail_path: 'assets/images/thumbnails/tmoney.jpg',
    title: '아이폰 교통카드 진짜 됩니다. 애플페이 티머니 오피셜 내용 총정리!',
    author: 'ITSub잇섭',
    avatar_path: 'assets/images/avatars/itsub.jpg',
    views: '조회수 66만회',
    uploaded: '2일 전',
    duration: '11:56'
  },
  {
    thumbnail_path: 'assets/images/thumbnails/mysql.jpg',
    title: '왕초보용! 갖고 노는 MySQL 데이터베이스 강좌',
    author: '얄팍한 코딩사전',
    avatar_path: 'assets/images/avatars/yalco.jpg',
    views: '조회수 19만회',
    uploaded: '3년 전',
    duration: '2:52:53'
  },
  {
    thumbnail_path: 'assets/images/thumbnails/finland.jpg',
    title: '오세요 핀란드 보고 어이없는 핀란드인',
    author: '레오티비 LEOTV',
    avatar_path: 'assets/images/avatars/leotv.jpg',
    views: '조회수 226만회',
    uploaded: '1 year ago',
    duration: '10:35'
  },
  {
    thumbnail_path: 'assets/images/thumbnails/youth.jpg',
    title: '[🎬4K Playlist] 청춘, 리스트 [가사] / 무엇이든 될 수 있을 것 같고, 무엇도 될 수 없을 것 같은',
    author: 'Uaight',
    avatar_path: 'assets/images/avatars/uaight.jpg',
    views: '조회수 32만회',
    uploaded: '7개월 전',
    duration: '1:05:50'
  },
  {
    thumbnail_path: 'assets/images/thumbnails/lucy.jpg',
    title: 'LUCY (루시) - 아니 근데 진짜 [가사/Lyrics]',
    author: '웅키',
    avatar_path: 'assets/images/avatars/ungki.jpg',
    views: '조회수 111만회',
    uploaded: '1년 전',
    duration: '3:58'
  },
  {
    thumbnail_path: 'assets/images/thumbnails/samsungcard.jpg',
    title: '[삼성카드] 여기 쓸쓸함 한 잔 주시오',
    author: '삼성카드 Samsung Card',
    avatar_path: 'assets/images/avatars/samsungcard.jpg',
    views: '조회수 64만회',
    uploaded: '3년 전',
    duration: '6:15'
  }
];

function createVideoInfo(video) {
  const info = util.createElement('div', 'video-info');

  const profilePic = util.createImg('profile-picture', video.avatar_path, `${video.author} 프로필`);
  profilePic.tabIndex = 0;
  info.appendChild(profilePic);

  const details = util.createElement('div', 'video-details');

  const title = util.createP('video-title', video.title);
  title.tabIndex = 0;
  details.appendChild(title);

  const author = util.createSpan('video-author', video.author);
  author.tabIndex = 0;
  details.appendChild(author);

  details.appendChild(util.createSpan('video-stats', `${video.views} · ${video.uploaded}`));

  info.appendChild(details);

  return info;
}

function createThumbnail(video) {
  const thumbnail = util.createElement('div', 'video-thumbnail');

  const img = util.createImg('', video.thumbnail_path, `${video.title} 썸네일`);
  img.tabIndex = -1;
  thumbnail.appendChild(img);

  const duration = util.createElement('div', 'video-duration');
  duration.textContent = video.duration;
  thumbnail.appendChild(duration);

  return thumbnail;
}

function createVideoPreview(video) {
  const article = util.createElement('article', 'video-preview');
  article.appendChild(createThumbnail(video));
  article.appendChild(createVideoInfo(video));
  return article;
}

function createVideoGrid() {
  const main = document.querySelector('main');
  videoData.forEach(video => {
    main.appendChild(createVideoPreview(video));
  });
}

document.addEventListener('DOMContentLoaded', createVideoGrid);
