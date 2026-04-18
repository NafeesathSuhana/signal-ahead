"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap, AlertTriangle, TrendingUp, Smartphone, Headphones, Sparkles } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"

const productData = {
  smartphone: {
    name: "Smartphone",
    icon: Smartphone,
    feature: "Packaging",
    chartData: [
      { month: "Jan 2026", rate: 2.5 },
      { month: "Feb 2026", rate: 6.0 },
      { month: "Mar 2026", rate: 37.8 },
      { month: "Apr 2026", rate: 50.0 },
    ],
    currentRate: 50,
    status: "CRITICAL",
    alert: "Packaging complaints have reached 50% of recent reviews — up from 2.5% in January. Growth curve predicts threshold will remain breached unless escalated.",
    tags: ["SYSTEMIC ISSUE", "ACCELERATING", "ACTION REQUIRED"],
  },
  headphones: {
    name: "Headphones",
    icon: Headphones,
    feature: "Build Quality",
    chartData: [
      { month: "Jan 2026", rate: 8.2 },
      { month: "Feb 2026", rate: 12.5 },
      { month: "Mar 2026", rate: 18.3 },
      { month: "Apr 2026", rate: 22.1 },
    ],
    currentRate: 22.1,
    status: "WARNING",
    alert: "Build quality complaints approaching threshold at 22.1%. Monitor closely — may breach 25% danger zone within 2 weeks.",
    tags: ["TRENDING UP", "MONITOR CLOSELY"],
  },
  facecream: {
    name: "Face Cream",
    icon: Sparkles,
    feature: "Expiry Date",
    chartData: [
      { month: "Jan 2026", rate: 3.1 },
      { month: "Feb 2026", rate: 4.2 },
      { month: "Mar 2026", rate: 5.8 },
      { month: "Apr 2026", rate: 7.2 },
    ],
    currentRate: 7.2,
    status: "STABLE",
    alert: "Expiry date concerns remain low at 7.2%. No immediate action required but continue monitoring.",
    tags: ["STABLE", "LOW PRIORITY"],
  },
}

type ProductKey = keyof typeof productData

export default function VelocityPage() {
  const [activeProduct, setActiveProduct] = useState<ProductKey>("smartphone")
  const product = productData[activeProduct]
  const isCritical = product.status === "CRITICAL"
  const isWarning = product.status === "WARNING"

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div>
            <Badge className="bg-orange-100 text-orange-600 hover:bg-orange-100 border-orange-200 text-sm px-3 py-1">
              <Zap className="mr-2 h-4 w-4" />
              VELOCITY ENGINE
            </Badge>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Predicts Spikes <span className="text-orange-500">Before They Peak</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Monitors complaint rates in sliding windows. Warns you before a trend becomes a crisis.
            </p>
          </div>

          {/* Product Tabs */}
          <Tabs value={activeProduct} onValueChange={(v) => setActiveProduct(v as ProductKey)} className="mt-8">
            <TabsList className="grid w-full grid-cols-3">
              {Object.entries(productData).map(([key, p]) => (
                <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                  <p.icon className="h-4 w-4" />
                  {p.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(productData).map(([key, p]) => (
              <TabsContent key={key} value={key} className="mt-6">
                {/* Chart */}
                <Card className={`border-2 ${isCritical ? "border-red-200" : isWarning ? "border-amber-200" : "border-orange-200"} shadow-sm`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className={`h-5 w-5 ${isCritical ? "text-red-500" : isWarning ? "text-amber-500" : "text-orange-500"}`} />
                      {p.feature} Complaint Rate — {p.name}
                    </CardTitle>
                    <CardDescription>
                      Real-time velocity tracking with danger threshold at 25%
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={p.chartData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                          <defs>
                            <linearGradient id={`velocityGradient-${key}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={isCritical ? "#ef4444" : isWarning ? "#f59e0b" : "#ea580c"} stopOpacity={0.3} />
                              <stop offset="95%" stopColor={isCritical ? "#ef4444" : isWarning ? "#f59e0b" : "#ea580c"} stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis dataKey="month" stroke="#9ca3af" tick={{ fill: '#6b7280', fontSize: 12 }} />
                          <YAxis stroke="#9ca3af" tick={{ fill: '#6b7280', fontSize: 12 }} domain={[0, 60]} tickFormatter={(value) => `${value}%`} />
                          <Tooltip
                            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            labelStyle={{ color: '#111827', fontWeight: 600 }}
                            formatter={(value: number) => [`${value}%`, 'Complaint Rate']}
                          />
                          <ReferenceLine y={25} stroke="#ef4444" strokeDasharray="5 5" label={{ value: 'DANGER (25%)', fill: '#ef4444', fontSize: 11, position: 'right' }} />
                          <Area type="monotone" dataKey="rate" stroke={isCritical ? "#ef4444" : isWarning ? "#f59e0b" : "#ea580c"} strokeWidth={3} fill={`url(#velocityGradient-${key})`} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Alert Card */}
                <Card className={`mt-6 border-2 ${isCritical ? "border-red-200 bg-red-50" : isWarning ? "border-amber-200 bg-amber-50" : "border-green-200 bg-green-50"}`}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${isCritical ? "bg-red-100" : isWarning ? "bg-amber-100" : "bg-green-100"}`}>
                        <AlertTriangle className={`h-6 w-6 ${isCritical ? "text-red-600" : isWarning ? "text-amber-600" : "text-green-600"}`} />
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold ${isCritical ? "text-red-700" : isWarning ? "text-amber-700" : "text-green-700"}`}>
                          {p.status} — {p.feature.toUpperCase()}
                        </h3>
                        <p className={`mt-2 ${isCritical ? "text-red-800/80" : isWarning ? "text-amber-800/80" : "text-green-800/80"}`}>
                          {p.alert}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {p.tags.map((tag) => (
                            <Badge key={tag} className={`${isCritical ? "bg-red-100 text-red-700 border-red-200" : isWarning ? "bg-amber-100 text-amber-700 border-amber-200" : "bg-green-100 text-green-700 border-green-200"}`}>
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Stats */}
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <Card className="border-border">
                    <CardContent className="pt-6">
                      <div className="text-sm text-muted-foreground">Window Size</div>
                      <div className="font-mono text-2xl font-bold text-foreground">50 reviews</div>
                    </CardContent>
                  </Card>
                  <Card className="border-border">
                    <CardContent className="pt-6">
                      <div className="text-sm text-muted-foreground">Threshold</div>
                      <div className="font-mono text-2xl font-bold text-foreground">25%</div>
                    </CardContent>
                  </Card>
                  <Card className="border-border">
                    <CardContent className="pt-6">
                      <div className="text-sm text-muted-foreground">Current Rate</div>
                      <div className={`font-mono text-2xl font-bold ${isCritical ? "text-red-600" : isWarning ? "text-amber-600" : "text-green-600"}`}>{p.currentRate}%</div>
                    </CardContent>
                  </Card>
                  <Card className={`${isCritical ? "border-red-200 bg-red-50" : isWarning ? "border-amber-200 bg-amber-50" : "border-green-200 bg-green-50"}`}>
                    <CardContent className="pt-6">
                      <div className="text-sm text-muted-foreground">Status</div>
                      <div className={`font-mono text-2xl font-bold ${isCritical ? "text-red-700" : isWarning ? "text-amber-700" : "text-green-700"}`}>{p.status}</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
