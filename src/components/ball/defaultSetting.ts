interface BallSetting {
    //初始加载时的进度
    initialRange: number;
    //圆设置
    //圆线条宽度
    lineWidth: number;
    //圆线条颜色
    lineColor: string;
    //波浪设置
    //宽度
    waveWidth: number;
    //高度
    waveHeight: number;
    //速度
    speed: number;
    //是否渐变
    isGradient: boolean;
    //波浪颜色
    waveColor: string | { start: string; end: string };
    //背景波浪颜色
    bgWaveColor: string | { start: string; end: string };
}

export const initialSetting: BallSetting = {
    initialRange: 50,
    lineWidth: 1,
    lineColor: "#bdc3c7",
    waveWidth: 0.018,
    waveHeight: 18,
    speed: 0.01,
    // waveColor: "#69d569",
    // bgWaveColor: "rgba(158, 226, 89,.5)",
    waveColor: { start: "#43CF73", end: "#BCEC4F" },
    bgWaveColor: { start: "rgba(130, 221, 95,0.5)", end: "rgba(130, 221, 97,0.5)" },
    isGradient: true
};