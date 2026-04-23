/*
╔══════════════════════════════════════════════════════════════════╗
║                        SCRIPT.JS                                 ║
║         Alabi Ibrahim Emmanuel — Portfolio Website               ║
║                                                                  ║
║  This file controls all the interactive behaviour on the site.   ║
║  It runs automatically when the page loads.                      ║
║                                                                  ║
║  WHAT THIS FILE DOES:                                            ║
║                                                                  ║
║   1. CUSTOM CURSOR         — moves the dot cursor with the mouse ║
║   2. NAV SCROLL STATE      — adds a border to nav when scrolling ║
║   3. HERO BACKGROUND LINES — draws animated lines behind hero    ║
║   4. SCROLL REVEAL         — fades elements in as you scroll     ║
║   5. SKILL BAR FILL        — animates progress bars on scroll    ║
║   6. COUNT-UP NUMBERS      — animates numbers in stat cards      ║
║   7. PROJECT TOGGLE        — opens and closes project panels     ║
║                                                                  ║
║  TIP: Most things you might want to change are clearly marked    ║
║  with "TO CHANGE:" comments throughout this file.                ║
╚══════════════════════════════════════════════════════════════════╝
*/


/* ================================================================
   Wait until the full HTML page has loaded before running anything.
   This prevents errors from trying to find elements that don't
   exist yet.
================================================================ */
document.addEventListener('DOMContentLoaded', function () {


  /* ==============================================================
     1. CUSTOM CURSOR
     ─────────────────
     Moves the small dot and ring to follow the mouse position.
     The dot follows instantly. The ring follows with a slight
     delay (set in style.css via CSS transition) for a trailing effect.

     If you want to disable the cursor entirely:
       - Delete this whole block
       - Delete ".cursor" and ".cursor-ring" styles from style.css
       - Delete the two <div class="cursor"> elements in index.html
  ============================================================== */

  // Get the cursor elements from the HTML
  var cursorDot  = document.getElementById('cursor');
  var cursorRing = document.getElementById('cursorRing');

  // Listen for mouse movement across the whole page
  document.addEventListener('mousemove', function (event) {

    // Move both elements to the current mouse position
    cursorDot.style.left  = event.clientX + 'px';
    cursorDot.style.top   = event.clientY + 'px';
    cursorRing.style.left = event.clientX + 'px';
    cursorRing.style.top  = event.clientY + 'px';

  });


  /* ==============================================================
     2. NAVIGATION BAR — SCROLL STATE
     ──────────────────────────────────
     Adds the CSS class "scrolled" to the nav bar when the user
     scrolls down past 40 pixels. This triggers the frosted glass
     background and border to appear (styled in style.css).

     TO CHANGE WHEN THE BORDER APPEARS:
       Change "40" below to a higher or lower number (pixels).
  ============================================================== */

  // Get the nav element
  var mainNav = document.getElementById('mainNav');

  // Listen for scroll events on the window
  window.addEventListener('scroll', function () {

    if (window.scrollY > 40) {
      // User has scrolled more than 40px — add the "scrolled" class
      mainNav.classList.add('scrolled');
    } else {
      // User is near the top — remove the "scrolled" class
      mainNav.classList.remove('scrolled');
    }

  });


  /* ==============================================================
     3. HERO BACKGROUND LINES
     ─────────────────────────
     Creates and animates the thin grid lines in the hero section
     background. Lines grow from nothing to full width/height.

     TO CHANGE LINE POSITIONS:
       Edit the numbers in the linePositions array below.
       "top" and "left" are percentages of the hero area.
       "delay" is how many seconds before the line starts growing.

     TO ADD MORE LINES:
       Add another object to the linePositions array:
         { type: 'h', top: '40%', delay: 0.6 }   ← horizontal line
         { type: 'v', left: '50%', delay: 0.7 }   ← vertical line

     TO REMOVE ALL LINES:
       Delete this entire block.

     TO CHANGE LINE COLOUR:
       Edit "background: var(--border)" in the code below,
       or change --border in style.css.
  ============================================================== */

  // Get the hero background container
  var heroBg = document.getElementById('heroBg');

  // Define where each line appears and when it starts
  // type: 'h' = horizontal, 'v' = vertical
  // top/left: position as a percentage of the hero section
  // delay: seconds before the animation starts
  var linePositions = [
    { type: 'h', top: '25%', delay: 0.2 },
    { type: 'h', top: '55%', delay: 0.5 },
    { type: 'h', top: '78%', delay: 0.8 },
    { type: 'v', left: '30%', delay: 0.3 },
    { type: 'v', left: '65%', delay: 0.6 },
    { type: 'v', left: '85%', delay: 0.9 }
  ];

  // Create each line and add it to the background container
  linePositions.forEach(function (lineConfig) {

    // Create a new div element for the line
    var line = document.createElement('div');
    line.className = 'hero-line ' + lineConfig.type;

    if (lineConfig.type === 'h') {
      // Horizontal line — positioned by top percentage
      line.style.top   = lineConfig.top;
      line.style.left  = '0';
      line.style.right = '0';
    } else {
      // Vertical line — positioned by left percentage
      line.style.left   = lineConfig.left;
      line.style.top    = '0';
      line.style.bottom = '0';
    }

    // Add the line to the page
    heroBg.appendChild(line);

    // Wait a tiny moment then start the grow animation
    // (the small delay ensures the transition works properly)
    setTimeout(function () {

      if (lineConfig.type === 'h') {
        // Animate width from 0 to 100%
        line.style.transition = 'width 1.4s ease ' + lineConfig.delay + 's, opacity 0.4s ' + lineConfig.delay + 's';
        line.style.width   = '100%';
        line.style.opacity = '1';
      } else {
        // Animate height from 0 to 100%
        line.style.transition = 'height 1.4s ease ' + lineConfig.delay + 's, opacity 0.4s ' + lineConfig.delay + 's';
        line.style.height  = '100%';
        line.style.opacity = '1';
      }

    }, 50);

  });


  /* ==============================================================
     4. SCROLL REVEAL
     ─────────────────
     Watches all elements with classes .reveal, .reveal-left,
     .reveal-right, and .stagger. When they scroll into view,
     the "visible" class is added to them, which triggers the
     CSS transition (defined in style.css) to fade/slide them in.

     TO CHANGE HOW EARLY ELEMENTS APPEAR:
       Change "threshold: 0.1" to a higher number (0 to 1).
       0.1 = trigger when 10% of the element is visible.
       0.3 = trigger when 30% is visible (appears later).

     TO DISABLE SCROLL REVEAL:
       Delete this whole block. Elements will be visible instantly.
  ============================================================== */

  // Find all elements that should animate on scroll
  var revealElements = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .stagger'
  );

  // Create an observer that watches when elements enter the screen
  var revealObserver = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

      if (entry.isIntersecting) {
        // Element has entered the viewport — make it visible
        entry.target.classList.add('visible');

        // Stop watching this element (it only needs to animate once)
        revealObserver.unobserve(entry.target);
      }

    });

  }, {
    threshold: 0.1  // Trigger when 10% of the element is visible
  });

  // Start watching each element
  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });


  /* ==============================================================
     5. SKILL BAR FILL ANIMATION
     ────────────────────────────
     Each skill bar has a data-width="90" attribute on its fill div.
     When the bar scrolls into view, the fill animates from 0%
     to the target width percentage.

     This works separately from scroll reveal so bars always
     animate even if their parent card animated differently.

     TO CHANGE ANIMATION SPEED:
       Edit "transition: width 1.2s" in style.css under .skill-bar-fill

     TO CHANGE A BAR'S PERCENTAGE:
       In index.html, find the bar and change data-width="90"
       Also update the visible text "90%" in .skill-bar-pct
  ============================================================== */

  // Find all skill bar fill elements
  var skillBars = document.querySelectorAll('.skill-bar-fill');

  // Create an observer for each bar
  skillBars.forEach(function (bar) {

    var barObserver = new IntersectionObserver(function (entries) {

      entries.forEach(function (entry) {

        if (entry.isIntersecting) {
          // Read the target width from the data-width attribute
          var targetWidth = bar.getAttribute('data-width');

          // Set the width — this triggers the CSS transition animation
          bar.style.width = targetWidth + '%';

          // Stop watching once animated
          barObserver.unobserve(bar);
        }

      });

    }, {
      threshold: 0.3  // Trigger when 30% of the bar is visible
    });

    barObserver.observe(bar);

  });


  /* ==============================================================
     6. COUNT-UP NUMBER ANIMATION
     ──────────────────────────────
     Stat cards with data-count="3" will count up from 0 to 3
     when they scroll into view.

     TO CHANGE ANIMATION SPEED:
       Change "40" in setInterval(timer, 40) to a higher number
       (milliseconds between each count step — higher = slower)

     TO CHANGE NUMBER OF STEPS:
       Change "/ 30" to a higher number for more steps (smoother)
       or lower for fewer steps (faster but choppier)

     TO DISABLE for a specific card:
       Remove data-count from that element in index.html
  ============================================================== */

  // Find all elements with a data-count attribute
  var countElements = document.querySelectorAll('[data-count]');

  var countObserver = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

      if (entry.isIntersecting) {

        var element    = entry.target;
        var targetNum  = parseInt(element.getAttribute('data-count'));
        var current    = 0;
        var stepSize   = targetNum / 30;  // divide into 30 steps

        // Run the count-up using a repeating timer
        var timer = setInterval(function () {

          current += stepSize;

          if (current >= targetNum) {
            // Reached the target — show final number and stop
            element.textContent = targetNum + '+';
            clearInterval(timer);
          } else {
            // Still counting — show current rounded value
            element.textContent = Math.floor(current) + '+';
          }

        }, 40);  // runs every 40 milliseconds

        // Stop watching once started
        countObserver.unobserve(element);
      }

    });

  }, {
    threshold: 0.5  // Trigger when 50% of the element is visible
  });

  countElements.forEach(function (el) {
    countObserver.observe(el);
  });


}); // end DOMContentLoaded


/* ================================================================
   7. PROJECT TOGGLE — OPEN AND CLOSE
   ────────────────────────────────────
   Called by onclick="toggleProject(0)" in index.html.
   Opens the clicked project and closes any other open project.

   This function must be global (outside DOMContentLoaded)
   so that onclick in the HTML can find it.

   HOW IT WORKS:
     - Each project row has onclick="toggleProject(N)" where N
       is the project's index number (0, 1, 2...)
     - Clicking adds/removes the "open" CSS class on .project-item
     - The CSS in style.css handles the expand animation
     - Only one project can be open at a time

   TO CHANGE SCROLL BEHAVIOUR when opening a project:
     Edit "block: 'nearest'" below.
     Options: 'start', 'center', 'end', 'nearest'

   TO ALLOW MULTIPLE PROJECTS OPEN AT ONCE:
     Remove the line: items.forEach(function(i) { i.classList.remove('open'); });
================================================================ */

function toggleProject(index) {

  // Get all project items on the page
  var items = document.querySelectorAll('.project-item');

  // Get the specific project that was clicked
  var clickedItem = items[index];

  // Check if it is already open
  var isAlreadyOpen = clickedItem.classList.contains('open');

  // Close all projects first
  items.forEach(function (item) {
    item.classList.remove('open');
  });

  // If it was NOT already open — open it
  if (!isAlreadyOpen) {
    clickedItem.classList.add('open');

    // Smoothly scroll so the project is visible
    // Small delay lets the animation start before scrolling
    setTimeout(function () {
      clickedItem.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }, 120);
  }

  // If it WAS already open — it stays closed (we already removed 'open' above)

}

// Shows the button only after scrolling down 300px
window.addEventListener("scroll", function () {
  const btn = document.getElementById("backToTop");
  if (window.scrollY > 300) {
    btn.classList.add("visible");
  } else {
    btn.classList.remove("visible");
  }
});
