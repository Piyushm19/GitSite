// sticky nav bar
let header = document.querySelector('header');
header.classList.toggle('sticky', window.scrollY > 100);


// scroll reveal
ScrollReveal({ reset: true, 
    distance: '80px', 
    duration: 2000,
    delay: 200
});
ScrollReveal().reveal('.home-content, .heading', {origin: 'top'});
ScrollReveal().reveal('.home-img, .projects-container, .projects-box, .contact form', {origin: 'bottom'});
ScrollReveal().reveal('.home-content h1, .about-img', {origin: 'left'});
ScrollReveal().reveal('.home-content p, .about-content', {origin: 'right'});

const navbarLinks = document.querySelectorAll(".navbar a");

/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', 'particles/particles.json', function() {
  console.log('callback - particles.js config loaded');
});


// Add click event listener to each link
navbarLinks.forEach(link => {
  link.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default behavior of clicking on a link
    const targetId = this.getAttribute("href"); // Get the value of the href attribute

    // Scroll to the target element and add active class to the clicked link
    document.querySelector(targetId).scrollIntoView({behavior: "smooth"});
    navbarLinks.forEach(link => {
      link.classList.remove("active");
    });
    this.classList.add("active");
  });
});

// Add scroll event listener to the window
window.addEventListener("scroll", () => {
  let currentPos = window.scrollY; // Get the current position of the window
  const sections = document.querySelectorAll("section"); // Select all sections on the page

  // Find the section in view
  sections.forEach(section => {
    const top = section.offsetTop - 50; // Calculate the top offset of the section

    if (currentPos >= top) {
      const id = section.getAttribute("id");
      navbarLinks.forEach(link => {
        link.classList.remove("active");
        if(link.getAttribute("href") === `#${id}`){
          link.classList.add("active");
        }
      });
    }
  });
});


const form = document.forms['submit-to-google-sheet']
  const msg = document.getElementById("msg");
  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => {
          msg.innerHTML = 'Message has been successfully sent!'
          setTimeout(function() {
              msg.innerHTML = ""
          }, 5000)
          form.reset()
      })
  .catch(error => console.error('Error!', error.message))
})




// store the progress bar elements in variables
const progressBar = document.querySelectorAll(".bar");
const progressSpan = document.querySelectorAll(".bar span");

// function that animates the progress bar
function animateProgressBar(
  startTime,
  duration,
  startWidth,
  endWidth,
  progressCallback,
  completeCallback
) {
  const currentTime = Date.now() - startTime;
  const fraction = currentTime / duration;

  if (fraction >= 1) {
    progressCallback(endWidth);
    if (completeCallback) completeCallback();
    return; // stop the loop when the animation is complete
  }

  const width = startWidth + (endWidth - startWidth) * fraction;
  progressCallback(width);
  requestAnimationFrame(() =>
    animateProgressBar(startTime, duration, startWidth, endWidth, progressCallback, completeCallback)
  );
}

// progress callback that updates the width of a progress bar
function progressCallback(index, width) {
  progressSpan[index].style.width = `${width}%`;
}

// animations for each progress bar element
function animateSAS() {
  progressSpan.forEach((span) => {
    span.style.width = "0%";
  });

  animateProgressBar(
    Date.now(),
    1000,
    0,
    85,
    (width) => progressCallback(0, width),
    animateR
  );
}

function animateR() {
  animateProgressBar(
    Date.now(),
    1000,
    0,
    80,
    (width) => progressCallback(1, width),
    animatePython
  );
}

function animatePython() {
  animateProgressBar(
    Date.now(),
    1000,
    0,
    75,
    (width) => progressCallback(2, width),
    animateJS
  );
}

function animateJS() {
  animateProgressBar(
    Date.now(),
    1000,
    0,
    70,
    (width) => progressCallback(3, width),
    
    // reset aboutMeAnimationPlayed to false after completing the animations
    () => { aboutMeAnimationPlayed = false; }
  );
}

// store the About Me tab element in a variable
const aboutMeTab = document.querySelector('a[href="#about"]');

// boolean variable to track whether animation has been played
let aboutMeAnimationPlayed = false;

// click handler for About Me tab that calls the animation functions
function aboutMeClickHandler() {
  if (!aboutMeAnimationPlayed) {
    animateSAS();
    aboutMeAnimationPlayed = true;
    
    // use setTimeout to delay resetting the aboutMeAnimationPlayed variable
    setTimeout(() => {
      aboutMeAnimationPlayed = false;
    }, 4000); // adjust this value to change the delay time
  }
}

// add an event listener to the About Me tab that calls the click handler
aboutMeTab.addEventListener("click", aboutMeClickHandler);

// call the animation functions when the page loads
animateSAS();



