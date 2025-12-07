export function saveProgress(data) {
  localStorage.setItem("runner-save", JSON.stringify(data));
}
export function loadProgress() {
  return JSON.parse(localStorage.getItem("runner-save"));
}
