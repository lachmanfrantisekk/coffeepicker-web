/* ==================================================
   RESULTS
   Coffee Picker v1.0
   Part 1 / 4
================================================== */

const resultsContainer =
    document.getElementById("results");

const MEDALS = [

    "🥇",
    "🥈",
    "🥉"

];

/* ==================================================
   PUBLIC API
================================================== */

export function renderResults(results) {

    clearResults();

    showResults();

    renderHeader(results);

    results.forEach(

        (result, index) => {

            resultsContainer.appendChild(

                createCard(

                    result,

                    index

                )

            );

        }

    );

}

export function updateResults(results) {

    if (

        !results ||

        results.length === 0

    ) {

        renderEmptyState();

        return;

    }

    renderResults(results);

    animateResults();

}

/* ==================================================
   HEADER
================================================== */

function renderHeader(results) {

    const header =
        document.createElement("section");

    header.className =
        "results-header";

    header.innerHTML = `

        <h1>

            Doporučené kapsle

        </h1>

        <p>

            Našli jsme

            <strong>

                ${results.length}

            </strong>

            nejvhodnějších doporučení
            podle tvých odpovědí.

        </p>

    `;

    resultsContainer.appendChild(

        header

    );

}

/* ==================================================
   VISIBILITY
================================================== */

export function showResults() {

    resultsContainer.hidden = false;

}

export function hideResults() {

    resultsContainer.hidden = true;

}

/* ==================================================
   CLEAR
================================================== */

export function clearResults() {

    resultsContainer.replaceChildren();

}

/* ==================================================
   RESULT CARD
   Part 2 / 4
================================================== */

function createCard(

    result,

    index

) {

    const capsule =
        result.capsule;

    const card =
        document.createElement("article");

    card.className =
        "result-card";

    card.dataset.id =
        capsule.id;

    if (index === 0) {

        card.classList.add(

            "best-match"

        );

    }

   card.append(

    createCardHeader(

        capsule,

        result,

        index

    ),

    createCardImage(

        capsule

    ),

    createInfoGrid(

        capsule

    ),

    createDescription(

        capsule

    ),

    createReasons(

        result.reasons

    ),

    createActions(

        capsule

    )

);
    return card;

}

/* ==================================================
   HEADER
================================================== */

function createCardHeader(

    capsule,

    result,

    index

) {

    const header =
        document.createElement("header");

    header.className =
        "result-card-header";

    header.innerHTML = `

        <div class="result-medal">

            ${MEDALS[index] ?? "☕"}

        </div>

        <div class="result-title">

            <h2>

                ${capsule.name}

            </h2>

            <p>

                ${capsule.brand}

                • 

                ${capsule.system}

            </p>

        </div>

        <div class="result-score">

            ${result.percent}%

        </div>

    `;

    return header;

}

/* ==================================================
   IMAGE
================================================== */

function createCardImage(

    capsule

) {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "result-image";

    const image =
        document.createElement("img");

    image.src =
        `./assets/capsules/${capsule.assets.capsule}`;

    image.alt =
        capsule.name;

    image.loading =
        "lazy";

    image.decoding =
        "async";

    wrapper.appendChild(

        image

    );

    return wrapper;

}

/* ==================================================
   INFO GRID
================================================== */

function createInfoGrid(

    capsule

) {

    const grid =
        document.createElement("section");

    grid.className =
        "result-grid";

    grid.innerHTML = `

        <div>

            <strong>Intenzita</strong>

            <span>

                ${capsule.intensity}/13

            </span>

        </div>

        <div>

            <strong>Pražení</strong>

            <span>

                ${capsule.roast}

            </span>

        </div>

        <div>

            <strong>Velikost</strong>

            <span>

                ${capsule.cupSizes.join(", ")}

            </span>

        </div>

        <div>

            <strong>Mléko</strong>

            <span>

                ${capsule.profile.milk}/10

            </span>

        </div>

    `;

    return grid;

}

/* ==================================================
   REASONS
   Part 3 / 4
================================================== */

function createReasons(

    reasons

) {

    const section =
        document.createElement("section");

    section.className =
        "result-reasons";

    const title =
        document.createElement("h3");

    title.textContent =
        "Proč doporučujeme";

    section.appendChild(

        title

    );

    const list =
        document.createElement("ul");

    reasons.forEach(

        reason => {

            const item =
                document.createElement("li");

            item.innerHTML = `

                <span class="reason-icon">

                    ✓

                </span>

                <span>

                    ${reason}

                </span>

            `;

            list.appendChild(

                item

            );

        }

    );

    section.appendChild(

        list

    );

    return section;

}

/* ==================================================
   DESCRIPTION
================================================== */

function createDescription(

    capsule

) {

    const section =
        document.createElement("section");

    section.className =
        "result-description";

    section.innerHTML = `

        <h3>

            Popis

        </h3>

        <p>

            ${capsule.description}

        </p>

    `;

    return section;

}

/* ==================================================
   ACTIONS
================================================== */

function createActions(

    capsule

) {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "result-actions";

    const detailButton =
        document.createElement("button");

    detailButton.type =
        "button";

    detailButton.className =
        "btn btn-primary";

    detailButton.textContent =
        "Více informací";

    detailButton.dataset.id =
        capsule.id;

    detailButton.addEventListener(

        "click",

        () => {

            document.dispatchEvent(

                new CustomEvent(

                    "capsule:selected",

                    {

                        detail: capsule

                    }

                )

            );

        }

    );

    const restartButton =
        document.createElement("button");

    restartButton.type =
        "button";

    restartButton.className =
        "btn btn-glass";

    restartButton.textContent =
        "Vyplnit znovu";

    restartButton.addEventListener(

        "click",

        () => {

            document.dispatchEvent(

                new CustomEvent(

                    "questionnaire:restart"

                )

            );

        }

    );

    wrapper.append(

        detailButton,

        restartButton

    );

    return wrapper;

}

/* ==================================================
   UPDATE CARD
================================================== */

/* Ve funkci createCard()
   nahraď současné:

   card.append(
       createCardHeader(...),
       createCardImage(...),
       createInfoGrid(...)
   );

   tímto:
*/

card.append(

    createCardHeader(

        capsule,

        result,

        index

    ),

    createCardImage(

        capsule

    ),

    createInfoGrid(

        capsule

    ),

    createDescription(

        capsule

    ),

    createReasons(

        result.reasons

    ),

    createActions(

        capsule

    )

);

/* ==================================================
   EMPTY STATE
   Part 4 / 4
================================================== */

export function renderEmptyState() {

    clearResults();

    showResults();

    const empty =
        document.createElement("section");

    empty.className =
        "results-empty";

    empty.innerHTML = `

        <h2>

            ☕ Žádná doporučená kapsle

        </h2>

        <p>

            Nepodařilo se najít
            vhodnou kapsli podle
            zvolených odpovědí.

            Zkus změnit výběr
            nebo rozšířit seznam
            dostupných kapslí.

        </p>

    `;

    resultsContainer.appendChild(

        empty

    );

}

/* ==================================================
   ANIMATIONS
================================================== */

export function animateResults() {

    const cards =
        resultsContainer.querySelectorAll(

            ".result-card"

        );

    cards.forEach(

        (card, index) => {

            card.style.opacity = "0";

            card.style.transform =

                "translateY(30px)";

            requestAnimationFrame(

                () => {

                    setTimeout(

                        () => {

                            card.style.transition =

                                "opacity .4s ease, transform .4s ease";

                            card.style.opacity = "1";

                            card.style.transform =

                                "translateY(0)";

                        },

                        index * 120

                    );

                }

            );

        }

    );

}

/* ==================================================
   HELPERS
================================================== */

export function clearAndHideResults() {

    clearResults();

    hideResults();

}

export function scrollResultsToTop() {

    resultsContainer.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}

export function getResultElement(

    id

) {

    return resultsContainer.querySelector(

        `[data-id="${id}"]`

    );

}

/* ==================================================
   EVENTS
================================================== */

document.addEventListener(

    "questionnaire:restart",

    () => {

        clearAndHideResults();

    }

);

/* ==================================================
   EXPORT
================================================== */

export default {

    renderResults,

    updateResults,

    renderEmptyState,

    animateResults,

    clearResults,

    showResults,

    hideResults,

    clearAndHideResults,

    scrollResultsToTop,

    getResultElement

};
