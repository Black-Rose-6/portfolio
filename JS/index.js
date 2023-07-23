// Function to add the animate__show class when the element comes into view
function animateOnScroll() {
    const textArea = document.querySelector('.text-area');
    const textAreaPosition = textArea.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3; // Adjust the value as needed to control when the animation triggers

    if (textAreaPosition < screenPosition) {
        textArea.classList.add('animate__show');
    }
    
    const myStatusSpans = document.querySelectorAll('.My-Status span');
    const screenPosition3 = window.innerHeight / 1.5; // Adjust the value as needed to control when the animation triggers

    myStatusSpans.forEach((span, index) => {
        const spanPosition = span.getBoundingClientRect().top;
        if (spanPosition < screenPosition3) {
            // Apply animation delay to show spans one by one
            span.style.transitionDelay = `${index * 0.3}s`;
            span.classList.add('animate__show');
        }
    });

    const cvContainer = document.querySelector('.cv-container');
    const cvContainerPosition = cvContainer.getBoundingClientRect().top;
    const screenPosition2 = window.innerHeight / 1.6; // Adjust the value as needed to control when the animation triggers

    if (cvContainerPosition < screenPosition2) {
        cvContainer.classList.add('animate__show');
    }

    const ContentArea = document.querySelector('.Content');
    const ContentAreaPosition = ContentArea.getBoundingClientRect().top;
    const screenPosition1 = window.innerHeight / 2.2; // Adjust the value as needed to control when the animation triggers

    if (ContentAreaPosition < screenPosition1) {
        ContentArea.classList.add('animate__show');
    }

}

// Listen for the scroll event and trigger the animation
window.addEventListener('scroll', animateOnScroll);

// Initial check to see if the element is already in view
animateOnScroll();

/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidebar").style.width = "16vw";
    document.getElementById("main").style.marginLeft = "16vw";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}