export function downloadContent(fileName: string, content: string) {
  const hiddenLink = document.createElement('a');

  hiddenLink.download = fileName;
  hiddenLink.style.display = 'none';
  const blob = new Blob([content]);
  hiddenLink.href = URL.createObjectURL(blob);
  document.body.appendChild(hiddenLink);
  hiddenLink.click();
  document.body.removeChild(hiddenLink);
}

export function copyContent(content: string) {
  const aux = document.createElement('input');
  aux.setAttribute('value', content);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand('copy');
  document.body.removeChild(aux);
}
