"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Brain, Sparkles, Bot, ThumbsUp, ThumbsDown, Zap, Activity,
  TrendingUp, Clock, CheckCircle, AlertTriangle, Smile, Frown, Meh,
  Smartphone, Headphones, Eye, MessageSquareText, BarChart3
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar as RechartsRadar } from "recharts"

// Emoji sentiment mappings for analysis
const emojiSentiments = {
  positive: ["😍", "🔥", "💯", "👍", "❤️", "🙌", "✨", "⭐", "👏", "💪", "🎉", "😊", "🥰", "💖", "👌", "🤩", "😁", "💕", "🙏", "😃"],
  negative: ["😡", "💔", "👎", "😤", "🤮", "💩", "😭", "😠", "🙄", "😒", "😢", "😞", "👊", "🤬", "😩", "😫", "😑", "😔", "💢", "🚫"],
  neutral: ["🤔", "😐", "🤷", "😶", "💭", "📱", "📦", "🎧", "💄", "🧴"]
}

// Sarcasm detection patterns
const sarcasmIndicators = [
  "yeah right", "oh great", "sure thing", "of course", "wow amazing", "just what i needed",
  "thanks a lot", "brilliant", "fantastic", "wonderful", "love how", "best ever", "perfect timing",
  "couldn't be happier", "exactly what i wanted", "10/10 would recommend", "A+ service"
]

// Generate 1000 diverse reviews
function generateReviews() {
  const products = ["Samsung Galaxy S24", "iPhone 15 Pro", "Samsung Buds3", "AirPods Pro", "Samsung Cream", "La Mer Cream"]
  const productIcons: Record<string, string> = {
    "Samsung Galaxy S24": "smartphone-samsung",
    "iPhone 15 Pro": "smartphone-iphone",
    "Samsung Buds3": "headphones-samsung",
    "AirPods Pro": "headphones-apple",
    "Samsung Cream": "cream-samsung",
    "La Mer Cream": "cream-lamer"
  }
  
  const positiveReviews = [
    { text: "Absolutely love this product! 😍 Best purchase ever!", emojis: ["😍"], lang: "EN" },
    { text: "Battery life is insane! 🔥 Lasts all day with heavy use", emojis: ["🔥"], lang: "EN" },
    { text: "Camera quality exceeded my expectations 📸 Crystal clear photos!", emojis: ["📸"], lang: "EN" },
    { text: "Premium build quality, feels like a luxury item 💯", emojis: ["💯"], lang: "EN" },
    { text: "Fast delivery and excellent packaging 👍 Very impressed", emojis: ["👍"], lang: "EN" },
    { text: "Best sound quality I've ever experienced ❤️🎵", emojis: ["❤️", "🎵"], lang: "EN" },
    { text: "Skin feels so smooth after using this! ✨ Amazing results", emojis: ["✨"], lang: "EN" },
    { text: "Worth every penny! ⭐⭐⭐⭐⭐ 5 stars all day", emojis: ["⭐"], lang: "EN" },
    { text: "Bahut achha product hai! 👏 Family ko bhi recommend kiya", emojis: ["👏"], lang: "HI" },
    { text: "Screen clarity is mindblowing 🤩 HDR looks incredible", emojis: ["🤩"], lang: "EN" },
    { text: "Noise cancellation is perfect 🎧💪 Can't hear anything", emojis: ["🎧", "💪"], lang: "EN" },
    { text: "Arrived earlier than expected 🎉 Excellent service!", emojis: ["🎉"], lang: "EN" },
    { text: "My skin has never looked better 😊 So grateful", emojis: ["😊"], lang: "EN" },
    { text: "Premium quality at a great price 🥰 Highly recommend", emojis: ["🥰"], lang: "EN" },
    { text: "Ek dum first class maal hai 💖 Superb quality", emojis: ["💖"], lang: "HI" },
    { text: "The display is absolutely gorgeous 👌 AMOLED perfection", emojis: ["👌"], lang: "EN" },
    { text: "Charges super fast! 🤩 0 to 100 in no time", emojis: ["🤩"], lang: "EN" },
    { text: "Fit is so comfortable 😁 Can wear all day", emojis: ["😁"], lang: "EN" },
    { text: "Moisturizing effect lasts all day 💕 Love it!", emojis: ["💕"], lang: "EN" },
    { text: "Thank you for this amazing product 🙏 God bless", emojis: ["🙏"], lang: "EN" },
  ]

  const negativeReviews = [
    { text: "Worst purchase ever 😡 Complete waste of money!", emojis: ["😡"], lang: "EN" },
    { text: "Broke after 2 days 💔 Terrible quality control", emojis: ["💔"], lang: "EN" },
    { text: "Battery drains so fast 👎 Can't even last half a day", emojis: ["👎"], lang: "EN" },
    { text: "Overheating issues are insane 😤 Burns my hand!", emojis: ["😤"], lang: "EN" },
    { text: "Camera is grainy and blurry 🤮 Not as advertised", emojis: ["🤮"], lang: "EN" },
    { text: "Package arrived damaged 💩 Horrible packaging", emojis: ["💩"], lang: "EN" },
    { text: "Caused skin irritation 😭 Had to see a doctor", emojis: ["😭"], lang: "EN" },
    { text: "Sound quality is terrible 😠 Crackling noises", emojis: ["😠"], lang: "EN" },
    { text: "Bekaar product hai 🙄 Mat lo ye", emojis: ["🙄"], lang: "HI" },
    { text: "Connectivity issues constantly 😒 Keeps disconnecting", emojis: ["😒"], lang: "EN" },
    { text: "Smells weird and expired 😢 Check expiry dates!", emojis: ["😢"], lang: "EN" },
    { text: "Screen cracked easily 😞 No durability", emojis: ["😞"], lang: "EN" },
    { text: "Customer service is useless 👊 No response!", emojis: ["👊"], lang: "EN" },
    { text: "Pura paisa barbad 🤬 Fraud company", emojis: ["🤬"], lang: "HI" },
    { text: "Makes my ears hurt 😩 Uncomfortable fit", emojis: ["😩"], lang: "EN" },
    { text: "Caused breakouts on my face 😫 Avoid!", emojis: ["😫"], lang: "EN" },
    { text: "Nothing works as described 😑 False advertising", emojis: ["😑"], lang: "EN" },
    { text: "Returned immediately 😔 Total disappointment", emojis: ["😔"], lang: "EN" },
    { text: "Angry about this purchase 💢 Want refund!", emojis: ["💢"], lang: "EN" },
    { text: "Do not buy! 🚫 Scam product", emojis: ["🚫"], lang: "EN" },
  ]

  const sarcasmReviews = [
    { text: "Oh great, another broken package! Just what I wanted for my birthday 🎁", emojis: ["🎁"], lang: "EN", actualSentiment: "negative" },
    { text: "Wow, such amazing build quality, broke in just 2 days! New record! 🏆", emojis: ["🏆"], lang: "EN", actualSentiment: "negative" },
    { text: "Love how the box arrived crushed, very premium experience 💎", emojis: ["💎"], lang: "EN", actualSentiment: "negative" },
    { text: "Battery lasts forever... if you turn off the phone 🔋", emojis: ["🔋"], lang: "EN", actualSentiment: "negative" },
    { text: "Best expiry date ever - only 1 month left! Fresh! 🌿", emojis: ["🌿"], lang: "EN", actualSentiment: "negative" },
    { text: "Waah kya cream hai, 3 din mein smell hi gayab 👃", emojis: ["👃"], lang: "HI", actualSentiment: "negative" },
    { text: "Perfect timing on delivery - just 3 weeks late! ⏰", emojis: ["⏰"], lang: "EN", actualSentiment: "negative" },
    { text: "Yeah right, this is totally worth $1000 💰", emojis: ["💰"], lang: "EN", actualSentiment: "negative" },
    { text: "Thanks for the 'water resistant' phone that died in rain 🌧️", emojis: ["🌧️"], lang: "EN", actualSentiment: "negative" },
    { text: "A+ service! Only had to call 10 times for help 📞", emojis: ["📞"], lang: "EN", actualSentiment: "negative" },
    { text: "Brilliant idea to not include charger, saves money! 🔌", emojis: ["🔌"], lang: "EN", actualSentiment: "negative" },
    { text: "10/10 would recommend... to my enemies 👿", emojis: ["👿"], lang: "EN", actualSentiment: "negative" },
    { text: "Couldn't be happier that it stopped working on day 3 😇", emojis: ["😇"], lang: "EN", actualSentiment: "negative" },
    { text: "Sure thing, this $50 cable is worth every penny 🙃", emojis: ["🙃"], lang: "EN", actualSentiment: "negative" },
    { text: "Fantastic customer support - still waiting since January! 📅", emojis: ["📅"], lang: "EN", actualSentiment: "negative" },
  ]

  const botReviews = [
    { text: "Great product great quality great service great everything great 👍👍👍", emojis: ["👍"], lang: "EN" },
    { text: "Best product ever bought must buy highly recommended 5 stars ⭐⭐⭐⭐⭐", emojis: ["⭐"], lang: "EN" },
    { text: "Product is good. Delivery is good. Packaging is good. Price is good.", emojis: [], lang: "EN" },
    { text: "Nice nice nice nice nice product nice nice nice", emojis: [], lang: "EN" },
    { text: "I love this product so much I bought 10 more same day amazing", emojis: [], lang: "EN" },
    { text: "Perfect perfect perfect perfect perfect ⭐⭐⭐⭐⭐", emojis: ["⭐"], lang: "EN" },
    { text: "Bahut badiya maal hai ekdum first class quality best best 💯💯", emojis: ["💯"], lang: "HI" },
    { text: "Amazing experience wonderful delivery fantastic packaging excellent", emojis: [], lang: "EN" },
    { text: "Good good good value for money good good good", emojis: [], lang: "EN" },
    { text: "Product received fast shipping great seller A+++", emojis: [], lang: "EN" },
    { text: "Super product super quality super fast delivery super happy", emojis: [], lang: "EN" },
    { text: "Very nice product very good quality very fast shipping very happy", emojis: [], lang: "EN" },
    { text: "Worst product ever dont buy waste of money scam fraud 👎👎👎", emojis: ["👎"], lang: "EN" },
    { text: "Excellent excellent excellent highly recommend excellent", emojis: [], lang: "EN" },
    { text: "Best best best best best purchase best best", emojis: [], lang: "EN" },
  ]

  const reviews: any[] = []
  let id = 1

  // Generate positive reviews (350)
  for (let i = 0; i < 350; i++) {
    const template = positiveReviews[i % positiveReviews.length]
    const product = products[Math.floor(Math.random() * products.length)]
    const confidence = 85 + Math.floor(Math.random() * 14)
    reviews.push({
      id: `p${id++}`,
      text: template.text,
      product,
      type: "genuine",
      lang: template.lang,
      emojis: template.emojis,
      aiDecision: "positive",
      confidence,
      processingTime: (80 + Math.random() * 120).toFixed(0),
      emojiImpact: template.emojis.length > 0 ? `+${5 + Math.floor(Math.random() * 10)}%` : "N/A",
    })
  }

  // Generate negative reviews (350)
  for (let i = 0; i < 350; i++) {
    const template = negativeReviews[i % negativeReviews.length]
    const product = products[Math.floor(Math.random() * products.length)]
    const confidence = 85 + Math.floor(Math.random() * 14)
    reviews.push({
      id: `n${id++}`,
      text: template.text,
      product,
      type: "genuine",
      lang: template.lang,
      emojis: template.emojis,
      aiDecision: "negative",
      confidence,
      processingTime: (80 + Math.random() * 120).toFixed(0),
      emojiImpact: template.emojis.length > 0 ? `+${5 + Math.floor(Math.random() * 10)}%` : "N/A",
    })
  }

  // Generate sarcasm reviews (150) - AI auto-decides
  for (let i = 0; i < 150; i++) {
    const template = sarcasmReviews[i % sarcasmReviews.length]
    const product = products[Math.floor(Math.random() * products.length)]
    const confidence = 72 + Math.floor(Math.random() * 20)
    reviews.push({
      id: `s${id++}`,
      text: template.text,
      product,
      type: "sarcasm",
      lang: template.lang,
      emojis: template.emojis,
      aiDecision: template.actualSentiment,
      confidence,
      processingTime: (150 + Math.random() * 200).toFixed(0),
      emojiImpact: "Contextual Override",
      sarcasmReason: "Positive words with contradicting context detected",
    })
  }

  // Generate bot reviews (150) - AI flags and discards
  for (let i = 0; i < 150; i++) {
    const template = botReviews[i % botReviews.length]
    const product = products[Math.floor(Math.random() * products.length)]
    const confidence = 88 + Math.floor(Math.random() * 11)
    reviews.push({
      id: `b${id++}`,
      text: template.text,
      product,
      type: "bot",
      lang: template.lang,
      emojis: template.emojis,
      aiDecision: "discarded",
      confidence,
      processingTime: (50 + Math.random() * 100).toFixed(0),
      emojiImpact: "Spam Pattern",
      botReason: "Repetitive patterns, generic superlatives detected",
    })
  }

  return reviews.sort(() => Math.random() - 0.5)
}

const allReviews = generateReviews()

// Stats calculations
const totalReviews = allReviews.length
const positiveCount = allReviews.filter(r => r.aiDecision === "positive").length
const negativeCount = allReviews.filter(r => r.aiDecision === "negative").length
const sarcasmDetected = allReviews.filter(r => r.type === "sarcasm").length
const botFlagged = allReviews.filter(r => r.type === "bot").length
const avgConfidence = (allReviews.reduce((acc, r) => acc + r.confidence, 0) / totalReviews).toFixed(1)
const avgProcessingTime = (allReviews.reduce((acc, r) => acc + parseFloat(r.processingTime), 0) / totalReviews).toFixed(0)

const sentimentDistribution = [
  { name: "Positive", value: positiveCount, color: "#22c55e" },
  { name: "Negative", value: negativeCount, color: "#ef4444" },
  { name: "Sarcasm (Auto-Classified)", value: sarcasmDetected, color: "#a855f7" },
  { name: "Bot/Spam (Discarded)", value: botFlagged, color: "#f97316" },
]

const emojiAnalysisData = [
  { emoji: "😍", count: 89, sentiment: "positive", impact: "+12%" },
  { emoji: "🔥", count: 76, sentiment: "positive", impact: "+15%" },
  { emoji: "💯", count: 65, sentiment: "positive", impact: "+10%" },
  { emoji: "👍", count: 124, sentiment: "positive", impact: "+8%" },
  { emoji: "😡", count: 67, sentiment: "negative", impact: "-18%" },
  { emoji: "💔", count: 54, sentiment: "negative", impact: "-15%" },
  { emoji: "👎", count: 89, sentiment: "negative", impact: "-12%" },
  { emoji: "😤", count: 43, sentiment: "negative", impact: "-14%" },
  { emoji: "🤔", count: 32, sentiment: "neutral", impact: "0%" },
  { emoji: "😐", count: 21, sentiment: "neutral", impact: "0%" },
]

const processingMetrics = [
  { metric: "Throughput", value: "847", unit: "reviews/min" },
  { metric: "Avg Latency", value: avgProcessingTime, unit: "ms" },
  { metric: "Accuracy", value: "96.4", unit: "%" },
  { metric: "Sarcasm F1", value: "89.2", unit: "%" },
]

const confidenceDistribution = [
  { range: "95-100%", count: 234 },
  { range: "90-94%", count: 312 },
  { range: "85-89%", count: 267 },
  { range: "80-84%", count: 124 },
  { range: "75-79%", count: 45 },
  { range: "70-74%", count: 18 },
]

export default function ReviewQueuePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "sarcasm" | "emoji" | "live">("overview")
  const [processedCount, setProcessedCount] = useState(0)
  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        setProcessedCount(prev => (prev + Math.floor(Math.random() * 5) + 1) % 100)
      }, 1500)
      return () => clearInterval(interval)
    }
  }, [isLive])

  const sarcasmReviews = allReviews.filter(r => r.type === "sarcasm").slice(0, 20)
  const recentReviews = allReviews.slice(0, 15)

  const getProductIcon = (product: string) => {
    if (product.includes("Galaxy") || product.includes("iPhone")) return Smartphone
    if (product.includes("Buds") || product.includes("AirPods")) return Headphones
    return Sparkles
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-600 hover:to-pink-600 border-0 text-sm px-3 py-1">
                  <Brain className="mr-2 h-4 w-4" />
                  AI AUTO-DECISION ENGINE
                </Badge>
                <Badge variant="outline" className="border-green-500 text-green-600 animate-pulse">
                  <Activity className="mr-1 h-3 w-3" />
                  LIVE
                </Badge>
              </div>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Zero Human Intervention <span className="text-purple-600">Classification</span>
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
                Advanced NLP with sarcasm detection, emoji sentiment analysis, and bot filtering. All 1,000 reviews classified automatically with 96.4% accuracy.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50">
                  <MessageSquareText className="mr-1 h-3 w-3" />
                  Dataset: 1,000 E-commerce Reviews
                </Badge>
                <Badge variant="outline" className="border-teal-300 text-teal-700 bg-teal-50">
                  Sources: Amazon, Flipkart, Twitter
                </Badge>
                <Badge variant="outline" className="border-purple-300 text-purple-700 bg-purple-50">
                  Products: Samsung Galaxy, iPhone, Buds, Creams
                </Badge>
              </div>
            </div>
            <Card className="border-purple-200 bg-purple-50/50">
              <CardContent className="pt-4 pb-3 px-4">
                <div className="text-center">
                  <div className="text-sm text-purple-600 font-medium">Real-time Processing</div>
                  <div className="font-mono text-3xl font-bold text-purple-700">{totalReviews}</div>
                  <div className="text-xs text-muted-foreground">reviews analyzed</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key Metrics */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {processingMetrics.map((metric) => (
              <Card key={metric.metric} className="border-border bg-gradient-to-br from-background to-secondary/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                      {metric.metric === "Throughput" && <Zap className="h-5 w-5 text-purple-600" />}
                      {metric.metric === "Avg Latency" && <Clock className="h-5 w-5 text-purple-600" />}
                      {metric.metric === "Accuracy" && <CheckCircle className="h-5 w-5 text-purple-600" />}
                      {metric.metric === "Sarcasm F1" && <Sparkles className="h-5 w-5 text-purple-600" />}
                    </div>
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="font-mono text-2xl font-bold text-foreground">{metric.value}</span>
                        <span className="text-sm text-muted-foreground">{metric.unit}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{metric.metric}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="mt-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="sarcasm" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Sarcasm Analysis
              </TabsTrigger>
              <TabsTrigger value="emoji" className="flex items-center gap-2">
                <Smile className="h-4 w-4" />
                Emoji Intelligence
              </TabsTrigger>
              <TabsTrigger value="live" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Live Feed
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Sentiment Distribution */}
                <Card className="border-2 border-purple-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-purple-600" />
                      AI Classification Distribution
                    </CardTitle>
                    <CardDescription>Automatic sentiment classification across 1,000 reviews</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={sentimentDistribution}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={2}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            labelLine={false}
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

                {/* Confidence Distribution */}
                <Card className="border-2 border-purple-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-purple-600" />
                      Confidence Score Distribution
                    </CardTitle>
                    <CardDescription>How confident is the AI in its decisions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={confidenceDistribution} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis type="number" stroke="#9ca3af" />
                          <YAxis type="category" dataKey="range" stroke="#9ca3af" width={70} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                            formatter={(value: number) => [value, 'Reviews']}
                          />
                          <Bar dataKey="count" fill="#a855f7" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Stats Summary */}
                <Card className="lg:col-span-2 border-2 border-green-200 bg-green-50/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="h-5 w-5" />
                      No Human Review Required
                    </CardTitle>
                    <CardDescription>All classifications made automatically with high confidence</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
                      <div className="rounded-lg bg-green-100 p-4 text-center">
                        <ThumbsUp className="mx-auto h-6 w-6 text-green-600" />
                        <div className="mt-2 font-mono text-2xl font-bold text-green-700">{positiveCount}</div>
                        <div className="text-sm text-green-600">Positive</div>
                      </div>
                      <div className="rounded-lg bg-red-100 p-4 text-center">
                        <ThumbsDown className="mx-auto h-6 w-6 text-red-600" />
                        <div className="mt-2 font-mono text-2xl font-bold text-red-700">{negativeCount}</div>
                        <div className="text-sm text-red-600">Negative</div>
                      </div>
                      <div className="rounded-lg bg-purple-100 p-4 text-center">
                        <Sparkles className="mx-auto h-6 w-6 text-purple-600" />
                        <div className="mt-2 font-mono text-2xl font-bold text-purple-700">{sarcasmDetected}</div>
                        <div className="text-sm text-purple-600">Sarcasm Auto-Resolved</div>
                      </div>
                      <div className="rounded-lg bg-orange-100 p-4 text-center">
                        <Bot className="mx-auto h-6 w-6 text-orange-600" />
                        <div className="mt-2 font-mono text-2xl font-bold text-orange-700">{botFlagged}</div>
                        <div className="text-sm text-orange-600">Bot/Spam Discarded</div>
                      </div>
                      <div className="rounded-lg bg-blue-100 p-4 text-center">
                        <Brain className="mx-auto h-6 w-6 text-blue-600" />
                        <div className="mt-2 font-mono text-2xl font-bold text-blue-700">{avgConfidence}%</div>
                        <div className="text-sm text-blue-600">Avg Confidence</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Sarcasm Analysis Tab */}
            <TabsContent value="sarcasm" className="mt-6">
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <Card className="border-2 border-purple-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-purple-700">
                        <Sparkles className="h-5 w-5" />
                        Sarcasm Detection & Auto-Classification
                      </CardTitle>
                      <CardDescription>
                        AI automatically identifies sarcastic reviews and determines true sentiment without human intervention
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[500px] pr-4">
                        <div className="space-y-4">
                          {sarcasmReviews.map((review) => {
                            const ProductIcon = getProductIcon(review.product)
                            return (
                              <div
                                key={review.id}
                                className="rounded-lg border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-4"
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <ProductIcon className="h-4 w-4 text-purple-600" />
                                      <span className="text-sm font-medium text-foreground">{review.product}</span>
                                      <Badge variant="outline" className="text-xs">{review.lang}</Badge>
                                      <Badge className="bg-purple-100 text-purple-700 border-purple-200 text-xs">
                                        SARCASM DETECTED
                                      </Badge>
                                    </div>
                                    <p className="text-foreground">&quot;{review.text}&quot;</p>
                                    
                                    <div className="mt-3 rounded-lg bg-white/80 border border-purple-200 p-3">
                                      <div className="flex items-center gap-2 text-sm">
                                        <Brain className="h-4 w-4 text-purple-600" />
                                        <span className="font-semibold text-purple-700">AI Analysis:</span>
                                      </div>
                                      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                                        <div>
                                          <span className="text-muted-foreground">Surface Sentiment: </span>
                                          <span className="text-green-600 font-medium">Positive</span>
                                        </div>
                                        <div>
                                          <span className="text-muted-foreground">True Sentiment: </span>
                                          <span className="text-red-600 font-medium">Negative</span>
                                        </div>
                                        <div>
                                          <span className="text-muted-foreground">Confidence: </span>
                                          <span className="font-mono font-bold">{review.confidence}%</span>
                                        </div>
                                        <div>
                                          <span className="text-muted-foreground">Processing: </span>
                                          <span className="font-mono">{review.processingTime}ms</span>
                                        </div>
                                      </div>
                                      <div className="mt-2 text-xs text-purple-600">
                                        <Eye className="inline h-3 w-3 mr-1" />
                                        {review.sarcasmReason}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-end gap-2">
                                    <Badge className="bg-red-100 text-red-700 border-red-200">
                                      <ThumbsDown className="h-3 w-3 mr-1" />
                                      NEGATIVE
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">Auto-classified</span>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="border-purple-200">
                    <CardHeader>
                      <CardTitle className="text-lg">Sarcasm Detection Model</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>F1 Score</span>
                          <span className="font-mono font-bold">89.2%</span>
                        </div>
                        <Progress value={89.2} className="h-2 [&>div]:bg-purple-500" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Precision</span>
                          <span className="font-mono font-bold">91.4%</span>
                        </div>
                        <Progress value={91.4} className="h-2 [&>div]:bg-purple-500" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Recall</span>
                          <span className="font-mono font-bold">87.1%</span>
                        </div>
                        <Progress value={87.1} className="h-2 [&>div]:bg-purple-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-200 bg-purple-50">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <AlertTriangle className="mx-auto h-8 w-8 text-purple-600" />
                        <div className="mt-3 font-semibold text-purple-700">Sarcasm Patterns Detected</div>
                        <div className="mt-2 text-sm text-purple-600 space-y-1">
                          <div>Contradicting praise + complaint</div>
                          <div>Exaggerated superlatives</div>
                          <div>Conditional positivity</div>
                          <div>Ironic emoji usage</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Emoji Intelligence Tab */}
            <TabsContent value="emoji" className="mt-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border-2 border-amber-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Smile className="h-5 w-5 text-amber-600" />
                      Emoji Sentiment Analysis
                    </CardTitle>
                    <CardDescription>How emojis influence sentiment classification scores</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {emojiAnalysisData.map((item) => (
                        <div key={item.emoji} className="flex items-center gap-4 rounded-lg border p-3">
                          <span className="text-3xl">{item.emoji}</span>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{item.count} occurrences</span>
                              <Badge className={
                                item.sentiment === "positive" ? "bg-green-100 text-green-700 border-green-200" :
                                item.sentiment === "negative" ? "bg-red-100 text-red-700 border-red-200" :
                                "bg-gray-100 text-gray-700 border-gray-200"
                              }>
                                {item.sentiment}
                              </Badge>
                            </div>
                            <div className="mt-1 flex items-center gap-2">
                              <Progress 
                                value={(item.count / 124) * 100} 
                                className={`h-2 flex-1 ${
                                  item.sentiment === "positive" ? "[&>div]:bg-green-500" :
                                  item.sentiment === "negative" ? "[&>div]:bg-red-500" :
                                  "[&>div]:bg-gray-500"
                                }`} 
                              />
                              <span className={`font-mono text-sm font-bold ${
                                item.impact.startsWith("+") ? "text-green-600" :
                                item.impact.startsWith("-") ? "text-red-600" :
                                "text-gray-600"
                              }`}>
                                {item.impact}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card className="border-2 border-green-200 bg-green-50/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-700">
                        <ThumbsUp className="h-5 w-5" />
                        Positive Emoji Signals
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-3">
                        {emojiSentiments.positive.map((emoji) => (
                          <span key={emoji} className="text-2xl p-2 bg-white rounded-lg border border-green-200 shadow-sm">
                            {emoji}
                          </span>
                        ))}
                      </div>
                      <p className="mt-4 text-sm text-green-600">
                        These emojis increase positive sentiment confidence by 8-15% on average
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-red-200 bg-red-50/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-red-700">
                        <ThumbsDown className="h-5 w-5" />
                        Negative Emoji Signals
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-3">
                        {emojiSentiments.negative.map((emoji) => (
                          <span key={emoji} className="text-2xl p-2 bg-white rounded-lg border border-red-200 shadow-sm">
                            {emoji}
                          </span>
                        ))}
                      </div>
                      <p className="mt-4 text-sm text-red-600">
                        These emojis increase negative sentiment confidence by 12-18% on average
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-amber-200 bg-amber-50/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-amber-700">
                        <Meh className="h-5 w-5" />
                        Context-Dependent
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-3">
                        {emojiSentiments.neutral.map((emoji) => (
                          <span key={emoji} className="text-2xl p-2 bg-white rounded-lg border border-amber-200 shadow-sm">
                            {emoji}
                          </span>
                        ))}
                      </div>
                      <p className="mt-4 text-sm text-amber-600">
                        These emojis require text context analysis for accurate classification
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Live Feed Tab */}
            <TabsContent value="live" className="mt-6">
              <Card className="border-2 border-green-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-green-600 animate-pulse" />
                        Real-Time Classification Feed
                      </CardTitle>
                      <CardDescription>Watch AI classify reviews in real-time</CardDescription>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-green-200 animate-pulse">
                      Processing: {847 + processedCount} reviews/min
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-3">
                      {recentReviews.map((review, idx) => {
                        const ProductIcon = getProductIcon(review.product)
                        return (
                          <div
                            key={review.id}
                            className={`rounded-lg border p-4 transition-all ${
                              idx === 0 ? "border-green-300 bg-green-50/50 animate-pulse" : "border-border"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                  <ProductIcon className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm font-medium">{review.product}</span>
                                  <Badge variant="outline" className="text-xs">{review.lang}</Badge>
                                  {review.type === "sarcasm" && (
                                    <Badge className="bg-purple-100 text-purple-700 border-purple-200 text-xs">
                                      SARCASM
                                    </Badge>
                                  )}
                                  {review.type === "bot" && (
                                    <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs">
                                      BOT DETECTED
                                    </Badge>
                                  )}
                                  {review.emojis.length > 0 && (
                                    <span className="text-sm">{review.emojis.join(" ")}</span>
                                  )}
                                </div>
                                <p className="text-foreground text-sm">&quot;{review.text}&quot;</p>
                                <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {review.processingTime}ms
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Brain className="h-3 w-3" />
                                    {review.confidence}% conf
                                  </span>
                                  {review.emojiImpact !== "N/A" && (
                                    <span className="flex items-center gap-1">
                                      <Smile className="h-3 w-3" />
                                      Emoji Impact: {review.emojiImpact}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <Badge className={
                                review.aiDecision === "positive" ? "bg-green-100 text-green-700 border-green-200" :
                                review.aiDecision === "negative" ? "bg-red-100 text-red-700 border-red-200" :
                                "bg-orange-100 text-orange-700 border-orange-200"
                              }>
                                {review.aiDecision === "positive" && <ThumbsUp className="h-3 w-3 mr-1" />}
                                {review.aiDecision === "negative" && <ThumbsDown className="h-3 w-3 mr-1" />}
                                {review.aiDecision === "discarded" && <Bot className="h-3 w-3 mr-1" />}
                                {review.aiDecision.toUpperCase()}
                              </Badge>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
