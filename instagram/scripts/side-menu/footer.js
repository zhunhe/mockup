const footerLinks = [
  { text: 'About', href: '#' },
  { text: 'Help', href: '#' },
  { text: 'Press', href: '#' },
  { text: 'API', href: '#' }
];

function renderFooterLinks() {
  const footerList = document.querySelector('.side-menu__footer-list');

  footerLinks.forEach(link => {
    const li = document.createElement('li');
    li.className = 'side-menu__footer-item';

    const a = document.createElement('a');
    a.className = 'side-menu__footer-link';
    a.href = link.href;
    a.textContent = link.text;

    li.appendChild(a);
    footerList.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', renderFooterLinks);
