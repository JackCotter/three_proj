import { Vector3 } from "three";
import { xPositivePositionMax, xNegativePositionMax, defaultLateralMovementPerFrame } from "./constants";

export default class State {
    positionalMomentumX: number;
    positionalMomentumY: number;
    positionalMomentumZ: number;

    movingInXPositive: boolean;
    movingInXNegative: boolean;

    updateState(position: Vector3) {
        if (this.movingInXPositive && position.x > xPositivePositionMax) {
            this.movingInXPositive = false;
        }
        if (this.movingInXPositive) {
            this.positionalMomentumX = defaultLateralMovementPerFrame
        } else if (this.positionalMomentumX > 0 && !this.movingInXPositive) {
            this.positionalMomentumX = 0;
        }

        if (this.movingInXNegative && position.x < xNegativePositionMax) {
            this.movingInXNegative = false;
        }
        if (this.movingInXNegative) {
            this.positionalMomentumX = -defaultLateralMovementPerFrame
        } else if (this.positionalMomentumX < 0 && !this.movingInXNegative) {
            this.positionalMomentumX = 0;
        }
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
        this.positionalMomentumX = 0;
        this.positionalMomentumY = 0;
        this.positionalMomentumZ = 0;

        this.movingInXPositive = false;
        this.movingInXNegative = false;
    }
}