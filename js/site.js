// Nav toggle (mobile menu)
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
})();

// Interactive title animation for the homepage CTA
(function () {
  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var titles = document.querySelectorAll('.js-motion-title');
  if (!titles.length) return;

  function splitTitle(el) {
    var text = el.getAttribute('data-text') || el.textContent || '';
    el.setAttribute('aria-label', text.trim());
    el.textContent = '';

    Array.from(text).forEach(function (char) {
      if (char === ' ') {
        var space = document.createElement('span');
        space.className = 'motion-space';
        space.setAttribute('aria-hidden', 'true');
        space.textContent = ' ';
        el.appendChild(space);
        return;
      }

      var span = document.createElement('span');
      span.className = 'motion-char';
      span.setAttribute('aria-hidden', 'true');
      span.textContent = char;
      el.appendChild(span);
    });
  }

  function resetChars(chars) {
    chars.forEach(function (char) {
      char.style.transform = '';
    });
  }

  function animateFromPointer(el, clientX) {
    var chars = el.querySelectorAll('.motion-char');
    if (!chars.length) return;

    chars.forEach(function (char) {
      var rect = char.getBoundingClientRect();
      var centerX = rect.left + (rect.width / 2);
      var distance = Math.abs(clientX - centerX);
      var influence = Math.max(0, 1 - (distance / 120));
      var lift = influence * -12;
      var drift = (clientX - centerX) / 35;
      var rotate = (centerX - clientX) / 25;

      char.style.transform = 'translate3d(' + drift.toFixed(2) + 'px,' + lift.toFixed(2) + 'px,0) rotate(' + rotate.toFixed(2) + 'deg)';
    });
  }

  function runWave(el) {
    var chars = el.querySelectorAll('.motion-char');
    chars.forEach(function (char, index) {
      window.setTimeout(function () {
        char.style.transform = 'translate3d(0,-10px,0) rotate(0deg)';
        window.setTimeout(function () {
          char.style.transform = '';
        }, 220);
      }, index * 28);
    });
  }

  titles.forEach(function (title) {
    splitTitle(title);

    if (reducedMotion) return;

    var chars = title.querySelectorAll('.motion-char');
    if (!chars.length) return;

    title.addEventListener('pointermove', function (event) {
      animateFromPointer(title, event.clientX);
    });

    title.addEventListener('pointerleave', function () {
      resetChars(chars);
    });

    title.addEventListener('focus', function () {
      runWave(title);
    });

    title.addEventListener('blur', function () {
      resetChars(chars);
    });

    var touchHandled = false;
    title.addEventListener('touchstart', function (event) {
      if (touchHandled) return;
      touchHandled = true;
      event.preventDefault();
      runWave(title);
      window.setTimeout(function () {
        window.location.href = title.href;
      }, 420);
    }, { passive: false });

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            runWave(title);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.45 });
      observer.observe(title);
    }
  });
})();
