// Show all sections on page load
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'block'; // Make all sections visible
        section.classList.remove('active');
    });
    
    // Remove the .active class logic that was hiding sections
    document.querySelector('#home').classList.add('active');
    
    // Highlight active navigation based on scroll position
    window.addEventListener('scroll', highlightNavOnScroll);
});

// Function to highlight navigation based on scroll position
function highlightNavOnScroll() {
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.list');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 200)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === currentSection) {
            item.classList.add('active');
        }
    });
    
    // Update the indicator position
    updateIndicator(currentSection);
}

// Update the indicator position based on active section
function updateIndicator(currentSection) {
    const indicator = document.querySelector('.indicator');
    const activeItem = document.querySelector(`.list[data-section="${currentSection}"]`);
    
    if (activeItem && indicator) {
        const index = Array.from(activeItem.parentElement.children).indexOf(activeItem);
        let width = 70; // Default width
        
        // Responsive adjustments
        if (window.innerWidth <= 600) {
            width = 60;
        } else if (window.innerWidth <= 900) {
            width = 64;
        }
        
        indicator.style.transform = `translateX(calc(${width}px * ${index}))`;
    }
}

// Preserve click navigation functionality
const list = document.querySelectorAll('.list');
list.forEach((item) => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Update active class
        list.forEach((el) => el.classList.remove('active'));
        this.classList.add('active');
        
        // Smooth scroll to section
        const sectionId = this.getAttribute('data-section');
        const section = document.getElementById(sectionId);
        
        if (section) {
            window.scrollTo({
                top: section.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll to Top Button functionality
const scrollToTopBtn = document.getElementById("scrollToTop");

window.onscroll = function() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollToTopBtn.style.display = "flex";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

scrollToTopBtn.onclick = function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send this data to your server
        // For this demo, we'll just show an alert
        alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
        
        // Reset form
        contactForm.reset();
    });
}

const textArray = ["Full Stack Developer", "Web Developer", "UI/UX Designer"];
let textIndex = 0;
let charIndex = 0;
const typingText = document.querySelector(".typing-text");

function typeText() {
    if (charIndex < textArray[textIndex].length) {
        typingText.innerHTML += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 100);
    } else {
        setTimeout(eraseText, 1500);
    }
}

function eraseText() {
    if (charIndex > 0) {
        typingText.innerHTML = textArray[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseText, 50);
    } else {
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(typeText, 500);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeText, 500);
});


