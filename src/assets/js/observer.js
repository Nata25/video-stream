const options = {
  rootMargin: '0px',
  threshold: 1.0
}

let event

function callback (entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.dispatchEvent(event)
    }
  })
}

export function initObserver () {
  event = document.createEvent('Event')
  event.initEvent('inview', true, true)
  return new IntersectionObserver(callback, options)
}

export function observeElement (observer, target) {
  observer.observe(target)
}

export function unobserveElement (observer, target) {
  observer.unobserve(target)
}
