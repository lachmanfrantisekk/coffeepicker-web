/* ==================================================
   COFFEE PICKER
   CAPSULE LOADER
================================================== */

const DATABASES = [

    {
        id: "nespresso-original",
        brand: "Nespresso",
        system: "Original",
        file: "./data/capsules/nespresso-original.json"
    },

    {
        id: "nespresso-vertuo",
        brand: "Nespresso",
        system: "Vertuo",
        file: "./data/capsules/nespresso-vertuo.json"
    },

    {
        id: "starbucks",
        brand: "Starbucks",
        system: "Original",
        file: "./data/capsules/starbucks.json"
    },

    {
        id: "dolce-gusto",
        brand: "Dolce Gusto",
        system: "Dolce Gusto",
        file: "./data/capsules/dolce-gusto.json"
    }

];

/* ==================================================
   LOAD SINGLE DATABASE
================================================== */

async function loadDatabase(database) {

    const response = await fetch(database.file);

    const text = await response.text();

    try {

        return JSON.parse(text);

    } catch (error) {

        console.error("Chyba v:", database.file);
        console.error("Pozice:", error.message);

        const pos = Number(error.message.match(/position (\d+)/)?.[1]);

        console.log(
            text.substring(pos - 100, pos + 100)
        );

        throw error;

    }

}

/* ==================================================
   LOAD ALL DATABASES
================================================== */

async function loadCapsules() {

    const loaded = await Promise.all(

        DATABASES.map(loadDatabase)

    );

    return loaded.flat();

}

/* ==================================================
   GETTERS
================================================== */

function getDatabaseList() {

    return [...DATABASES];

}

function getAvailableBrands() {

    return [

        ...new Set(

            DATABASES.map(

                database => database.brand

            )

        )

    ];

}

function getAvailableSystems() {

    return DATABASES.map(database => ({

        id: database.id,

        brand: database.brand,

        system: database.system

    }));

}

function getCapsulesByBrand(capsules, brand) {

    return capsules.filter(

        capsule =>

            capsule.brand === brand

    );

}

function getCapsulesBySystem(capsules, system) {

    return capsules.filter(

        capsule =>

            capsule.system === system

    );

}

function getCapsuleById(capsules, id) {

    return capsules.find(

        capsule =>

            capsule.id === id

    );

}

function searchCapsules(capsules, text) {

    const query = text

        .trim()

        .toLowerCase();

    if (!query) {

        return capsules;

    }

    return capsules.filter(capsule => {

        return (

            capsule.name.toLowerCase().includes(query) ||

            capsule.brand.toLowerCase().includes(query) ||

            capsule.system.toLowerCase().includes(query)

        );

    });

}

/* ==================================================
   EXPORTS
================================================== */

export {

    DATABASES,

    loadDatabase,

    loadCapsules,

    getDatabaseList,

    getAvailableBrands,

    getAvailableSystems,

    getCapsulesByBrand,

    getCapsulesBySystem,

    getCapsuleById,

    searchCapsules

};

export default loadCapsules;
