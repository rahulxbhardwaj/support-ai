import Link from "next/link";

export default function LearnMorePage() {
  const steps = [
    {
      number: "1",
      title: "Create an account",
      description:
        "Sign up with your email and set up your SupportAI workspace. Takes about a minute, no credit card needed.",
    },
    {
      number: "2",
      title: "Add your business details",
      description:
        "Tell your agent about your business — your company name, delivery times, services, pricing and common customer questions.",
      example: 'e.g. "We ship worldwide, free delivery over ₹2,000"',
    },
    {
      number: "3",
      title: "Copy the embed tag into your site",
      description:
        "Paste one script tag into your website code. It takes around 30 seconds. Save the file and your AI assistant is instantly live.",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#eef4ff] via-[#f5f8ff] to-[#edf3fb]">
      {/* Navbar */}
      <header className="max-w-7xl mx-auto px-10 py-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Support<span className="text-slate-500">AI</span>
        </h1>

        <div className="w-14 h-14 rounded-full bg-[#1b2235] text-white flex items-center justify-center font-bold text-lg shadow-lg">
          R
        </div>
      </header>

      {/* Main Card */}
      <section className="max-w-7xl mx-auto px-8 pb-16">
        <div className="rounded-[40px] bg-white/60 backdrop-blur-sm border border-white shadow-xl py-24 px-6 md:px-20">

          {/* Heading */}
          <div className="max-w-3xl mx-auto text-center">
            <p className="uppercase tracking-[0.3em] text-sm font-semibold text-slate-500">
              HOW IT WORKS
            </p>

            <h2 className="mt-6 text-5xl md:text-6xl font-extrabold leading-tight text-[#17213d]">
              Live on your site in three
              <br />
              simple steps
            </h2>

            <p className="mt-8 text-xl text-slate-500 leading-9">
              No developer needed, no long setup.
              Create an account, tell it about your business,
              and add one line of code to your site.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative mt-24 max-w-4xl mx-auto">

            {/* Vertical Line */}
            <div className="absolute left-[42px] top-0 bottom-0 w-px bg-slate-200" />

            <div className="space-y-8">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="relative bg-white rounded-3xl border border-slate-200 shadow-sm px-8 py-8"
                >
                  <div className="flex gap-6">

                    {/* Number */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-[#1b2235] text-white font-bold flex items-center justify-center text-lg shadow">
                        {step.number}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold text-[#17213d]">
                        {step.title}
                      </h3>

                      <p className="mt-3 text-lg text-slate-500 leading-8">
                        {step.description}
                      </p>

                      {step.example && (
                        <div className="inline-block mt-5 rounded-xl bg-slate-100 border border-slate-200 px-4 py-2 text-[15px] text-slate-700">
                          {step.example}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Text */}
          <div className="text-center mt-20">
            <p className="text-slate-500 text-xl">
              That's it — your visitors get instant answers from here on.
            </p>

            <div className="flex justify-center gap-5 mt-10 flex-wrap">

              <Link
                href="/dashboard"
                className="px-10 py-4 rounded-2xl bg-[#1b2235] text-white font-semibold text-lg hover:bg-[#111827] transition shadow-lg"
              >
                Go to Dashboard
              </Link>

              <Link
                href="/"
                className="px-10 py-4 rounded-2xl border border-slate-300 bg-white text-[#17213d] font-semibold text-lg hover:bg-slate-50 transition"
              >
                Back to Home
              </Link>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-16 text-slate-500 text-lg">
          Made in India with ♥
        </div>
      </section>
    </main>
  );
}