import { DietEnum } from "../enums/common_enums";

export const DietConfig = {
    [DietEnum.VEGETARIAN]: {
        icon: 'leaf-outline',
        iconColor: 'green',
    },
    [DietEnum.NON_VEGETARIAN]: {
        icon: 'restaurant-outline',
        iconColor: 'red',
    },
    [DietEnum.VEGAN]: {
        icon: 'leaf-outline',
        iconColor: 'green',
    },
    [DietEnum.EGGATARIAN]: {
        icon: 'egg-outline',
        iconColor: 'yellow',
    },
    [DietEnum.OTHER]: {
        icon: 'hand-left-outline',
        iconColor: 'blue',
    },
}