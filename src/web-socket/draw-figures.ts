import {Button, down, left, mouse, Point, right, straightTo, up} from "@nut-tree/nut-js";

export async function drawSquare(command: string, width: number) {
    await mouse.releaseButton(Button.LEFT)
    await mouse.pressButton(Button.LEFT)
    await mouse.move(right(width))
    await mouse.releaseButton(Button.LEFT)
    await mouse.pressButton(Button.LEFT)
    await mouse.move(down(width))
    await mouse.releaseButton(Button.LEFT)
    await mouse.pressButton(Button.LEFT)
    await mouse.move(left(width))
    await mouse.releaseButton(Button.LEFT)
    await mouse.pressButton(Button.LEFT)
    await mouse.move(up(width))
    await mouse.releaseButton(Button.LEFT)
    return command
}

export async function drawRectangle(command: string, x: number, y: number) {
    await mouse.releaseButton(Button.LEFT)
    await mouse.pressButton(Button.LEFT)
    await mouse.move(right(x))
    await mouse.releaseButton(Button.LEFT)
    await mouse.pressButton(Button.LEFT)
    await mouse.move(down(y))
    await mouse.releaseButton(Button.LEFT)
    await mouse.pressButton(Button.LEFT)
    await mouse.move(left(x))
    await mouse.releaseButton(Button.LEFT)
    await mouse.pressButton(Button.LEFT)
    await mouse.move(up(y))
    await mouse.releaseButton(Button.LEFT)
    return command
}

export async function drawCircle(command: string, radius: number) {
    const {x, y} = await mouse.getPosition()
    await mouse.releaseButton(Button.LEFT)
    await mouse.pressButton(Button.LEFT)
    for (let i = 0; i <= 360; i++) {
        const radians = (Math.PI / 180) * i
        const cx = radius * Math.cos(radians) + x - radius
        const cy = radius * Math.sin(radians) + y
        await mouse.move(straightTo(new Point(cx, cy)))
    }
    await mouse.releaseButton(Button.LEFT)
    return command
}