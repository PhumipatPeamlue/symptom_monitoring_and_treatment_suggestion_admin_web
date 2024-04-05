import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-40 p-24 homepage-background">
      <div className="text-center p-5 border border-stone-900 title-box-shadow">
        <h1 className="text-5xl font-bungee">Symptom Monitoring</h1>
        <br />
        <h1 className="text-5xl font-bungee">&</h1>
        <br />
        <h1 className="text-5xl font-bungee">Treatment Suggestion</h1>
        <br />
        <h2 className="text-2xl font-bungee">( Admin Management Website )</h2>
      </div>

      <div className="mb-32 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:text-left gap-4 flex justify-center">
        <Link href="/doc/video_doc" className="group rounded-lg border-4 border-dashed border-stone-900 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className={`mb-3 text-2xl font-bungee`}>
            Video Document Management{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 text-sm opacity-50 font-mono`}>
            Go to Video Document Management page.
          </p>
        </Link>

        <Link
          href="/doc/drug_doc" className="group rounded-lg border-4 border-dashed border-stone-900 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className={`mb-3 text-2xl font-bungee`}>
            Drug Document Management{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 text-sm opacity-50 font-mono`}>
            Go to Drug Document management page.
          </p>
        </Link>
      </div>
    </main>
  );
}
