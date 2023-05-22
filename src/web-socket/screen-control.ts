import { mouse, Region, screen } from "@nut-tree/nut-js";
import Jimp from "jimp";

export async function printScreen(command: string) {
    const pos = await mouse.getPosition()
    const img = await screen.grabRegion(new Region(pos.x, pos.y, 200, 200))
    const imgData = await new Jimp(await img.toRGB()).getBase64Async(Jimp.MIME_PNG)
    return imgData.replace('data:image/png;base64,', '')
}