const dicebearAvatar =
    {
        "avatarStyle" :
        [
            {
                label: "Adventurer",
                value: 0
            },
            {
                label: "Adventurer Neutral",
                value: 1
            }
        ],
        "flip": [
            {
                label: "false",
                value: false
            },
            {
                label: "true",
                value: true
            },
        ],
        "backgroundType": [
            "solid",
            "gradientLinear"
        ],
        "earrings": [
            "No earrings",
            "variant01",
            "variant02",
            "variant03",
            "variant04",
            "variant05",
            "variant06"
        ],
        "eyebrows": [
            "No eyebrows",
            "variant01",
            "variant02",
            "variant03",
            "variant04",
            "variant05",
            "variant06",
            "variant07",
            "variant08",
            "variant09",
            "variant10",
            "variant11",
            "variant12",
            "variant13",
            "variant14",
            "variant15",
        ],
        "eyes":  [
            "variant01",
            "variant02",
            "variant03",
            "variant04",
            "variant05",
            "variant06",
            "variant07",
            "variant08",
            "variant09",
            "variant10",
            "variant11",
            "variant12",
            "variant13",
            "variant14",
            "variant15",
            "variant16",
            "variant17",
            "variant18",
            "variant19",
            "variant20",
            "variant21",
            "variant22",
            "variant23",
            "variant24",
            "variant25",
            "variant26",
        ],
        "features": [
            "No Features",
            "mustache",
            "blush",
            "birthmark",
            "freckles"
        ],
        "glasses": [
            "No Glasses",
            "variant01",
            "variant02",
            "variant03",
            "variant04",
            "variant05"
        ],
        "hair": [
            "long01",
            "long02",
            "long03",
            "long04",
            "long05",
            "long06",
            "long07",
            "long08",
            "long09",
            "long10",
            "long11",
            "long12",
            "long13",
            "long14",
            "long15",
            "long16",
            "long17",
            "long18",
            "long19",
            "long20",
            "long21",
            "long22",
            "long23",
            "long24",
            "long25",
            "long26",
            "short01",
            "short02",
            "short03",
            "short04",
            "short05",
            "short06",
            "short07",
            "short08",
            "short09",
            "short10",
            "short11",
            "short12",
            "short13",
            "short14",
            "short15",
            "short16",
            "short17",
            "short18",
            "short19",
        ],
        "mouth":  [
            "variant01",
            "variant02",
            "variant03",
            "variant04",
            "variant05",
            "variant06",
            "variant07",
            "variant08",
            "variant09",
            "variant10",
            "variant11",
            "variant12",
            "variant13",
            "variant14",
            "variant15",
            "variant16",
            "variant17",
            "variant18",
            "variant19",
            "variant20",
            "variant21",
            "variant22",
            "variant23",
            "variant24",
            "variant25",
            "variant26",
            "variant27",
            "variant28",
            "variant29",
            "variant30",
        ],
        "skinColor": [
            {
                label: "White",
                value: "f2d3b1"
            },
            {
                label: "Yellow",
                value: "ecad80"
            },
            {
                label: "Brown",
                value: "9e5622"
            },
            {
                label: "Black",
                value: "763900"
            },
        ]
    }
function returnOptions(prop) {
    return prop.map((e) => {
        return {
            value: e,
            label: e
        }
    })
}

export const avatarOptions = {
    avatarStyle: (dicebearAvatar.avatarStyle),
    flipOptions: (dicebearAvatar.flip),
    earringsOptions : returnOptions(dicebearAvatar.earrings),
    eyebrowsOptions : returnOptions(dicebearAvatar.eyebrows),
    eyesOptions: returnOptions(dicebearAvatar.eyes),
    mouthOptions: returnOptions(dicebearAvatar.mouth),
    hairOptions: returnOptions(dicebearAvatar.hair),
    skinColorOptions: (dicebearAvatar.skinColor),
    glassesOptions: returnOptions(dicebearAvatar.glasses),
    featuresOptions: returnOptions(dicebearAvatar.features),
    backgroundType: returnOptions(dicebearAvatar.backgroundType)
}
export const appUrl = import.meta.env.APP_URL || 'http://127.0.0.1:8000'
export const isCommunityUsersLength = 20; //
export const avatarFileSize = 3072000; // 3mb
