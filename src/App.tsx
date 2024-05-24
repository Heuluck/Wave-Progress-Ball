import { useEffect, useRef, useState } from "react";
import "./App.css";
import { ProgressBall } from "./components/ball/ball";
import { Card, ColorPicker, Flex, Form, Slider, Space, Switch } from "antd";
import autoAnimate from "@formkit/auto-animate";
import { BallSettingIS } from "./components/ball/defaultSetting";

interface gradient {
    start: string;
    end: string;
}

function App() {
    const [activeTabKey, setActiveTabKey] = useState<string>("common");
    const [value, setValue] = useState(50);
    const [initialRange, setInitialRange] = useState<number>(50);
    const [lineWidth, setLineWidth] = useState<number>(1);
    const [lineColor, setLineColor] = useState<string>("#bdc3c7");
    const [waveWidth, setWaveWidth] = useState<number>(0.018);
    const [waveHeight, setWaveHeight] = useState<number>(18);
    const [speed, setSpeed] = useState<number>(0.01);
    const [waveColor, setWaveColor] = useState<string | gradient>({
        start: "#43CF73",
        end: "#BCEC4F",
    });
    const [bgWaveColor, setBgWaveColor] = useState<string | gradient>({
        start: "rgba(130, 221, 95,0.5)",
        end: "rgba(130, 221, 97,0.5)",
    });
    const [isGradient, setIsGradient] = useState<boolean>(true);
    const parent = useRef(null);
    useEffect(() => {
        parent.current && autoAnimate(parent.current);
    }, [parent]);
    const setting = useRef<BallSettingIS>({
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
            key: "outfit",
            tab: "外观设置",
        },
        {
            key: "wave",
            tab: "波浪设置",
        },
        {
            key: "others",
            tab: "其他设置",
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
        outfit: (
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
                    <Form.Item label="外壳粗细">
                        <Slider
                            defaultValue={setting.current.lineWidth}
                            onChange={(e) => {
                                setLineWidth(e);
                            }}
                            min={1}
                            max={10}
                            step={1}
                        />
                    </Form.Item>
                </Card>
                <Card style={{ marginTop: 16 }} type="inner" title="波浪">
                    <Form.Item label="渐变切换">
                        <Switch
                            checkedChildren="渐变"
                            unCheckedChildren="单色"
                            defaultChecked={isGradient}
                            onChange={(checked) => {
                                if (checked) {
                                    setWaveColor({
                                        start: "#43CF73",
                                        end: "#BCEC4F",
                                    });
                                    setBgWaveColor({
                                        start: "rgba(130, 221, 95,0.5)",
                                        end: "rgba(130, 221, 97,0.5)",
                                    });
                                    setIsGradient(checked);
                                } else {
                                    setWaveColor("#69d569");
                                    setBgWaveColor("rgba(158, 226, 89,.5)");
                                    setIsGradient(checked);
                                }
                            }}
                        />
                    </Form.Item>
                    {isGradient ? (
                        <>
                            <Form.Item label="前景波浪颜色">
                                <Space>
                                    <ColorPicker
                                        key={1}
                                        defaultValue={(setting.current.waveColor as gradient).start}
                                        onChange={(color) => {
                                            setWaveColor((current) => {
                                                return { start: color.toRgbString(), end: (current as gradient).end };
                                            });
                                        }}
                                        showText
                                        format="rgb"
                                    />
                                    <ColorPicker
                                        key={2}
                                        defaultValue={(setting.current.waveColor as gradient).end}
                                        onChange={(color) => {
                                            setWaveColor((current) => {
                                                return { start: (current as gradient).start, end: color.toRgbString() };
                                            });
                                        }}
                                        showText
                                        format="rgb"
                                    />
                                </Space>
                            </Form.Item>
                            <Form.Item label="背景波浪颜色">
                                <Space>
                                    <ColorPicker
                                        key={3}
                                        defaultValue={(setting.current.bgWaveColor as gradient).start}
                                        onChange={(color) => {
                                            setBgWaveColor((current) => {
                                                return { start: color.toRgbString(), end: (current as gradient).end };
                                            });
                                        }}
                                        showText
                                        format="rgb"
                                    />
                                    <ColorPicker
                                        key={4}
                                        defaultValue={(setting.current.bgWaveColor as gradient).end}
                                        onChange={(color) => {
                                            setBgWaveColor((current) => {
                                                return { start: (current as gradient).start, end: color.toRgbString() };
                                            });
                                        }}
                                        showText
                                        format="rgb"
                                    />
                                </Space>
                            </Form.Item>
                        </>
                    ) : (
                        <>
                            <Form.Item label="前景波浪颜色">
                                <ColorPicker
                                    defaultValue={waveColor as string}
                                    onChange={(color) => {
                                        setWaveColor(color.toRgbString());
                                    }}
                                    showText
                                    format="rgb"
                                />
                            </Form.Item>
                            <Form.Item label="背景波浪颜色">
                                <ColorPicker
                                    defaultValue={bgWaveColor as string}
                                    onChange={(color) => {
                                        setBgWaveColor(color.toRgbString());
                                    }}
                                    showText
                                    format="rgb"
                                />
                            </Form.Item>
                        </>
                    )}
                </Card>
            </>
        ),
        wave: (
            <>
                <Form.Item label="波浪宽度">
                    <Slider key="waw" defaultValue={waveWidth} onChange={setWaveWidth} min={0} max={0.1} step={0.001} />
                </Form.Item>
                <Form.Item label="波浪高度">
                    <Slider key="wah" defaultValue={waveHeight} onChange={setWaveHeight} min={0} max={30} step={1} />
                </Form.Item>
            </>
        ),
        others: (
            <>
                <Form.Item label="初始高度（注：无法预览）">
                    <Slider key="inh" defaultValue={initialRange} onChange={setInitialRange} min={0} max={100} step={1} />
                </Form.Item>
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
