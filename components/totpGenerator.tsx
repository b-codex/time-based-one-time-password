/* eslint-disable @next/next/no-img-element */
"use client"

import { Button, Col, Divider, message, Row, Space, Image } from "antd";
import { MuiOtpInput } from "mui-one-time-password-input";
import * as qrcode from "qrcode";
import { useEffect, useState } from "react";
import { TOTP } from "totp-generator";

// use secret from env variable
const authSecret = `${process.env.AUTH_SECRET}`;

const user = "user@email.org";
const issuer = "TOTP-Generator";

export default function TOTPGeneratorPage() {

    const [otp, setOtp] = useState<string>("");
    const [url, setUrl] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {

        // generate QR code to use for authenticator apps
        const baseURL = `otpauth://totp/${issuer}:${user}?issuer=${issuer}&period=30&secret=${authSecret}`;
        qrcode.toDataURL(baseURL.toString(), (err, url) => {
            setUrl(url);
        });

    }, []);

    const verifyCode = () => {
        setLoading(true);

        setTimeout(() => {
            // generate the current token and match it with user input
            const authObject = TOTP.generate(authSecret, { algorithm: "SHA-1" });
            if (otp === authObject.otp) message.success("Verified!");
            else message.error("Unable to verify!");

            setLoading(false);
        }, 1000);
    }

    return (
        <Row
            style={{
                width: "100vw",
                // height: "100vh",
            }}
            className="center"
        >
            <Col xl={10} xs={22} className="center">
                <Space direction="vertical" className="center">
                    <img src={url} alt="" width={400} />

                    <Divider />

                    <MuiOtpInput
                        value={otp}
                        onChange={setOtp}
                        length={6}
                        onKeyUp={() => {
                            if (otp.length === 6) {
                                verifyCode();
                            }
                        }}
                    />

                    <Divider />

                    <Button
                        type="primary"
                        size="large"
                        loading={loading}
                        onClick={() => {
                            if (otp.length < 6) {
                                message.error("Fill the code first");
                            }
                            else {
                                verifyCode();
                            }
                        }}
                    >
                        Verify
                    </Button>
                </Space>
            </Col>

            <Col xl={10} xs={22} className="center">
                <Image
                    src={'/totpGenerator.png'}
                    alt='code snippet'
                    height={"95vh"}
                />
            </Col>
        </Row>
    );
}
