// document.addEventListener('DOMContentLoaded', function() {
    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });
    
    const hoverElements = document.querySelectorAll('a, button, .painting-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorFollower.style.width = '60px';
            cursorFollower.style.height = '60px';
            cursorFollower.style.backgroundColor = 'transparent';
            cursorFollower.style.borderColor = 'var(--primary)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorFollower.style.width = '40px';
            cursorFollower.style.height = '40px';
            cursorFollower.style.backgroundColor = 'transparent';
            cursorFollower.style.borderColor = 'var(--primary)';
        });
    });

    // Sticky Navbar
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scrolled');
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scroll down
            navbar.style.top = '-100px';
        } else if (currentScroll < lastScroll) {
            // Scroll up
            navbar.classList.add('scrolled');
            navbar.style.top = '0';
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    menuToggle.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.navbar-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbarMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
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

    // Painting Modal
    const modal = document.getElementById('paintingModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalArtist = document.getElementById('modalArtist');
    const modalPrice = document.getElementById('modalPrice');
    const modalDescription = document.getElementById('modalDescription');
    const closeModal = document.querySelector('.close-modal');
    
    document.querySelectorAll('.view-button').forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.painting-card');
            const imgSrc = card.querySelector('.painting-img').src;
            const title = card.querySelector('h3').textContent;
            const price = card.querySelector('p').textContent;
            const artist = card.querySelector('.signature').textContent;
            
            modalImage.src = imgSrc;
            modalTitle.textContent = title;
            modalArtist.textContent = artist;
            modalPrice.textContent = price;
            modalDescription.textContent = "This exquisite piece comes with a certificate of authenticity and is ready to hang.";
            
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });

    // Countdown Timer
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    function updateCountdown() {
        const now = new Date();
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0);
        
        const diff = midnight - now;
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.section-title, .painting-card, .step, .testimonial-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state
    document.querySelectorAll('.section-title, .painting-card, .step, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});

    // Featured Paintings Data
    const paintings = [
        {
            title: "Whispers of Color",
            price: "$249.99",
            artist: "Artist Mia",
            image: "https://source.unsplash.com/random/600x800/?abstract-painting",
            description: "A vibrant abstract piece that captures the essence of emotion through color."
        },
        {
            title: "Mountain Dreams",
            price: "$349.99",
            artist: "Artist Luca",
            image: "https://source.unsplash.com/random/600x800/?landscape-painting",
            description: "Breathtaking landscape that transports you to serene mountain vistas."
        },
        {
            title: "Soulful Gaze",
            price: "$299.99",
            artist: "Artist Elena",
            image: "https://source.unsplash.com/random/600x800/?portrait-painting",
            description: "An intimate portrait that reveals the depth of human emotion."
        },
        {
            title: "Urban Rhythm",
            price: "$279.99",
            artist: "Artist Carlos",
            image: "https://source.unsplash.com/random/600x800/?cityscape-painting",
            description: "Dynamic cityscape capturing the energy of urban life."
        },
        {
            title: "Ocean's Whisper",
            price: "$329.99",
            artist: "Artist Naomi",
            image: "https://source.unsplash.com/random/600x800/?ocean-painting",
            description: "The tranquil yet powerful essence of the sea in every brushstroke."
        },
        {
            title: "Floral Symphony",
            price: "$269.99",
            artist: "Artist David",
            image: "https://source.unsplash.com/random/600x800/?flower-painting",
            description: "A celebration of nature's beauty in vibrant floral patterns."
        }
    ];

    // Generate Painting Cards
    const galleryContainer = document.querySelector('.gallery-container');
    
    paintings.forEach(painting => {
        const card = document.createElement('div');
        card.className = 'painting-card';
        card.innerHTML = `
            <img src="${painting.image}" alt="${painting.title}" class="painting-img">
            <div class="painting-info">
                <h3>${painting.title}</h3>
                <p>${painting.price}</p>
                <button class="view-button" data-title="${painting.title}" data-artist="${painting.artist}" data-price="${painting.price}" data-image="${painting.image}" data-description="${painting.description}">View Details</button>
            </div>
            <div class="signature">~ ${painting.artist}</div>
        `;
        galleryContainer.appendChild(card);
    });

    // Painting Modal
    const modal = document.getElementById('paintingModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalArtist = document.getElementById('modalArtist');
    const modalPrice = document.getElementById('modalPrice');
    const modalDescription = document.getElementById('modalDescription');
    const closeModal = document.querySelector('.close-modal');
    
    document.querySelectorAll('.view-button').forEach(button => {
        button.addEventListener('click', () => {
            modalImage.src = button.dataset.image;
            modalTitle.textContent = button.dataset.title;
            modalArtist.textContent = button.dataset.artist;
            modalPrice.textContent = button.dataset.price;
            modalDescription.textContent = button.dataset.description;
            
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });

    // Countdown Timer
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    function updateCountdown() {
        const now = new Date();
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0);
        
        const diff = midnight - now;
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Drag and Drop Painting Preview
    const previewPainting = document.querySelector('.preview-painting');
    const roomWall = document.querySelector('.room-wall');
    
    let isDragging = false;
    let offsetX, offsetY;
    
    previewPainting.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - previewPainting.getBoundingClientRect().left;
        offsetY = e.clientY - previewPainting.getBoundingClientRect().top;
        previewPainting.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const roomRect = roomWall.getBoundingClientRect();
        let x = e.clientX - roomRect.left - offsetX;
        let y = e.clientY - roomRect.top - offsetY;
        
        // Constrain to room boundaries
        x = Math.max(0, Math.min(x, roomRect.width - previewPainting.offsetWidth));
        y = Math.max(0, Math.min(y, roomRect.height - previewPainting.offsetHeight));
        
        previewPainting.style.left = x + 'px';
        previewPainting.style.top = y + 'px';
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
        previewPainting.style.cursor = 'grab';
    });
    
    // Make painting draggable on touch devices
    previewPainting.addEventListener('touchstart', (e) => {
        isDragging = true;
        const touch = e.touches[0];
        offsetX = touch.clientX - previewPainting.getBoundingClientRect().left;
        offsetY = touch.clientY - previewPainting.getBoundingClientRect().top;
        e.preventDefault();
    });
    
    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        const roomRect = roomWall.getBoundingClientRect();
        let x = touch.clientX - roomRect.left - offsetX;
        let y = touch.clientY - roomRect.top - offsetY;
        
        x = Math.max(0, Math.min(x, roomRect.width - previewPainting.offsetWidth));
        y = Math.max(0, Math.min(y, roomRect.height - previewPainting.offsetHeight));
        
        previewPainting.style.left = x + 'px';
        previewPainting.style.top = y + 'px';
        e.preventDefault();
    });
    
    document.addEventListener('touchend', () => {
        isDragging = false;
    });

    // Scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.section-title, .painting-card, .step, .testimonial-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state
    document.querySelectorAll('.section-title, .painting-card, .step, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});

// Add to your existing script.js

// Artist Registration Modal
const artistRegisterBtn = document.querySelector('.artist-register');
const artistModal = document.createElement('div');
artistModal.className = 'modal';
artistModal.innerHTML = `
    <div class="modal-content">
        <span class="close-modal">&times;</span>
        <div class="modal-body">
            <h3>Join Our Artist Community</h3>
            <form id="artist-form">
                <div class="form-group">
                    <input type="text" placeholder="Full Name" required>
                </div>
                <div class="form-group">
                    <input type="email" placeholder="Email" required>
                </div>
                <div class="form-group">
                    <input type="password" placeholder="Password" required>
                </div>
                <div class="form-group">
                    <textarea placeholder="Brief artist bio"></textarea>
                </div>
                <div class="form-group">
                    <label>Upload Portfolio (Max 5 images)</label>
                    <input type="file" multiple accept="image/*">
                </div>
                <button type="submit" class="cta-button">Submit Application</button>
            </form>
        </div>
    </div>
`;

artistRegisterBtn.addEventListener('click', () => {
    document.body.appendChild(artistModal);
    artistModal.classList.add('show');
    document.body.style.overflow = 'hidden';
});

// Close modal when clicking on close button
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('close-modal') || e.target === artistModal) {
        artistModal.classList.remove('show');
        document.body.style.overflow = 'auto';
        if (e.target === artistModal) {
            document.body.removeChild(artistModal);
        }
    }
});

// Artist Login
const portalLoginBtn = document.querySelector('.portal-login');
portalLoginBtn.addEventListener('click', () => {
    // In a real implementation, this would redirect to login page
    alert('Redirecting to artist login portal...');
});

// Form submission
const artistForm = document.getElementById('artist-form');
if (artistForm) {
    artistForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would handle form submission to your backend
        alert('Application submitted successfully! We will review your submission and get back to you soon.');
        artistModal.classList.remove('show');
        document.body.style.overflow = 'auto';
        document.body.removeChild(artistModal);
    });
}

// Optional: Smooth fade-in animation on scroll (if you want animation effects)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.supply-card').forEach(card => {
  card.classList.add('opacity-0'); // make invisible initially
  observer.observe(card);
});

// CSS needed for fade-in (add this in your CSS)
.fade-in {
  opacity: 1 !important;
  transform: translateY(0);
  transition: all 0.8s ease;
}
.opacity-0 {
  opacity: 0;
  transform: translateY(20px);
}
