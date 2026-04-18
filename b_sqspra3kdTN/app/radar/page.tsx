"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Radar, AlertTriangle, CheckCircle, Info, Smartphone, Headphones, Sparkles } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const productData = {
  smartphone: {
    name: "Smartphone",
    icon: Smartphone,
    comparisonData: [
      { feature: "Battery", yours: 80, competitor: 79 },
      { feature: "Camera", yours: 74, competitor: 76 },
      { feature: "Packaging", yours: 56, competitor: 71 },
      { feature: "Sound", yours: 73, competitor: 72 },
      { feature: "Performance", yours: 77, competitor: 75 },
      { feature: "Display", yours: 72, competitor: 74 },
    ],
    verdicts: [
      {
        feature: "Packaging",
        yourScore: 56,
        competitorScore: 71,
        verdict: "YOUR PROBLEM ONLY",
        priority: "High Priority Internal Fix",
        explanation: "Competitor packaging sentiment is stable at 71%. Your 56% indicates an internal logistics issue requiring immediate action.",
        type: "critical",
        confidence: 91,
      },
      {
        feature: "Battery",
        yourScore: 80,
        competitorScore: 79,
        verdict: "INDUSTRY-WIDE TREND",
        priority: "Monitor Shared Patterns",
        explanation: "Both brands show similar battery sentiment (~80%). This is normal industry performance.",
        type: "info",
        confidence: 87,
      },
    ],
  },
  headphones: {
    name: "Headphones",
    icon: Headphones,
    comparisonData: [
      { feature: "Sound Quality", yours: 82, competitor: 80 },
      { feature: "Build", yours: 65, competitor: 78 },
      { feature: "Comfort", yours: 76, competitor: 74 },
      { feature: "Battery", yours: 79, competitor: 77 },
      { feature: "Connectivity", yours: 71, competitor: 73 },
      { feature: "Noise Cancel", yours: 68, competitor: 70 },
    ],
    verdicts: [
      {
        feature: "Build Quality",
        yourScore: 65,
        competitorScore: 78,
        verdict: "YOUR PROBLEM ONLY",
        priority: "High Priority Internal Fix",
        explanation: "Competitor build quality at 78% while yours is at 65%. This is a manufacturing issue specific to your product.",
        type: "critical",
        confidence: 88,
      },
      {
        feature: "Sound Quality",
        yourScore: 82,
        competitorScore: 80,
        verdict: "COMPETITIVE ADVANTAGE",
        priority: "Maintain Current Performance",
        explanation: "You are outperforming competitors on sound quality. This is a strength to highlight in marketing.",
        type: "success",
        confidence: 92,
      },
    ],
  },
  facecream: {
    name: "Face Cream",
    icon: Sparkles,
    comparisonData: [
      { feature: "Effectiveness", yours: 78, competitor: 76 },
      { feature: "Freshness", yours: 68, competitor: 72 },
      { feature: "Packaging", yours: 81, competitor: 79 },
      { feature: "Fragrance", yours: 74, competitor: 71 },
      { feature: "Texture", yours: 77, competitor: 75 },
      { feature: "Value", yours: 70, competitor: 68 },
    ],
    verdicts: [
      {
        feature: "Freshness",
        yourScore: 68,
        competitorScore: 72,
        verdict: "YOUR PROBLEM",
        priority: "Medium Priority Fix",
        explanation: "Freshness concerns are higher for your product (68%) vs competitor (72%). Review inventory rotation.",
        type: "warning",
        confidence: 79,
      },
      {
        feature: "Effectiveness",
        yourScore: 78,
        competitorScore: 76,
        verdict: "COMPETITIVE ADVANTAGE",
        priority: "Leverage in Marketing",
        explanation: "Your product effectiveness scores higher than competitor. Highlight this in communications.",
        type: "success",
        confidence: 85,
      },
    ],
  },
}

type ProductKey = keyof typeof productData

export default function RadarPage() {
  const [activeProduct, setActiveProduct] = useState<ProductKey>("smartphone")
  const product = productData[activeProduct]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div>
            <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-100 border-teal-200 text-sm px-3 py-1">
              <Radar className="mr-2 h-4 w-4" />
              RADAR ENGINE
            </Badge>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Know Which Problems Are <span className="text-teal-600">Truly Yours</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Runs the same analysis on competitor reviews. Separates your internal crises from industry-wide problems.
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
                {/* Verdict Cards */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {p.verdicts.map((v) => (
                    <Card
                      key={v.feature}
                      className={`border-2 ${
                        v.type === "critical"
                          ? "border-red-200 bg-red-50/50"
                          : v.type === "warning"
                          ? "border-amber-200 bg-amber-50/50"
                          : v.type === "success"
                          ? "border-green-200 bg-green-50/50"
                          : "border-blue-200 bg-blue-50/50"
                      }`}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {v.type === "critical" ? (
                              <AlertTriangle className="h-5 w-5 text-red-600" />
                            ) : v.type === "warning" ? (
                              <Info className="h-5 w-5 text-amber-600" />
                            ) : v.type === "success" ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <Info className="h-5 w-5 text-blue-600" />
                            )}
                            <CardTitle className="text-lg">{v.feature}</CardTitle>
                          </div>
                          <Badge className={
                            v.type === "critical" ? "bg-red-100 text-red-700 border-red-200" :
                            v.type === "warning" ? "bg-amber-100 text-amber-700 border-amber-200" :
                            v.type === "success" ? "bg-green-100 text-green-700 border-green-200" :
                            "bg-blue-100 text-blue-700 border-blue-200"
                          }>
                            {v.confidence}% conf
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <div>
                            <span className="text-muted-foreground">Your Score: </span>
                            <span className="font-bold text-orange-600">{v.yourScore}%</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Competitor: </span>
                            <span className="font-bold text-teal-600">{v.competitorScore}%</span>
                          </div>
                        </div>

                        <div className={`rounded-lg p-3 ${
                          v.type === "critical" ? "bg-red-100" :
                          v.type === "warning" ? "bg-amber-100" :
                          v.type === "success" ? "bg-green-100" :
                          "bg-blue-100"
                        }`}>
                          <div className={`text-sm font-bold ${
                            v.type === "critical" ? "text-red-700" :
                            v.type === "warning" ? "text-amber-700" :
                            v.type === "success" ? "text-green-700" :
                            "text-blue-700"
                          }`}>
                            {v.verdict}
                          </div>
                          <div className={`text-sm ${
                            v.type === "critical" ? "text-red-600" :
                            v.type === "warning" ? "text-amber-600" :
                            v.type === "success" ? "text-green-600" :
                            "text-blue-600"
                          }`}>
                            {v.priority}
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground">{v.explanation}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Comparison Chart */}
                <Card className="mt-8 border-2 border-teal-200 shadow-sm">
                  <CardHeader>
                    <CardTitle>Feature Score Comparison — {p.name}</CardTitle>
                    <CardDescription>Your Brand vs Competitor across all features</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={p.comparisonData}
                          layout="vertical"
                          margin={{ top: 20, right: 30, bottom: 20, left: 100 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis type="number" domain={[0, 100]} stroke="#9ca3af" tick={{ fill: '#6b7280', fontSize: 12 }} tickFormatter={(value) => `${value}%`} />
                          <YAxis type="category" dataKey="feature" stroke="#9ca3af" tick={{ fill: '#374151', fontSize: 12, fontWeight: 500 }} width={90} />
                          <Tooltip
                            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            labelStyle={{ color: '#111827', fontWeight: 600 }}
                            formatter={(value: number) => [`${value}%`]}
                          />
                          <Legend />
                          <Bar dataKey="yours" name="Your Brand" fill="#ea580c" radius={[0, 4, 4, 0]} />
                          <Bar dataKey="competitor" name="Competitor" fill="#0d9488" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Why This Matters */}
                <Card className="mt-8 border-teal-200 bg-teal-50">
                  <CardContent className="flex items-start gap-4 pt-6">
                    <CheckCircle className="h-6 w-6 shrink-0 text-teal-600" />
                    <div>
                      <h3 className="font-semibold text-teal-700">Why This Matters</h3>
                      <p className="mt-1 text-teal-800/80">
                        {"Without Radar, you might spend weeks fixing an issue that's actually industry-wide. The Radar Engine prevents wasted effort by contextualizing your problems against the broader market."}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
