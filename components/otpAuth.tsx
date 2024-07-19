/* eslint-disable @next/next/no-img-element */
"use client"

import { Button, Col, Divider, message, Row, Space } from "antd";
import { MuiOtpInput } from "mui-one-time-password-input";
import * as qrcode from "qrcode";
import { useEffect, useState } from "react";

// use secret from env variable
const authSecret = `${process.env.AUTH_SECRET}`;

import * as OTPAuth from "otpauth";
let otpAuth = new OTPAuth.TOTP({
    // Provider or service the account is associated with.
    issuer: "OTPAuth",
    // Account identifier.
    label: "user@email.org",
    // Algorithm used for the HMAC function.
    algorithm: "sha1",
    // Length of the generated tokens.
    digits: 6,
    // Interval of time for which a token is valid, in seconds.
    period: 30,
    // Arbitrary key encoded in Base32 or OTPAuth.Secret instance.
    secret: authSecret,
});

export default function OTPAuthPage() {

    const [otp, setOtp] = useState<string>("");
    const [url, setUrl] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {

        // generate QR code to use for authenticator apps
        const baseURL = otpAuth.toString();
        qrcode.toDataURL(baseURL.toString(), (err, url) => {
            setUrl(url);
        });

    }, []);

    // generate the current token and match it with user input
    const verifyCode = () => {
        setLoading(true);

        setTimeout(() => {
            if (otp === otpAuth.generate()) message.success("Verified!");
            else message.error("Unable to verify!");

            setLoading(false);
        }, 1000);
    }

    return (
        <Row
            style={{
                width: "100vw",
                height: "100vh",
            }}
            className="center"
        >
            <Col xl={10} xs={22} className="center">
                <Space direction="vertical" className="center">
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
                <img src={url} alt="" width={400} />
            </Col>
        </Row>
    );
}
