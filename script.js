/* ==========================================
   VITHUANUM GOVERNMENT WEBSITE
   ========================================== */


/* ==========================================
   SIDE MENU
   ========================================== */

function toggleMenu() {

    const menu = document.getElementById("side-menu");
    const overlay = document.getElementById("menu-overlay");

    if (!menu || !overlay) return;

    menu.classList.toggle("open");
    overlay.classList.toggle("open");
}


function closeMenu() {

    const menu = document.getElementById("side-menu");
    const overlay = document.getElementById("menu-overlay");

    if (menu) menu.classList.remove("open");
    if (overlay) overlay.classList.remove("open");
}


document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeMenu();
    }

});


/* ==========================================
   HISTORY TIMELINE
   ========================================== */

document.addEventListener("DOMContentLoaded", function() {

    const timeline =
        document.querySelector(".history-timeline");

    if (!timeline) return;


    const entries =
        Array.from(
            timeline.querySelectorAll(".history-entry")
        );

    if (entries.length === 0) return;


    /* ----------------------------------------
       FORCE LARGE SPACE BETWEEN ERAS
       ---------------------------------------- */

    entries.forEach(function(entry, index) {

        entry.style.height = "auto";
        entry.style.minHeight = "0";
        entry.style.marginBottom = "350px";
        entry.style.paddingBottom = "0";

        if (index === entries.length - 1) {
            entry.style.marginBottom = "0";
        }

    });


    /* ----------------------------------------
       CREATE DOTS
       ---------------------------------------- */

    entries.forEach(function(entry) {

        let dot =
            entry.querySelector(".timeline-dot");

        if (!dot) {

            dot =
                document.createElement("div");

            dot.className = "timeline-dot";

            entry.appendChild(dot);
        }

    });


    /* ----------------------------------------
       MOVING GOLD DOT
       ---------------------------------------- */

    let runner =
        timeline.querySelector(".timeline-runner");

    if (!runner) {

        runner =
            document.createElement("div");

        runner.className =
            "timeline-runner";

        timeline.appendChild(runner);
    }


    /* ----------------------------------------
       BLUE PROGRESS LINE
       ---------------------------------------- */

    let progress =
        timeline.querySelector(".timeline-progress");

    if (!progress) {

        progress =
            document.createElement("div");

        progress.className =
            "timeline-progress";

        timeline.appendChild(progress);
    }


    /* ----------------------------------------
       GET DOT POSITIONS
       ---------------------------------------- */

    function getPositions() {

        const timelineBox =
            timeline.getBoundingClientRect();

        return entries.map(function(entry) {

            const dot =
                entry.querySelector(".timeline-dot");

            const box =
                dot.getBoundingClientRect();

            return (
                box.top -
                timelineBox.top +
                box.height / 2
            );

        });

    }


    /* ----------------------------------------
       UPDATE
       ---------------------------------------- */

    function updateTimeline() {

        const timelineBox =
            timeline.getBoundingClientRect();

        const positions =
            getPositions();

        if (!positions.length) return;


        const screenMiddle =
            window.innerHeight / 2;


        let position =
            screenMiddle -
            timelineBox.top;


        const first =
            positions[0];

        const last =
            positions[positions.length - 1];


        position =
            Math.max(
                first,
                Math.min(position, last)
            );


        /* GOLD DOT */

        runner.style.top =
            position + "px";


        /* BLUE LINE */

        progress.style.top =
            first + "px";

        progress.style.height =
            Math.max(
                0,
                position - first
            ) + "px";


        /* ------------------------------------
           FIND CURRENT ERA
           ------------------------------------ */

        let closest = 0;
        let smallest = Infinity;


        positions.forEach(function(dotPosition, index) {

            const distance =
                Math.abs(
                    dotPosition - position
                );

            if (distance < smallest) {

                smallest = distance;
                closest = index;

            }

        });


        /* ------------------------------------
           ACTIVE ERA
           ------------------------------------ */

        entries.forEach(function(entry, index) {

            entry.classList.toggle(
                "active",
                index === closest
            );

        });


        /* ------------------------------------
           PASSED DOTS
           ------------------------------------ */

        entries.forEach(function(entry, index) {

            const dot =
                entry.querySelector(".timeline-dot");

            if (!dot) return;

            dot.classList.toggle(
                "passed",
                positions[index] <= position
            );

        });

    }


    /* ----------------------------------------
       SCROLL
       ---------------------------------------- */

    let ticking = false;


    window.addEventListener(
        "scroll",
        function() {

            if (ticking) return;

            ticking = true;

            requestAnimationFrame(function() {

                updateTimeline();

                ticking = false;

            });

        },
        { passive: true }
    );


    /* ----------------------------------------
       RESIZE
       ---------------------------------------- */

    window.addEventListener(
        "resize",
        updateTimeline
    );


    /* ----------------------------------------
       INITIAL
       ---------------------------------------- */

    updateTimeline();


    window.addEventListener(
        "load",
        updateTimeline
    );

});
