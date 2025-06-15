const headerButtons = [
  { icon: 'home.svg', alt: 'home', href: '#' },
  { icon: 'shop.svg', alt: 'shop', href: '#' },
  { icon: 'messenger.svg', alt: 'messenger', href: '#' }
];

function createHeaderButton(button) {
  const link = document.createElement('a');
  link.href = button.href;

  const img = document.createElement('img');
  img.src = `assets/icons/${button.icon}`;
  img.alt = button.alt;

  link.appendChild(img);
  return link;
}

function createProfilePicture() {
  const profileDiv = document.createElement('div');
  profileDiv.className = 'profile__picture';

  const img = document.createElement('img');
  img.src = 'assets/images/avatar.png';
  img.alt = 'profile picture';

  profileDiv.appendChild(img);
  return profileDiv;
}

function loadHeaderButtons() {
  const container = document.getElementById('headerButtons');

  headerButtons.forEach(button => {
    const buttonElement = createHeaderButton(button);
    container.appendChild(buttonElement);
  });

  const profilePicture = createProfilePicture();
  container.appendChild(profilePicture);
}

document.addEventListener('DOMContentLoaded', loadHeaderButtons);
