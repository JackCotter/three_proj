import { Vector3 } from "three";
import { xPositivePositionMax, defaultLateralMovementPerFrame } from "./constants";

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
    }

    moveInXPositive() {
        this.movingInXPositive = true;
    }

    moveInXNegative() {
        this.movingInXPositive = true;
    }

    stopInX() {
        this.movingInXPositive = false;
    }

    constructor() {
        this.positionalMomentumX = 0;
        this.positionalMomentumY = 0;
        this.positionalMomentumZ = 0;

        this.movingInXPositive = false;
        this.movingInXNegative = false;
    }
}