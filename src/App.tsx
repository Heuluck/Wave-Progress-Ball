import { useEffect, useRef, useState } from "react";
import "./App.css";
import { BallSetting, ProgressBall } from "./components/ball/ball";
import { Card, ColorPicker, Flex, Form, Slider } from "antd";
import autoAnimate from "@formkit/auto-animate";

function App() {
    const [activeTabKey, setActiveTabKey] = useState<string>("common");
    const [value, setValue] = useState(50);
    const [initialRange, setInitialRange] = useState<number>(50);
    const [lineWidth, setLineWidth] = useState<number>(1);
    const [lineColor, setLineColor] = useState<string>("#bdc3c7");
    const [waveWidth, setWaveWidth] = useState<number>(0.018);
    const [waveHeight, setWaveHeight] = useState<number>(18);
    const [speed, setSpeed] = useState<number>(0.01);
    const [waveColor, setWaveColor] = useState<string | { start: string; end: string }>({
        start: "#43CF73",
        end: "#BCEC4F",
    });
    const [bgWaveColor, setBgWaveColor] = useState<string | { start: string; end: string }>({
        start: "rgba(130, 221, 95,0.5)",
        end: "rgba(130, 221, 97,0.5)",
    });
    const [isGradient, setIsGradient] = useState<boolean>(true);
    const parent = useRef(null);
    useEffect(() => {
        parent.current && autoAnimate(parent.current);
    }, [parent]);
    const setting = useRef<BallSetting>({
        initialRange,
        lineWidth,
        lineColor,
        waveWidth,
        waveHeight,
        speed,
        waveColor,
        bgWaveColor,
        isGradient,
    });
    const tabList = [
        {
            key: "common",
            tab: "基础设置",
        },
        {
            key: "color",
            tab: "颜色设置",
        },
    ];

    const contentList: Record<string, React.ReactNode> = {
        common: (
            <>
                <Form.Item label="液面高度">
                    <Slider defaultValue={value} onChange={setValue} min={0} max={100} step={1} />
                </Form.Item>
                <Form.Item label="流动速度">
                    <Slider
                        defaultValue={setting.current.speed}
                        onChange={(e) => {
                            setSpeed(e);
                        }}
                        min={0}
                        max={0.2}
                        step={0.01}
                    />
                </Form.Item>
            </>
        ),
        color: (
            <>
                <Card style={{ marginTop: 16 }} type="inner" title="圆形外壳">
                    <Form.Item label="外壳颜色">
                        <ColorPicker
                            defaultValue={setting.current.lineColor}
                            onChange={(color) => {
                                setLineColor(color.toRgbString());
                            }}
                            showText
                            format="rgb"
                        />
                    </Form.Item>
                </Card>
            </>
        ),
    };
    return (
        <>
            <ProgressBall
                value={value}
                initialRange={initialRange}
                lineWidth={lineWidth}
                lineColor={lineColor}
                waveWidth={waveWidth}
                waveHeight={waveHeight}
                speed={speed}
                waveColor={waveColor}
                bgWaveColor={bgWaveColor}
                isGradient={isGradient}
            />
            <Card title="设置" hoverable tabList={tabList} activeTabKey={activeTabKey} onTabChange={setActiveTabKey}>
                <Flex gap="middle" vertical ref={parent}>
                    {contentList[activeTabKey]}
                </Flex>
            </Card>
        </>
    );
}

export default App;
