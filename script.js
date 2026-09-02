/* ==========================================
   VITHUANUM GOVERNMENT WEBSITE
   MAIN JAVASCRIPT
   ========================================== */


/* ==========================================
   SIDE MENU
   ========================================== */

function toggleMenu() {

    const menu = document.getElementById("side-menu");
    const overlay = document.getElementById("menu-overlay");

    if (!menu || !overlay) {
        return;
    }

    const isOpen = menu.classList.contains("open");

    if (isOpen) {
        menu.classList.remove("open");
        overlay.classList.remove("open");
        document.body.classList.remove("menu-open");
    } else {
        menu.classList.add("open");
        overlay.classList.add("open");
        document.body.classList.add("menu-open");
    }
}


/* ==========================================
   CLOSE MENU
   ========================================== */

function closeMenu() {

    const menu = document.getElementById("side-menu");
    const overlay = document.getElementById("menu-overlay");

    if (menu) {
        menu.classList.remove("open");
    }

    if (overlay) {
        overlay.classList.remove("open");
    }

    document.body.classList.remove("menu-open");
}


/* ==========================================
   ESCAPE KEY
   ========================================== */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeMenu();
    }

});


/* ==========================================
   PAGE LOADED
   ========================================== */

document.addEventListener("DOMContentLoaded", function() {


    /* ======================================
       CLOSE MENU WHEN OVERLAY IS CLICKED
       ====================================== */

    const overlay = document.getElementById("menu-overlay");

    if (overlay) {

        overlay.addEventListener("click", function() {
            closeMenu();
        });

    }


    /* ======================================
       CLOSE MENU AFTER CLICKING A LINK
       ====================================== */

    const menuLinks = document.querySelectorAll("#side-menu a");

    menuLinks.forEach(function(link) {

        link.addEventListener("click", function() {
            closeMenu();
        });

    });


    /* ======================================
       HISTORY TIMELINE
       ====================================== */

    const timeline =
        document.querySelector(".history-timeline");

    if (!timeline) {
        return;
    }


    /* ======================================
       FIND HISTORY ENTRIES
       ====================================== */

    const entries =
        Array.from(
            timeline.querySelectorAll(".history-entry")
        );

    if (entries.length === 0) {
        return;
    }


    /* ======================================
       CREATE DOTS
       ====================================== */

    entries.forEach(function(entry, index) {

        let dot =
            entry.querySelector(".timeline-dot");

        if (!dot) {

            dot =
                document.createElement("div");

            dot.className = "timeline-dot";

            entry.appendChild(dot);
        }

        dot.dataset.index = index;

    });


    /* ======================================
       CREATE MOVING DOT
       ====================================== */

    let movingDot =
        timeline.querySelector(".timeline-moving-dot");

    if (!movingDot) {

        movingDot =
            document.createElement("div");

        movingDot.className =
            "timeline-moving-dot";

        timeline.appendChild(movingDot);
    }


    /* ======================================
       CREATE PROGRESS LINE
       ====================================== */

    let progressLine =
        timeline.querySelector(".timeline-progress");

    if (!progressLine) {

        progressLine =
            document.createElement("div");

        progressLine.className =
            "timeline-progress";

        timeline.appendChild(progressLine);
    }


    /* ======================================
       GET DOT POSITION
       ====================================== */

    function getDotPosition(dot) {

        const timelineRect =
            timeline.getBoundingClientRect();

        const dotRect =
            dot.getBoundingClientRect();

        return (
            dotRect.top -
            timelineRect.top +
            dotRect.height / 2
        );

    }


    /* ======================================
       UPDATE TIMELINE
       ====================================== */

    function updateTimeline() {

        const timelineRect =
            timeline.getBoundingClientRect();

        const viewportHeight =
            window.innerHeight;

        /*
           The moving dot follows the middle
           of the screen while scrolling.
        */

        const screenPoint =
            viewportHeight * 0.5;

        let position =
            screenPoint -
            timelineRect.top;


        /* ==================================
           TIMELINE LIMITS
           ================================== */

        const firstDot =
            entries[0].querySelector(".timeline-dot");

        const lastDot =
            entries[entries.length - 1]
                .querySelector(".timeline-dot");

        if (!firstDot || !lastDot) {
            return;
        }


        const firstPosition =
            getDotPosition(firstDot);

        const lastPosition =
            getDotPosition(lastDot);


        /* ==================================
           KEEP DOT INSIDE TIMELINE
           ================================== */

        position =
            Math.max(
                firstPosition,
                Math.min(
                    position,
                    lastPosition
                )
            );


        /* ==================================
           MOVE THE DOT
           ================================== */

        movingDot.style.top =
            position + "px";


        /* ==================================
           GROW BLUE PROGRESS LINE
           ================================== */

        progressLine.style.top =
            firstPosition + "px";

        progressLine.style.height =
            Math.max(
                0,
                position - firstPosition
            ) + "px";


        /* ==================================
           FIND CURRENT ERA
           ================================== */

        let currentIndex = 0;

        let smallestDistance =
            Infinity;


        entries.forEach(function(entry, index) {

            const dot =
                entry.querySelector(".timeline-dot");

            if (!dot) {
                return;
            }

            const dotPosition =
                getDotPosition(dot);

            const distance =
                Math.abs(
                    dotPosition - position
                );

            if (distance < smallestDistance) {

                smallestDistance =
                    distance;

                currentIndex =
                    index;
            }

        });


        /* ==================================
           UPDATE ACTIVE ERA
           ================================== */

        entries.forEach(function(entry, index) {

            if (index === currentIndex) {

                entry.classList.add("active");

            } else {

                entry.classList.remove("active");

            }

        });


        /* ==================================
           HIGHLIGHT PASSED DOTS
           ================================== */

        entries.forEach(function(entry, index) {

            const dot =
                entry.querySelector(".timeline-dot");

            if (!dot) {
                return;
            }

            const dotPosition =
                getDotPosition(dot);

            if (dotPosition <= position) {

                dot.classList.add("passed");

            } else {

                dot.classList.remove("passed");

            }

        });

    }


    /* ======================================
       SMOOTH SCROLL UPDATE
       ====================================== */

    let animationFrame = null;

    function requestUpdate() {

        if (animationFrame !== null) {
            return;
        }

        animationFrame =
            window.requestAnimationFrame(function() {

                updateTimeline();

                animationFrame = null;

            });

    }


    /* ======================================
       SCROLL
       ====================================== */

    window.addEventListener(
        "scroll",
        requestUpdate,
        { passive: true }
    );


    /* ======================================
       RESIZE
       ====================================== */

    window.addEventListener(
        "resize",
        requestUpdate
    );


    /* ======================================
       INITIAL POSITION
       ====================================== */

    updateTimeline();


    /* ======================================
       HANDLE PAGE LOAD IMAGES
       ====================================== */

    window.addEventListener(
        "load",
        updateTimeline
    );

});
