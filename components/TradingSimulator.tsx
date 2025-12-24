"use client";

import { useMemo, useState } from "react";
import { runSimulation, type RiskLevel, type Strategy } from "@/lib/simulation";

interface FormState {
  capital: number;
  durationMonths: number;
  risk: RiskLevel;
  strategy: Strategy;
}

const riskOptions: RiskLevel[] = ["منخفض", "متوسط", "مرتفع"];
const strategyOptions: Strategy[] = [
  "زخم متطور",
  "موازنة ذكية",
  "صانع سوق تكيفي",
  "تشبع السيولة"
];

export function TradingSimulator() {
  const [form, setForm] = useState<FormState>({
    capital: 25000,
    durationMonths: 12,
    risk: "متوسط",
    strategy: "زخم متطور"
  });

  const result = useMemo(() => runSimulation(form), [form]);

  const handleNumberChange = (key: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: Number(event.target.value) }));
    };

  const handleSelectChange = (key: keyof FormState) =>
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
    };

  const formatter = new Intl.NumberFormat("ar-EG", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  });

  return (
    <section className="glass rounded-3xl shadow-2xl border border-slate-700/40">
      <div className="grid gap-10 px-8 py-10 lg:grid-cols-[320px,1fr]">
        <form className="space-y-6">
          <header>
            <h2 className="text-2xl font-semibold text-slate-50">محاكاة التداول الفوري</h2>
            <p className="mt-2 text-sm text-slate-300">
              عدل معاييرك وشاهد كيف يقوم البوت بتخصيص استراتيجياته وإدارة المخاطر في الزمن الحقيقي.
            </p>
          </header>

          <div className="space-y-4">
            <label className="block text-sm text-slate-300">
              <span className="mb-2 inline-block text-sm font-medium text-slate-200">
                رأس المال الأولي (دولار)
              </span>
              <input
                type="number"
                value={form.capital}
                onChange={handleNumberChange("capital")}
                min={1000}
                step={1000}
                className="w-full rounded-xl border border-slate-600 bg-slate-900/70 px-4 py-3 text-slate-100 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
              />
            </label>

            <label className="block text-sm text-slate-300">
              <span className="mb-2 inline-block text-sm font-medium text-slate-200">
                مدة البناء (أشهر)
              </span>
              <input
                type="number"
                value={form.durationMonths}
                onChange={handleNumberChange("durationMonths")}
                min={3}
                max={36}
                step={3}
                className="w-full rounded-xl border border-slate-600 bg-slate-900/70 px-4 py-3 text-slate-100 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
              />
            </label>

            <label className="block text-sm text-slate-300">
              <span className="mb-2 inline-block text-sm font-medium text-slate-200">
                مستوى المخاطرة
              </span>
              <select
                value={form.risk}
                onChange={handleSelectChange("risk")}
                className="w-full rounded-xl border border-slate-600 bg-slate-900/70 px-4 py-3 text-slate-100 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
              >
                {riskOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm text-slate-300">
              <span className="mb-2 inline-block text-sm font-medium text-slate-200">
                الاستراتيجية الذكية
              </span>
              <select
                value={form.strategy}
                onChange={handleSelectChange("strategy")}
                className="w-full rounded-xl border border-slate-600 bg-slate-900/70 px-4 py-3 text-slate-100 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
              >
                {strategyOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </form>

        <div className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <MetricCard
              label="العائد المتوقع"
              value={`${result.expectedReturn.toFixed(1)}%`
              }
              detail="متوسط سنوي بناءً على 12 شهراً"
            />
            <MetricCard
              label="معامل شارب"
              value={result.sharpe.toFixed(2)}
              detail="كفاءة العائد مقابل المخاطر"
            />
            <MetricCard
              label="نسبة الصفقات الرابحة"
              value={`${result.winRate.toFixed(0)}%`}
              detail="معدل النجاح المتوقع"
            />
            <MetricCard
              label="أقصى تراجع"
              value={`${result.maxDrawdown.toFixed(1)}%`}
              detail="يتم تحكمه باستخدام حماية متقدمة"
            />
            <MetricCard
              label="احتمال الخسارة"
              value={`${result.probabilityOfLoss.toFixed(1)}%`}
              detail="تقدير احتمالي تحت أسوأ السيناريوهات"
            />
            <MetricCard
              label="الرصيد المتوقع"
              value={formatter.format(result.points.at(-1)?.balance ?? form.capital)}
              detail="بعد انتهاء مدة المحاكاة"
            />
          </div>

          <div className="glass rounded-2xl border border-slate-700/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-100">منحنى الأداء الذكي</h3>
                <p className="text-xs text-slate-400">
                  يتم تحديث المنحنى فوراً وفقاً لاستجابة نموذج المخاطر التكيفية.
                </p>
              </div>
              <span className="text-sm text-primary-300">{form.durationMonths} شهراً</span>
            </div>
            <PerformanceChart points={result.points} />
          </div>

          <div className="glass rounded-2xl border border-slate-700/50 p-6">
            <h3 className="text-lg font-semibold text-slate-100">أوامر ذكية فورية</h3>
            <p className="mb-4 text-xs text-slate-400">
              توصيات مدعومة بالذكاء الاصطناعي بناءً على قراءة لحظة السوق وتوافق مع استراتيجية {form.strategy}.
            </p>
            <div className="grid gap-4 lg:grid-cols-2">
              {result.signals.map((signal) => (
                <article
                  key={signal.symbol}
                  className="rounded-xl border border-slate-700/40 bg-slate-900/60 p-4"
                >
                  <header className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-slate-100">{signal.symbol}</h4>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        signal.action === "شراء"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-rose-500/20 text-rose-300"
                      }`}
                    >
                      {signal.action}
                    </span>
                  </header>
                  <dl className="mt-3 space-y-1 text-xs text-slate-300">
                    <div className="flex items-center justify-between">
                      <dt>الثقة</dt>
                      <dd>{signal.confidence}%</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt>دخول</dt>
                      <dd>{signal.entry}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt>وقف الخسارة</dt>
                      <dd>{signal.stopLoss}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt>جني الأرباح</dt>
                      <dd>{signal.takeProfit}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface MetricProps {
  label: string;
  value: string | number;
  detail: string;
}

function MetricCard({ label, value, detail }: MetricProps) {
  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-5 shadow-lg shadow-primary-900/10">
      <span className="text-xs text-slate-400">{label}</span>
      <p className="mt-2 text-2xl font-semibold text-slate-50">{value}</p>
      <p className="mt-2 text-xs text-slate-400">{detail}</p>
    </div>
  );
}

function PerformanceChart({ points }: { points: ReturnType<typeof runSimulation>["points"] }) {
  if (!points.length) {
    return null;
  }

  const maxBalance = Math.max(...points.map((p) => p.balance));
  const minBalance = Math.min(...points.map((p) => p.balance));
  const range = maxBalance - minBalance || 1;
  const width = 700;
  const height = 240;

  const path = points
    .map((point, index) => {
      const x = (index / (points.length - 1 || 1)) * width;
      const y = height - ((point.balance - minBalance) / range) * height;
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  const areaPath = `${path} L${width},${height} L0,${height} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="mt-6 w-full"
      preserveAspectRatio="none"
      role="presentation"
    >
      <defs>
        <linearGradient id="balanceGradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(59,130,246,0.6)" />
          <stop offset="100%" stopColor="rgba(59,130,246,0)" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#balanceGradient)" />
      <path d={path} stroke="rgba(96,165,250,0.9)" strokeWidth="3" fill="none" />
      {points.map((point, index) => {
        const x = (index / (points.length - 1 || 1)) * width;
        const y = height - ((point.balance - minBalance) / range) * height;
        return <circle key={point.month} cx={x} cy={y} r={4} fill="#38bdf8" opacity={0.85} />;
      })}
    </svg>
  );
}
