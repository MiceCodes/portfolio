document.getElementById('DOMContentLoaded', () =>{
    // sticky navigation bar effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', ()=> {
        if(window.scrollY > 50){
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled')
        }
    });


    //smooth scrolling for the navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e){
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target){
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    //scroll reveal animation for the project cards
    const observerOptions ={
        threshold: 0.2, //triggers when 20% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);// stop observing once faded in
            }
        });
    }, observerOptions);

    const projectcards = document.querySelectorAll('.project-card');
    projectcards.forEach(card => {
        //add initial hidden state class
        card.classList.add('hidden-card');
        observer.observe(card);
    });

});

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const submitBtn = document.getElementById("submit-btn");
const btnText = document.getElementById("btn-text");
const btnIcon = document.getElementById("btn-icon");

contactForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // Stop default browser redirect

    // Set loading UI state
    submitBtn.disabled = true;
    btnText.textContent = "Sending...";
    btnIcon.className = "fa-solid fa-spinner fa-spin";
    formStatus.style.display = "none";

    const formData = new FormData(contactForm);

    try {
        const response = await fetch(contactForm.action, {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json",
            },
        });

        if (response.ok) {
            // Success feedback
            showStatus("Thank you! Your message has been sent successfully.", "success");
            contactForm.reset();
        } else {
            // Server error / validation message from Formspree
            const data = await response.json();
            if (Object.hasOwn(data, "errors")) {
                const errorMsg = data["errors"].map(err => err["message"]).join(", ");
                showStatus(errorMsg, "error");
            } else {
                showStatus("Oops! There was a problem sending your message.", "error");
            }
        }
    } catch (error) {
        // Network failure
        showStatus("Network error: Unable to reach the server. Please try again.", "error");
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        btnText.textContent = "Send Message";
        btnIcon.className = "fa-solid fa-paper-plane";
    }
});

function showStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `status-banner ${type}`;
    formStatus.style.display = "block";

    // Auto-hide success message after 6 seconds
    if (type === "success") {
        setTimeout(() => {
            formStatus.style.display = "none";
        }, 6000);
    }
}