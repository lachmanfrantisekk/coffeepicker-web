export const QUESTIONS = [

{
    id: "decaf",
    title: "Obsah kofeinu",
    subtitle: "Na co máš dnes chuť?",
    icon: "☕",

    type: "single",

    options: [
        {
            id: "caffeine",
            label: "S kofeinem",
            filters: {
                decaf: false
            }
        },

        {
            id: "decaf",
            label: "Bezkofeinová",
            filters: {
                decaf: true
            }
        }
    ]
},

{
    id: "temperature",

    title: "Jak si ji dáš?",

    icon: "🌡️",

    type: "single",

    options: [

        {
            id: "hot",
            label: "Horkou",

            score: {
                iced: -100
            }
        },

        {
            id: "iced",
            label: "Ledovou",

            score: {
                iced: 100
            }
        }
    ]
},

{
    id: "size",

    title: "Velikost šálku",

    icon: "🥤",

    type: "single",

    options: [

        {
            id: "ristretto",

            label: "Ristretto",

            cupSizes: [
                "Ristretto"
            ]
        },

        {
            id: "espresso",

            label: "Espresso",

            cupSizes: [
                "Espresso"
            ]
        },

        {
            id: "double",

            label: "Double Espresso",

            cupSizes: [
                "Double Espresso"
            ]
        },

        {
            id: "lungo",

            label: "Lungo",

            cupSizes: [
                "Lungo"
            ]
        },

        {
            id: "mug",

            label: "Velký hrnek",

            cupSizes: [
                "Coffee",
                "Mug",
                "Grande",
                "Americano",
                "Alto",
                "Carafe"
            ]
        }
    ]
},

{
    id: "milk",

    title: "Mléko",

    icon: "🥛",

    type: "single",

    options: [

        {
            id: "black",

            label: "Bez mléka",

            milk: 0
        },

        {
            id: "little",

            label: "Trochu mléka",

            milk: 4
        },

        {
            id: "lot",

            label: "Hodně mléka",

            milk: 10
        }
    ]
},

{
    id: "intensity",

    title: "Síla kávy",

    icon: "💪",

    type: "single",

    options: [

        {
            id: "light",

            label: "Jemná",

            intensity: [1,4]
        },

        {
            id: "medium",

            label: "Vyvážená",

            intensity: [5,8]
        },

        {
            id: "strong",

            label: "Silná",

            intensity: [9,13]
        }
    ]
},

{
    id: "flavours",

    title: "Na co máš chuť?",

    icon: "😋",

    type: "multi",

    max: 3,

    options: [

        {
            id: "chocolate",

            label: "Čokoláda",

            profile: "chocolate"
        },

        {
            id: "caramel",

            label: "Karamel",

            profile: "caramel"
        },

        {
            id: "vanilla",

            label: "Vanilka",

            profile: "vanilla"
        },

        {
            id: "nuts",

            label: "Oříšky",

            profile: "nutty"
        },

        {
            id: "fruit",

            label: "Ovocná",

            profile: "fruity"
        },

        {
            id: "flowers",

            label: "Květinová",

            profile: "floral"
        },

        {
            id: "spices",

            label: "Kořeněná",

            profile: "spicy"
        }
    ]
},

{
    id: "sweetness",

    title: "Sladkost",

    icon: "🍯",

    type: "single",

    options: [

        {
            id: "low",

            label: "Málo sladká",

            sweetness: [0,3]
        },

        {
            id: "medium",

            label: "Vyvážená",

            sweetness: [4,6]
        },

        {
            id: "high",

            label: "Sladší",

            sweetness: [7,10]
        }
    ]
},

{
    id: "body",

    title: "Tělo kávy",

    icon: "☕",

    type: "single",

    options: [

        {
            id: "light",

            label: "Lehké",

            body: [1,3]
        },

        {
            id: "medium",

            label: "Střední",

            body: [4,6]
        },

        {
            id: "full",

            label: "Plné",

            body: [7,10]
        }
    ]
},

{
    id: "acidity",

    title: "Kyselost",

    icon: "🍋",

    type: "single",

    options: [

        {
            id: "low",

            label: "Nízká",

            acidity: [0,3]
        },

        {
            id: "medium",

            label: "Střední",

            acidity: [4,6]
        },

        {
            id: "high",

            label: "Výrazná",

            acidity: [7,10]
        }
    ]
},

{
    id: "random",

    title: "Poslední otázka",

    icon: "✨",

    type: "single",

    options: [

        {
            id: "safe",

            label: "Chci jistotu",

            random: false
        },

        {
            id: "discover",

            label: "Překvap mě",

            random: true
        }
    ]
}

];
