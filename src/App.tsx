import { useMemo, useState } from "react";

type Heart = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  emoji: string;
};

type Sparkle = {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
};

const HEART_EMOJIS = ["💗", "💕", "💖", "💓", "❤️", "🌸"];

function useFloatingHearts(count: number): Heart[] {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 14 + Math.random() * 22,
        duration: 8 + Math.random() * 9,
        delay: Math.random() * 10,
        drift: (Math.random() - 0.5) * 120,
        emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
      })),
    [count]
  );
}

function useSparkles(count: number): Sparkle[] {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 4 + Math.random() * 8,
        delay: Math.random() * 3,
      })),
    [count]
  );
}

export default function App() {
  const [opened, setOpened] = useState(false);
  const hearts = useFloatingHearts(18);
  const sparkles = useSparkles(22);

  return (
    <div className="romantic-bg relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-10 sm:px-6">
      {/* Floating hearts */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {hearts.map((h) => (
          <span
            key={h.id}
            className="floating-heart select-none"
            style={
              {
                left: `${h.left}%`,
                fontSize: `${h.size}px`,
                animationDuration: `${h.duration}s`,
                animationDelay: `${h.delay}s`,
                "--drift": `${h.drift}px`,
                "--s": 1,
              } as React.CSSProperties
            }
          >
            {h.emoji}
          </span>
        ))}
        {sparkles.map((s) => (
          <span
            key={s.id}
            className="sparkle"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Decorative blurred blobs */}
      <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-rose-700/30 blur-3xl sm:h-72 sm:w-72" />
      <div className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-fuchsia-900/40 blur-3xl sm:h-80 sm:w-80" />

      <main className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        {!opened && (
          <div className="fade-in-slow flex w-full flex-col items-center gap-6">
            <p className="font-hand text-2xl text-rose-200/90 sm:text-3xl">
              Uma cartinha chegou para...
            </p>

            <div className="flex w-full justify-center">
              <h1 className="shimmer-text font-script text-6xl leading-tight sm:text-7xl md:text-8xl">
                Karina
              </h1>
            </div>

            <button
              type="button"
              onClick={() => setOpened(true)}
              aria-label="Abrir carta"
              className="group heartbeat mt-4 flex flex-col items-center gap-3 focus:outline-none"
            >
              <div className="relative h-28 w-40 sm:h-32 sm:w-44">
                {/* envelope body */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-rose-900 to-rose-950 shadow-xl shadow-black/40 ring-1 ring-rose-400/30" />
                {/* envelope bottom fold */}
                <div
                  className="absolute inset-x-0 bottom-0 h-1/2 rounded-b-xl bg-rose-950"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                  }}
                />
                <div
                  className="absolute left-0 top-0 h-full w-1/2 bg-rose-900/70"
                  style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
                />
                <div
                  className="absolute right-0 top-0 h-full w-1/2 bg-rose-900/70"
                  style={{ clipPath: "polygon(100% 0, 0 50%, 100% 100%)" }}
                />
                {/* envelope flap */}
                <div
                  className="envelope-flap absolute left-0 top-0 h-1/2 w-full origin-top"
                  style={{
                    background:
                      "linear-gradient(135deg, #ad1457, #4a0e24)",
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-2xl">
                  💌
                </div>
              </div>
              <span className="font-hand text-xl text-rose-100/90 transition group-hover:text-white sm:text-2xl">
                Toque para abrir ✨
              </span>
            </button>
          </div>
        )}

        {opened && (
          <div className="pop-in w-full rounded-3xl border border-rose-400/20 bg-[#2a0616]/80 p-6 shadow-2xl shadow-black/50 backdrop-blur-md sm:p-10">
            <div className="mb-4 flex justify-center gap-2 text-2xl">
              <span className="sway inline-block">🌷</span>
              <span className="sway inline-block" style={{ animationDelay: "0.4s" }}>
                💐
              </span>
              <span className="sway inline-block" style={{ animationDelay: "0.8s" }}>
                🌷
              </span>
            </div>

            <p
              className="reveal-line font-hand text-2xl text-rose-200/90 sm:text-3xl"
              style={{ animationDelay: "0.2s" }}
            >
              Para a minha querida
            </p>

            <div className="flex w-full justify-center">
              <h2
                className="reveal-line shimmer-text mt-1 font-script text-6xl sm:text-7xl"
                style={{ animationDelay: "0.5s" }}
              >
                Karina
              </h2>
            </div>

            <p
              className="reveal-line mt-6 text-base leading-relaxed text-rose-50/90 sm:text-lg"
              style={{ animationDelay: "0.9s" }}
            >
              Gostaria muito, <span className="font-semibold text-amber-300">muito</span> de
              ter te encontrado hoje...
            </p>

            <p
              className="reveal-line mt-3 text-sm leading-relaxed text-rose-200/70 sm:text-base"
              style={{ animationDelay: "1.2s" }}
            >
              Só de pensar em você o meu dia já fica mais leve e mais bonito.
              Onde quer que você esteja agora, saiba que existe alguém
              torcendo, sorrindo e guardando um pedacinho de carinho só pra
              você. 💗
            </p>

            <div
              className="reveal-line mt-8 flex flex-col items-center gap-1"
              style={{ animationDelay: "1.6s" }}
            >
              <span className="text-2xl">💌</span>
              <p className="font-hand text-xl text-rose-200/90 sm:text-2xl">
                Com amor,
              </p>
              <p className="font-script text-3xl text-amber-200 sm:text-4xl">
                Natan Barbosa
              </p>
            </div>

            <button
              type="button"
              onClick={() => setOpened(false)}
              className="reveal-line mt-8 rounded-full border border-rose-300/40 bg-white/10 px-5 py-2 text-sm font-medium text-rose-100 shadow-sm transition hover:bg-white/20 active:scale-95"
              style={{ animationDelay: "1.9s" }}
            >
              Fechar a cartinha 💗
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
