"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Swords, FileDown, AlertTriangle, AlertCircle, CheckCircle,
  MessageSquare, Bot, Brain, Activity, Star, Smartphone, Headphones, Sparkles, Languages,
  Zap, TrendingUp, Clock, Target, Shield, Eye, Cpu
} from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, PieChart, Pie, Cell, Legend } from "recharts"

const topStats = [
  { label: "Total Reviews", value: "1,000", icon: MessageSquare, trend: "+234 today" },
  { label: "Bot Filtered", value: "150", icon: Bot, trend: "15% of total" },
  { label: "Sarcasm Auto-Resolved", value: "150", icon: Sparkles, trend: "89.2% F1 score" },
  { label: "Languages", value: "2", icon: Languages, trend: "EN + HI" },
]

const processingStats = [
  { label: "Throughput", value: "847", unit: "reviews/min", icon: Zap },
  { label: "Avg Latency", value: "127", unit: "ms", icon: Clock },
  { label: "AI Accuracy", value: "96.4", unit: "%", icon: Target },
  { label: "Uptime", value: "99.9", unit: "%", icon: Shield },
]

const featureScores = [
  { name: "Display", score: 91, status: "green", confidence: 96, brand: "Samsung leads +6%" },
  { name: "Camera", score: 88, status: "green", confidence: 94, brand: "iPhone leads +9%" },
  { name: "Performance", score: 89, status: "green", confidence: 92, brand: "iPhone leads +5%" },
  { name: "Battery", score: 82, status: "green", confidence: 94, brand: "Samsung leads +6%" },
  { name: "Build", score: 86, status: "green", confidence: 91, brand: "iPhone leads +5%" },
  { name: "Sound", score: 77, status: "yellow", confidence: 88, brand: "Samsung leads +3%" },
  { name: "Packaging", score: 68, status: "red", alert: true, confidence: 96, brand: "iPhone leads +11%" },
]

const alerts = [
  {
    type: "critical",
    icon: AlertTriangle,
    title: "Packaging Gap Critical",
    message: "Samsung 11% behind iPhone — Escalate to logistics team",
  },
  {
    type: "warning",
    icon: AlertCircle,
    title: "Battery Charging Concerns (iPhone)",
    message: "27W vs 45W creating negative sentiment",
  },
  {
    type: "success",
    icon: CheckCircle,
    title: "Display Leadership Maintained",
    message: "Samsung AMOLED sentiment +6% above competition",
  },
  {
    type: "info",
    icon: Brain,
    title: "AI Engine Performance",
    message: "150 sarcastic reviews auto-classified with 89.2% accuracy",
  },
]

const products = [
  { name: "Samsung Galaxy S24", rating: 4.2, reviews: 487, icon: Smartphone, sentiment: 78 },
  { name: "iPhone 15 Pro", rating: 4.4, reviews: 513, icon: Smartphone, sentiment: 82 },
]

const trendData = [
  { month: "Jan", samsung: 75, iphone: 80, packagingRate: 2.5 },
  { month: "Feb", samsung: 77, iphone: 81, packagingRate: 6.0 },
  { month: "Mar", samsung: 78, iphone: 82, packagingRate: 37.8 },
  { month: "Apr", samsung: 78, iphone: 82, packagingRate: 50.0 },
]

const sentimentDistribution = [
  { name: "Positive", value: 350, color: "#22c55e" },
  { name: "Negative", value: 350, color: "#ef4444" },
  { name: "Sarcasm (Auto)", value: 150, color: "#a855f7" },
  { name: "Bot (Discarded)", value: 150, color: "#f97316" },
]

function downloadReport() {
  const reportContent = `
SIGNALAHEAD - WAR ROOM INTELLIGENCE REPORT
Generated: ${new Date().toLocaleString()}
==========================================

EXECUTIVE SUMMARY
-----------------
Total Reviews Analyzed: 1,000
Products Monitored: Samsung Galaxy S24 vs iPhone 15 Pro
Bot/Spam Reviews Filtered: 150 (15%)
Sarcastic Reviews Auto-Classified: 150 (89.2% F1 Score)
Languages Processed: English, Hindi

AI ENGINE PERFORMANCE
---------------------
Throughput: 847 reviews/minute
Average Latency: 127ms
Classification Accuracy: 96.4%
Sarcasm Detection F1: 89.2%
System Uptime: 99.9%

COMPETITIVE INTELLIGENCE (SAMSUNG vs iPHONE)
---------------------------------------------
Samsung Galaxy S24 Overall Sentiment: 78%
iPhone 15 Pro Overall Sentiment: 82%

SAMSUNG STRENGTHS:
- Display: 91% (Samsung +6% lead)
- Battery: 82% (Samsung +6% lead)
- Value: 72% (Samsung +7% lead)
- Sound: 77% (Samsung +3% lead)

iPHONE STRENGTHS:
- Camera: 88% (iPhone +9% lead)
- Performance: 89% (iPhone +5% lead)
- Build: 86% (iPhone +5% lead)
- Packaging: 79% (iPhone +11% lead)

CRITICAL ALERTS
---------------
1. PACKAGING GAP (SAMSUNG) - CRITICAL
   - Samsung: 68% vs iPhone: 79%
   - Gap: -11 points
   - Root Cause: Transit damage, moisture issues
   - Action: Partner with premium couriers, weatherproof packaging

2. BATTERY CHARGING (iPHONE) - HIGH PRIORITY
   - iPhone 27W vs Samsung 45W
   - Creating 14% negative sentiment gap
   - Action: Increase charging speed in next generation

EMOJI SENTIMENT ANALYSIS
------------------------
Top Positive Signals:
- 😍 (189 occurrences) - Camera quality praises
- 🔥 (156 occurrences) - Display brightness mentions
- 💯 (145 occurrences) - Performance satisfaction

Top Negative Signals:
- 💸 (89 occurrences) - Price complaints (iPhone)
- 📦 (54 occurrences) - Packaging damage (Samsung)
- 😤 (67 occurrences) - Software bugs (Samsung)

AI AUTO-CLASSIFICATION SUMMARY
------------------------------
- 150 sarcastic reviews detected and correctly classified
- Surface sentiment vs True sentiment analysis performed
- Zero human intervention required
- 89.2% F1 score on sarcasm detection

---
Report generated by SignalAhead AI Intelligence Platform
Advanced NLP with Emoji Analysis | Real-Time Processing
  `.trim()

  const blob = new Blob([reportContent], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `SignalAhead_AI_Report_${new Date().toISOString().split('T')[0]}.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export default function DashboardPage() {
  const [liveCount, setLiveCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount(prev => (prev + Math.floor(Math.random() * 3) + 1) % 50)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600">
                  <Swords className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  War Room Dashboard
                </h1>
                <Badge variant="outline" className="border-green-500 text-green-600 animate-pulse">
                  <Activity className="mr-1 h-3 w-3" />
                  LIVE
                </Badge>
              </div>
              <p className="mt-2 text-muted-foreground">
                SignalAhead AI Intelligence | 1,000 reviews | Samsung vs iPhone | Real-time Processing
              </p>
            </div>
            <Button onClick={downloadReport} className="bg-foreground hover:bg-foreground/90 text-background">
              <FileDown className="mr-2 h-4 w-4" />
              Download AI Report
            </Button>
          </div>

          {/* Top Stats */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {topStats.map((stat) => (
              <Card key={stat.label} className="border-border">
                <CardContent className="flex items-center gap-4 pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
                    <stat.icon className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <div className="font-mono text-3xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                    <div className="text-xs text-muted-foreground">{stat.trend}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* AI Processing Stats */}
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {processingStats.map((stat) => (
              <Card key={stat.label} className="border-purple-200 bg-purple-50/30">
                <CardContent className="flex items-center gap-3 pt-4 pb-3">
                  <stat.icon className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="font-mono text-xl font-bold text-purple-700">{stat.value}</span>
                      <span className="text-sm text-purple-600">{stat.unit}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Grid */}
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {/* Feature Health Scorecard */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Feature Health Scorecard (Competitive View)</CardTitle>
                  <CardDescription>Sentiment scores with competitive positioning across Samsung vs iPhone</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {featureScores.map((feature) => (
                    <div key={feature.name} className="flex items-center gap-4">
                      <div className="w-24 text-sm font-medium text-foreground flex items-center gap-2">
                        {feature.name}
                        {feature.alert && (
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <Progress
                          value={feature.score}
                          className={`h-3 ${
                            feature.status === "green"
                              ? "[&>div]:bg-green-500"
                              : feature.status === "yellow"
                              ? "[&>div]:bg-amber-500"
                              : "[&>div]:bg-red-500"
                          }`}
                        />
                      </div>
                      <div className="w-32 flex items-center gap-2">
                        <span
                          className={`font-mono text-sm font-bold ${
                            feature.status === "green"
                              ? "text-green-600"
                              : feature.status === "yellow"
                              ? "text-amber-600"
                              : "text-red-600"
                          }`}
                        >
                          {feature.score}%
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({feature.confidence}%)
                        </span>
                      </div>
                      <div className="w-36 text-xs text-muted-foreground hidden sm:block">
                        {feature.brand}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Active Alerts */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Active Alerts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {alerts.map((alert, i) => (
                    <div
                      key={i}
                      className={`rounded-lg p-3 ${
                        alert.type === "critical"
                          ? "bg-red-50 border border-red-200"
                          : alert.type === "warning"
                          ? "bg-amber-50 border border-amber-200"
                          : alert.type === "success"
                          ? "bg-green-50 border border-green-200"
                          : "bg-purple-50 border border-purple-200"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <alert.icon
                          className={`h-5 w-5 shrink-0 mt-0.5 ${
                            alert.type === "critical"
                              ? "text-red-600"
                              : alert.type === "warning"
                              ? "text-amber-600"
                              : alert.type === "success"
                              ? "text-green-600"
                              : "text-purple-600"
                          }`}
                        />
                        <div>
                          <div className={`text-sm font-semibold ${
                            alert.type === "critical"
                              ? "text-red-700"
                              : alert.type === "warning"
                              ? "text-amber-700"
                              : alert.type === "success"
                              ? "text-green-700"
                              : "text-purple-700"
                          }`}>
                            {alert.title}
                          </div>
                          <p className="text-sm text-muted-foreground mt-0.5">{alert.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Second Row */}
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {/* AI Classification Distribution */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-600" />
                    AI Classification
                  </CardTitle>
                  <CardDescription>Automatic sentiment distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sentimentDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={70}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {sentimentDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                          formatter={(value: number) => [value, 'Reviews']}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Competitive Trend */}
            <div className="lg:col-span-2">
              <Card className="border-teal-200">
                <CardHeader>
                  <CardTitle className="text-teal-600">Samsung vs iPhone Sentiment Trend</CardTitle>
                  <CardDescription>Monthly sentiment trajectory comparison (2024)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trendData} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                        <defs>
                          <linearGradient id="samsungGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="iphoneGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6b7280" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#6b7280" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="month" stroke="#9ca3af" tick={{ fill: '#6b7280', fontSize: 11 }} />
                        <YAxis stroke="#9ca3af" tick={{ fill: '#6b7280', fontSize: 11 }} domain={[60, 100]} tickFormatter={(v) => `${v}%`} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                          }}
                          formatter={(value: number, name: string) => [`${value}%`, name === "samsung" ? "Samsung" : "iPhone"]}
                        />
                        <Legend />
                        <Area type="monotone" dataKey="samsung" name="Samsung" stroke="#3b82f6" strokeWidth={2} fill="url(#samsungGradient)" />
                        <Area type="monotone" dataKey="iphone" name="iPhone" stroke="#6b7280" strokeWidth={2} fill="url(#iphoneGradient)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Third Row */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* Products */}
            <Card>
              <CardHeader>
                <CardTitle>Competitor Comparison</CardTitle>
                <CardDescription>Head-to-head analysis from 1,000 reviews</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {products.map((product) => (
                  <div
                    key={product.name}
                    className={`flex items-center gap-4 rounded-lg p-4 ${
                      product.name.includes("Samsung") 
                        ? "bg-blue-50 border border-blue-200" 
                        : "bg-gray-50 border border-gray-200"
                    }`}
                  >
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                      product.name.includes("Samsung") ? "bg-blue-100" : "bg-gray-100"
                    }`}>
                      <product.icon className={`h-6 w-6 ${
                        product.name.includes("Samsung") ? "text-blue-600" : "text-gray-600"
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{product.name}</div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          {product.rating}
                        </span>
                        <span>{product.reviews} reviews</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-mono text-xl font-bold ${
                        product.name.includes("Samsung") ? "text-blue-600" : "text-gray-600"
                      }`}>
                        {product.sentiment}%
                      </div>
                      <div className="text-xs text-muted-foreground">Sentiment</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Packaging Trend */}
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-orange-600">Packaging Issue Velocity</CardTitle>
                <CardDescription>Samsung packaging complaint rate — threshold at 25%</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[180px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendData} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                      <defs>
                        <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ea580c" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#ea580c" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#9ca3af" tick={{ fill: '#6b7280', fontSize: 11 }} />
                      <YAxis stroke="#9ca3af" tick={{ fill: '#6b7280', fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#fff',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                        }}
                        formatter={(value: number) => [`${value}%`, 'Complaint Rate']}
                      />
                      <ReferenceLine y={25} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Threshold', fill: '#ef4444', fontSize: 10 }} />
                      <Area type="monotone" dataKey="packagingRate" stroke="#ea580c" strokeWidth={2} fill="url(#trendGradient)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Row - Engine Summaries */}
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {/* Autopsy Summary */}
            <Card className="border-purple-200 bg-purple-50/30">
              <CardContent className="flex items-start gap-4 pt-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-100">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-purple-600">Autopsy Engine</div>
                  <div className="mt-1 font-semibold text-foreground">
                    Root Cause: Transit moisture damage
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    Escalate to: <span className="font-medium text-purple-700">Courier Partner</span>
                  </div>
                  <Badge className="mt-2 bg-purple-100 text-purple-700 border-purple-200">84% Confidence</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Radar Summary */}
            <Card className="border-teal-200 bg-teal-50/30">
              <CardContent className="flex items-start gap-4 pt-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-100">
                  <Activity className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-teal-600">Radar Engine</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge className="bg-red-100 text-red-700 border-red-200">Packaging -11%</Badge>
                    <Badge className="bg-green-100 text-green-700 border-green-200">Display +6%</Badge>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Samsung vs iPhone deep analysis
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Engine Summary */}
            <Card className="border-pink-200 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardContent className="flex items-start gap-4 pt-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">AI Auto-Decision Engine</div>
                  <div className="mt-1 font-semibold text-foreground">
                    Zero Human Intervention
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    Sarcasm F1: <span className="font-medium text-purple-700">89.2%</span>
                  </div>
                  <Badge className="mt-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200">
                    {847 + liveCount} reviews/min
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
