import { useEffect, useRef, useState } from "react";
import "./App.css";
import { BallSetting, ProgressBall } from "./components/ball/ball";
import { Card, ColorPicker, Flex, Form, Slider } from "antd";
import autoAnimate from "@formkit/auto-animate";

function App() {
    const [activeTabKey, setActiveTabKey] = useState<string>("common");
    const parent = useRef(null);

    useEffect(() => {
        parent.current && autoAnimate(parent.current);
    }, [parent]);
    const [value, setValue] = useState(50);
    const setting = useRef<BallSetting>({
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
            isGradient: true,
        },
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
                        defaultValue={setting.current.wave.speed}
                        onChange={(e) => {
                            setting.current.wave.speed = e;
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
                        <ColorPicker defaultValue={setting.current.circle.lineColor} onChange={color=>{setting.current.circle.lineColor=color.toRgbString()}} showText format="rgb" />
                    </Form.Item>
                </Card>
            </>
        ),
    };
    return (
        <>
            <ProgressBall value={value} ballSetting={setting.current} />
            <Card title="设置" hoverable tabList={tabList} activeTabKey={activeTabKey} onTabChange={setActiveTabKey}>
                <Flex gap="middle" vertical ref={parent}>
                    {contentList[activeTabKey]}
                </Flex>
            </Card>
        </>
    );
}

export default App;
