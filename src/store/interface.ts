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

export interface BaseMotion {
    cellNo: number;
    offsetX: number;
    offsetY: number;
    frame: number;
    isAction: number;
    loopPoint: number;
    loopCount: number;
    seNo: number;
    isLoopSe: number;
}
