import {down, left, mouse, right, up} from "@nut-tree/nut-js";
import {Direction} from "./models/interfaces";

export async function mouseMove(command: Direction, coords: number): Promise<string> {
    const directions = {
        'left': left,
        'up': up,
        'right': right,
        'down': down
    }
    await mouse.move(directions[command](coords))
    return command
}

export async function mouse_pos(command: string) {
    const pos = await mouse.getPosition()
    return `${pos.x}px,${pos.y}px`
}