import { TradingSimulator } from "@/components/TradingSimulator";
import { ArrowUpRightIcon, SparklesIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const featureCards = [
  {
    title: "ذكاء استثماري ذاتي التعلم",
    description:
      "نموذج يتأقلم مع كل تغير في السوق، يستكشف الفرص مخفياً الأنماط ويعيد تشكيل المحافظ بشكل لحظي.",
    icon: "🤖"
  },
  {
    title: "حماية متقدمة لرأس المال",
    description:
      "طبقات متتالية من التحكم التنبؤي بالمخاطر، مع تغطية ديناميكية ووقف خسارة موجه بالبيانات.",
    icon: "🛡️"
  },
  {
    title: "حالات استخدام متعددة الأسواق",
    description:
      "تغطية أسهم، عملات، سلع، وكريبتو عبر نموذج موحد، مع أوامر ذكية تعطيك الوصول الفوري للأسواق.",
    icon: "🌐"
  }
];

const workflow = [
  {
    title: "التقاط البيانات السياقية",
    detail: "تدفق فوري لأكثر من 120 مصدراً مع تفسير لغوي وقياس لزخم السيولة."
  },
  {
    title: "إعادة بناء السيناريوهات",
    detail: "محرك توقع يقوم بتقييم مئات الاستراتيجيات ويختار محفظة تحوط متوازنة."
  },
  {
    title: "تنفيذ تكيفي",
    detail: "أوامر تنفذ بذكاء مع ضبط مستمر للنطاقات بناءً على الموجات الدقيقة للسوق."
  }
];

const testimonials = [
  {
    name: "مها السبيعي",
    role: "مديرة استثمار - صندوق جريء",
    quote:
      "حققنا انضباطاً لم يكن ممكناً مع أي نظام يدوي. البوت يتكامل مع فريقنا ويعطي ثقة عالية في اتخاذ القرار."
  },
  {
    name: "سلمان الثقفي",
    role: "محلل كمي مستقل",
    quote:
      "الإستراتيجية التكيفية خفضت التراجعات بنسبة 38٪. التجربة سلسة والتقارير عميقة التفاصيل."
  }
];

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 text-right">
      <section className="rounded-3xl border border-slate-700/40 bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-cyan-900/40 p-12 shadow-2xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
          <div className="flex-1 space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-500/40 bg-primary-500/10 px-4 py-1 text-primary-100">
              <SparklesIcon className="h-4 w-4" />
              إطلاق الجيل الجديد من البوتات الاستثمارية
            </span>
            <h1 className="text-4xl font-bold leading-tight text-slate-50 md:text-5xl">
              بوت تداول ذكي يُفكر كخبراء التحليل الكمي، ويتصرف بسرعة الذكاء الاصطناعي
            </h1>
            <p className="max-w-2xl text-lg text-slate-300">
              قم بتفعيل مساعد استثمار يقوم بتحليل الأسواق بغزارة، يوازن المخاطر تلقائياً، ويولد أوامر تنفيذية دقيقة باللغتين العربية والإنجليزية.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="#simulator"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-900/30 transition hover:bg-primary-600"
              >
                تشغيل المحاكاة الآن
                <ArrowUpRightIcon className="h-4 w-4" />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-600 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-primary-500 hover:text-primary-100"
              >
                طلب جلسة مخصصة
              </Link>
            </div>
            <ul className="grid gap-2 text-sm text-slate-400 sm:grid-cols-3">
              <li>تغطية لأكثر من 320 أصل رقمي وعيني</li>
              <li>واجهة تحكم بالعربية والإنجليزية</li>
              <li>تنبيهات عبر البريد والتليغرام</li>
            </ul>
          </div>
          <div className="flex max-w-md flex-1 justify-end">
            <div className="glass relative w-full rounded-3xl border border-slate-700/40 p-6 text-left">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-200">لوحة نبض السوق</h3>
                  <p className="text-xs text-slate-400">يتم تحديثها كل 34 ثانية</p>
                </div>
                <span className="rounded-lg bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-200">
                  موثوق
                </span>
              </div>
              <div className="space-y-4 text-sm text-slate-300">
                <DashboardRow label="BTCUSDT" value="+2.13%" accent="emerald" />
                <DashboardRow label="XAUUSD" value="-0.42%" accent="rose" />
                <DashboardRow label="US500" value="+0.89%" accent="emerald" />
                <DashboardRow label="NVDA" value="+1.35%" accent="emerald" />
              </div>
              <div className="mt-6 rounded-2xl bg-slate-900/60 p-4 text-sm text-slate-300">
                <p className="text-xs text-slate-400">مؤشر الذكاء الاستثماري</p>
                <p className="mt-1 text-3xl font-semibold text-slate-50">93.4</p>
                <p className="mt-2 text-xs text-slate-400">يتفوق على المؤشر القياسي بنسبة 18٪ هذا الأسبوع.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featureCards.map((feature) => (
          <article
            key={feature.title}
            className="glass rounded-3xl border border-slate-700/40 p-6 shadow-lg shadow-primary-900/10"
          >
            <div className="text-3xl">{feature.icon}</div>
            <h3 className="mt-4 text-xl font-semibold text-slate-50">{feature.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">{feature.description}</p>
          </article>
        ))}
      </section>

      <section id="simulator" className="mt-16">
        <TradingSimulator />
      </section>

      <section className="mt-16 rounded-3xl border border-slate-700/40 bg-slate-900/70 p-12">
        <h2 className="text-3xl font-semibold text-slate-50">كيف يعمل البوت؟</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {workflow.map((step, index) => (
            <article key={step.title} className="rounded-2xl border border-slate-700/40 bg-slate-950/40 p-6">
              <span className="text-xs font-semibold text-primary-200">0{index + 1}</span>
              <h3 className="mt-4 text-lg font-semibold text-slate-100">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{step.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-8 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold text-slate-50">شهادات المستخدمين</h2>
          {testimonials.map((item) => (
            <blockquote
              key={item.name}
              className="glass rounded-3xl border border-slate-700/40 p-6 text-sm text-slate-200"
            >
              <p className="leading-7 text-slate-100">“{item.quote}”</p>
              <footer className="mt-4 text-xs text-slate-400">
                {item.name} — {item.role}
              </footer>
            </blockquote>
          ))}
        </div>
        <aside
          id="contact"
          className="glass rounded-3xl border border-slate-700/40 p-6 text-sm text-slate-200"
        >
          <h3 className="text-xl font-semibold text-slate-50">ابدأ الآن</h3>
          <p className="mt-2 text-sm text-slate-300">
            احجز جلسة اكتشاف مجانية مع خبراء الذكاء الاصطناعي لدينا لتخصيص بوت التداول لشركتك.
          </p>
          <ul className="mt-6 space-y-3 text-xs text-slate-300">
            <li>⚡️ إعداد تكامل مع البورصات خلال 48 ساعة</li>
            <li>🧠 فريق علم بيانات لمواءمة النماذج</li>
            <li>🔐 بنية أمان مؤسسية تشمل مراقبة لحظية</li>
          </ul>
          <Link
            href="mailto:launch@agentictrader.ai"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-900/30 transition hover:bg-primary-600"
          >
            حجز استشارة خاصة
          </Link>
        </aside>
      </section>
    </main>
  );
}

function DashboardRow({
  label,
  value,
  accent
}: {
  label: string;
  value: string;
  accent: "emerald" | "rose";
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-slate-400">{label}</span>
      <span
        className={`text-sm font-semibold ${
          accent === "emerald" ? "text-emerald-300" : "text-rose-300"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
