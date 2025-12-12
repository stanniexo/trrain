// --- high contrast logic ---
// toggles a class on body to change colors
let isHighContrast = false;
const contrastBtn = document.getElementById('contrastBtn');
const body = document.body;

function toggleContrast() {
    isHighContrast = !isHighContrast;
    if (isHighContrast) {
        body.classList.add('high-contrast');
        contrastBtn.innerHTML = "Normal View";
        contrastBtn.classList.remove('btn-outline-light');
        contrastBtn.classList.add('btn-warning', 'text-dark');
    } else {
        body.classList.remove('high-contrast');
        contrastBtn.innerHTML = "High Contrast";
        contrastBtn.classList.remove('btn-warning', 'text-dark');
        contrastBtn.classList.add('btn-outline-light');
    }
}

// --- text size logic  ---
// changes the root font size percent. since bootstrap uses rem (relative em),
// scaling the body font-size scales all text elements proportionally.
const slider = document.getElementById('textSizeSlider');

function slideTextSize(val) {
    body.style.fontSize = val + '%';
}

function changeTextSize(scale) {
    const percentage = scale * 100;
    slider.value = percentage;
    slideTextSize(percentage);
}

// --- animated counters logic ---
// detects when numbers are visible on screen, then counts up
const impactSection = document.getElementById('impact-section');
const counters = document.querySelectorAll('.counter');
let hasAnimated = false;

const animateCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target'); // gets number from html
        const duration = 2000; // 2 seconds animation
        const stepTime = 20;    
        const steps = duration / stepTime;
        const increment = target / steps;
        
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.innerText = target.toLocaleString(); 
                clearInterval(timer);
            } else {
                counter.innerText = Math.ceil(current).toLocaleString();
            }
        }, stepTime);
    });
};

// uses intersection observer to trigger animation only when scrolled into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            animateCounters();
            hasAnimated = true;  
        }
    });
}, { threshold: 0.5 }); 

if(impactSection) observer.observe(impactSection);

// --- real-time validation logic  ---
// regex helpers for validation
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone) => /^\d{10}$/.test(phone); // checks for 10 digits

// attach listeners to specific inputs marked with classes
document.querySelectorAll('.validate-email').forEach(input => {
    input.addEventListener('input', function() {
        if(validateEmail(this.value)) {
            this.classList.add('valid-input');
            this.classList.remove('invalid-input');
        } else {
            this.classList.add('invalid-input');
            this.classList.remove('valid-input');
        }
    });
});

document.querySelectorAll('.validate-phone').forEach(input => {
    input.addEventListener('input', function() {
        if(validatePhone(this.value)) {
            this.classList.add('valid-input');
            this.classList.remove('invalid-input');
        } else {
            this.classList.add('invalid-input');
            this.classList.remove('valid-input');
        }
    });
});

// --- form submission no-reload logic  ---
// prevents default submit, hides form, shows success message
const appForm = document.getElementById('appForm');
const formContainer = document.getElementById('formContainer');
const successMessage = document.getElementById('successMessage');

if(appForm) {
    appForm.addEventListener('submit', function(e) {
        e.preventDefault(); // stops page reload
        formContainer.classList.add('d-none'); // hides form
        successMessage.classList.remove('d-none'); // shows message
    });
}

// --- back to top button logic (feature 5) ---
// shows button when scrolled 50% down, scrolls to top on click
const backToTopBtn = document.getElementById('backToTopBtn');

window.onscroll = function() {
    // calculate scroll percentage
    const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollCurrent = document.documentElement.scrollTop;
    
    if ((scrollCurrent / scrollTotal) > 0.5) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- team modal logic ---
// initializes a generic modal and fills it with specific content
// now accepts 'desc' (description) as the 4th argument
function showTeamModal(img, name, role, desc) {
    // populate modal elements
    document.getElementById('teamModalImg').src = img;
    document.getElementById('teamModalName').innerText = name;
    document.getElementById('teamModalRole').innerText = role;
    document.getElementById('teamModalDesc').innerText = desc; // update description
    
    // show the modal using bootstrap's js api
    var myModal = new bootstrap.Modal(document.getElementById('teamModal'));
    myModal.show();
}

// --- donate preset button logic ---
// updates the input box when a user clicks a preset amount button
document.querySelectorAll('.donate-preset').forEach(btn => {
    btn.addEventListener('click', function() {
        // take the text inside the button (e.g., 500) and put it in the input box
        document.getElementById('donateInput').value = this.innerText;
    });
});