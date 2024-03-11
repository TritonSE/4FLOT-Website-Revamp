"use client"
import {PayPalScriptProvider} from '@paypal/react-paypal-js'

import DonateCard from './DonateCard'
import DonateCardText from './DonateCardText'
import DonateForm from './DonateForm'


export default function DonateApp() {
    console.log(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID)
    return (
        <PayPalScriptProvider
            options={{
                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "test",
                components: "buttons",
                currency: "USD",
                enableFunding: "venmo",

            }}
        >
            <DonateCard>
                <DonateCardText />
                <DonateForm />
            </DonateCard>
        </PayPalScriptProvider>
    )
}