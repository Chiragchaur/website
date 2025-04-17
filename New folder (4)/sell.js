document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle (if not in shared script.js)
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  menuToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  });

  // FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentNode;
      faqItem.classList.toggle('active');
      
      // Close other open items
      faqQuestions.forEach(q => {
        if (q !== question && q.parentNode.classList.contains('active')) {
          q.parentNode.classList.remove('active');
        }
      });
    });
  });

  // Form Validation and Submission
  const applicationForm = document.getElementById('artist-application');
  const successModal = document.getElementById('success-modal');
  const closeModal = document.querySelector('.close-modal');
  
  if (applicationForm) {
    applicationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validate form
      let isValid = true;
      const requiredFields = this.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = 'red';
          isValid = false;
        } else {
          field.style.borderColor = '#ddd';
        }
      });
      
      if (!this.querySelector('#terms').checked) {
        alert('Please agree to the Terms of Service and Artist Agreement');
        isValid = false;
      }
      
      if (isValid) {
        // In a real app, you would send the form data to your server here
        console.log('Form submitted:', {
          name: this.name.value,
          email: this.email.value,
          phone: this.phone.value,
          location: this.location.value,
          artType: this['art-type'].value,
          portfolio: this.portfolio.value,
          experience: this.experience.value,
          hearAbout: this['hear-about'].value
        });
        
        // Show success modal
        successModal.style.display = 'flex';
        
        // Reset form
        this.reset();
      }
    });
  }
  
  // Close modal
  closeModal.addEventListener('click', function() {
    successModal.style.display = 'none';
  });
  
  window.addEventListener('click', function(e) {
    if (e.target === successModal) {
      successModal.style.display = 'none';
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Apply Now buttons
  const applyButtons = document.querySelectorAll('.btn-primary:not([type="submit"])');
  applyButtons.forEach(button => {
    button.addEventListener('click', function() {
      document.getElementById('artist-application').scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});