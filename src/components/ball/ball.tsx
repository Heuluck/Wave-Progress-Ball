import { useEffect, useRef } from "react";
import { initialSetting } from "./defaultSetting";

export interface BallSetting {
    //初始加载时的进度
    initialRange?: number;
    //圆设置
    //圆线条宽度
    lineWidth?: number;
    //圆线条颜色
    lineColor?: string;
    //波浪设置
    //宽度
    waveWidth?: number;
    //高度
    waveHeight?: number;
    //速度
    speed?: number;
    //是否渐变
    isGradient?: boolean;
    //波浪颜色
    waveColor?: string | { start: string; end: string };
    //背景波浪颜色
    bgWaveColor?: string | { start: string; end: string };
}
interface ProgressBallProps extends BallSetting {
    //当前进度
    value: number;
}

export function ProgressBall(props: ProgressBallProps) {
    const {
        value,
        initialRange = initialSetting.initialRange,
        lineWidth = initialSetting.lineWidth,
        lineColor = initialSetting.lineColor,
        waveWidth = initialSetting.waveWidth,
        waveHeight = initialSetting.waveHeight,
        speed = initialSetting.speed,
        isGradient = initialSetting.isGradient,
        waveColor = initialSetting.waveColor,
        bgWaveColor = initialSetting.bgWaveColor,
    } = props;
    const ctxRef = useRef(null);
    const isCircleDraw = useRef(false);
    const setting = useRef({
        initialRange,
        lineWidth,
        lineColor,
        waveWidth,
        waveHeight,
        speed,
        isGradient,
        waveColor,
        bgWaveColor,
    });
    let currentRange = useRef(initialRange);
    const targetRange = useRef(value);
    let xOffset = 0;

    const drawCircle = (ctx: CanvasRenderingContext2D, circleYCenter: number, circleRadius: number) => {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = setting.current.lineColor;
        ctx.arc(circleYCenter, circleYCenter, circleRadius + 1, 0, 2 * Math.PI);
        ctx.stroke();
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
            let y = 0.8 * Math.sin(-x * waveWidth + xOffset);
            let dY = caHeight * (1 - currentRange.current / 100);
            points.push([x, dY + y * waveHeight]);
            ctx.lineTo(x, dY + y * waveHeight);
        }
        //封闭路径
        ctx.lineTo(caWidth, caHeight);
        ctx.lineTo(waveOffsetX, caHeight);
        ctx.lineTo(points[0][0], points[0][1]);
        if (isGradient && checkIsGradient(color)) {
            const gradient = ctx.createLinearGradient(0, 0, caWidth, 0);
            gradient.addColorStop(0, (color as { start: string; end: string }).start);
            gradient.addColorStop(1, (color as { start: string; end: string }).end);
            ctx.fillStyle = gradient;
        } else if (!isGradient && typeof color === "string") ctx.fillStyle = color as string;
        else if (isGradient && !checkIsGradient(color))
            ctx.fillStyle = color as string
        else if (!isGradient && checkIsGradient(color))
            ctx.fillStyle = color.start
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

        if (!isCircleDraw.current) {
            drawCircle(ctx, circleYCenter, circleRadius);
        }

        if (currentRange.current < targetRange.current) {
            currentRange.current += 1;
        } else if (currentRange.current > targetRange.current) {
            currentRange.current -= 1;
        }

        drawSin(ctx, xOffset + Math.PI * 0.7, setting.current.bgWaveColor, waveHeight, caWidth, caHeight);
        drawSin(ctx, xOffset, setting.current.waveColor, waveHeight, caWidth, caHeight);
        xOffset += setting.current.speed;
        requestAnimationFrame(() => render(ctx, caWidth, caHeight, circleYCenter, circleRadius));
    };

    useEffect(() => {
        targetRange.current = value;
    }, [value]);

    useEffect(() => {
        console.log("useEffect");
        setting.current = {
            initialRange,
            lineWidth,
            lineColor,
            waveWidth,
            waveHeight,
            speed,
            isGradient,
            waveColor,
            bgWaveColor,
        };
    }, [initialRange, lineWidth, lineColor, waveWidth, waveHeight, speed, isGradient, waveColor, bgWaveColor]);

    useEffect(() => {
        isCircleDraw.current = false;
        if (ctxRef.current) {
            const canvas: HTMLCanvasElement = ctxRef.current;
            const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
            ctx.restore();
        }
    }, [lineColor]);

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
            ctx.lineWidth = setting.current.lineWidth;
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

function checkIsGradient(color: string | { start: string; end: string }): color is { start: string; end: string } {
    return (
        (color as { start: string; end: string }).start !== undefined &&
        (color as { start: string; end: string }).end !== undefined
    );
}
