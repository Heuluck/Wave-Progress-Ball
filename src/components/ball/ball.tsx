import { useEffect, useRef } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
import { initialSetting } from "./defaultSetting";

interface ProgressBallProps {
    ballSetting?: BallSetting;
    //当前进度
    value: number;
}

export interface BallSetting {
    //初始加载时的进度
    initialRange: number;
    //圆设置
    circle: CircleSetting;
    //波浪设置
    wave: WaveSetting;
}

interface CircleSetting {
    //圆线条宽度
    lineWidth: number;
    //圆线条颜色
    lineColor: string;
}

interface WaveSetting {
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

export function ProgressBall(props: ProgressBallProps) {
    const { ballSetting = initialSetting, value } = props;
    const ctxRef = useRef(null);
    const isCircleDraw = useRef(false);
    const initialRange = ballSetting.initialRange; //用于做一个临时的range
    let currentRange = useRef(initialRange);
    let xOffset = 0;

    const drawCircle = (ctx: CanvasRenderingContext2D, circleYCenter: number, circleRadius: number) => {
        ctx.beginPath();
        ctx.strokeStyle = ballSetting.circle.lineColor;
        ctx.arc(circleYCenter, circleYCenter, circleRadius + 1, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.save();
        ctx.beginPath();
        ctx.arc(circleYCenter, circleYCenter, circleRadius, 0, 2 * Math.PI);
        ctx.clip();
        isCircleDraw.current = true;
    };

    //画sin 曲线函数
    const drawSin = (
        ctx: CanvasRenderingContext2D,
        xOffset: number,
        color: string | { start: string; end: string },
        waveHeight: number,
        caWidth: number,
        caHeight: number
    ) => {
        // ctx.save();
        const waveOffsetX = 0;
        const points = []; //用于存放绘制Sin曲线的点
        ctx.beginPath();
        //在整个轴长上取点
        for (let x = waveOffsetX; x < waveOffsetX + caHeight; x += 20 / caHeight) {
            //此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
            let y = 0.8 * Math.sin(-x * ballSetting.wave.waveWidth + xOffset);
            let dY = caHeight * (1 - currentRange.current / 100);
            points.push([x, dY + y * waveHeight]);
            ctx.lineTo(x, dY + y * waveHeight);
        }
        //封闭路径
        ctx.lineTo(caWidth, caHeight);
        ctx.lineTo(waveOffsetX, caHeight);
        ctx.lineTo(points[0][0], points[0][1]);
        if (ballSetting.wave.isGradient && isGradient(color)) {
            const gradient = ctx.createLinearGradient(0, 0, caWidth, 0);
            gradient.addColorStop(0, (color as { start: string; end: string }).start);
            gradient.addColorStop(1, (color as { start: string; end: string }).end);
            ctx.fillStyle = gradient;
        } else if (!ballSetting.wave.isGradient && typeof color === "string") ctx.fillStyle = color as string;
        else if (ballSetting.wave.isGradient && !isGradient(color))
            throw new Error(
                "Property 'ballSetting.wave.waveColor' or 'ballSetting.wave.bgWaveColor' must be {start:string,end:string} when isGradient is true"
            );
        else if (!ballSetting.wave.isGradient && !(typeof color === "string"))
            throw new Error(
                "Property 'ballSetting.wave.waveColor' or 'ballSetting.wave.bgWaveColor' must be color when isGradient is false"
            );
        ctx.fill();
        // ctx.restore();
    };

    const render = (
        ctx: CanvasRenderingContext2D,
        caWidth: number,
        caHeight: number,
        circleYCenter: number,
        circleRadius: number
    ) => {
        ctx.clearRect(0, 0, caWidth, caHeight);

        if (isCircleDraw.current == false) {
            drawCircle(ctx, circleYCenter, circleRadius);
        }
        drawSin(
            ctx,
            xOffset + Math.PI * 0.7,
            ballSetting.wave.bgWaveColor,
            ballSetting.wave.waveHeight,
            caWidth,
            caHeight
        );
        drawSin(ctx, xOffset, ballSetting.wave.waveColor, ballSetting.wave.waveHeight, caWidth, caHeight);
        xOffset += ballSetting.wave.speed;
        requestAnimationFrame(() => render(ctx, caWidth, caHeight, circleYCenter, circleRadius));
    };

    useEffect(() => {
        currentRange.current = value;
    }, [value]);

    useDeepCompareEffect(() => {
        console.log("useEffect");
        isCircleDraw.current = false;
        if (ctxRef.current) {
            const canvas: HTMLCanvasElement = ctxRef.current;
            const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
            ctx.restore();
        }
    }, [ballSetting.wave]);

    useEffect(() => {
        if (ctxRef.current) {
            const canvas: HTMLCanvasElement = ctxRef.current;
            const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
            //画布
            const caWidth = canvas.width;
            const caHeight = canvas.height;
            //圆
            const circleYCenter = caHeight / 2; //圆心
            const circleRadius = circleYCenter - 32; //圆半径
            //波浪
            ctx.lineWidth = ballSetting.circle.lineWidth;
            render(ctx, caWidth, caHeight, circleYCenter, circleRadius);
        }
    }, []);
    return (
        <>
            <canvas width="350" height="350" ref={ctxRef}>
                此设备似乎不支持canvas
            </canvas>
        </>
    );
}

function isGradient(color: string | { start: string; end: string }): color is { start: string; end: string } {
    return (
        (color as { start: string; end: string }).start !== undefined &&
        (color as { start: string; end: string }).end !== undefined
    );
}
