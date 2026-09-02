/* ========================================
   VITHUANUM GOVERNMENT WEBSITE
   MAIN SCRIPT
   ======================================== */


/* ========================================
   SIDE MENU
   ======================================== */

function toggleMenu() {
    const menu = document.getElementById("side-menu");
    const overlay = document.getElementById("menu-overlay");

    if (!menu || !overlay) {
        return;
    }

    menu.classList.toggle("open");
    overlay.classList.toggle("open");
}


/* ========================================
   CLOSE MENU WITH ESCAPE
   ======================================== */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        const menu = document.getElementById("side-menu");
        const overlay = document.getElementById("menu-overlay");

        if (menu) {
            menu.classList.remove("open");
        }

        if (overlay) {
            overlay.classList.remove("open");
        }
    }

});


/* ========================================
   HISTORY TIMELINE
   ======================================== */

document.addEventListener("DOMContentLoaded", function() {

    const timeline = document.querySelector(".history-timeline");

    /*
       If this isn't the History page,
       stop here.
    */

    if (!timeline) {
        return;
    }


    const entries = Array.from(
        document.querySelectorAll(".history-entry")
    );


    if (entries.length === 0) {
        return;
    }


    /* ====================================
       CREATE TIMELINE DOTS
       ==================================== */

    entries.forEach(function(entry) {

        /*
           Don't create a second dot if one
           already exists in the HTML.
        */

        if (!entry.querySelector(".timeline-dot")) {

            const dot = document.createElement("div");

            dot.className = "timeline-dot";

            entry.appendChild(dot);
        }

    });


    /* ====================================
       UPDATE TIMELINE
       ==================================== */

    function updateTimeline() {

        const timelineRect =
            timeline.getBoundingClientRect();

        const viewportHeight =
            window.innerHeight;


        /*
           The middle of the screen is our
           activation point.
        */

        const triggerPoint =
            viewportHeight * 0.5;


        /*
           Calculate how far the user has
           travelled through the timeline.
        */

        let progress =
            triggerPoint - timelineRect.top;


        const timelineHeight =
            timeline.offsetHeight;


        progress = Math.max(
            0,
            Math.min(progress, timelineHeight)
        );


        const percentage =
            (progress / timelineHeight) * 100;


        /*
           Send the progress percentage
           to the CSS.
        */

        timeline.style.setProperty(
            "--timeline-progress",
            percentage + "%"
        );


        /* =================================
           FIND CURRENT ERA
           ================================= */

        let activeEntry = entries[0];

        let closestDistance = Infinity;


        entries.forEach(function(entry) {

            const rect =
                entry.getBoundingClientRect();

            const entryPoint =
                rect.top + (rect.height / 2);


            const distance =
                Math.abs(entryPoint - triggerPoint);


            /*
               Select the era closest to the
               middle of the screen.
            */

            if (distance < closestDistance) {

                closestDistance = distance;

                activeEntry = entry;
            }

        });


        /* =================================
           UPDATE ACTIVE ERA
           ================================= */

        entries.forEach(function(entry) {

            entry.classList.remove("active");

        });


        if (activeEntry) {

            activeEntry.classList.add("active");

        }

    }


    /* ====================================
       SCROLL EVENT
       ==================================== */

    let ticking = false;


    window.addEventListener("scroll", function() {

        if (!ticking) {

            window.requestAnimationFrame(function() {

                updateTimeline();

                ticking = false;

            });

            ticking = true;
        }

    });


    /* ====================================
       RESIZE EVENT
       ==================================== */

    window.addEventListener("resize", function() {

        updateTimeline();

    });


    /* ====================================
       INITIAL UPDATE
       ==================================== */

    updateTimeline();

});
