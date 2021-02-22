export function updateWindowUrl(route, title, queries) {
  const newUrl = route.path + `?${queries.toString()}`;
  window.history.pushState({ path: newUrl }, title, newUrl);
}

export function downloadBlob(blob, filename = null) {
  const url = window.URL.createObjectURL(blob);
  const a = window.document.createElement("a");
  a.style.display = "none";
  a.href = url;

  if (filename) {
    a.download = filename;
  }
  window.document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  window.document.body.removeChild(a);
}
