
import { io } from "socket.io-client";

export const socket = io("http://localhost:3001");

socket.on('connect', async () => {
    console.log("Erfolgreich mit Socket server verbunden. ")

    //TODO: QuizID = QRCODE oder Input

});