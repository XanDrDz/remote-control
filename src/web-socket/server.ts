import {createWebSocketStream, Server, WebSocketServer, WebSocket} from "ws"
import {mouse_pos, mouseMove} from "./mouse-movement.ts";
import {drawCircle, drawRectangle, drawSquare} from "./draw-figures.ts";
import {printScreen} from "./screen-control.ts";
import {AllCommands} from "./models/interfaces.ts";


export class websocketServer {
    server: Server<WebSocket> | null

    constructor(port: number) {
        this.server = new WebSocketServer({port})
        this.server.on('connection', (ws) => {
            const wsNewStream = createWebSocketStream(ws, {decodeStrings: false})
            wsNewStream.on('data', async (data) => {
                console.log('received: %s', data)
                const res = await startCommands(data.toString())
                const msg = res ? res.data : ''
                wsNewStream.write(`${data.toString().split(' ')[0]} ${msg}`)
            })
            wsNewStream.on('close', () => {
                console.log('Websocket stream has closed')
            })
        })
    }
}


export const startCommands = (command: string) => {
    const [cmd, width, length] = command.split(' ')
    const commands: AllCommands = {
        'mouse_position': async () => ({data: await mouse_pos('mouse_position')}),
        'mouse_left': async (coords: number) => {
            mouseMove('left', coords)
        },
        'mouse_up': async (coords: number) => {
            mouseMove('up', coords)
        },
        'mouse_right': async (coords: number) => {
            mouseMove('right', coords)
        },
        'mouse_down': async (coords: number) => {
            mouseMove('down', coords)
        },
        'draw_circle': async (radius: number) => {
            drawCircle('draw_circle', radius)
        },
        'draw_rectangle': async (width: number, length: number) => {
            drawRectangle('draw_rectangle', width, length)
        },
        'draw_square': async (width: number) => {
            drawSquare('draw_square', width)
        },
        'prnt_scrn': async () => ({data: await printScreen('prnt_scrn')}),
    }
    for (let key in commands) {
        if (key === cmd) {
            return commands[cmd](+width, +length)
        }
    }
}