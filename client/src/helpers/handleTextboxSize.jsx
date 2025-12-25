/**
 * The function `handleTextboxSize` dynamically adjusts the height of a textarea element based on its
 * content to prevent overflow.
 */
export default function handleTextboxSize(e, minHeight) {
  const textarea = e.target;
  textarea.style.height = "auto";

  if (textarea.scrollHeight > minHeight) {
    textarea.style.height = `${textarea.scrollHeight}px`;
  } else {
    textarea.style.height = `${minHeight}px`;
  }
}
