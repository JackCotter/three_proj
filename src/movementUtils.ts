import { defaultLateralFullStopThreshold, defaultLateralSlowDownFactor, framesForRotationWithMovement, rotationWithMovementMax } from "./constants"

export const slowDownX = (positionalMomentumX: number) => {
    if (Math.abs(positionalMomentumX) > defaultLateralFullStopThreshold) {
        return positionalMomentumX / defaultLateralSlowDownFactor;
    }
    return 0;
}

export const rotateWithMovement = (rotationY: number, movingInXPositive: boolean, movingInXNegative: boolean) => {
    if (movingInXPositive && movingInXNegative) {
        return 0;
    } else if (movingInXNegative && rotationY < rotationWithMovementMax) {
        return rotationWithMovementMax / framesForRotationWithMovement;
    } else if (movingInXPositive && rotationY > -1 * rotationWithMovementMax){
        return -1 * rotationWithMovementMax / framesForRotationWithMovement;
    }
    return 0;
}