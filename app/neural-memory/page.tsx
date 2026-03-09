'use client';

import { useEffect, useRef, useState } from 'react';
import { Brain, Cpu, Gauge, Layers, Scissors, SlidersHorizontal, Sparkles, Zap } from 'lucide-react';

type TechniqueKey = 'quantization' | 'pruning' | 'distillation' | 'flash';

export default function NeuralMemoryPage() {
  const [quantizationBits, setQuantizationBits] = useState(8);
  const [pruningSparsity, setPruningSparsity] = useState(35);
  const [techniques, setTechniques] = useState<Record<TechniqueKey, boolean>>({
    quantization: true,
    pruning: false,
    distillation: true,
    flash: true,
  });
  const [tick, setTick] = useState(0);
  const [memoryHistory, setMemoryHistory] = useState<number[]>([58, 61, 63, 60, 66, 64, 69, 67, 71, 68, 72, 70, 74, 73, 75, 77, 76, 79, 78, 81, 80, 82, 84, 83]);
  const [displayMetrics, setDisplayMetrics] = useState({
    memoryUsage: 0,
    inferenceSpeed: 0,
    compressionRatio: 0,
    modelAfter: 0,
  });
  const historyRef = useRef<number[]>(memoryHistory);

  useEffect(() => {
    historyRef.current = memoryHistory;
  }, [memoryHistory]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((prev) => prev + 1);
      setMemoryHistory((prev) => {
        const phase = Date.now() / 1000;
        const wave = Math.sin(phase * 1.2) * 5 + Math.cos(phase * 0.7) * 3;
        const noise = (Math.random() - 0.5) * 4;
        const next = Math.max(45, Math.min(92, prev[prev.length - 1] + wave * 0.1 + noise));
        return [...prev.slice(1), Number(next.toFixed(1))];
      });
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  const quantizationReduction = quantizationBits === 8 ? 50 : quantizationBits === 4 ? 75 : 93;
  const pruningReduction = techniques.pruning ? pruningSparsity * 0.45 : 0;
  const distillationReduction = techniques.distillation ? 22 : 0;
  const flashReduction = techniques.flash ? 8 : 0;
  const totalReduction = Math.min(
    92,
    (techniques.quantization ? quantizationReduction : 0) + pruningReduction + distillationReduction + flashReduction
  );

  const baseModelGb = 14.2;
  const optimizedModelGb = Number((baseModelGb * (1 - totalReduction / 100)).toFixed(2));
  const targetMetrics = {
    memoryUsage: historyRef.current[historyRef.current.length - 1] ?? 0,
    inferenceSpeed: Number((92 + totalReduction * 1.7 + (techniques.flash ? 38 : 0)).toFixed(1)),
    compressionRatio: Number((1 + totalReduction / 100).toFixed(2)),
    modelAfter: optimizedModelGb,
  };

  useEffect(() => {
    const counter = setInterval(() => {
      setDisplayMetrics((prev) => ({
        memoryUsage: prev.memoryUsage + (targetMetrics.memoryUsage - prev.memoryUsage) * 0.2,
        inferenceSpeed: prev.inferenceSpeed + (targetMetrics.inferenceSpeed - prev.inferenceSpeed) * 0.2,
        compressionRatio: prev.compressionRatio + (targetMetrics.compressionRatio - prev.compressionRatio) * 0.2,
        modelAfter: prev.modelAfter + (targetMetrics.modelAfter - prev.modelAfter) * 0.2,
      }));
    }, 140);
    return () => clearInterval(counter);
  }, [targetMetrics.memoryUsage, targetMetrics.inferenceSpeed, targetMetrics.compressionRatio, targetMetrics.modelAfter]);

  const activationGauge = 42 + (Math.sin(tick * 0.45) + 1) * 22;
  const attentionLength = 4096 + Math.round((Math.sin(tick * 0.2) + 1) * 2048);

  const layerNodeY = [72, 162, 252];
  const hiddenNodeY = [52, 112, 172, 232, 292];
  const outputNodeY = [98, 162, 226];
  const inputX = 120;
  const hiddenX = 320;
  const outputX = 520;

  const connections = [
    ...layerNodeY.flatMap((y1) => hiddenNodeY.map((y2) => ({ x1: inputX, y1, x2: hiddenX, y2 }))),
    ...hiddenNodeY.flatMap((y1) => outputNodeY.map((y2) => ({ x1: hiddenX, y1, x2: outputX, y2 }))),
  ];

  const toggleTechnique = (key: TechniqueKey) => {
    setTechniques((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const activeCount = Object.values(techniques).filter(Boolean).length;

  return (
    <div>
      <style>{`
        @keyframes flowGradient {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.35; box-shadow: 0 0 0 rgba(229,57,53,0); }
          50% { opacity: 1; box-shadow: 0 0 16px rgba(229,57,53,0.65); }
        }
        @keyframes linePulse {
          0% { opacity: 0.18; }
          50% { opacity: 0.85; }
          100% { opacity: 0.18; }
        }
        @keyframes sweep {
          0% { transform: translateX(-110%); }
          100% { transform: translateX(300%); }
        }
      `}</style>

      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: '0 0 6px', color: '#fff', fontSize: '24px', fontWeight: 700, letterSpacing: '0.02em' }}>Neural Memory Optimization</h2>
        <p style={{ margin: 0, color: '#8b8baa', fontSize: '12px' }}>Live optimization controls for weight, activation, and attention memory pathways</p>
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        <section style={{ background: '#0d0d14', border: '1px solid #1a1a2e', borderRadius: '14px', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Layers size={16} color="#ff6f61" />
            <h3 style={{ margin: 0, color: '#fff', fontSize: '14px', fontWeight: 600 }}>Memory Architecture Visualization</h3>
          </div>
          <div style={{ display: 'grid', gap: '12px' }}>
            <div style={{ border: '1px solid #1a1a2e', background: 'rgba(255,255,255,0.01)', borderRadius: '12px', padding: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#fff', fontSize: '12px', fontWeight: 500 }}>Weight Memory (Long-term)</span>
                <span style={{ color: '#ff6f61', fontSize: '11px' }}>{totalReduction.toFixed(1)}% compressed</span>
              </div>
              <div style={{ height: '10px', background: '#131321', borderRadius: '99px', overflow: 'hidden', position: 'relative' }}>
                <div style={{ width: `${totalReduction}%`, height: '100%', borderRadius: '99px', background: 'linear-gradient(90deg, #e53935, #ff6f61, #e53935)', backgroundSize: '200% 100%', animation: 'flowGradient 2.6s linear infinite' }} />
              </div>
              <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', color: '#7a7a98', fontSize: '10px' }}>
                <span>Base: {baseModelGb} GB</span>
                <span>Optimized: {optimizedModelGb} GB</span>
              </div>
            </div>

            <div style={{ border: '1px solid #1a1a2e', background: 'rgba(255,255,255,0.01)', borderRadius: '12px', padding: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#fff', fontSize: '12px', fontWeight: 500 }}>Activation Memory (Working)</span>
                <span style={{ color: activationGauge > 75 ? '#ff6f61' : '#22c55e', fontSize: '11px' }}>{activationGauge.toFixed(0)}% utilization</span>
              </div>
              <div style={{ width: '112px', height: '112px', margin: '0 auto', borderRadius: '50%', background: `conic-gradient(#e53935 ${activationGauge * 3.6}deg, #202030 0deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #1a1a2e', boxShadow: 'inset 0 0 24px rgba(229,57,53,0.15)' }}>
                <div style={{ width: '82px', height: '82px', borderRadius: '50%', background: '#0d0d14', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <Gauge size={15} color="#ff6f61" />
                  <span style={{ color: '#fff', fontWeight: 600, fontSize: '14px' }}>{activationGauge.toFixed(0)}%</span>
                </div>
              </div>
            </div>

            <div style={{ border: '1px solid #1a1a2e', background: 'rgba(255,255,255,0.01)', borderRadius: '12px', padding: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#fff', fontSize: '12px', fontWeight: 500 }}>Attention Memory (KV-Cache)</span>
                <span style={{ color: '#ff6f61', fontSize: '11px' }}>{attentionLength.toLocaleString()} tokens</span>
              </div>
              <div style={{ height: '10px', background: '#131321', borderRadius: '99px', overflow: 'hidden', position: 'relative' }}>
                <div style={{ width: `${(attentionLength / 8192) * 100}%`, height: '100%', borderRadius: '99px', background: 'linear-gradient(90deg, #ff6f61, #e53935, #ff6f61)', backgroundSize: '250% 100%', animation: 'flowGradient 2.1s linear infinite' }} />
                <div style={{ position: 'absolute', top: 0, bottom: 0, width: '40%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)', animation: 'sweep 2.7s linear infinite' }} />
              </div>
              <div style={{ marginTop: '8px', color: '#7a7a98', fontSize: '10px' }}>Window Budget: 8192 tokens</div>
            </div>
          </div>
        </section>

        <section style={{ background: '#0d0d14', border: '1px solid #1a1a2e', borderRadius: '14px', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SlidersHorizontal size={16} color="#ff6f61" />
              <h3 style={{ margin: 0, color: '#fff', fontSize: '14px', fontWeight: 600 }}>Optimization Techniques</h3>
            </div>
            <span style={{ fontSize: '11px', color: '#8b8baa' }}>{activeCount}/4 active</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            <TechniqueCard
              title="Quantization"
              subtitle="INT8 / INT4 / Binary"
              icon={<Cpu size={15} color="#ff6f61" />}
              enabled={techniques.quantization}
              onToggle={() => toggleTechnique('quantization')}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '11px', color: '#a5a5bd' }}>
                <span>{quantizationBits === 8 ? 'INT8' : quantizationBits === 4 ? 'INT4' : 'Binary'}</span>
                <span>{quantizationReduction}% size reduction</span>
              </div>
              <input type="range" min={0} max={2} step={1} value={quantizationBits === 8 ? 0 : quantizationBits === 4 ? 1 : 2} onChange={(e) => setQuantizationBits(e.target.value === '0' ? 8 : e.target.value === '1' ? 4 : 1)} style={{ width: '100%', accentColor: '#e53935' }} />
            </TechniqueCard>

            <TechniqueCard
              title="Pruning"
              subtitle="Structured Sparsity"
              icon={<Scissors size={15} color="#ff6f61" />}
              enabled={techniques.pruning}
              onToggle={() => toggleTechnique('pruning')}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '11px', color: '#a5a5bd' }}>
                <span>Sparsity</span>
                <span>{pruningSparsity}%</span>
              </div>
              <input type="range" min={10} max={80} value={pruningSparsity} onChange={(e) => setPruningSparsity(Number(e.target.value))} style={{ width: '100%', accentColor: '#e53935' }} />
            </TechniqueCard>

            <TechniqueCard
              title="Knowledge Distillation"
              subtitle="Teacher vs Student"
              icon={<Brain size={15} color="#ff6f61" />}
              enabled={techniques.distillation}
              onToggle={() => toggleTechnique('distillation')}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div style={{ border: '1px solid #1a1a2e', borderRadius: '8px', padding: '8px', fontSize: '11px', color: '#a5a5bd', background: 'rgba(255,255,255,0.01)' }}>
                  Teacher: 70B
                </div>
                <div style={{ border: '1px solid #1a1a2e', borderRadius: '8px', padding: '8px', fontSize: '11px', color: '#a5a5bd', background: 'rgba(229,57,53,0.08)' }}>
                  Student: 13B
                </div>
              </div>
            </TechniqueCard>

            <TechniqueCard
              title="Flash Attention"
              subtitle="Kernel-level Optimization"
              icon={<Zap size={15} color="#ff6f61" />}
              enabled={techniques.flash}
              onToggle={() => toggleTechnique('flash')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#a5a5bd' }}>
                <span>Standard: 152 tok/s</span>
                <span style={{ color: '#ff6f61' }}>Flash: 281 tok/s</span>
              </div>
            </TechniqueCard>
          </div>
        </section>

        <section style={{ background: '#0d0d14', border: '1px solid #1a1a2e', borderRadius: '14px', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Sparkles size={16} color="#ff6f61" />
            <h3 style={{ margin: 0, color: '#fff', fontSize: '14px', fontWeight: 600 }}>Real-time Metrics Dashboard</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '12px' }} className="md:!grid-cols-[1.5fr_1fr] !grid-cols-1">
            <div style={{ border: '1px solid #1a1a2e', borderRadius: '12px', padding: '12px', background: 'rgba(255,255,255,0.01)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: '#fff', fontSize: '12px' }}>Memory Usage</span>
                <span style={{ fontSize: '11px', color: displayMetrics.memoryUsage > 80 ? '#ff6f61' : '#22c55e' }}>{displayMetrics.memoryUsage.toFixed(1)}%</span>
              </div>
              <div style={{ height: '138px', display: 'flex', alignItems: 'flex-end', gap: '3px' }}>
                {memoryHistory.map((point, idx) => (
                  <div key={idx} style={{ width: '100%', maxWidth: '10px', height: `${point}%`, borderRadius: '4px 4px 2px 2px', background: idx > memoryHistory.length - 6 ? 'linear-gradient(180deg, #ff6f61, #e53935)' : 'linear-gradient(180deg, rgba(255,111,97,0.75), rgba(229,57,53,0.45))', boxShadow: idx === memoryHistory.length - 1 ? '0 0 12px rgba(229,57,53,0.45)' : 'none', transition: 'height 0.8s ease' }} />
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gap: '10px' }}>
              <MetricTile label="Inference Speed" value={`${displayMetrics.inferenceSpeed.toFixed(1)} tok/s`} status={displayMetrics.inferenceSpeed > 220 ? 'Accelerated' : 'Baseline'} />
              <MetricTile label="Compression Ratio" value={`${displayMetrics.compressionRatio.toFixed(2)}x`} status={displayMetrics.compressionRatio > 1.9 ? 'Optimal' : 'Tuning'} />
              <MetricTile label="Model Size" value={`${displayMetrics.modelAfter.toFixed(2)} GB`} status={`Before ${baseModelGb} GB`} />
            </div>
          </div>
        </section>

        <section style={{ background: '#0d0d14', border: '1px solid #1a1a2e', borderRadius: '14px', padding: '16px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Cpu size={16} color="#ff6f61" />
            <h3 style={{ margin: 0, color: '#fff', fontSize: '14px', fontWeight: 600 }}>Neural Pathway Visualizer</h3>
          </div>

          <div style={{ position: 'relative', height: '330px', border: '1px solid #1a1a2e', borderRadius: '12px', background: 'radial-gradient(circle at 20% 20%, rgba(229,57,53,0.12), transparent 45%), #0a0a10', overflow: 'hidden' }}>
            {connections.map((c, idx) => {
              const dx = c.x2 - c.x1;
              const dy = c.y2 - c.y1;
              const length = Math.sqrt(dx * dx + dy * dy);
              const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
              return (
                <div
                  key={idx}
                  style={{
                    position: 'absolute',
                    left: `${c.x1}px`,
                    top: `${c.y1}px`,
                    width: `${length}px`,
                    height: '2px',
                    transformOrigin: '0 0',
                    transform: `rotate(${angle}deg)`,
                    background: 'linear-gradient(90deg, rgba(255,111,97,0.12), rgba(229,57,53,0.72), rgba(255,111,97,0.12))',
                    animation: `linePulse ${1.5 + (idx % 5) * 0.2}s ease-in-out infinite`,
                  }}
                />
              );
            })}

            {layerNodeY.map((y, idx) => (
              <Node key={`input-${idx}`} x={inputX} y={y} color="#ff6f61" label={`I${idx + 1}`} />
            ))}
            {hiddenNodeY.map((y, idx) => (
              <Node key={`hidden-${idx}`} x={hiddenX} y={y} color="#e53935" label={`H${idx + 1}`} />
            ))}
            {outputNodeY.map((y, idx) => (
              <Node key={`output-${idx}`} x={outputX} y={y} color="#ff9d8f" label={`O${idx + 1}`} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function TechniqueCard({
  title,
  subtitle,
  icon,
  enabled,
  onToggle,
  children,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  enabled: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div style={{ border: `1px solid ${enabled ? 'rgba(229,57,53,0.55)' : '#1a1a2e'}`, borderRadius: '12px', padding: '12px', background: enabled ? 'linear-gradient(145deg, rgba(229,57,53,0.12), rgba(255,111,97,0.03))' : 'rgba(255,255,255,0.01)', transition: 'all 200ms ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', marginBottom: '10px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
            {icon}
            <span style={{ fontSize: '12px', color: '#fff', fontWeight: 600 }}>{title}</span>
          </div>
          <span style={{ fontSize: '10px', color: '#7d7d9d' }}>{subtitle}</span>
        </div>
        <button onClick={onToggle} style={{ width: '42px', height: '22px', borderRadius: '99px', border: `1px solid ${enabled ? '#ff6f61' : '#2a2a42'}`, background: enabled ? 'rgba(229,57,53,0.22)' : '#131321', position: 'relative', cursor: 'pointer' }}>
          <span style={{ position: 'absolute', top: '2px', left: enabled ? '21px' : '2px', width: '16px', height: '16px', borderRadius: '50%', background: enabled ? '#ff6f61' : '#5f5f7a', transition: 'left 160ms ease', animation: enabled ? 'pulseGlow 1.9s ease-in-out infinite' : 'none' }} />
        </button>
      </div>
      {children}
    </div>
  );
}

function MetricTile({ label, value, status }: { label: string; value: string; status: string }) {
  const statusColor = status === 'Optimal' || status === 'Accelerated' ? '#22c55e' : '#ff6f61';
  return (
    <div style={{ border: '1px solid #1a1a2e', borderRadius: '10px', padding: '10px', background: 'rgba(255,255,255,0.01)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={{ fontSize: '11px', color: '#8c8ca8' }}>{label}</span>
        <span style={{ fontSize: '10px', color: statusColor }}>{status}</span>
      </div>
      <div style={{ color: '#fff', fontSize: '17px', fontWeight: 700 }}>{value}</div>
    </div>
  );
}

function Node({ x, y, color, label }: { x: number; y: number; color: string; label: string }) {
  return (
    <div style={{ position: 'absolute', left: `${x - 14}px`, top: `${y - 14}px`, width: '28px', height: '28px', borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '9px', fontWeight: 700, boxShadow: `0 0 15px ${color}`, animation: 'pulseGlow 2.1s ease-in-out infinite' }}>
      {label}
    </div>
  );
}
