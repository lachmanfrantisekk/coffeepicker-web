/* ==================================================
   COFFEE PICKER
   app.js
   Part 1 / 5
================================================== */

import { QUESTIONS } from "./questions.js";
import recommendCapsules from "./recommendation-engine.js";

/* ==================================================
   DATABASES
================================================== */

const DATABASE_FILES = [

    "./data/capsules/nespresso-original.json",
    "./data/capsules/nespresso-vertuo.json",
    "./data/capsules/starbucks.json",
    "./data/capsules/dolce-gusto.json"

];

/* ==================================================
   APPLICATION STATE
================================================== */

const state = {

    capsules: [],

    selectedSystems: [],

    currentQuestion: 0,

    answers: {

        decaf: null,

        temperature: null,

        cupSize: null,

        milk: null,

        intensity: null,

        flavours: [],

        sweetness: null,

        body: null,

        acidity: null,

        random: false

    },

    results: []

};

/* ==================================================
   DOM
================================================== */

const dom = {

    questionnaire:

        document.getElementById("questionnaire"),

    progress:

        document.getElementById("progress"),

    title:

        document.getElementById("question-title"),

    subtitle:

        document.getElementById("question-subtitle"),

    icon:

        document.getElementById("question-icon"),

    answers:

        document.getElementById("answers"),

    previous:

        document.getElementById("previous-button"),

    next:

        document.getElementById("next-button"),

    finish:

        document.getElementById("finish-button"),

    resultScreen:

        document.getElementById("results")

};

/* ==================================================
   LOAD DATABASES
================================================== */

async function loadDatabase(file) {

    const response = await fetch(file);

    if (!response.ok) {

        throw new Error(

            `Cannot load ${file}`

        );

    }

    return response.json();

}

async function loadCapsules() {

    const loaded = await Promise.all(

        DATABASE_FILES.map(

            loadDatabase

        )

    );

    state.capsules = loaded.flat();

}

/* ==================================================
   FILTER SYSTEMS
================================================== */

function getSelectedCapsules() {

    if (

        state.selectedSystems.length === 0

    ) {

        return state.capsules;

    }

    return state.capsules.filter(

        capsule =>

            state.selectedSystems.includes(

                capsule.system

            )

    );

}

function setSystems(systems) {

    state.selectedSystems = systems;

}

/* ==================================================
   HELPERS
================================================== */

function getCurrentQuestion() {

    return QUESTIONS[

        state.currentQuestion

    ];

}

function isFirstQuestion() {

    return state.currentQuestion === 0;

}

function isLastQuestion() {

    return (

        state.currentQuestion ===

        QUESTIONS.length - 1

    );

}

/* ==================================================
   RENDER QUESTION
================================================== */

function renderQuestion() {

    const question = getCurrentQuestion();

    if (!question) {

        return;

    }

    dom.title.textContent = question.title;

    dom.subtitle.textContent =

        question.subtitle || "";

    dom.icon.textContent =

        question.icon || "";

    dom.answers.innerHTML = "";

    question.options.forEach(option => {

        const button =

            document.createElement("button");

        button.type = "button";

        button.className =

            "answer-button";

        button.dataset.id = option.id;

        button.textContent = option.label;

        button.addEventListener(

            "click",

            () => selectAnswer(option)

        );

        dom.answers.appendChild(button);

    });

    restoreSelection();

    updateProgress();

    updateNavigation();

}

/* ==================================================
   ANSWER SELECTION
================================================== */

function clearSelection() {

    dom.answers

        .querySelectorAll(".answer-button")

        .forEach(button => {

            button.classList.remove(

                "selected"

            );

        });

}

function restoreSelection() {

    const question =

        getCurrentQuestion();

    const value =

        state.answers[question.id];

    if (value === undefined ||

        value === null) {

        return;

    }

    dom.answers

        .querySelectorAll(".answer-button")

        .forEach(button => {

            if (

                Array.isArray(value)

            ) {

                if (

                    value.includes(

                        button.dataset.id

                    )

                ) {

                    button.classList.add(

                        "selected"

                    );

                }

            } else {

                if (

                    button.dataset.id === value

                ) {

                    button.classList.add(

                        "selected"

                    );

                }

            }

        });

}

/* ==================================================
   PROGRESS BAR
================================================== */

function updateProgress() {

    const progress =

        (

            (state.currentQuestion + 1)

            /

            QUESTIONS.length

        ) * 100;

    dom.progress.style.width =

        `${progress}%`;

}

/* ==================================================
   NAVIGATION
================================================== */

function updateNavigation() {

    dom.previous.disabled =

        isFirstQuestion();

    dom.next.hidden =

        isLastQuestion();

    dom.finish.hidden =

        !isLastQuestion();

}

function nextQuestion() {

    if (

        !isLastQuestion()

    ) {

        state.currentQuestion++;

        renderQuestion();

    }

}

function previousQuestion() {

    if (

        !isFirstQuestion()

    ) {

        state.currentQuestion--;

        renderQuestion();

    }

}

/* ==================================================
   EVENTS
================================================== */

dom.previous.addEventListener(

    "click",

    previousQuestion

);

dom.next.addEventListener(

    "click",

    nextQuestion

);

/* ==================================================
   ANSWERS
================================================== */

function selectAnswer(option) {

    const question = getCurrentQuestion();

    if (!question) {

        return;

    }

    if (question.type === "single") {

        state.answers[question.id] = getAnswerValue(

            question,

            option

        );

        clearSelection();

        document

            .querySelector(

                `[data-id="${option.id}"]`

            )

            ?.classList.add(

                "selected"

            );

    }

    if (question.type === "multi") {

        toggleMultiAnswer(

            question,

            option

        );

    }

}

/* ==================================================
   VALUE PARSER
================================================== */

function getAnswerValue(question, option) {

    switch (question.id) {

        case "decaf":

            return option.filters.decaf;

        case "size":

            return option.cupSizes[0];

        case "milk":

            return option.milk;

        case "intensity":

            return option.intensity;

        case "sweetness":

            return option.sweetness;

        case "body":

            return option.body;

        case "acid":

            return option.acidity;

        case "surprise":

            return option.random;

        case "temperature":

            return option.id;

        default:

            return option.id;

    }

}

/* ==================================================
   MULTI SELECT
================================================== */

function toggleMultiAnswer(question, option) {

    if (

        !Array.isArray(

            state.answers.flavours

        )

    ) {

        state.answers.flavours = [];

    }

    const values =

        state.answers.flavours;

    const profile = option.profile;

    const index = values.indexOf(

        profile

    );

    if (index >= 0) {

        values.splice(

            index,

            1

        );

    }

    else {

        if (

            values.length >=

            (question.max || 99)

        ) {

            return;

        }

        values.push(

            profile

        );

    }

    renderQuestion();

}

/* ==================================================
   VALIDATION
================================================== */

function isAnswered() {

    const question =

        getCurrentQuestion();

    const answer =

        state.answers[question.id];

    if (

        Array.isArray(answer)

    ) {

        return answer.length > 0;

    }

    return (

        answer !== null &&

        answer !== undefined

    );

}

function validateCurrentQuestion() {

    if (

        isAnswered()

    ) {

        return true;

    }

    alert(

        "Vyber prosím jednu možnost."

    );

    return false;

}

/* ==================================================
   NAVIGATION OVERRIDE
================================================== */

const oldNextQuestion = nextQuestion;

nextQuestion = function () {

    if (

        !validateCurrentQuestion()

    ) {

        return;

    }

    oldNextQuestion();

};

/* ==================================================
   RESULTS
   Part 4 / 5
================================================== */

function finishQuestionnaire() {

    if (!validateCurrentQuestion()) {

        return;

    }

    const capsules = getSelectedCapsules();

    state.results = recommendCapsules(

        capsules,

        state.answers

    );

    renderResults();

}

/* ==================================================
   RESULTS RENDER
================================================== */

function renderResults() {

    if (!dom.resultScreen) {

        return;

    }

    dom.questionnaire.hidden = true;

    dom.resultScreen.hidden = false;

    dom.resultScreen.innerHTML = "";

    state.results.forEach(

        (result, index) => {

            dom.resultScreen.appendChild(

                createResultCard(

                    result,

                    index

                )

            );

        }

    );

}

/* ==================================================
   RESULT CARD
================================================== */

function createResultCard(result, index) {

    const card =

        document.createElement("article");

    card.className =

        "result-card";

    const medal =

        index === 0

            ? "🥇"

            : index === 1

            ? "🥈"

            : "🥉";

    const reasons =

        result.reasons

            .map(

                reason =>

                    `<li>${reason}</li>`

            )

            .join("");

    card.innerHTML = `

        <div class="result-header">

            <span class="result-medal">

                ${medal}

            </span>

            <h2>

                ${result.capsule.name}

            </h2>

            <span class="result-score">

                ${result.percent}%

            </span>

        </div>

        <img

            class="result-capsule"

            src="./assets/capsules/${result.capsule.assets.capsule}"

            alt="${result.capsule.name}"

        >

        <p class="result-description">

            ${result.capsule.description}

        </p>

        <ul class="result-reasons">

            ${reasons}

        </ul>

        <div class="result-info">

            <span>

                ☕ ${result.capsule.intensity}

            </span>

            <span>

                🔥 ${result.capsule.roast}

            </span>

            <span>

                🥛 ${result.capsule.profile.milk}/10

            </span>

        </div>

        <button

            class="details-button"

            data-id="${result.capsule.id}"

        >

            Více informací

        </button>

    `;

    return card;

}

/* ==================================================
   EVENTS
================================================== */

dom.finish.addEventListener(

    "click",

    finishQuestionnaire

);

/* ==================================================
   STORAGE
================================================== */

const STORAGE_KEY = "coffee-picker-state";

function saveState() {

    const data = {

        answers: state.answers,

        selectedSystems: state.selectedSystems

    };

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(data)

    );

}

function restoreState() {

    const raw = localStorage.getItem(

        STORAGE_KEY

    );

    if (!raw) {

        return;

    }

    try {

        const data = JSON.parse(raw);

        if (data.answers) {

            state.answers = data.answers;

        }

        if (data.selectedSystems) {

            state.selectedSystems =

                data.selectedSystems;

        }

    }

    catch (error) {

        console.error(error);

    }

}

/* ==================================================
   RESET
================================================== */

function resetQuestionnaire() {

    state.currentQuestion = 0;

    state.results = [];

    state.answers = {

        decaf: null,

        temperature: null,

        cupSize: null,

        milk: null,

        intensity: null,

        flavours: [],

        sweetness: null,

        body: null,

        acidity: null,

        random: false

    };

    if (dom.resultScreen) {

        dom.resultScreen.hidden = true;

    }

    if (dom.questionnaire) {

        dom.questionnaire.hidden = false;

    }

    renderQuestion();

}

/* ==================================================
   AUTO SAVE
================================================== */

window.addEventListener(

    "beforeunload",

    saveState

);

/* ==================================================
   INIT
================================================== */

async function init() {

    try {

        await loadCapsules();

        restoreState();

        renderQuestion();

        console.log(

            `Coffee Picker loaded (${state.capsules.length} capsules)`

        );

    }

    catch (error) {

        console.error(error);

        alert(

            "Nepodařilo se načíst databázi kapslí."

        );

    }

}

/* ==================================================
   PUBLIC API
================================================== */

window.CoffeePicker = {

    reset: resetQuestionnaire,

    getResults() {

        return state.results;

    },

    getAnswers() {

        return state.answers;

    },

    getCapsules() {

        return state.capsules;

    }

};

/* ==================================================
   START
================================================== */

init();
