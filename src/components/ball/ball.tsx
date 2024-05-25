import { useEffect, useRef } from "react";
import { initialSetting } from "./defaultSetting";
import { BallSettingIS, ProgressBallProps } from "./";

export function ProgressBall(props: ProgressBallProps) {
    const {
        value,
        size = initialSetting.size,
        magnifyAA = initialSetting.magnifyAA,
        initialRange = initialSetting.initialRange,
        lineWidth = initialSetting.lineWidth,
        lineColor = initialSetting.lineColor,
        waveWidth = initialSetting.waveWidth,
        waveHeight = initialSetting.waveHeight,
        speed = initialSetting.speed,
        bgWaveOffset = initialSetting.bgWaveOffset,
        isReverse = initialSetting.isReverse,
        isReverseBg = initialSetting.isReverseBg,
        isShowBg = initialSetting.isShowBg,
        isGradient = initialSetting.isGradient,
        waveColor = initialSetting.waveColor,
        bgWaveColor = initialSetting.bgWaveColor,
    } = props;
    const ctxRef = useRef(null);
    const isCircleDraw = useRef(false);
    const setting = useRef<BallSettingIS>({
        size,
        magnifyAA,
        initialRange,
        lineWidth,
        lineColor,
        waveWidth,
        waveHeight,
        speed,
        bgWaveOffset,
        isReverse,
        isReverseBg,
        isShowBg,
        isGradient,
        waveColor,
        bgWaveColor,
    });
    const currentRange = useRef(initialRange);
    const targetRange = useRef(value);
    const currentAnime = useRef<number>(0);
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
        offsetX: number,
        color: string | { start: string; end: string },
        waveHeight: number,
        caWidth: number,
        caHeight: number,
        reverse: boolean = false
    ) => {
        // ctx.save();
        const waveOffsetX = 0;
        const points = []; //用于存放绘制Sin曲线的点
        ctx.beginPath();
        //在整个轴长上取点
        for (let x = waveOffsetX; x < waveOffsetX + caHeight; x += 20 / caHeight) {
            const y = 0.8 * Math.sin(((reverse ? x : -x) * setting.current.waveWidth * 500) / caWidth + offsetX);
            const offsetY = caHeight * (1 - currentRange.current / 100);
            points.push([x, offsetY + (y * waveHeight * caHeight) / 500]);
            ctx.lineTo(x, offsetY + (y * waveHeight * caHeight) / 500);
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
        else if (isGradient && !checkIsGradient(color)) ctx.fillStyle = color as string;
        else if (!isGradient && checkIsGradient(color)) ctx.fillStyle = color.start;
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

        setting.current.isShowBg &&
            drawSin(
                ctx,
                xOffset + Math.PI * setting.current.bgWaveOffset,
                setting.current.bgWaveColor,
                setting.current.waveHeight,
                caWidth,
                caHeight,
                setting.current.isReverseBg
            );
        drawSin(
            ctx,
            xOffset,
            setting.current.waveColor,
            setting.current.waveHeight,
            caWidth,
            caHeight,
            setting.current.isReverse
        );
        xOffset += setting.current.speed * setting.current.magnifyAA;
        currentAnime.current = requestAnimationFrame(() => {
            render(ctx, caWidth, caHeight, circleYCenter, circleRadius);
        });
    };

    const startAnime = () => {
        if (ctxRef.current) {
            const canvas: HTMLCanvasElement = ctxRef.current;
            const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
            //画布
            const caWidth = canvas.width;
            console.log("caWidth", caWidth);
            const caHeight = canvas.height;
            //圆
            const circleYCenter = caHeight / 2; //圆心
            const circleRadius = circleYCenter - 32; //圆半径
            //波浪
            ctx.lineWidth = setting.current.lineWidth;
            render(ctx, caWidth, caHeight, circleYCenter, circleRadius);
        } else {
            console.log("ctxRef is null");
        }
    };

    useEffect(() => {
        targetRange.current = value;
    }, [value]);

    useEffect(() => {
        console.log("useEffect");
        setting.current = {
            size,
            magnifyAA,
            initialRange,
            lineWidth,
            lineColor,
            waveWidth,
            waveHeight,
            speed,
            bgWaveOffset,
            isReverse,
            isReverseBg,
            isShowBg,
            isGradient,
            waveColor,
            bgWaveColor,
        };
    }, [
        magnifyAA,
        initialRange,
        lineWidth,
        lineColor,
        waveWidth,
        waveHeight,
        speed,
        bgWaveOffset,
        isReverse,
        isReverseBg,
        isShowBg,
        isGradient,
        waveColor,
        bgWaveColor,
    ]);

    useEffect(() => {
        isCircleDraw.current = false;
        setting.current.lineColor = lineColor;
        setting.current.lineWidth = lineWidth;
        if (ctxRef.current) {
            const canvas: HTMLCanvasElement = ctxRef.current;
            const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
            ctx.restore();
            ctx.lineWidth = setting.current.lineWidth;
        }
    }, [lineColor, lineWidth]);

    useEffect(() => {
        isCircleDraw.current = false;
        cancelAnimationFrame(currentAnime.current);
        setting.current.size = size;
        startAnime();
    }, [size, magnifyAA]);

    useEffect(startAnime, []);

    return (
        <>
            <canvas
                width={size * magnifyAA}
                height={size * magnifyAA}
                style={{ width: size, height: size }}
                ref={ctxRef}>
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
