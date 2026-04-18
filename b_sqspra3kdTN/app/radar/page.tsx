"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Radar, AlertTriangle, CheckCircle, Info, Smartphone, TrendingUp, TrendingDown,
  Lightbulb, Target, Zap, Shield, Battery, Camera, Volume2, Cpu, Monitor, Package,
  ArrowRight, Star, Award, AlertCircle, Wrench, Rocket, BarChart3, PieChart
} from "lucide-react"
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar as RechartsRadar,
  LineChart, Line, AreaChart, Area
} from "recharts"

// Samsung vs iPhone Detailed Comparison Data
const comparisonData = {
  overview: {
    samsung: { name: "Samsung Galaxy S24 Ultra", reviews: 487, avgRating: 4.2, sentiment: 78 },
    iphone: { name: "iPhone 15 Pro Max", reviews: 513, avgRating: 4.4, sentiment: 82 },
  },
  features: [
    { feature: "Battery Life", samsung: 82, iphone: 76, icon: Battery, winner: "samsung", gap: 6 },
    { feature: "Camera Quality", samsung: 79, iphone: 88, icon: Camera, winner: "iphone", gap: 9 },
    { feature: "Display", samsung: 91, iphone: 85, icon: Monitor, winner: "samsung", gap: 6 },
    { feature: "Performance", samsung: 84, iphone: 89, icon: Cpu, winner: "iphone", gap: 5 },
    { feature: "Sound Quality", samsung: 77, iphone: 74, icon: Volume2, winner: "samsung", gap: 3 },
    { feature: "Build Quality", samsung: 81, iphone: 86, icon: Shield, winner: "iphone", gap: 5 },
    { feature: "Packaging", samsung: 68, iphone: 79, icon: Package, winner: "iphone", gap: 11 },
    { feature: "Value for Money", samsung: 72, iphone: 65, icon: Star, winner: "samsung", gap: 7 },
  ],
  radarData: [
    { feature: "Battery", samsung: 82, iphone: 76 },
    { feature: "Camera", samsung: 79, iphone: 88 },
    { feature: "Display", samsung: 91, iphone: 85 },
    { feature: "Performance", samsung: 84, iphone: 89 },
    { feature: "Sound", samsung: 77, iphone: 74 },
    { feature: "Build", samsung: 81, iphone: 86 },
    { feature: "Packaging", samsung: 68, iphone: 79 },
    { feature: "Value", samsung: 72, iphone: 65 },
  ],
  trendData: [
    { month: "Jan", samsung: 75, iphone: 80 },
    { month: "Feb", samsung: 77, iphone: 81 },
    { month: "Mar", samsung: 78, iphone: 82 },
    { month: "Apr", samsung: 78, iphone: 82 },
  ],
  emojiAnalysis: {
    samsung: {
      positive: [
        { emoji: "🔥", count: 156, context: "Display brightness mentions" },
        { emoji: "📸", count: 134, context: "Night mode camera praises" },
        { emoji: "⚡", count: 98, context: "Fast charging appreciation" },
        { emoji: "💪", count: 87, context: "Battery endurance" },
      ],
      negative: [
        { emoji: "😤", count: 67, context: "Software bugs/updates" },
        { emoji: "📦", count: 54, context: "Packaging damage complaints" },
        { emoji: "🤔", count: 43, context: "Price concerns" },
        { emoji: "😡", count: 32, context: "Overheating issues" },
      ]
    },
    iphone: {
      positive: [
        { emoji: "😍", count: 189, context: "Camera quality praises" },
        { emoji: "✨", count: 167, context: "Premium feel mentions" },
        { emoji: "💯", count: 145, context: "Performance satisfaction" },
        { emoji: "🎬", count: 98, context: "Video recording quality" },
      ],
      negative: [
        { emoji: "💸", count: 89, context: "Price complaints" },
        { emoji: "🔋", count: 76, context: "Battery life concerns" },
        { emoji: "🔌", count: 54, context: "Charging speed complaints" },
        { emoji: "😑", count: 43, context: "Missing features" },
      ]
    }
  }
}

// Detailed Recommendations
const recommendations = {
  samsung: {
    critical: [
      {
        area: "Packaging & Delivery",
        currentScore: 68,
        competitorScore: 79,
        gap: -11,
        priority: "CRITICAL",
        analysis: "Samsung packaging sentiment is 11 points behind iPhone. Analysis of 487 reviews reveals moisture damage (34%), crushed boxes (28%), and insufficient padding (38%) as primary issues.",
        recommendations: [
          "Partner with premium courier services for flagship devices",
          "Implement double-wall corrugated packaging with moisture barriers",
          "Add shock-absorbing foam inserts similar to Apple's design",
          "Include humidity indicator cards to track transit conditions"
        ],
        expectedImpact: "+8-12% sentiment improvement within 60 days",
        investmentLevel: "Medium",
        emojiSignals: ["📦", "😤", "💔"],
      }
    ],
    improvements: [
      {
        area: "Camera Software",
        currentScore: 79,
        competitorScore: 88,
        gap: -9,
        priority: "HIGH",
        analysis: "While Samsung hardware matches iPhone, software processing in low-light and portrait mode receives 23% more negative mentions. Emoji analysis shows 📸 used positively 67% less than iPhone reviews.",
        recommendations: [
          "Improve computational photography algorithms for skin tones",
          "Reduce shutter lag in Pro mode to match iPhone response times",
          "Enhance night mode processing to reduce noise artifacts",
          "Add more intuitive camera UI with one-tap access to key features"
        ],
        expectedImpact: "+6-9% camera sentiment score",
        investmentLevel: "High (R&D)",
        emojiSignals: ["📸", "🌙", "👤"],
      },
      {
        area: "Software Stability",
        currentScore: 76,
        competitorScore: 84,
        gap: -8,
        priority: "HIGH",
        analysis: "One UI receives 31% more bug-related complaints than iOS. 😤 emoji appears 2.3x more frequently in Samsung reviews, primarily in software update contexts.",
        recommendations: [
          "Extend beta testing period before major updates",
          "Implement staged rollouts with automatic rollback capability",
          "Create dedicated bug bounty program for One UI issues",
          "Reduce bloatware and pre-installed apps causing conflicts"
        ],
        expectedImpact: "+5-7% overall satisfaction improvement",
        investmentLevel: "Medium",
        emojiSignals: ["😤", "🐛", "😫"],
      }
    ],
    strengths: [
      {
        area: "Display Technology",
        currentScore: 91,
        competitorScore: 85,
        gap: 6,
        priority: "MAINTAIN",
        analysis: "Samsung AMOLED displays receive 🔥 emoji 2.4x more than iPhone reviews. Brightness, color accuracy, and refresh rate are key differentiators. This is your strongest competitive advantage.",
        recommendations: [
          "Highlight display superiority in marketing campaigns",
          "Develop exclusive display features (always-on customization)",
          "Partner with content creators to showcase display capabilities",
          "Use this advantage in direct comparison advertising"
        ],
        expectedImpact: "Maintain leadership position",
        investmentLevel: "Low (Marketing)",
        emojiSignals: ["🔥", "🌈", "👀"],
      },
      {
        area: "Battery & Charging",
        currentScore: 82,
        competitorScore: 76,
        gap: 6,
        priority: "LEVERAGE",
        analysis: "Battery life mentions with ⚡ and 💪 emojis are 34% more positive for Samsung. Fast charging is a key differentiator with 45W vs iPhone's 27W maximum.",
        recommendations: [
          "Emphasize all-day battery in competitive ads",
          "Bundle fast chargers in box (competitor removed them)",
          "Create battery optimization tips content series",
          "Develop power-sharing features for ecosystem devices"
        ],
        expectedImpact: "Convert competitor customers",
        investmentLevel: "Low",
        emojiSignals: ["⚡", "🔋", "💪"],
      },
      {
        area: "Value Proposition",
        currentScore: 72,
        competitorScore: 65,
        gap: 7,
        priority: "LEVERAGE",
        analysis: "Samsung receives 28% more positive value-for-money mentions. Trade-in programs and bundle deals receive 💰 emoji positively. This is a key switching factor.",
        recommendations: [
          "Aggressive trade-in programs targeting iPhone users",
          "Bundle Galaxy ecosystem devices at discount",
          "Highlight features that require paid upgrades on iPhone",
          "Create direct price-feature comparison campaigns"
        ],
        expectedImpact: "Increase market share by 2-3%",
        investmentLevel: "Medium",
        emojiSignals: ["💰", "🤑", "✅"],
      }
    ]
  },
  iphone: {
    critical: [
      {
        area: "Battery Life",
        currentScore: 76,
        competitorScore: 82,
        gap: -6,
        priority: "CRITICAL",
        analysis: "iPhone battery complaints with 🔋 emoji are 43% higher than Samsung. Heavy users report needing mid-day charging. This is your biggest weakness being exploited by competitors.",
        recommendations: [
          "Increase battery capacity in next generation",
          "Optimize iOS background processes to reduce drain",
          "Improve battery health transparency and longevity features",
          "Consider MagSafe battery case bundling options"
        ],
        expectedImpact: "+5-8% sentiment improvement",
        investmentLevel: "High (Hardware)",
        emojiSignals: ["🔋", "😩", "🔌"],
      }
    ],
    improvements: [
      {
        area: "Charging Speed",
        currentScore: 71,
        competitorScore: 85,
        gap: -14,
        priority: "HIGH",
        analysis: "27W max charging vs Samsung's 45W generates significant negative sentiment. ⚡ emoji usage in iPhone reviews is 67% negative (waiting complaints) vs 78% positive in Samsung reviews.",
        recommendations: [
          "Increase charging speed to competitive 45W minimum",
          "Include fast charger in box (currently sold separately)",
          "Develop better heat management for faster charging",
          "Improve battery health during fast charging cycles"
        ],
        expectedImpact: "+8-12% charging-related sentiment",
        investmentLevel: "High (Hardware + Accessory)",
        emojiSignals: ["⚡", "⏰", "😤"],
      },
      {
        area: "Value Perception",
        currentScore: 65,
        competitorScore: 72,
        gap: -7,
        priority: "MEDIUM",
        analysis: "Price complaints with 💸 emoji are 34% higher than Samsung. Accessory pricing (chargers, cables) amplifies negative perception. Storage upgrade pricing is particularly criticized.",
        recommendations: [
          "Reduce storage tier pricing or increase base storage",
          "Bundle essential accessories (charger, case)",
          "Introduce mid-cycle price adjustments",
          "Improve trade-in values to offset initial cost"
        ],
        expectedImpact: "+4-6% value perception score",
        investmentLevel: "Medium (Pricing Strategy)",
        emojiSignals: ["💸", "🤔", "😐"],
      }
    ],
    strengths: [
      {
        area: "Camera Excellence",
        currentScore: 88,
        competitorScore: 79,
        gap: 9,
        priority: "MAINTAIN",
        analysis: "Camera quality receives 😍 emoji 2.8x more than Samsung. Portrait mode, video recording, and computational photography are key differentiators. 34% of reviews specifically praise camera.",
        recommendations: [
          "Continue investing in computational photography R&D",
          "Partner with professional photographers for content",
          "Develop exclusive camera features for creator economy",
          "Maintain lead in video recording capabilities"
        ],
        expectedImpact: "Maintain industry leadership",
        investmentLevel: "High (Ongoing R&D)",
        emojiSignals: ["😍", "📸", "🎬"],
      },
      {
        area: "Performance & Reliability",
        currentScore: 89,
        competitorScore: 84,
        gap: 5,
        priority: "LEVERAGE",
        analysis: "A17 chip performance with 💯 emoji mentions 45% higher than Samsung. iOS stability receives 23% fewer bug complaints. This drives strong customer retention.",
        recommendations: [
          "Highlight performance benchmarks in marketing",
          "Emphasize long-term iOS support (5+ years)",
          "Develop AI features leveraging chip capabilities",
          "Create performance comparison content"
        ],
        expectedImpact: "Strengthen retention rates",
        investmentLevel: "Medium (Marketing)",
        emojiSignals: ["💯", "🚀", "✨"],
      },
      {
        area: "Build & Premium Feel",
        currentScore: 86,
        competitorScore: 81,
        gap: 5,
        priority: "LEVERAGE",
        analysis: "Premium feel mentions with ✨ emoji are 56% higher than Samsung. Titanium frame and ceramic shield generate positive sentiment. Unboxing experience is frequently praised.",
        recommendations: [
          "Continue premium materials innovation",
          "Enhance unboxing experience further",
          "Develop exclusive color options and finishes",
          "Partner with luxury brands for special editions"
        ],
        expectedImpact: "Maintain premium positioning",
        investmentLevel: "Medium",
        emojiSignals: ["✨", "💎", "👑"],
      }
    ]
  }
}

type BrandKey = "samsung" | "iphone"

export default function RadarPage() {
  const [activeBrand, setActiveBrand] = useState<BrandKey>("samsung")
  const [activeView, setActiveView] = useState<"comparison" | "recommendations" | "emoji">("comparison")

  const brandRecs = recommendations[activeBrand]
  const allRecs = [...brandRecs.critical, ...brandRecs.improvements, ...brandRecs.strengths]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <Badge className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:from-teal-600 hover:to-cyan-600 border-0 text-sm px-3 py-1">
                  <Radar className="mr-2 h-4 w-4" />
                  COMPETITIVE RADAR ENGINE
                </Badge>
                <Badge variant="outline" className="border-amber-500 text-amber-600">
                  <BarChart3 className="mr-1 h-3 w-3" />
                  1,000 Reviews Analyzed
                </Badge>
              </div>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Samsung vs iPhone <span className="text-teal-600">Deep Analysis</span>
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
                Comprehensive competitor intelligence with emoji sentiment analysis, feature-by-feature breakdown, and actionable recommendations to outperform the competition.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50">
                  Samsung Reviews: 487 (Amazon, Flipkart)
                </Badge>
                <Badge variant="outline" className="border-gray-300 text-gray-700 bg-gray-50">
                  iPhone Reviews: 513 (Amazon, Twitter)
                </Badge>
                <Badge variant="outline" className="border-teal-300 text-teal-700 bg-teal-50">
                  Collection Period: Jan-Apr 2024
                </Badge>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-blue-600 font-medium">Samsung Galaxy S24</div>
                    <div className="font-mono text-3xl font-bold text-blue-700">{comparisonData.overview.samsung.sentiment}%</div>
                    <div className="text-sm text-muted-foreground">Overall Sentiment</div>
                  </div>
                  <Smartphone className="h-10 w-10 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600 font-medium">iPhone 15 Pro</div>
                    <div className="font-mono text-3xl font-bold text-gray-700">{comparisonData.overview.iphone.sentiment}%</div>
                    <div className="text-sm text-muted-foreground">Overall Sentiment</div>
                  </div>
                  <Smartphone className="h-10 w-10 text-gray-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-teal-100/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-teal-600 font-medium">Total Reviews</div>
                    <div className="font-mono text-3xl font-bold text-teal-700">1,000</div>
                    <div className="text-sm text-muted-foreground">Analyzed</div>
                  </div>
                  <PieChart className="h-10 w-10 text-teal-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-amber-600 font-medium">AI Recommendations</div>
                    <div className="font-mono text-3xl font-bold text-amber-700">12</div>
                    <div className="text-sm text-muted-foreground">Generated</div>
                  </div>
                  <Lightbulb className="h-10 w-10 text-amber-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Tabs */}
          <Tabs value={activeView} onValueChange={(v) => setActiveView(v as any)} className="mt-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="comparison" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Feature Comparison
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                AI Recommendations
              </TabsTrigger>
              <TabsTrigger value="emoji" className="flex items-center gap-2">
                <span className="text-sm">😍</span>
                Emoji Analysis
              </TabsTrigger>
            </TabsList>

            {/* Comparison Tab */}
            <TabsContent value="comparison" className="mt-6">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Feature Bar Chart */}
                <Card className="border-2 border-teal-200 lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Feature-by-Feature Sentiment Comparison</CardTitle>
                    <CardDescription>Based on analysis of 1,000 customer reviews</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={comparisonData.features}
                          layout="vertical"
                          margin={{ top: 20, right: 30, bottom: 20, left: 100 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis type="number" domain={[0, 100]} stroke="#9ca3af" tick={{ fill: '#6b7280', fontSize: 12 }} tickFormatter={(value) => `${value}%`} />
                          <YAxis type="category" dataKey="feature" stroke="#9ca3af" tick={{ fill: '#374151', fontSize: 12, fontWeight: 500 }} width={90} />
                          <Tooltip
                            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            labelStyle={{ color: '#111827', fontWeight: 600 }}
                            formatter={(value: number, name: string) => [`${value}%`, name === "samsung" ? "Samsung" : "iPhone"]}
                          />
                          <Legend />
                          <Bar dataKey="samsung" name="Samsung Galaxy S24" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                          <Bar dataKey="iphone" name="iPhone 15 Pro" fill="#6b7280" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Radar Chart */}
                <Card className="border-2 border-teal-200">
                  <CardHeader>
                    <CardTitle>360° Feature Radar</CardTitle>
                    <CardDescription>Visual comparison across all dimensions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={comparisonData.radarData}>
                          <PolarGrid stroke="#e5e7eb" />
                          <PolarAngleAxis dataKey="feature" tick={{ fill: '#374151', fontSize: 11 }} />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 10 }} />
                          <RechartsRadar name="Samsung" dataKey="samsung" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                          <RechartsRadar name="iPhone" dataKey="iphone" stroke="#6b7280" fill="#6b7280" fillOpacity={0.3} />
                          <Legend />
                          <Tooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Trend Over Time */}
                <Card className="border-2 border-teal-200">
                  <CardHeader>
                    <CardTitle>Sentiment Trend (2024)</CardTitle>
                    <CardDescription>Monthly sentiment trajectory comparison</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={comparisonData.trendData}>
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
                          <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                          <Legend />
                          <Area type="monotone" dataKey="samsung" name="Samsung" stroke="#3b82f6" fill="url(#samsungGradient)" strokeWidth={2} />
                          <Area type="monotone" dataKey="iphone" name="iPhone" stroke="#6b7280" fill="url(#iphoneGradient)" strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Winner Summary */}
                <Card className="lg:col-span-2 border-2 border-amber-200 bg-amber-50/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-amber-600" />
                      Feature Leadership Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <h4 className="font-semibold text-blue-700 mb-3 flex items-center gap-2">
                          <Smartphone className="h-4 w-4" />
                          Samsung Wins (4 features)
                        </h4>
                        <div className="space-y-2">
                          {comparisonData.features.filter(f => f.winner === "samsung").map(f => (
                            <div key={f.feature} className="flex items-center justify-between rounded-lg bg-blue-100 p-2">
                              <div className="flex items-center gap-2">
                                <f.icon className="h-4 w-4 text-blue-600" />
                                <span className="text-sm font-medium text-blue-700">{f.feature}</span>
                              </div>
                              <Badge className="bg-blue-200 text-blue-700 border-blue-300">
                                +{f.gap}%
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                          <Smartphone className="h-4 w-4" />
                          iPhone Wins (4 features)
                        </h4>
                        <div className="space-y-2">
                          {comparisonData.features.filter(f => f.winner === "iphone").map(f => (
                            <div key={f.feature} className="flex items-center justify-between rounded-lg bg-gray-100 p-2">
                              <div className="flex items-center gap-2">
                                <f.icon className="h-4 w-4 text-gray-600" />
                                <span className="text-sm font-medium text-gray-700">{f.feature}</span>
                              </div>
                              <Badge className="bg-gray-200 text-gray-700 border-gray-300">
                                +{f.gap}%
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Recommendations Tab */}
            <TabsContent value="recommendations" className="mt-6">
              {/* Brand Selector */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setActiveBrand("samsung")}
                  className={`flex-1 rounded-xl border-2 p-4 transition-all ${
                    activeBrand === "samsung" 
                      ? "border-blue-500 bg-blue-50 shadow-lg" 
                      : "border-border hover:border-blue-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Smartphone className={`h-6 w-6 ${activeBrand === "samsung" ? "text-blue-600" : "text-muted-foreground"}`} />
                    <div className="text-left">
                      <div className={`font-semibold ${activeBrand === "samsung" ? "text-blue-700" : "text-foreground"}`}>
                        Samsung Galaxy S24
                      </div>
                      <div className="text-sm text-muted-foreground">6 recommendations</div>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => setActiveBrand("iphone")}
                  className={`flex-1 rounded-xl border-2 p-4 transition-all ${
                    activeBrand === "iphone" 
                      ? "border-gray-500 bg-gray-50 shadow-lg" 
                      : "border-border hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Smartphone className={`h-6 w-6 ${activeBrand === "iphone" ? "text-gray-600" : "text-muted-foreground"}`} />
                    <div className="text-left">
                      <div className={`font-semibold ${activeBrand === "iphone" ? "text-gray-700" : "text-foreground"}`}>
                        iPhone 15 Pro
                      </div>
                      <div className="text-sm text-muted-foreground">6 recommendations</div>
                    </div>
                  </div>
                </button>
              </div>

              <ScrollArea className="h-[800px] pr-4">
                <div className="space-y-6">
                  {/* Critical Section */}
                  {brandRecs.critical.length > 0 && (
                    <div>
                      <h3 className="flex items-center gap-2 text-lg font-semibold text-red-700 mb-4">
                        <AlertTriangle className="h-5 w-5" />
                        Critical Priority - Fix Immediately
                      </h3>
                      {brandRecs.critical.map((rec, idx) => (
                        <Card key={idx} className="border-2 border-red-300 bg-red-50/50">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div>
                                <CardTitle className="text-red-700">{rec.area}</CardTitle>
                                <CardDescription className="mt-1">
                                  Your Score: <span className="font-bold text-red-600">{rec.currentScore}%</span> | 
                                  Competitor: <span className="font-bold text-green-600">{rec.competitorScore}%</span> |
                                  Gap: <span className="font-bold text-red-600">{rec.gap}%</span>
                                </CardDescription>
                              </div>
                              <Badge className="bg-red-100 text-red-700 border-red-200">{rec.priority}</Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-foreground mb-2">Analysis</h4>
                              <p className="text-muted-foreground text-sm">{rec.analysis}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground mb-2">Actionable Recommendations</h4>
                              <ul className="space-y-2">
                                {rec.recommendations.map((r, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm">
                                    <ArrowRight className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
                                    <span>{r}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="flex flex-wrap gap-4 pt-2">
                              <div className="flex items-center gap-2">
                                <Target className="h-4 w-4 text-green-600" />
                                <span className="text-sm"><strong>Expected Impact:</strong> {rec.expectedImpact}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Wrench className="h-4 w-4 text-amber-600" />
                                <span className="text-sm"><strong>Investment:</strong> {rec.investmentLevel}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 pt-2">
                              <span className="text-sm text-muted-foreground">Emoji Signals:</span>
                              {rec.emojiSignals.map((e, i) => (
                                <span key={i} className="text-xl">{e}</span>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* Improvements Section */}
                  {brandRecs.improvements.length > 0 && (
                    <div>
                      <h3 className="flex items-center gap-2 text-lg font-semibold text-amber-700 mb-4">
                        <AlertCircle className="h-5 w-5" />
                        High Priority Improvements
                      </h3>
                      <div className="space-y-4">
                        {brandRecs.improvements.map((rec, idx) => (
                          <Card key={idx} className="border-2 border-amber-200 bg-amber-50/30">
                            <CardHeader>
                              <div className="flex items-start justify-between">
                                <div>
                                  <CardTitle className="text-amber-700">{rec.area}</CardTitle>
                                  <CardDescription className="mt-1">
                                    Your Score: <span className="font-bold text-amber-600">{rec.currentScore}%</span> | 
                                    Competitor: <span className="font-bold text-green-600">{rec.competitorScore}%</span> |
                                    Gap: <span className="font-bold text-amber-600">{rec.gap}%</span>
                                  </CardDescription>
                                </div>
                                <Badge className="bg-amber-100 text-amber-700 border-amber-200">{rec.priority}</Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div>
                                <h4 className="font-semibold text-foreground mb-2">Analysis</h4>
                                <p className="text-muted-foreground text-sm">{rec.analysis}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground mb-2">Actionable Recommendations</h4>
                                <ul className="space-y-2">
                                  {rec.recommendations.map((r, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm">
                                      <ArrowRight className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                                      <span>{r}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="flex flex-wrap gap-4 pt-2">
                                <div className="flex items-center gap-2">
                                  <Target className="h-4 w-4 text-green-600" />
                                  <span className="text-sm"><strong>Expected Impact:</strong> {rec.expectedImpact}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Wrench className="h-4 w-4 text-amber-600" />
                                  <span className="text-sm"><strong>Investment:</strong> {rec.investmentLevel}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 pt-2">
                                <span className="text-sm text-muted-foreground">Emoji Signals:</span>
                                {rec.emojiSignals.map((e, i) => (
                                  <span key={i} className="text-xl">{e}</span>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Strengths Section */}
                  {brandRecs.strengths.length > 0 && (
                    <div>
                      <h3 className="flex items-center gap-2 text-lg font-semibold text-green-700 mb-4">
                        <Rocket className="h-5 w-5" />
                        Competitive Strengths - Leverage These
                      </h3>
                      <div className="space-y-4">
                        {brandRecs.strengths.map((rec, idx) => (
                          <Card key={idx} className="border-2 border-green-200 bg-green-50/30">
                            <CardHeader>
                              <div className="flex items-start justify-between">
                                <div>
                                  <CardTitle className="text-green-700">{rec.area}</CardTitle>
                                  <CardDescription className="mt-1">
                                    Your Score: <span className="font-bold text-green-600">{rec.currentScore}%</span> | 
                                    Competitor: <span className="font-bold text-red-600">{rec.competitorScore}%</span> |
                                    Lead: <span className="font-bold text-green-600">+{rec.gap}%</span>
                                  </CardDescription>
                                </div>
                                <Badge className="bg-green-100 text-green-700 border-green-200">{rec.priority}</Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div>
                                <h4 className="font-semibold text-foreground mb-2">Analysis</h4>
                                <p className="text-muted-foreground text-sm">{rec.analysis}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground mb-2">Leverage Strategies</h4>
                                <ul className="space-y-2">
                                  {rec.recommendations.map((r, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm">
                                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                                      <span>{r}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="flex flex-wrap gap-4 pt-2">
                                <div className="flex items-center gap-2">
                                  <Target className="h-4 w-4 text-green-600" />
                                  <span className="text-sm"><strong>Expected Impact:</strong> {rec.expectedImpact}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Wrench className="h-4 w-4 text-amber-600" />
                                  <span className="text-sm"><strong>Investment:</strong> {rec.investmentLevel}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 pt-2">
                                <span className="text-sm text-muted-foreground">Emoji Signals:</span>
                                {rec.emojiSignals.map((e, i) => (
                                  <span key={i} className="text-xl">{e}</span>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Emoji Analysis Tab */}
            <TabsContent value="emoji" className="mt-6">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Samsung Emoji Analysis */}
                <Card className="border-2 border-blue-200">
                  <CardHeader className="bg-blue-50/50">
                    <CardTitle className="flex items-center gap-2 text-blue-700">
                      <Smartphone className="h-5 w-5" />
                      Samsung Emoji Sentiment Signals
                    </CardTitle>
                    <CardDescription>How customers express emotions about Samsung</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" />
                          Positive Signals
                        </h4>
                        <div className="space-y-2">
                          {comparisonData.emojiAnalysis.samsung.positive.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 rounded-lg bg-green-50 border border-green-200 p-3">
                              <span className="text-3xl">{item.emoji}</span>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-green-700">{item.count} occurrences</span>
                                </div>
                                <p className="text-sm text-green-600">{item.context}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                          <TrendingDown className="h-4 w-4" />
                          Negative Signals
                        </h4>
                        <div className="space-y-2">
                          {comparisonData.emojiAnalysis.samsung.negative.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 rounded-lg bg-red-50 border border-red-200 p-3">
                              <span className="text-3xl">{item.emoji}</span>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-red-700">{item.count} occurrences</span>
                                </div>
                                <p className="text-sm text-red-600">{item.context}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* iPhone Emoji Analysis */}
                <Card className="border-2 border-gray-200">
                  <CardHeader className="bg-gray-50/50">
                    <CardTitle className="flex items-center gap-2 text-gray-700">
                      <Smartphone className="h-5 w-5" />
                      iPhone Emoji Sentiment Signals
                    </CardTitle>
                    <CardDescription>How customers express emotions about iPhone</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" />
                          Positive Signals
                        </h4>
                        <div className="space-y-2">
                          {comparisonData.emojiAnalysis.iphone.positive.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 rounded-lg bg-green-50 border border-green-200 p-3">
                              <span className="text-3xl">{item.emoji}</span>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-green-700">{item.count} occurrences</span>
                                </div>
                                <p className="text-sm text-green-600">{item.context}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                          <TrendingDown className="h-4 w-4" />
                          Negative Signals
                        </h4>
                        <div className="space-y-2">
                          {comparisonData.emojiAnalysis.iphone.negative.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 rounded-lg bg-red-50 border border-red-200 p-3">
                              <span className="text-3xl">{item.emoji}</span>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-red-700">{item.count} occurrences</span>
                                </div>
                                <p className="text-sm text-red-600">{item.context}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Emoji Intelligence Summary */}
                <Card className="lg:col-span-2 border-2 border-teal-200 bg-teal-50/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-teal-700">
                      <Info className="h-5 w-5" />
                      How Emoji Analysis Works
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 sm:grid-cols-3">
                      <div className="rounded-lg bg-white border border-teal-200 p-4">
                        <h4 className="font-semibold text-teal-700 mb-2">1. Detection</h4>
                        <p className="text-sm text-muted-foreground">
                          Our NLP pipeline extracts all Unicode emojis from reviews and maps them to sentiment categories (positive, negative, neutral).
                        </p>
                      </div>
                      <div className="rounded-lg bg-white border border-teal-200 p-4">
                        <h4 className="font-semibold text-teal-700 mb-2">2. Context Analysis</h4>
                        <p className="text-sm text-muted-foreground">
                          We analyze surrounding text to understand emoji context. A fire emoji near "battery" means different things than near "screen".
                        </p>
                      </div>
                      <div className="rounded-lg bg-white border border-teal-200 p-4">
                        <h4 className="font-semibold text-teal-700 mb-2">3. Score Impact</h4>
                        <p className="text-sm text-muted-foreground">
                          Emojis modify sentiment confidence by 5-18% depending on strength. Multiple emojis compound the effect multiplicatively.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
