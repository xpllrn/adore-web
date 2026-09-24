import { createFileRoute } from "@tanstack/react-router";
import { Activity, Clock3, Server, Users, Wifi } from "lucide-react";
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageIntro } from "@/components/site-chrome";
import { useLiveStatus } from "@/lib/uptime";

export const Route = createFileRoute("/status")({
  head: () => ({ meta: [
    { title: "Status | Adore" }, { name: "description", content: "View the supplied Adore system status and operational snapshot." },
    { property: "og:title", content: "Status | Adore" }, { property: "og:description", content: "Adore system health and service metrics." },
    { property: "og:type", content: "website" }, { property: "og:url", content: "/status" }, { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "/status" }] }), component: StatusPage,
});

function StatusPage() {
  const { uptime, localTime } = useLiveStatus();
  const stats = [
    { icon: Server, label: "Servers", value: "1,195" },
    { icon: Users, label: "Users", value: "232,375" },
    { icon: Wifi, label: "Latency", value: "60.04", suffix: "ms" },
    { icon: Clock3, label: "Uptime", value: uptime },
  ];
  return <>
    <PageIntro eyebrow="System status" title="Adore is online." description="A clear operational snapshot of Adore's reach, response time, network activity, and system resources." />
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28">
      <div className="mb-4 flex min-h-16 items-center justify-center gap-3 rounded-md border border-border bg-surface p-4 text-center shadow-panel">
        <span className="size-2 shrink-0 rounded-full bg-success" />
        <div>
          <strong className="text-sm">All systems operational</strong>
          <p className="mt-1 font-mono text-[9px] text-muted-foreground sm:text-[10px]">
            {localTime || "12:24 PM 19-Sep 2026"}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat) => (
          <article key={stat.label} className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-md border border-border bg-surface p-4 shadow-panel sm:p-5">
            <stat.icon className="size-5 shrink-0 text-muted-foreground" />
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground sm:text-xs">{stat.label}</p>
              <p className="mt-1 break-words font-display text-sm font-bold sm:text-xl">
                {stat.value}
                {stat.suffix && <span className="ml-1 text-[9px] text-muted-foreground sm:text-xs">{stat.suffix}</span>}
              </p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <MetricChart title="Latency" data={latencyData} lines={[{ key: "value", label: "Latency" }]} unit="ms" max={300} />
        <MetricChart title="Network" data={networkData} lines={[{ key: "up", label: "Up" }, { key: "down", label: "Down" }]} max={400} />
        <MetricChart title="CPU" data={cpuData} lines={[{ key: "value", label: "CPU" }]} unit="%" max={100} area />
        <MetricChart title="Memory" data={memoryData} lines={[{ key: "value", label: "Memory" }]} unit="%" max={100} area />
      </div>
    </section>
  </>;
}

type Point = { time: string; value?: number; up?: number; down?: number };
type ChartLine = { key: "value" | "up" | "down"; label: string };

function MetricChart({ title, data, lines, unit = "", max, area = false }: { title: string; data: Point[]; lines: ChartLine[]; unit?: string; max: number; area?: boolean }) {
  const Chart = area ? AreaChart : LineChart;
  return <article className="min-w-0 rounded-md border border-border bg-surface p-4 shadow-panel sm:p-5">
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3"><h2 className="text-center font-display text-xs font-bold sm:text-sm">{title}</h2>{lines.length > 1 && <div className="flex gap-3 font-mono text-[8px] uppercase text-muted-foreground">{lines.map((line, index) => <span key={line.key} className="flex items-center gap-1.5"><span className={`size-1.5 rounded-full ${index ? "bg-chart-2" : "bg-chart-1"}`} />{line.label}</span>)}</div>}</div>
    <div className="mt-5 h-48 min-w-0 sm:h-56">
      <ResponsiveContainer width="100%" height="100%"><Chart data={data} margin={{ top: 5, right: 4, bottom: 0, left: -22 }}>
        <CartesianGrid vertical={false} stroke="var(--border)" />
        <XAxis dataKey="time" hide />
        <YAxis domain={[0, max]} tickCount={5} tick={{ fill: "var(--muted-foreground)", fontSize: 9 }} axisLine={{ stroke: "var(--border)" }} tickLine={false} tickFormatter={(value) => `${value}${unit}`} />
        <Tooltip contentStyle={{ background: "var(--elevated)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "11px" }} labelStyle={{ color: "var(--muted-foreground)" }} formatter={(value, name) => [`${Number(value).toFixed(1)}${unit}`, String(name)]} />
        {lines.map((line, index) => area ? <Area key={line.key} type="monotone" dataKey={line.key} name={line.label} stroke={`var(--chart-${index + 1})`} fill={`var(--chart-${index + 1})`} fillOpacity={0.08} strokeWidth={1.8} dot={false} /> : <Line key={line.key} type="monotone" dataKey={line.key} name={line.label} stroke={`var(--chart-${index + 1})`} strokeWidth={1.8} dot={false} />)}
      </Chart></ResponsiveContainer>
    </div>
  </article>;
}

const makePoints = (values: number[]): Point[] => values.map((value, index) => ({ time: String(index), value }));
const latencyData = makePoints([88,87,86,65,64,63,62,61,60,16,15,17,63,64,65,65,66,65,65,64,58,58,57,55,55,45,44,73,73,72,60,59,53,53,62,62,62]);
const cpuData = makePoints([31,13,11,30,12,9,13,10,12,13,20,11,11,10,12,13,30,11,14,12,21,13,35,18,52,19,34,13,10,16,12,9,11,20,9,11,28,8,11,18,8]);
const memoryData = makePoints([63,62,63,62,62,62,61,61,61,61,61,61,61,60,61,61,61,61,61,61,61,61,61,62,61,62,61,62,62,62,61,61,61,61,61,61,61,61,61]);
const networkData: Point[] = [8,22,7,18,6,9,24,14,10,31,9,20,7,15,9,18,6,13,9,390,12,52,10,17,7,64,9,53,8,29,12,20,7,28,9,33,6,12,8,29,7,11].map((up, index) => ({ time: String(index), up, down: index === 19 ? 205 : Math.max(2, Math.round(up * 0.52)) }));