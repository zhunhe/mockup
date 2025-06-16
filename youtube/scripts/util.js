export function createElement(tagName, className) {
  const element = document.createElement(tagName);
  element.className = className;
  return element;
}

export function createP(className, textContent) {
  const p = createElement('p', className);
  p.textContent = textContent;
  return p;
}

export function createImg(className, src, alt) {
  const img = createElement('img', className);
  img.src = src;
  img.alt = alt;
  return img;
}

export function createSpan(className, textContent) {
  const span = createElement('span', className);
  span.textContent = textContent;
  return span;
}
