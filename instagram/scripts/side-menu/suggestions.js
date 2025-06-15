const suggestions = [
  {
    username: 'neymarjr',
    followers: ['kingjames'],
    avatar: 'assets/images/avatar.png'
  },
  {
    username: 'zendaya',
    followers: ['lalalalisa_m'],
    avatar: 'assets/images/avatar.png'
  },
  {
    username: 'badgalriri',
    followers: ['shakira', 'nba'],
    avatar: 'assets/images/avatar.png'
  }
];

function createSuggestionElement(suggestion) {
  const suggestionDiv = document.createElement('div');
  suggestionDiv.className = 'side-menu__suggestion';

  const avatarLink = document.createElement('a');
  avatarLink.href = '#';
  avatarLink.className = 'side-menu__suggestion-avatar';

  const avatarImg = document.createElement('img');
  avatarImg.src = suggestion.avatar;
  avatarImg.alt = 'user picture';

  avatarLink.appendChild(avatarImg);

  const infoDiv = document.createElement('div');
  infoDiv.className = 'side-menu__suggestion-info';

  const usernameLink = document.createElement('a');
  usernameLink.href = '#';
  usernameLink.textContent = suggestion.username;

  const followersSpan = document.createElement('span');
  followersSpan.textContent = `Followed by ${suggestion.followers.join(', ')} and others`;

  infoDiv.appendChild(usernameLink);
  infoDiv.appendChild(followersSpan);

  const followButton = document.createElement('button');
  followButton.className = 'side-menu__suggestion-button';
  followButton.textContent = 'Follow';

  suggestionDiv.appendChild(avatarLink);
  suggestionDiv.appendChild(infoDiv);
  suggestionDiv.appendChild(followButton);

  return suggestionDiv;
}

function loadSuggestions() {
  const container = document.getElementById('suggestionsContainer');

  suggestions.forEach(suggestion => {
    const suggestionElement = createSuggestionElement(suggestion);
    container.appendChild(suggestionElement);
  });
}

document.addEventListener('DOMContentLoaded', loadSuggestions);
