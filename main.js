// Navigation scroll effect
const navbar = document.getElementById("navbar")
const mobileMenuToggle = document.getElementById("mobileMenuToggle")
const navLinks = document.getElementById("navLinks")

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Mobile menu toggle
mobileMenuToggle?.addEventListener("click", () => {
  navLinks.classList.toggle("active")
})

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active")
  })
})

// Hero carousel
let currentSlide = 0
const slides = document.querySelectorAll(".carousel-slide")
const indicators = document.querySelectorAll(".indicator")

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"))
  indicators.forEach((indicator) => indicator.classList.remove("active"))

  slides[index].classList.add("active")
  indicators[index].classList.add("active")
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length
  showSlide(currentSlide)
}

// Auto-advance carousel
if (slides.length > 0) {
  setInterval(nextSlide, 5000)
}

// Manual carousel control
indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    currentSlide = index
    showSlide(currentSlide)
  })
})

// Statistics carousel
let currentStat = 0
const statSlides = document.querySelectorAll(".stat-slide")
const statIndicators = document.querySelectorAll(".stat-indicator")

function showStat(index) {
  statSlides.forEach((slide) => slide.classList.remove("active"))
  statIndicators.forEach((indicator) => indicator.classList.remove("active"))

  if (statSlides[index] && statIndicators[index]) {
    statSlides[index].classList.add("active")
    statIndicators[index].classList.add("active")
  }
}

function nextStat() {
  currentStat = (currentStat + 1) % statSlides.length
  showStat(currentStat)
}

// Auto-advance statistics
if (statSlides.length > 0) {
  setInterval(nextStat, 4000)
}

// Manual statistics control
statIndicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    currentStat = index
    showStat(currentStat)
  })
})

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href")
    if (href !== "#" && href !== "") {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        const offsetTop = target.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    }
  })
})

// Contact form submission
const contactForm = document.getElementById("contactForm")
contactForm?.addEventListener("submit", (e) => {
  e.preventDefault()

  const formData = new FormData(contactForm)
  const name = formData.get("name")
  const email = formData.get("email")
  const message = formData.get("message")

  // Create mailto link
  const mailtoLink = `mailto:info@africanopportunities.com?subject=Contact from ${name}&body=${encodeURIComponent(message)}%0D%0A%0D%0AFrom: ${name}%0D%0AEmail: ${email}`

  window.location.href = mailtoLink

  // Show success message
  alert("Thank you for your message! Your email client will open to send the message.")
  contactForm.reset()
})

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in")
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".opportunity-card, .video-card, .team-card, .mission-box, .vision-box").forEach((el) => {
  observer.observe(el)
})
