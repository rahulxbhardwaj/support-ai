"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { LayoutDashboard, Home, CreditCard } from "lucide-react";

const plans = [
    {
        name: "Starter",
        price: 49,
        credits: 200,
        popular: false,
    },
    {
        name: "Growth",
        price: 99,
        credits: 500,
        bonus: 100,
        popular: true,
    },
    {
        name: "Pro",
        price: 199,
        credits: 2500,
        bonus: 500,
        popular: false,
    },
];

interface BillingClientProps {
    ownerId: string;
}

export default function BillingPage({ ownerId }: BillingClientProps) {
    const [creditsRemaining, setCreditsRemaining] =
        useState<number>(0);

    const fetchCredits = async () => {

        try {

            const response = await fetch(
                "/api/settings/get",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        ownerId
                    })
                }
            );

            const data = await response.json();

            setCreditsRemaining(
                data.creditsRemaining || 0
            );

        } catch (err) {

            console.error(err);

        }
    };

    useEffect(() => {
        fetchCredits();
    }, [ownerId]);



    const handlePurchase = async (plan: any) => {
        try {
            const res = await fetch(
                "/api/payment/create-order",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        amount: plan.price,
                    }),
                }
            );

            const order = await res.json();

            const options = {
                key: process.env
                    .NEXT_PUBLIC_RAZORPAY_KEY_ID,

                amount: order.amount,

                currency: order.currency,

                order_id: order.id,

                name: "SupportAI",

                description:
                    `${plan.credits} Credits`,

                handler: async function (
                    response: any
                ) {
                    console.log("Payment Success");

                    const res = await fetch(
                        "/api/payment/verify",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type":
                                    "application/json"
                            },
                            body: JSON.stringify({
                                ownerId,
                                paymentId:
                                    response.razorpay_payment_id,

                                orderId:
                                    response.razorpay_order_id,

                                credits:
                                    plan.credits
                            })
                        }
                    );

                    const result = await res.json();
                    console.log(result);
                    await fetchCredits();
                },
            };

            const razorpay =
                new (window as any).Razorpay(
                    options
                );

            razorpay.open();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#eef1f6] overflow-hidden relative">

            {/* Background Mesh */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-200/40 rounded-full blur-[120px]" />
            <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-purple-200/40 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[50%] bg-teal-100/40 rounded-full blur-[120px]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
                <motion.nav
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="
        mb-12
        bg-white/40
        backdrop-blur-2xl
        border border-white/60
        rounded-2xl
        px-6 py-4
        flex items-center justify-between
        shadow-[0_8px_32px_rgba(31,38,135,0.08)]
    "
                >

                    <div className="flex items-center gap-3">

                        <div className="
            h-10 w-10
            rounded-xl
            bg-gray-900
            text-white
            flex items-center justify-center
            font-bold
        ">
                            AI
                        </div>

                        <div>
                            <h2 className="font-semibold text-gray-900">
                                SupportAI
                            </h2>

                            <p className="text-xs text-gray-500">
                                AI Customer Support Platform
                            </p>
                        </div>

                    </div>

                    <div className="flex items-center gap-3">

                        <Link
                            href="/"
                            className="
                flex items-center gap-2
                px-4 py-2
                rounded-xl
                text-gray-700
                hover:bg-white/60
                transition-all
            "
                        >
                            <Home size={18} />
                            Home
                        </Link>

                        <Link
                            href="/dashboard"
                            className="
                flex items-center gap-2
                px-4 py-2
                rounded-xl
                text-gray-700
                hover:bg-white/60
                transition-all
            "
                        >
                            <LayoutDashboard size={18} />
                            Dashboard
                        </Link>

                        <Link
                            href="/dashboard/billing"
                            className="
                flex items-center gap-2
                px-4 py-2
                rounded-xl
                bg-gray-900
                text-white
                shadow-lg
            "
                        >
                            <CreditCard size={18} />
                            Billing
                        </Link>

                    </div>

                </motion.nav>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-5xl font-semibold text-gray-900">
                        Buy Credits
                    </h1>

                    <p className="text-gray-600 mt-4 text-lg">
                        Scale your AI assistant with more conversations.
                    </p>
                </motion.div>

                {/* Credit Card */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="max-w-md mx-auto mb-14 bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[2rem] p-8 text-center shadow-[0_8px_32px_rgba(31,38,135,0.08)]"
                >
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-gray-500 uppercase tracking-wider text-sm">
                            Available Credits
                        </span>
                    </div>

                    <h2 className="text-6xl font-bold text-gray-900">
                        {creditsRemaining.toLocaleString()}
                    </h2>

                    <p className="mt-3 text-gray-500">
                        Every chatbot response consumes 1 credit
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8">

                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15 }}
                            whileHover={{
                                y: -10,
                                scale: 1.02,
                            }}
                            className={`
                relative
                bg-white/40
                backdrop-blur-2xl
                border
                rounded-[2rem]
                p-8
                shadow-[0_8px_32px_rgba(31,38,135,0.08)]
                transition-all
                ${plan.popular
                                    ? "border-gray-900/30"
                                    : "border-white/60"
                                }
              `}
                        >

                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <div className="bg-gray-900 text-white px-4 py-1 rounded-full text-xs font-medium">
                                        Most Popular
                                    </div>
                                </div>
                            )}

                            <h3 className="text-2xl font-semibold text-gray-900">
                                {plan.name}
                            </h3>

                            <div className="mt-6">
                                <span className="text-5xl font-bold text-gray-900">
                                    ₹{plan.price}/-
                                </span>
                            </div>

                            <div className="mt-8">
                                <p className="text-4xl font-bold text-gray-900">
                                    {plan.credits}
                                </p>

                                <p className="text-gray-600 mt-1">
                                    Credits
                                </p>

                                {plan.bonus && (
                                    <div className="mt-4 inline-flex px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                                        +{plan.bonus} Bonus Credits
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => handlePurchase(plan)}
                                className="
                  mt-10
                  w-full
                  py-3.5
                  rounded-xl
                  bg-gray-900/90
                  text-white
                  font-medium
                  hover:bg-gray-900
                  transition-all
                  shadow-lg
                "
                            >
                                Buy Now
                            </button>
                        </motion.div>
                    ))}

                </div>

            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-16 max-w-5xl mx-auto"
            >
                <div className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[2rem] p-8">

                    <div className="grid md:grid-cols-3 gap-6">

                        <div>
                            <h3 className="font-semibold text-lg">
                                🔒 Secure Payments
                            </h3>

                            <p className="text-gray-600 mt-2">
                                All payments are processed securely
                                through Razorpay.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg">
                                ⚡ Instant Credits
                            </h3>

                            <p className="text-gray-600 mt-2">
                                Credits are added immediately
                                after successful payment.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg">
                                💬 Pay As You Grow
                            </h3>

                            <p className="text-gray-600 mt-2">
                                Buy only the credits you need.
                                No subscriptions required.
                            </p>
                        </div>

                    </div>

                </div>
            </motion.div>
        </div>
    );
}