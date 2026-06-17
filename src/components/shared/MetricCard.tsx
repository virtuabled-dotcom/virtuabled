import React from "react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell, 
  PieChart, 
  Pie, 
  AreaChart, 
  Area 
} from "recharts";
import { TrendingUp, ShieldCheck, Award } from "lucide-react";

export interface ChartDataPoint {
  label: string;
  value: number;
  displayValue?: string;
  fillColor?: string;
}

interface MetricCardProps {
  id: string;
  title: string;
  description: string;
  metricValue: string;
  metricLabel: string;
  chartType: "bar" | "pie" | "area";
  data: ChartDataPoint[];
  tableSummary: string;
}

export function MetricCard({
  id,
  title,
  description,
  metricValue,
  metricLabel,
  chartType,
  data,
  tableSummary,
}: MetricCardProps) {
  // Custom high-contrast theme pigments compatible with the charcoal and slate tones
  const defaultColors = ["#14B8A6", "#EAB308", "#6366F1", "#EC4899", "#F43F5E"];

  return (
    <div 
      className="bg-gradient-to-br from-[#091223] to-[#070D19] border border-zinc-850 hover:border-brand-teal/40 rounded-3xl p-6 relative overflow-hidden transition-all duration-300 shadow-2xl flex flex-col justify-between"
      id={`metric-card-${id}`}
    >
      {/* Background Decoratives */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-teal/5 blur-2xl pointer-events-none rounded-full" />
      
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h4 className="text-zinc-400 font-mono text-[10px] items-center gap-1.5 uppercase tracking-widest font-bold flex">
              <Award size={12} className="text-brand-teal" /> {metricLabel}
            </h4>
            <h3 className="text-white font-display text-lg font-light uppercase tracking-wide mt-1">
              {title}
            </h3>
          </div>
          <div className="text-right">
            <span className="text-xl md:text-2xl font-mono text-brand-amber font-extrabold block">
              {metricValue}
            </span>
            <span className="text-[9px] font-mono text-zinc-550 uppercase tracking-widest">
              Live Index
            </span>
          </div>
        </div>

        <p className="text-xs text-zinc-400 font-sans font-light leading-relaxed mb-6">
          {description}
        </p>

        {/* Dynamic High-Contrast Micro Charts */}
        <div className="h-32 mb-4 w-full" aria-hidden="true">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "bar" ? (
              <BarChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                <XAxis 
                  dataKey="label" 
                  stroke="#71717a" 
                  fontSize={9} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#71717a" 
                  fontSize={9} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#091223", 
                    borderColor: "#27272a", 
                    fontSize: "11px",
                    borderRadius: "8px" 
                  }} 
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {data.map((entry, idx) => (
                    <Cell 
                      key={`cell-${idx}`} 
                      fill={entry.fillColor || defaultColors[idx % defaultColors.length]} 
                    />
                  ))}
                </Bar>
              </BarChart>
            ) : chartType === "pie" ? (
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  paddingAngle={4}
                  dataKey="value"
                  nameKey="label"
                >
                  {data.map((entry, idx) => (
                    <Cell 
                      key={`cell-${idx}`} 
                      fill={entry.fillColor || defaultColors[idx % defaultColors.length]} 
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#091223", 
                    borderColor: "#27272a", 
                    fontSize: "11px",
                    borderRadius: "8px" 
                  }} 
                />
              </PieChart>
            ) : (
              <AreaChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                <defs>
                  <linearGradient id={`grad-area-${id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#14B8A6" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="label" 
                  stroke="#71717a" 
                  fontSize={9} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#71717a" 
                  fontSize={9} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#091223", 
                    borderColor: "#27272a", 
                    fontSize: "11px",
                    borderRadius: "8px" 
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#14B8A6" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill={`url(#grad-area-${id})`} 
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Screen-Reader Tabular Backup for WCAG 2.1 compliance */}
      <div className="sr-only">
        <table id={`accessible-table-${id}`} summary={tableSummary}>
          <caption>{title} - Tabular compliance stats dataset</caption>
          <thead>
            <tr>
              <th scope="col">Compliance Metric Label</th>
              <th scope="col">Percent / Value Represented</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, idx) => (
              <tr key={idx}>
                <td>{entry.label}</td>
                <td>{entry.displayValue || entry.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom status signature */}
      <div className="border-t border-zinc-900 pt-3.5 flex items-center justify-between text-[9px] font-mono text-zinc-500 uppercase">
        <span className="flex items-center gap-1">
          <ShieldCheck size={11} className="text-brand-teal" /> POPIA & SANAS Audited
        </span>
        <span>ID: {id}</span>
      </div>
    </div>
  );
}
