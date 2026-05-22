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