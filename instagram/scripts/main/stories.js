const users = [
  { username: 'instagram', avatar: 'assets/images/avatar.png' },
  { username: 'cristiano', avatar: 'assets/images/avatar.png' },
  { username: 'leomessi', avatar: 'assets/images/avatar.png' },
  { username: 'selenagomez', avatar: 'assets/images/avatar.png' },
  { username: 'kyliejenner', avatar: 'assets/images/avatar.png' },
  { username: 'therock', avatar: 'assets/images/avatar.png' },
  { username: 'arianagrande', avatar: 'assets/images/avatar.png' },
  { username: 'jlo', avatar: 'assets/images/avatar.png' },
  { username: 'beyonce', avatar: 'assets/images/avatar.png' }
];

function createStoryButton(user) {
  const storyButton = document.createElement('button');
  storyButton.className = 'story';

  const avatar = document.createElement('div');
  avatar.className = 'story__avatar';

  const border = document.createElement('div');
  border.className = 'story__border';

  const picture = document.createElement('div');
  picture.className = 'story__picture';

  const img = document.createElement('img');
  img.src = user.avatar;
  img.alt = 'user picture';

  const username = document.createElement('span');
  username.className = 'story__user';
  username.textContent = user.username;

  picture.appendChild(img);
  avatar.appendChild(border);
  avatar.appendChild(picture);
  storyButton.appendChild(avatar);
  storyButton.appendChild(username);

  return storyButton;
}

function initializeStories() {
  const storiesContainer = document.getElementById('storiesContainer');
  storiesContainer.innerHTML = '';
  users.forEach(user => {
    const storyButton = createStoryButton(user);
    storiesContainer.appendChild(storyButton);
  });
}

document.addEventListener('DOMContentLoaded', initializeStories);
