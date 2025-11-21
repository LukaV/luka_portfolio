import gsap from "gsap";

/**
 * Animates the name and hero image when the webpage loads.
 */
function introAnimation(): void {
  gsap.from("#name-title", { duration: 2, y: '-100vh', ease: "back.inOut" });
  gsap.from("#hero", { duration: 2.5, y: '100vh', ease: "expo.out" });
}




introAnimation();
