export interface Cell {
    bodyX: number;
    bodyY: number;
    faceIndex: number;
    faceAngle: number;
    faceX: number;
    faceY: number;
    faceZ: number;
    itemAngle: number;
    itemX: number;
    itemY: number;
    itemZ: number;
}

export interface Battle {
    hitX: number;
    hitY: number;
    hitW: number;
    hitH: number;
    moveType: number;
}


export interface Koma {
    cellNo: number;
    offsetX: number;
    offsetY: number;
    flipX: number;
    flipY: number;
    rotation: number;
    frame: number;
    isAction: number;
    loopPoint: number;
    loopCount: number;
    seNo: number;
    isLoopSe: number;
}

export interface Motion {
    name: string;
    komas: Koma[];
}

export interface MotionState {
    motions: Motion[];
    activeMotionIndex: number;
    activeKomaIndex: number;
    past: [];
    future: [];
    clipKoma: Koma | null;
}