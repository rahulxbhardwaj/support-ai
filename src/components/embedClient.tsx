"use client";

import Link from "next/link";
import { useState } from "react";

export const EmbedClient = ({ ownerId }: { ownerId: string }) => {
  const [copied, setCopied] = useState(false);

  const embedCode = `<script src="${process.env.NEXT_PUBLIC_APP_URL}/chatbot.js" data-owner-id="${ownerId}"></script>`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(embedCode);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#F6F8FC]">

      {/* Background Blur */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[-120px] top-40 h-80 w-80 rounded-full bg-cyan-200/30 blur-[120px]" />
        <div className="absolute right-[-120px] top-72 h-80 w-80 rounded-full bg-violet-200/30 blur-[120px]" />
        <div className="absolute bottom-[-120px] left-1/3 h-96 w-96 rounded-full bg-sky-200/30 blur-[140px]" />
      </div>

      {/* NAVBAR */}
      <header className="relative z-20">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">

          <Link
            href="/"
            className="text-xl font-semibold tracking-tight text-slate-900 hover:opacity-80 transition"
          >
            SupportAI
          </Link>

          <div className="h-10 w-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-semibold shadow-lg">
            R
          </div>

        </div>
      </header>

      {/* CONTENT */}

      <div className="relative z-10 flex justify-center px-6 pb-20 top-10">

        <div className="w-full max-w-5xl rounded-[34px] border border-white/70 bg-white/70 backdrop-blur-xl shadow-[0_20px_80px_rgba(15,23,42,0.08)] p-12">

          <div className="max-w-3xl">

            <h1 className="text-5xl font-semibold leading-tight tracking-tight text-slate-900">
              Deploy Your AI Assistant
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-500">
              Integrate your chatbot into any website in less than a minute.
              Copy the script below and paste it before the closing
              <code className="mx-1 rounded bg-slate-100 px-2 py-1 text-sm text-slate-700">
                &lt;/body&gt;
              </code>
              tag.
            </p>

          </div>

          {/* CODE BLOCK */}

          <div className="relative mt-12">

            <button
              onClick={handleCopy}
              className="absolute right-5 top-5 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:scale-[1.03]"
            >
              {copied ? "✓ Copied" : "Copy Code"}
            </button>

            <pre className="overflow-x-auto rounded-3xl border border-slate-200 bg-slate-50 p-8 pr-40 font-mono text-[15px] leading-8 text-slate-700 shadow-inner">
              {embedCode}
            </pre>

          </div>

          {/* PROCESS */}

          <div className="mt-14">

            <h3 className="text-xl font-semibold text-slate-900">
              Integration takes less than a minute
            </h3>

            <div className="mt-8 grid gap-5 md:grid-cols-3">

              <div className="rounded-3xl border border-white bg-white/60 backdrop-blur-xl p-6 shadow-sm">

                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white font-semibold">
                  1
                </div>

                <h4 className="font-semibold text-slate-900">
                  Copy the Script
                </h4>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Click the <strong>Copy Code</strong> button above to copy
                  your unique chatbot script.
                </p>

              </div>

              <div className="rounded-3xl border border-white bg-white/60 backdrop-blur-xl p-6 shadow-sm">

                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white font-semibold">
                  2
                </div>

                <h4 className="font-semibold text-slate-900">
                  Open Your Website
                </h4>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Open your HTML file or template where you want the chatbot
                  to appear.
                </p>

              </div>

              <div className="rounded-3xl border border-white bg-white/60 backdrop-blur-xl p-6 shadow-sm">

                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white font-semibold">
                  3
                </div>

                <h4 className="font-semibold text-slate-900">
                  Paste & Publish
                </h4>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Paste the script right before the closing
                  <strong> {"</body>"} </strong>
                  tag, save your changes and deploy your website.
                </p>

              </div>

            </div>

          </div>

          {/* FOOTER NOTE */}

          <div className="mt-12 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4">

            <p className="text-sm text-emerald-700">
              ✨ Once your website is live, the chatbot will automatically
              appear in the bottom-right corner of every page.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};