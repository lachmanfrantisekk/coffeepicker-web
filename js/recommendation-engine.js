/* ==================================================
   COFFEE PICKER
   Recommendation Engine
   Part 1 / 3
================================================== */

const SCORE = {

    DECAF_MATCH: 100,
    DECAF_MISMATCH: -1000,

    CUPSIZE_MATCH: 45,
    CUPSIZE_MISMATCH: -80,

    INTENSITY_MAX: 30,

    MILK_MAX: 25,

    BODY_MAX: 15,

    ACIDITY_MAX: 15,

    SWEETNESS_MAX: 15,

    FLAVOUR_MAX: 15,

    RANDOM_BONUS: 8

};

const MAX_RESULTS = 3;

/* ==================================================
   HELPERS
================================================== */

function clamp(value, min, max) {

    return Math.max(min, Math.min(max, value));

}

function difference(a, b) {

    return Math.abs(a - b);

}

function scoreByDistance(target, current, maxDistance, maxScore) {

    const distance = difference(target, current);

    const ratio = clamp(distance / maxDistance, 0, 1);

    return Math.round(maxScore * (1 - ratio));

}

function inRange(value, range) {

    if (!Array.isArray(range)) {

        return false;

    }

    return value >= range[0] && value <= range[1];

}

function cupMatches(selected, capsule) {

    if (!selected) {

        return true;

    }

    if (!capsule?.cupSizes) {

        return false;

    }

    return capsule.cupSizes.includes(selected);

}

function addReason(reasons, text) {

    if (!reasons.includes(text)) {

        reasons.push(text);

    }

}

/* ==================================================
   CAPSULE PREPARATION
================================================== */

function prepareCapsule(capsule) {

    return {

        capsule,

        score: 0,

        reasons: []

    };

}

/* ==================================================
   EXPORT
================================================== */

export {

    SCORE,
    MAX_RESULTS,

    clamp,
    difference,
    scoreByDistance,

    inRange,
    cupMatches,

    addReason,

    prepareCapsule

};

/* ==================================================
   RECOMMENDATION SCORING
   Part 2 / 3
================================================== */

function scoreDecaf(result, answer) {

    if (answer === undefined || answer === null) {
        return;
    }

    if (result.capsule.decaf === answer) {

        result.score += SCORE.DECAF_MATCH;

        addReason(
            result.reasons,
            answer ? "Bezkofeinová" : "Obsahuje kofein"
        );

    } else {

        result.score += SCORE.DECAF_MISMATCH;

    }

}

function scoreCupSize(result, selectedSize) {

    if (!selectedSize) {
        return;
    }

    if (cupMatches(selectedSize, result.capsule)) {

        result.score += SCORE.CUPSIZE_MATCH;

        addReason(result.reasons, "Správná velikost šálku");

    } else {

        result.score += SCORE.CUPSIZE_MISMATCH;

    }

}

function scoreIntensity(result, range) {

    if (!range) {
        return;
    }

    const intensity = result.capsule.intensity;

    if (inRange(intensity, range)) {

        result.score += SCORE.INTENSITY_MAX;

        addReason(result.reasons, "Odpovídající intenzita");

        return;

    }

    const target = (range[0] + range[1]) / 2;

    result.score += scoreByDistance(
        target,
        intensity,
        13,
        SCORE.INTENSITY_MAX
    );

}

function scoreMilk(result, wantedMilk) {

    if (wantedMilk === undefined) {
        return;
    }

    result.score += scoreByDistance(

        wantedMilk,

        result.capsule.profile.milk,

        10,

        SCORE.MILK_MAX

    );

}

function scoreBody(result, wantedBody) {

    if (!wantedBody) {
        return;
    }

    const target = (wantedBody[0] + wantedBody[1]) / 2;

    result.score += scoreByDistance(

        target,

        result.capsule.profile.body,

        10,

        SCORE.BODY_MAX

    );

}

function scoreAcidity(result, wantedAcidity) {

    if (!wantedAcidity) {
        return;
    }

    const target = (wantedAcidity[0] + wantedAcidity[1]) / 2;

    result.score += scoreByDistance(

        target,

        result.capsule.profile.acidity,

        10,

        SCORE.ACIDITY_MAX

    );

}

function scoreSweetness(result, wantedSweetness) {

    if (!wantedSweetness) {
        return;
    }

    const target = (wantedSweetness[0] + wantedSweetness[1]) / 2;

    result.score += scoreByDistance(

        target,

        result.capsule.profile.sweetness,

        10,

        SCORE.SWEETNESS_MAX

    );

}

function scoreFlavours(result, flavours) {

    if (!Array.isArray(flavours)) {
        return;
    }

    flavours.forEach((flavour) => {

        if (result.capsule.profile[flavour] !== undefined) {

            result.score += Math.round(

                (result.capsule.profile[flavour] / 10) *

                SCORE.FLAVOUR_MAX

            );

        }

    });

}

function applyRandomBonus(result, enabled) {

    if (!enabled) {
        return;
    }

    result.score += Math.random() * SCORE.RANDOM_BONUS;

}

/* ==================================================
   EXPORT
================================================== */

export {

    scoreDecaf,

    scoreCupSize,

    scoreIntensity,

    scoreMilk,

    scoreBody,

    scoreAcidity,

    scoreSweetness,

    scoreFlavours,

    applyRandomBonus

};

/* ==================================================
   RECOMMENDATION ENGINE
   Part 3 / 3
================================================== */

function normalizeScores(results) {

    if (!results.length) {

        return [];

    }

    const highestScore = Math.max(

        ...results.map(result => result.score)

    );

    return results.map(result => ({

        ...result,

        percent: clamp(

            Math.round(

                (result.score / highestScore) * 100

            ),

            0,

            100

        )

    }));

}

/* ==================================================
   MAIN
================================================== */

export function recommendCapsules(capsules, answers) {

    const prepared = capsules.map(

        prepareCapsule

    );

    prepared.forEach(result => {

        scoreDecaf(

            result,

            answers.decaf

        );

        scoreCupSize(

            result,

            answers.cupSize

        );

        scoreIntensity(

            result,

            answers.intensity

        );

        scoreMilk(

            result,

            answers.milk

        );

        scoreBody(

            result,

            answers.body

        );

        scoreAcidity(

            result,

            answers.acidity

        );

        scoreSweetness(

            result,

            answers.sweetness

        );

        scoreFlavours(

            result,

            answers.flavours

        );

        applyRandomBonus(

            result,

            answers.random

        );

    });

    const sorted = prepared

        .sort(

            (a, b) => b.score - a.score

        );

    const normalized = normalizeScores(

        sorted

    );

    normalized.forEach(result => {

        const p = result.capsule.profile;

        if (p.chocolate >= 7) {

            addReason(

                result.reasons,

                "Výrazné čokoládové tóny"

            );

        }

        if (p.caramel >= 7) {

            addReason(

                result.reasons,

                "Karamelový profil"

            );

        }

        if (p.vanilla >= 7) {

            addReason(

                result.reasons,

                "Vanilkové aroma"

            );

        }

        if (p.nutty >= 7) {

            addReason(

                result.reasons,

                "Oříškové tóny"

            );

        }

        if (p.fruity >= 7) {

            addReason(

                result.reasons,

                "Ovocný charakter"

            );

        }

        if (p.floral >= 7) {

            addReason(

                result.reasons,

                "Květinové aroma"

            );

        }

        if (p.spicy >= 7) {

            addReason(

                result.reasons,

                "Kořenité tóny"

            );

        }

        if (p.milk >= 8) {

            addReason(

                result.reasons,

                "Výborná s mlékem"

            );

        }

        if (result.capsule.decaf) {

            addReason(

                result.reasons,

                "Bezkofeinová"

            );

        }

    });

    return normalized

        .slice(0, MAX_RESULTS);

}

/* ==================================================
   DEFAULT EXPORT
================================================== */

export default recommendCapsules;
