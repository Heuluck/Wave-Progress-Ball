import { BallSetting } from "./ball";

export const initialSetting: BallSetting = {
    initialRange: 50,
    circle: {
        lineWidth: 1,
        lineColor: "#bdc3c7",
    },
    wave: {
        waveWidth: 0.018,
        waveHeight: 18,
        speed: 0.01,
        // waveColor: "#69d569",
        // bgWaveColor: "rgba(158, 226, 89,.5)",
        waveColor: { start: "#43CF73", end: "#BCEC4F" },
        bgWaveColor: { start: "rgba(130, 221, 95,0.5)", end: "rgba(130, 221, 97,0.5)" },
        isGradient: true
    },
};