function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true,

        // for tablet smooth
        tablet: { smooth: true },

        // for mobile
        smartphone: { smooth: true }
    });
    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        }
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    ScrollTrigger.refresh();
}
locomotiveAnimation()

function loadingAnimation() {
    let tl = gsap.timeline()
    tl.from(".page1", {
        opacity: 0,
        duration: 0.2,
        delay: 0.2
    })
    tl.from(".page1", {
        transform: "scaleX(0.7) scaleY(0.2) translateY(80%)",
        borderRadius: "150px",
        duration: 2,
        ease: "expo.out"
    })
    tl.from("nav", {
        opacity: 0,
        delay: -0.2
    })
    tl.from(".page1 h1, .page1 p, .page1 div", {
        opacity: 0,
        duration: 0.5,
        stagger: 0.2
    })
}
loadingAnimation();

function navAnimation() {
    var nav = document.querySelector("nav")
    nav.addEventListener("mouseenter", function () {
        let tl = gsap.timeline();
        tl.to(".nav-bottom", {
            height: "21vh",
            duration: 0.5
        })
        tl.to(".nav-part2 h5", {
            display: "block",
            duration: 0.1
        })
        tl.to(".nav-part2 h5 span", {
            y: 0,
            stagger: {
                amount: 0.5
            }
        })
    })

    nav.addEventListener("mouseleave", function () {
        let tl = gsap.timeline();
        tl.to(".nav-part2 h5 span", {
            y: 25,
            stagger: {
                amount: 0.2
            }
        })
        tl.to(".nav-part2 h5", {
            display: "none",
            duration: 0.1
        })
        tl.to(".nav-bottom", {
            height: 0,
            duration: 0.2
        })
    })

}
navAnimation();


function cursor() {
    console.clear();

    // Select the circle element
    const circleElement = document.querySelector('.circle');

    // Create objects to track mouse position and custom cursor position
    const mouse = { x: 0, y: 0 }; // Track current mouse position
    const previousMouse = { x: 0, y: 0 } // Store the previous mouse position
    const circle = { x: 0, y: 0 }; // Track the circle position

    // Initialize variables to track scaling and rotation
    let currentScale = 0; // Track current scale value
    let currentAngle = 0; // Track current angle value

    // Update mouse position on the 'mousemove' event
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    // Smoothing factor for cursor movement speed (0 = smoother, 1 = instant)
    const speed = 0.17;

    // Start animation
    const tick = () => {
        // MOVE
        // Calculate circle movement based on mouse position and smoothing
        circle.x += (mouse.x - circle.x) * speed;
        circle.y += (mouse.y - circle.y) * speed;
        // Create a transformation string for cursor translation
        const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;

        // SQUEEZE
        // 1. Calculate the change in mouse position (deltaMouse)
        const deltaMouseX = mouse.x - previousMouse.x;
        const deltaMouseY = mouse.y - previousMouse.y;
        // Update previous mouse position for the next frame
        previousMouse.x = mouse.x;
        previousMouse.y = mouse.y;
        // 2. Calculate mouse velocity using Pythagorean theorem and adjust speed
        const mouseVelocity = Math.min(Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * 4, 150);
        // 3. Convert mouse velocity to a value in the range [0, 0.5]
        const scaleValue = (mouseVelocity / 150) * 0.5;
        // 4. Smoothly update the current scale
        currentScale += (scaleValue - currentScale) * speed;
        // 5. Create a transformation string for scaling
        const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;

        // ROTATE
        // 1. Calculate the angle using the atan2 function
        const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI;
        // 2. Check for a threshold to reduce shakiness at low mouse velocity
        if (mouseVelocity > 20) {
            currentAngle = angle;
        }
        // 3. Create a transformation string for rotation
        const rotateTransform = `rotate(${currentAngle}deg)`;

        // Apply all transformations to the circle element in a specific order: translate -> rotate -> scale
        circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;

        // Request the next frame to continue the animation
        window.requestAnimationFrame(tick);
    }

    // Start the animation loop
    tick();
}
cursor();



function page2Animation() {
    var rightElems = document.querySelectorAll(".right-elem");

    rightElems.forEach(function (elem) {
        elem.addEventListener("mouseenter", function () {
            gsap.to(elem.childNodes[3], {
                opacity: 1,
                scale: 1
            })
        })
        elem.addEventListener("mouseleave", function () {
            gsap.to(elem.childNodes[3], {
                opacity: 0,
                scale: 0
            })
        })
        elem.addEventListener("mousemove", function (dets) {
            gsap.to(elem.childNodes[3], {
                x: dets.x - elem.getBoundingClientRect().x - 60,
                y: dets.y - elem.getBoundingClientRect().y - 200
            })
        })
    })
}
page2Animation();

function page3VideoAnimation() {
    var page3center = document.querySelector(".page3-center");
    var video = document.querySelector(".page3 video");

    page3center.addEventListener("click", function () {
        video.play()
        gsap.to(video, {
            transform: "scaleX(1) scaleY(1)",
            opacity: 1,
            borderRadius: 0
        })
    })

    video.addEventListener("click", function () {
        video.pause()
        gsap.to(video, {
            transform: "scaleX(0.7) scaleY(0)",
            opacity: 0,
            borderRadius: "30px"
        })
    })
}
page3VideoAnimation();

function section() {
    var section = document.querySelectorAll(".sec-right");

    section.forEach(function (elem) {
        elem.addEventListener("mouseenter", function () {
            elem.childNodes[3].style.opacity = 1;
            elem.childNodes[3].play()
        })
        elem.addEventListener("mouseleave", function () {
            elem.childNodes[3].style.opacity = 0;
            elem.childNodes[3].load()
        })
    })

}
section();

function page6Animation() {
    gsap.from(".btm6-part2 h4", {
        x: 0,
        duration: 1,
        scrollTrigger: {
            trigger: ".btm6-part2",
            scroller: ".main",
            start: "top 80%",
            end: "top 10%",
            scrub: true
        }
    })

    gsap.from(".btm6-part3 h4", {
        x: 0,
        duration: 1,
        scrollTrigger: {
            trigger: ".btm6-part2",
            scroller: ".main",
            start: "top 80%",
            end: "top 10%",
            scrub: true
        }
    })

    gsap.from(".btm6-part4 h4", {
        x: 0,
        duration: 1,
        scrollTrigger: {
            trigger: ".btm6-part2",
            scroller: ".main",
            start: "top 80%",
            end: "top 10%",
            scrub: true
        }
    })
}
page6Animation();