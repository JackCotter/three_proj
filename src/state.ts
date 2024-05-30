import { xPositivePositionMax, xNegativePositionMax, defaultLateralMovementPerFrame } from "./constants";

export default class State {
    positionX: number;
    positionY: number;
    positionZ: number;

    positionalMomentumX: number;
    positionalMomentumY: number;
    positionalMomentumZ: number;

    movingInXPositive: boolean;
    movingInXNegative: boolean;

    updateState() {
        if ((this.movingInXPositive || this.positionalMomentumX > 0) && this.positionX > xPositivePositionMax) {
            this.positionalMomentumX = 0;
        } else if (this.movingInXPositive) {
            this.positionalMomentumX = defaultLateralMovementPerFrame
        } else if (this.positionalMomentumX > 0 && !this.movingInXPositive) {
            this.positionalMomentumX = 0;
        }

        if ((this.movingInXNegative || this.positionalMomentumX < 0) && this.positionX < xNegativePositionMax) {
            this.positionalMomentumX = 0;
        } else if (this.movingInXNegative) {
            this.positionalMomentumX = -defaultLateralMovementPerFrame
        } else if (this.positionalMomentumX < 0 && !this.movingInXNegative) {
            this.positionalMomentumX = 0;
        }

        this.positionX += this.positionalMomentumX
    }

    moveInXPositive() {
        this.movingInXPositive = true;
        this.movingInXNegative = false;
    }

    moveInXNegative() {
        this.movingInXNegative = true;
        this.movingInXPositive = false;
    }

    stopInXPositive() {
        this.movingInXPositive = false;
    }

    stopInXNegative() {
        this.movingInXNegative = false;
    }

    constructor() {
        this.positionX = 0;
        this.positionY = 0;
        this.positionZ = 0;

        this.positionalMomentumX = 0;
        this.positionalMomentumY = 0;
        this.positionalMomentumZ = 0;

        this.movingInXPositive = false;
        this.movingInXNegative = false;
    }
}