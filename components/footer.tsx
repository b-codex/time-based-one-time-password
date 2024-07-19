"use client"

import { CodeOutlined } from '@ant-design/icons';
import { Button, Modal, Image } from 'antd';
import { useState } from 'react';

export default function Footer() {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    return (
        <>
            <div
                className="footer"
            >
                <Button
                    icon={<CodeOutlined />}
                    onClick={() => {
                        setModalOpen(true);
                    }}
                >
                    View Code Snippet
                </Button>
            </div>

            <Modal
                title="Code Snippet"
                centered
                open={modalOpen}
                onOk={() => setModalOpen(false)}
                onCancel={() => setModalOpen(false)}
                footer={null}
            >
                <Image
                    src={'/totpGenerator.png'}
                    alt='code snippet'
                    width={400}
                    height={400}
                />
            </Modal>
        </>
    )
}
