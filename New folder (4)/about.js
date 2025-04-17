document.addEventListener('DOMContentLoaded', function() {
  // Testimonial slider functionality
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let currentIndex = 0;
  
  // Show testimonial based on index
  function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    currentIndex = index;
  }
  
  // Next testimonial
  function nextTestimonial() {
    let newIndex = currentIndex + 1;
    if (newIndex >= testimonials.length) {
      newIndex = 0;
    }
    showTestimonial(newIndex);
  }
  
  // Previous testimonial
  function prevTestimonial() {
    let newIndex = currentIndex - 1;
    if (newIndex < 0) {
      newIndex = testimonials.length - 1;
    }
    showTestimonial(newIndex);
  }
  
  // Dot click event
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showTestimonial(index);
    });
  });
  
  // Button events
  nextBtn.addEventListener('click', nextTestimonial);
  prevBtn.addEventListener('click', prevTestimonial);
  
  // Auto-rotate testimonials
  let slideInterval = setInterval(nextTestimonial, 5000);
  
  // Pause on hover
  const slider = document.querySelector('.testimonials-slider');
  slider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });
  
  slider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextTestimonial, 5000);
  });
  
  // Mobile menu toggle (if not in shared script.js)
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  menuToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  });
});