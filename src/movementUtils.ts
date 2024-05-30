import { defaultLateralFullStopThreshold, defaultLateralSlowDownFactor } from "./constants"

export const slowDownX = (positionalMomentumX: number) => {
    if (Math.abs(positionalMomentumX) > defaultLateralFullStopThreshold) {
        return positionalMomentumX / defaultLateralSlowDownFactor;
    }
    return 0;
}