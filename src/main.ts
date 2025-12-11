import './style.css'
import gsap from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import MorphSVGPlugin from 'gsap/MorphSVGPlugin';

gsap.registerPlugin(ScrollTrigger); // ScrollTrigger Plugin used with Lenis to sync animations with scrolling. 
gsap.registerPlugin(MorphSVGPlugin);

/**
 * Animates the last name when the webpage loads.
*/
function introSection(): void {
  gsap.from("#last-name", {
    duration: 2, x: '100vw', ease: "power4.inOut"
  });
}

/**
 * Animates the project title and horizontally scrolls across each project.
*/
function projectExperienceSection(): void {
  const section: HTMLElement = document.querySelector("#horizontal-project-exp-section") as HTMLElement;
  const titleText: HTMLElement = document.querySelector("#projects-exp-title") as HTMLElement;
  const projectsWrapper: HTMLElement = document.querySelector("#projects-wrapper") as HTMLElement;

  // Create the animation timeline.
  let timeline: gsap.core.Timeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      pin: true,
      start: 'top top', // start the animation when the trigger hits the top of the viewport.
      end: `+=${section.scrollWidth}`,
      scrub: 1,
      invalidateOnRefresh: true,
      snap: {
        snapTo: 'labels',
        duration: { min: 0.2, max: 3 },
        delay: 0.2,
        ease: 'sine.inOut'
      }
    }
  });

  // Get each project's html element.
  const project1: HTMLElement = document.querySelector("#project-1") as HTMLElement;
  const project2: HTMLElement = document.querySelector("#project-2") as HTMLElement;
  const project3: HTMLElement = document.querySelector("#project-3") as HTMLElement;
  const project4: HTMLElement = document.querySelector("#project-4") as HTMLElement;

  // Get each project's x-axis location.
  const project1XAxis = project1.getBoundingClientRect().x;
  const project2XAxis = project2.getBoundingClientRect().x;
  const project3XAxis = project3.getBoundingClientRect().x;
  const project4XAxis = project4.getBoundingClientRect().x;

  const titleEase: string = "sine.inOut"
  const projectEase: string = "none"
  timeline.addLabel("start")
    // Title.
    .from(".ampersand", {
      x: "100vw", ease: titleEase
    })
    .from("#project-word", {
      x: "-100vw", y: "-100vh", ease: titleEase
    })
    .from("#exp-word", {
      x: "100vw", y: "100vh", ease: titleEase
    }, "<")

    // Projects. Moves the wrapper to each project's x-axis.
    .addLabel("project1")
    .to(projectsWrapper, { x: -project1XAxis, ease: projectEase })
    .addLabel("project2")
    .to(projectsWrapper, { x: -project2XAxis, ease: projectEase })
    .addLabel("project3")
    .to(projectsWrapper, { x: -project3XAxis, ease: projectEase })
    .addLabel("project4")
    .to(projectsWrapper, { x: -project4XAxis, ease: projectEase })

    // Title and last project fade out at the same time.
    .addLabel("end")
    .to(projectsWrapper, { x: "-=100vw", ease: projectEase }) // Finish with nothing on the screen except the title.
    .to(titleText, { opacity: 0, ease: "none" }) // Fade the title off the screen.
}


/** 
 * Animate the skills title svg.
 */
function skillsSection(): void {
  const section: HTMLElement = document.querySelector("#vertical-skills-section") as HTMLElement;
  let timeline: gsap.core.Timeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      pin: true,
      start: 'top top', // start the animation when the trigger hits the top of the viewport.
      end: `+=${section.scrollWidth + 500}`,
      scrub: 1,
      invalidateOnRefresh: true,
    }
  });

  timeline.to("#person", { morphSVG: "#i-dot", duration: 2, x: "+=40vw", y: "+=125vh" })
    .to("#dash-2", { morphSVG: "#s-1", duration: 3, x: "+=40vw", y: "+=125vh" })
    .to("#dash-1", { morphSVG: "#k", duration: 3, x: "+=40vw", y: "+=125vh" }, "<")
    .to("#dash-3", { morphSVG: "#i-line", duration: 3, x: "+=40vw", y: "+=125vh" }, "<")
    .to("#dash-4", { morphSVG: "#l-1", duration: 3, x: "+=40vw", y: "+=125vh" }, "<")
    .to("#dash-5", { morphSVG: "#l-2", duration: 3, x: "+=40vw", y: "+=125vh" }, "<")
    .to("#dash-6", { morphSVG: "#s-2", duration: 3, x: "+=40vw", y: "+=125vh" }, "<")
}


// Initialise Lenis.
const lenis = new Lenis({ autoRaf: true });

// Connect GSAP ScrollTrigger to sync animations with scrolling.
lenis.on('scroll', ScrollTrigger.update);

// Call functions.
introSection();
projectExperienceSection();
skillsSection();