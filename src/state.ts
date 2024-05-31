import { xPositivePositionMax, xNegativePositionMax, defaultLateralMovementPerFrame } from "./constants";
import { rotateWithMovement, slowDownX } from "./movementUtils";

export default class State {
    positionX: number;
    positionY: number;
    positionZ: number;
    positionalMomentumX: number;
    positionalMomentumY: number;
    positionalMomentumZ: number;

    rotationX: number;
    rotationY: number;
    rotationZ: number;
    rotationalMomentumX: number;
    rotationalMomentumY: number;
    rotationalMomentumZ: number;

    movingInXPositive: boolean;
    movingInXNegative: boolean;

    updateState() {
        if ((this.movingInXPositive || this.positionalMomentumX > 0) && this.positionX > xPositivePositionMax) {
            this.positionalMomentumX = slowDownX(this.positionalMomentumX);
        } else if (this.movingInXPositive) {
            this.positionalMomentumX = defaultLateralMovementPerFrame
        } else if (this.positionalMomentumX > 0 && !this.movingInXPositive) {
            this.positionalMomentumX = slowDownX(this.positionalMomentumX);
        }

        if ((this.movingInXNegative || this.positionalMomentumX < 0) && this.positionX < xNegativePositionMax) {
            this.positionalMomentumX = slowDownX(this.positionalMomentumX);
        } else if (this.movingInXNegative) {
            this.positionalMomentumX = -defaultLateralMovementPerFrame
        } else if (this.positionalMomentumX < 0 && !this.movingInXNegative) {
            this.positionalMomentumX = slowDownX(this.positionalMomentumX);;
        }

        this.rotationalMomentumY = rotateWithMovement(this.rotationY, this.movingInXPositive, this.movingInXNegative)

        this.positionX += this.positionalMomentumX
        this.rotationY += this.rotationalMomentumY
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

        this.rotationX = 0;
        this.rotationY = 0;
        this.rotationZ = 0;
        this.rotationalMomentumX = 0;
        this.rotationalMomentumY = 0;
        this.rotationalMomentumZ = 0;

        this.movingInXPositive = false;
        this.movingInXNegative = false;
    }
}