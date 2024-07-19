import Footer from '@/components/footer'
import Header from '@/components/header'
import OTPAuthPage from '@/components/otpAuth'
import Time2FAPage from '@/components/time2fa'
import TOTPGeneratorPage from '@/components/totpGenerator'
import React from 'react'

export default function Home() {
    return (
        <>
            {/* <Header /> */}

            <TOTPGeneratorPage />
            {/* <Time2FAPage /> */}
            {/* <OTPAuthPage /> */}

            {/* <Footer /> */}
        </>
    )
}
