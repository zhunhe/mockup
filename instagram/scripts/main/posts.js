const posts = [
  {
    user: {
      name: 'nike',
      avatar: 'assets/images/avatar.png'
    },
    image: 'assets/images/picture.jpeg',
    likes: {
      count: 33,
      users: ['khloekardashian']
    },
    description: 'description',
    timeAgo: '30 minutes ago'
  },
  {
    user: {
      name: 'justinbieber',
      avatar: 'assets/images/avatar.png'
    },
    image: 'assets/images/picture.jpeg',
    likes: {
      count: 42,
      users: ['kendalljenner']
    },
    description: 'description',
    timeAgo: '31 minutes ago'
  }
];

function createHeader(post) {
  const header = document.createElement('div');
  header.className = 'post__header';

  const profile = document.createElement('div');
  profile.className = 'post__profile';

  const avatarLink = document.createElement('a');
  avatarLink.href = '#';
  avatarLink.className = 'post__avatar';

  const avatarImg = document.createElement('img');
  avatarImg.src = post.user.avatar;
  avatarImg.alt = 'user picture';

  const userLink = document.createElement('a');
  userLink.href = '#';
  userLink.className = 'post__user';
  userLink.textContent = post.user.name;

  const moreButton = document.createElement('button');
  moreButton.className = 'post__more-options';
  const moreIcon = document.createElement('img');
  moreIcon.src = 'assets/icons/more.svg';
  moreButton.appendChild(moreIcon);

  avatarLink.appendChild(avatarImg);
  profile.appendChild(avatarLink);
  profile.appendChild(userLink);
  header.appendChild(profile);
  header.appendChild(moreButton);

  return header;
}

function createContent(post) {
  const content = document.createElement('div');
  content.className = 'post__content';

  const medias = document.createElement('div');
  medias.className = 'post__medias';

  const media = document.createElement('img');
  media.className = 'post__media';
  media.src = post.image;
  media.alt = 'post content';

  medias.appendChild(media);
  content.appendChild(medias);

  return content;
}

function createActionButtons() {
  const buttons = document.createElement('div');
  buttons.className = 'post__buttons';

  const heartButton = document.createElement('button');
  heartButton.className = 'post__button';
  const heartIcon = document.createElement('img');
  heartIcon.src = 'assets/icons/heart.svg';
  heartIcon.alt = 'heart';
  heartButton.appendChild(heartIcon);

  const commentButton = document.createElement('button');
  commentButton.className = 'post__button';
  const commentIcon = document.createElement('img');
  commentIcon.src = 'assets/icons/comment.svg';
  commentIcon.alt = 'comment';
  commentButton.appendChild(commentIcon);

  const bookmarkButton = document.createElement('button');
  bookmarkButton.className = 'post__button post__button--align-right';
  const bookmarkIcon = document.createElement('img');
  bookmarkIcon.src = 'assets/icons/bookmark.svg';
  bookmarkIcon.alt = 'bookmark';
  bookmarkButton.appendChild(bookmarkIcon);

  buttons.appendChild(heartButton);
  buttons.appendChild(commentButton);
  buttons.appendChild(bookmarkButton);

  return buttons;
}

function createLikesInfo(post) {
  const likes = document.createElement('div');
  likes.className = 'post__likes';

  const likesAvatar = document.createElement('a');
  likesAvatar.href = '#';
  likesAvatar.className = 'post__likes-avatar';
  const likesAvatarImg = document.createElement('img');
  likesAvatarImg.src = post.user.avatar;
  likesAvatarImg.alt = 'user picture';
  likesAvatar.appendChild(likesAvatarImg);

  const likesText = document.createElement('span');
  likesText.textContent = 'Liked by ';

  const firstUserLink = document.createElement('a');
  firstUserLink.href = '#';
  firstUserLink.className = 'post__name--underline';
  firstUserLink.textContent = post.likes.users[0];

  const othersLink = document.createElement('a');
  othersLink.href = '#';
  othersLink.textContent = ` and ${post.likes.count} others`;

  likesText.appendChild(firstUserLink);
  likesText.appendChild(othersLink);

  likes.appendChild(likesAvatar);
  likes.appendChild(likesText);

  return likes;
}

function createDescription(post) {
  const description = document.createElement('div');
  description.className = 'post__description';

  const descriptionSpan = document.createElement('span');
  descriptionSpan.textContent = `${post.user.name} ${post.description}`;

  description.appendChild(descriptionSpan);
  return description;
}

function createFooter(post) {
  const footer = document.createElement('div');
  footer.className = 'post__footer';

  const buttons = createActionButtons();
  const infos = document.createElement('div');
  infos.className = 'post__infos';

  const likes = createLikesInfo(post);
  const description = createDescription(post);

  const dateTime = document.createElement('span');
  dateTime.className = 'post__date-time';
  dateTime.textContent = post.timeAgo;

  infos.appendChild(likes);
  infos.appendChild(description);
  infos.appendChild(dateTime);

  footer.appendChild(buttons);
  footer.appendChild(infos);

  return footer;
}

function createPostElement(post) {
  const article = document.createElement('article');
  article.className = 'post';

  const header = createHeader(post);
  const content = createContent(post);
  const footer = createFooter(post);

  article.appendChild(header);
  article.appendChild(content);
  article.appendChild(footer);

  return article;
}

function renderPosts() {
  const postsContainer = document.querySelector('.posts');
  posts.forEach(post => {
    const postElement = createPostElement(post);
    postsContainer.appendChild(postElement);
  });
}

document.addEventListener('DOMContentLoaded', renderPosts);
