/**
 * "Is this a phone?" decided from the device itself (touch screen + small
 * physical screen), not the current window width. Width flips past 768px
 * when a phone is turned sideways, which used to make the graphics rebuild
 * at desktop quality mid-rotation.
 */
export function isPhone(): boolean {
  if (typeof window === "undefined") return false;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const shortSide = Math.min(window.screen.width, window.screen.height);
  return coarse && shortSide < 768;
}
