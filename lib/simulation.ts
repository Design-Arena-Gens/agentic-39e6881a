export type RiskLevel = "منخفض" | "متوسط" | "مرتفع";

export type Strategy =
  | "زخم متطور"
  | "موازنة ذكية"
  | "صانع سوق تكيفي"
  | "تشبع السيولة";

export interface SimulationInput {
  capital: number;
  risk: RiskLevel;
  strategy: Strategy;
  durationMonths: number;
}

export interface SimulationPoint {
  month: number;
  balance: number;
  profit: number;
  drawdown: number;
}

export interface Signal {
  symbol: string;
  action: "شراء" | "بيع";
  confidence: number;
  entry: number;
  stopLoss: number;
  takeProfit: number;
}

export interface SimulationResult {
  points: SimulationPoint[];
  expectedReturn: number;
  sharpe: number;
  winRate: number;
  maxDrawdown: number;
  probabilityOfLoss: number;
  signals: Signal[];
}

const strategyAlpha: Record<Strategy, number> = {
  "زخم متطور": 0.22,
  "موازنة ذكية": 0.16,
  "صانع سوق تكيفي": 0.12,
  "تشبع السيولة": 0.19
};

const riskMultiplier: Record<RiskLevel, number> = {
  منخفض: 0.6,
  متوسط: 1,
  مرتفع: 1.35
};

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function runSimulation(input: SimulationInput): SimulationResult {
  const { capital, risk, strategy, durationMonths } = input;
  const alpha = strategyAlpha[strategy];
  const riskFactor = riskMultiplier[risk];
  const generator = mulberry32(Math.floor(capital * riskFactor + durationMonths * 97));

  const points: SimulationPoint[] = [];
  let balance = capital;
  let peak = capital;
  let maxDrawdown = 0;
  let wins = 0;

  for (let month = 1; month <= durationMonths; month += 1) {
    const noise = generator() * 0.2 - 0.1;
    const drift = alpha * riskFactor * (1 - Math.exp(-(month / durationMonths)));
    const monthlyReturn = drift + noise;
    balance *= 1 + monthlyReturn;

    if (balance > peak) {
      peak = balance;
    }

    const drawdown = (peak - balance) / peak;
    maxDrawdown = Math.max(maxDrawdown, drawdown);
    const profit = balance - capital;

    if (monthlyReturn > 0) {
      wins += 1;
    }

    points.push({
      month,
      balance,
      profit,
      drawdown: drawdown * 100
    });
  }

  const expectedReturn = (points[points.length - 1]?.profit ?? 0) / capital;
  const sharpe = (alpha * 12) / (0.4 / riskFactor + 0.001);
  const winRate = wins / durationMonths;
  const probabilityOfLoss = Math.max(0, 0.35 - alpha * riskFactor + maxDrawdown * 0.4);

  const signals = generateSignals(generator, riskFactor, strategy, capital);

  return {
    points,
    expectedReturn: expectedReturn * 100,
    sharpe,
    winRate: winRate * 100,
    maxDrawdown: maxDrawdown * 100,
    probabilityOfLoss: probabilityOfLoss * 100,
    signals
  };
}

function generateSignals(
  generator: () => number,
  riskFactor: number,
  strategy: Strategy,
  capital: number
): Signal[] {
  const baseSymbols = ["BTCUSDT", "ETHUSDT", "XAUUSD", "US500", "EURUSD", "NVDA", "TSLA"];
  const actions: Signal["action"][] = ["شراء", "بيع"];

  return baseSymbols.slice(0, 4 + Math.floor(generator() * 3)).map((symbol) => {
    const action = actions[Math.floor(generator() * actions.length)];
    const confidence = 65 + generator() * 30 * riskFactor;
    const basePrice = 100 + generator() * 900;
    const volatility = 0.02 + generator() * 0.05 * riskFactor;
    const buffer = strategy.includes("زخم") ? 1.8 : 1.4;

    return {
      symbol,
      action,
      confidence: Math.min(99, parseFloat(confidence.toFixed(1))),
      entry: parseFloat(basePrice.toFixed(2)),
      stopLoss: parseFloat((basePrice * (1 - volatility * buffer)).toFixed(2)),
      takeProfit: parseFloat((basePrice * (1 + volatility * buffer * 1.6)).toFixed(2))
    };
  });
}
