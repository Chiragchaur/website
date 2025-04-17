document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const authContainer = document.getElementById('auth-container');
    const accountContainer = document.getElementById('account-container');
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    // Switch between login/signup tabs
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and forms
            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding form
            this.classList.add('active');
            const tabName = this.getAttribute('data-tab');
            document.getElementById(`${tabName}-form`).classList.add('active');
        });
    });
    
    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // Simple validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        // In a real app, you would send this to your server
        console.log('Login attempt with:', { email, password });
        
        // Simulate successful login
        simulateLogin();
    });
    
    // Signup form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm').value;
        
        // Validation
        if (!name || !email || !password || !confirmPassword) {
            alert('Please fill in all fields');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        // In a real app, you would send this to your server
        console.log('Signup attempt with:', { name, email, password });
        
        // Simulate successful signup and login
        simulateLogin();
    });
    
    // Simulate successful login (for demo)
    function simulateLogin() {
        // Show loading state
        const authBtn = document.querySelector('.auth-form.active .auth-btn');
        authBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        authBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Hide auth container, show account container
            authContainer.style.display = 'none';
            accountContainer.style.display = 'flex';
            
            // Reset form buttons
            document.querySelectorAll('.auth-btn').forEach(btn => {
                btn.innerHTML = btn.classList.contains('auth-btn') ? 'Login' : 'Create Account';
                btn.disabled = false;
            });
            
            // In a real app, you would load user data here
        }, 1500);
    }
    
    // For demo purposes - in a real app you would check login status first
    // For now we'll always show the auth container first
});