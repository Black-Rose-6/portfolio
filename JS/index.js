// Helper function to check scroll direction
function getScrollDirection() {
    let scrollDirection;
    if (window.scrollY > this.scrollY) {
        scrollDirection = "down";
    } else if (window.scrollY < this.scrollY) {
        scrollDirection = "up";
    }
    this.scrollY = window.scrollY;
    return scrollDirection;
}

let scrollY = window.scrollY;


// Function to add the animate__show class when the element comes into view
function animateOnScroll() {
    // starting Name and heading of the document
    const textArea = document.querySelector('.text-area');
    const textAreaPosition = textArea.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3; // Adjust the value as needed to control when the animation triggers

    if (textAreaPosition < screenPosition) {
        textArea.classList.add('animate__show');
    }

    // Skills section one by one
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

    // Personal Detail
    const ContentArea = document.querySelector('.Content');
    const ContentAreaPosition = ContentArea.getBoundingClientRect().top;
    const screenPosition1 = window.innerHeight / 2.0; // Adjust the value as needed to control when the animation triggers

    if (ContentAreaPosition < screenPosition1) {
        ContentArea.classList.add('animate__show');
    }

    // Skills
    const ContentskillsArea = document.querySelector('.Content-skills');
    const ContentskillsAreaPosition = ContentskillsArea.getBoundingClientRect().top;
    const screenPosition4 = window.innerHeight / 1.4; // Adjust the value as needed to control when the animation triggers

    if (ContentskillsAreaPosition < screenPosition4) {
        ContentskillsArea.classList.add('animate__show');
    }

    // Contact
    const ContentContactArea = document.querySelector('.Contact');
    const ContentcontactAreaPosition = ContentContactArea.getBoundingClientRect().top;
    const screenPosition9 = window.innerHeight / 1.4; // Adjust the value as needed to control when the animation triggers

    if (ContentcontactAreaPosition < screenPosition9) {
        ContentContactArea.classList.add('animate__show');
    }

    // Python Code box
    const codeBox = document.querySelector('.code-box');
    const codeBoxPosition = codeBox.getBoundingClientRect().top;
    const screenPosition5 = window.innerHeight / 5; // Adjust the value as needed to control when the animation triggers
    // Reusme Button
    const Resumebutton = document.querySelector('.openbtn1');
    // CV button
    const cvContainer = document.querySelector('.cv-container');
    const cvContainerPosition = cvContainer.getBoundingClientRect().top;
    const screenPosition2 = window.innerHeight / 1.4; // Adjust the value as needed to control when the animation triggers
    
    if (codeBoxPosition < screenPosition5) {
        codeBox.classList.add('animate__show');
        Resumebutton.classList.add('animate__show');
        //your code to be executed after 1 second
        if (cvContainerPosition < screenPosition2) {
            cvContainer.classList.add('animate__show');
        }
    }

    // // Resume / Contact button
    // const cvContainer1 = document.querySelector('.cv-container-1');
    // const cvContainer1Position = cvContainer1.getBoundingClientRect().top;
    // const screenPosition8 = window.innerHeight / 1.0; // Adjust the value as needed to control when the animation triggers
    // //your code to be executed after 1 second
    // if (cvContainer1Position < screenPosition8) {
    //     cvContainer1.classList.add('animate__show');
    // }

    // Handle hiding when scrolling up
    if (codeBoxPosition > screenPosition5) {
        codeBox.classList.remove('animate__show');
        Resumebutton.classList.remove('animate__show');
    }
    if (ContentcontactAreaPosition > screenPosition9) {
        ContentContactArea.classList.remove('animate__show');
    }
    if (cvContainerPosition > screenPosition2) {
        cvContainer.classList.remove('animate__show');
    }
}

// Listen for the scroll event and trigger the animation
window.addEventListener('scroll', animateOnScroll);

// Initial check to see if the element is already in view
animateOnScroll();

/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("myMenubar").style.width = "16vw";
    document.getElementsByClassName("openbtn")[0].style.marginLeft = "16vw";
    document.getElementById("main").style.marginLeft = "16vw";
    document.getElementById("resume-page").style.marginLeft = "16vw";
    const Resumebutton = document.querySelector('.openbtn1');
    Resumebutton.classList.add('animate__show');
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("myMenubar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("resume-page").style.marginLeft = "0";
    document.getElementsByClassName("openbtn")[0].style.marginLeft = "0";
    const Resumebutton = document.querySelector('.openbtn1');
    Resumebutton.classList.remove('animate__show');
}

function showresume() {
    const Resumebutton = document.querySelector('.openbtn1');
    Resumebutton.classList.add('animate__show');
    const Gobackbutton = document.querySelector('.openbtn2');
    Gobackbutton.classList.add('animate__show');
    document.getElementById("main").classList.add('animate__show');
    document.getElementById("resume-page").classList.add('animate__show');
}

function goback() {
    const Resumebutton = document.querySelector('.openbtn1');
    Resumebutton.classList.remove('animate__show');
    const Gobackbutton = document.querySelector('.openbtn2');
    Gobackbutton.classList.remove('animate__show');
    document.getElementById("main").classList.remove('animate__show');
    document.getElementById("resume-page").classList.remove('animate__show');
}


// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

