const toggleThemeBtn = document.querySelector('.header__theme-button');
const themeIcon = document.querySelector('.theme-icon');

const savedTheme = localStorage.getItem('theme') || 'light';
setInitialTheme(savedTheme);

function setInitialTheme(themeKey) {
  if (themeKey === 'dark') {
    document.documentElement.classList.add('darkTheme');
    themeIcon.src = 'assets/icons/sun.svg';
  } else {
    document.documentElement.classList.remove('darkTheme');
    themeIcon.src = 'assets/icons/moon.svg';
  }
}

toggleThemeBtn.addEventListener('click', () => {
  document.documentElement.classList.toggle('darkTheme');

  if (document.documentElement.classList.contains('darkTheme')) {
    localStorage.setItem('theme', 'dark');
    themeIcon.src = 'assets/icons/sun.svg';
  } else {
    localStorage.setItem('theme', 'light');
    themeIcon.src = 'assets/icons/moon.svg';
  }
});
