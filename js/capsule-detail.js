/* ==================================================
   CAPSULE DETAIL
   Coffee Picker v1.0
   Part 1 / 4
================================================== */

const modalRoot =
    document.getElementById("modal-root");

let currentCapsule = null;

let currentModal = null;

/* ==================================================
   INIT
================================================== */

export function initCapsuleDetail() {

    document.addEventListener(

        "capsule:selected",

        event => {

            openCapsuleDetail(

                event.detail

            );

        }

    );

    document.addEventListener(

        "keydown",

        event => {

            if (

                event.key === "Escape"

            ) {

                closeCapsuleDetail();

            }

        }

    );

}

/* ==================================================
   OPEN
================================================== */

export function openCapsuleDetail(

    capsule

) {

    if (

        !capsule

    ) {

        return;

    }

    currentCapsule = capsule;

    removeExistingModal();

    currentModal = createModal(

        capsule

    );

   if (!modalRoot) return;

    modalRoot.appendChild(

        currentModal

    );

    requestAnimationFrame(

        () => {

            currentModal.classList.add(

                "open"

            );

        }

    );

    document.body.classList.add(

        "no-scroll"

    );

}

/* ==================================================
   CLOSE
================================================== */

export function closeCapsuleDetail() {

    if (

        !currentModal

    ) {

        return;

    }

    currentModal.classList.remove(

        "open"

    );

    currentModal.classList.add(

        "closing"

    );

    currentModal.addEventListener(

        "transitionend",

        () => {

            currentModal.remove();

            currentModal = null;

            currentCapsule = null;

            document.body.classList.remove(

                "no-scroll"

            );

        },

        {

            once: true

        }

    );

}

/* ==================================================
   REMOVE
================================================== */

function removeExistingModal() {

    if (

        currentModal

    ) {

        currentModal.remove();

        currentModal = null;

    }

}

/* ==================================================
   MODAL
   Part 2 / 4
================================================== */

function createModal(

    capsule

) {

    const overlay =
        document.createElement("div");

    overlay.className =
        "modal-overlay";

    overlay.addEventListener(

        "click",

        event => {

            if (

                event.target === overlay

            ) {

                closeCapsuleDetail();

            }

        }

    );

    const modal =
        document.createElement("article");

    modal.className =
        "modal capsule-detail";

    modal.append(

        createHeader(

            capsule

        ),

        createBody(

            capsule

        ),

        createFooter()

    );

    overlay.appendChild(

        modal

    );

    return overlay;

}

/* ==================================================
   HEADER
================================================== */

function createHeader(

    capsule

) {

    const header =
        document.createElement("header");

    header.className =
        "modal-header";

    header.innerHTML = `

        <div class="capsule-title">

            <h2>

                ${capsule.name}

            </h2>

            <p>

                ${capsule.brand}

                •

                ${capsule.system}

            </p>

        </div>

    `;

    const closeButton =
        document.createElement("button");

    closeButton.type =
        "button";

    closeButton.className =
        "modal-close";

    closeButton.setAttribute(

        "aria-label",

        "Zavřít"

    );

    closeButton.innerHTML = "&times;";

    closeButton.addEventListener(

        "click",

        closeCapsuleDetail

    );

    header.appendChild(

        closeButton

    );

    return header;

}

/* ==================================================
   BODY
================================================== */

function createBody(

    capsule

) {

    const body =
        document.createElement("div");

    body.className =
        "modal-body";

    body.append(

        createHero(

            capsule

        ),

        createInformation(

            capsule

        )

    );

    return body;

}

/* ==================================================
   HERO
   Part 3 / 4
================================================== */

function createHero(

    capsule

) {

    const hero =
        document.createElement("section");

    hero.className =
        "capsule-hero";

    const image =
        document.createElement("img");

    image.className =
        "capsule-image";

    image.src =
        `./assets/capsules/${capsule.assets.capsule}`;

    image.alt =
        capsule.name;

    image.loading =
        "eager";

    const content =
        document.createElement("div");

    content.className =
        "capsule-summary";

    content.innerHTML = `

        <p class="capsule-description">

            ${capsule.description}

        </p>

        <div class="capsule-badges">

            <span class="badge">

                Intenzita ${capsule.intensity}

            </span>

            <span class="badge">

                ${capsule.roast}

            </span>

            <span class="badge">

                ${capsule.system}

            </span>

        </div>

    `;

    hero.append(

        image,

        content

    );

    return hero;

}

/* ==================================================
   INFORMATION
================================================== */

function createInformation(

    capsule

) {

    const wrapper =
        document.createElement("section");

    wrapper.className =
        "capsule-information";

    wrapper.append(

        createInfoGrid(

            capsule

        ),

        createFlavourSection(

            capsule

        )

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
        document.createElement("div");

    grid.className =
        "capsule-grid";

    grid.innerHTML = `

        <div>

            <strong>Velikost šálku</strong>

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

        <div>

            <strong>Pražení</strong>

            <span>

                ${capsule.roast}

            </span>

        </div>

        <div>

            <strong>Intenzita</strong>

            <span>

                ${capsule.intensity}/13

            </span>

        </div>

    `;

    return grid;

}

/* ==================================================
   FLAVOURS
================================================== */

function createFlavourSection(

    capsule

) {

    const section =
        document.createElement("section");

    section.className =
        "capsule-flavours";

    const title =
        document.createElement("h3");

    title.textContent =
        "Chuťový profil";

    const list =
        document.createElement("div");

    list.className =
        "flavour-list";

   (capsule.officialNotes || []).forEach(

    flavour => {

        const item =
            document.createElement("span");

        item.className =
            "flavour-chip";

        item.textContent =
            flavour;

        list.appendChild(item);

    }

);

    section.append(

        title,

        list

    );

    return section;

}

/* ==================================================
   FOOTER
   Part 4 / 4
================================================== */

function createFooter() {

    const footer =
        document.createElement("footer");

    footer.className =
        "modal-footer";

    const closeButton =
        document.createElement("button");

    closeButton.type =
        "button";

    closeButton.className =
        "btn btn-primary";

    closeButton.textContent =
        "Zavřít";

    closeButton.addEventListener(

        "click",

        closeCapsuleDetail

    );

    footer.appendChild(

        closeButton

    );

    return footer;

}

/* ==================================================
   HELPERS
================================================== */

export function isCapsuleDetailOpen() {

    return currentModal !== null;

}

export function getCurrentCapsule() {

    return currentCapsule;

}

export function destroyCapsuleDetail() {

    if (

        currentModal

    ) {

        currentModal.remove();

    }

    currentModal = null;

    currentCapsule = null;

    document.body.classList.remove(

        "no-scroll"

    );

}

/* ==================================================
   AUTO INIT
================================================== */

initCapsuleDetail();

/* ==================================================
   EXPORT
================================================== */

export default {

    initCapsuleDetail,

    openCapsuleDetail,

    closeCapsuleDetail,

    isCapsuleDetailOpen,

    getCurrentCapsule,

    destroyCapsuleDetail

};
