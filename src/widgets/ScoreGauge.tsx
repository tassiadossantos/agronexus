import { getScoreColor, getScoreLabel } from '@/entities/credito/score';
import type { ScoreBreakdown } from '@/entities/credito/types';

interface Props {
  score: number;
  breakdown: ScoreBreakdown[];
}

export function ScoreGauge({ score, breakdown }: Props) {
  const color = getScoreColor(score);
  const label = getScoreLabel(score);
  const circumference = 2 * Math.PI * 60;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r="60" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
          <circle
            cx="70" cy="70" r="60" fill="none"
            stroke={color} strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
            style={{ filter: `drop-shadow(0 0 8px ${color}60)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-3xl font-black" style={{ color, textShadow: `0 0 20px ${color}40` }}>{score}</div>
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider" style={{ color: `${color}cc` }}>{label.label}</div>
        </div>
      </div>

      <div className="w-full mt-6 space-y-3">
        {breakdown.map((item) => (
          <div key={item.fator}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#94a3b8] font-medium flex items-center gap-1.5">
                <span>{item.icone}</span>{item.fator}
              </span>
              <span className="font-bold text-white font-mono">{item.valor}/100</span>
            </div>
            <div className="h-1.5 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#00f0ff] to-[#22c55e] transition-all duration-700"
                style={{ width: `${item.valor}%`, boxShadow: '0 0 8px rgba(0,240,255,0.3)' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
