import { BallSettingIS } from ".";

export const initialSetting: BallSettingIS = {
    size: 350,
    magnifyAA: 1,
    initialRange: 50,
    lineWidth: 1,
    lineColor: "#bdc3c7",
    waveWidth: 0.018,
    waveHeight: 18,
    speed: 0.01,
    bgWaveOffset: 0.7,
    isReverse: false,
    isReverseBg: false,
    isShowBg: true,
    // waveColor: "#69d569",
    // bgWaveColor: "rgba(158, 226, 89,.5)",
    waveColor: { start: "#43CF73", end: "#BCEC4F" },
    bgWaveColor: { start: "rgba(130, 221, 95,0.5)", end: "rgba(130, 221, 97,0.5)" },
    isGradient: true
};