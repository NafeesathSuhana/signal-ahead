"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClipboardCheck, Sparkles, Bot, ThumbsUp, ThumbsDown, HelpCircle, CheckCircle, AlertTriangle, Smartphone, Headphones } from "lucide-react"

type ReviewStatus = "pending" | "positive" | "negative" | "ambiguous"

interface Review {
  id: string
  text: string
  product: string
  type: "sarcasm" | "bot"
  lang: string
  date: string
  status: ReviewStatus
  reason: string
}

const initialReviews: Review[] = [
  // Sarcasm Reviews
  { id: "s1", text: "Oh great, another broken package, just what I wanted for my birthday!", product: "Smartphone", type: "sarcasm", lang: "EN", date: "Apr 2, 2026", status: "pending", reason: "Positive words with negative context" },
  { id: "s2", text: "Wow, such amazing build quality, broke in just 2 days! New record!", product: "Headphones", type: "sarcasm", lang: "EN", date: "Apr 5, 2026", status: "pending", reason: "Exaggerated praise contradicting complaint" },
  { id: "s3", text: "Best expiry date ever - only 1 month left! Thanks for the fresh product!", product: "Face Cream", type: "sarcasm", lang: "EN", date: "Apr 8, 2026", status: "pending", reason: "Thanks paired with complaint" },
  { id: "s4", text: "Love how the box arrived crushed, very premium experience", product: "Smartphone", type: "sarcasm", lang: "EN", date: "Apr 10, 2026", status: "pending", reason: "Premium contradicts damage" },
  { id: "s5", text: "Waah kya cream hai, 3 din mein khatam ho gayi smell", product: "Face Cream", type: "sarcasm", lang: "HI", date: "Apr 12, 2026", status: "pending", reason: "Hindi sarcasm detected" },
  { id: "s6", text: "Battery lasts forever... if you turn off the phone", product: "Smartphone", type: "sarcasm", lang: "EN", date: "Apr 14, 2026", status: "pending", reason: "Conditional praise" },
  // Bot Reviews
  { id: "b1", text: "Great product great quality great service great everything", product: "Smartphone", type: "bot", lang: "EN", date: "Apr 1, 2026", status: "pending", reason: "Repetitive pattern" },
  { id: "b2", text: "Best product ever bought must buy highly recommended 5 stars", product: "Headphones", type: "bot", lang: "EN", date: "Apr 1, 2026", status: "pending", reason: "Generic superlatives" },
  { id: "b3", text: "Product is good. Delivery is good. Packaging is good. Price is good.", product: "Face Cream", type: "bot", lang: "EN", date: "Apr 3, 2026", status: "pending", reason: "Robotic sentence structure" },
  { id: "b4", text: "Nice nice nice nice nice product nice nice", product: "Smartphone", type: "bot", lang: "EN", date: "Apr 3, 2026", status: "pending", reason: "Word repetition" },
  { id: "b5", text: "I love this product so much I bought 10 more same day amazing", product: "Headphones", type: "bot", lang: "EN", date: "Apr 4, 2026", status: "pending", reason: "Unrealistic claim" },
  { id: "b6", text: "Worst product ever dont buy waste of money scam fraud", product: "Smartphone", type: "bot", lang: "EN", date: "Apr 4, 2026", status: "pending", reason: "Generic negative spam" },
  { id: "b7", text: "Perfect perfect perfect perfect perfect", product: "Face Cream", type: "bot", lang: "EN", date: "Apr 5, 2026", status: "pending", reason: "Single word repetition" },
  { id: "b8", text: "Bahut badiya maal hai ekdum first class quality best best", product: "Headphones", type: "bot", lang: "HI", date: "Apr 6, 2026", status: "pending", reason: "Hindi repetitive pattern" },
  { id: "b9", text: "Amazing experience wonderful delivery fantastic packaging", product: "Smartphone", type: "bot", lang: "EN", date: "Apr 7, 2026", status: "pending", reason: "Adjective stuffing" },
  { id: "b10", text: "Good good good value for money good good", product: "Face Cream", type: "bot", lang: "EN", date: "Apr 9, 2026", status: "pending", reason: "Keyword repetition" },
  { id: "b11", text: "Product received fast shipping great seller A+++", product: "Headphones", type: "bot", lang: "EN", date: "Apr 11, 2026", status: "pending", reason: "Generic marketplace spam" },
  { id: "b12", text: "As described works well recommended", product: "Smartphone", type: "bot", lang: "EN", date: "Apr 13, 2026", status: "pending", reason: "Minimal generic review" },
  { id: "b13", text: "Super product super quality super fast delivery super happy", product: "Face Cream", type: "bot", lang: "EN", date: "Apr 15, 2026", status: "pending", reason: "Super keyword stuffing" },
  { id: "b14", text: "Very nice product very good quality very fast shipping very happy customer", product: "Headphones", type: "bot", lang: "EN", date: "Apr 16, 2026", status: "pending", reason: "Very keyword stuffing" },
]

export default function ReviewQueuePage() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [activeTab, setActiveTab] = useState<"sarcasm" | "bot">("sarcasm")

  const updateReviewStatus = (id: string, status: ReviewStatus) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status } : r))
  }

  const sarcasmReviews = reviews.filter(r => r.type === "sarcasm")
  const botReviews = reviews.filter(r => r.type === "bot")

  const pendingSarcasm = sarcasmReviews.filter(r => r.status === "pending").length
  const pendingBot = botReviews.filter(r => r.status === "pending").length

  const getProductIcon = (product: string) => {
    if (product === "Smartphone") return Smartphone
    if (product === "Headphones") return Headphones
    return Sparkles
  }

  const stats = {
    totalPending: pendingSarcasm + pendingBot,
    sarcasmPending: pendingSarcasm,
    botPending: pendingBot,
    resolved: reviews.filter(r => r.status !== "pending").length,
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div>
            <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100 border-blue-200 text-sm px-3 py-1">
              <ClipboardCheck className="mr-2 h-4 w-4" />
              HUMAN REVIEW QUEUE
            </Badge>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Review <span className="text-blue-600">Ambiguous Cases</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Sarcastic and bot-suspected reviews are never auto-classified. Assign them to positive, negative, or ambiguous bins manually.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <div>
                    <div className="font-mono text-2xl font-bold text-amber-700">{stats.totalPending}</div>
                    <div className="text-sm text-muted-foreground">Total Pending</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-purple-200 bg-purple-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="font-mono text-2xl font-bold text-purple-700">{stats.sarcasmPending}</div>
                    <div className="text-sm text-muted-foreground">Sarcasm Pending</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Bot className="h-5 w-5 text-orange-600" />
                  <div>
                    <div className="font-mono text-2xl font-bold text-orange-700">{stats.botPending}</div>
                    <div className="text-sm text-muted-foreground">Bot Pending</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-mono text-2xl font-bold text-green-700">{stats.resolved}</div>
                    <div className="text-sm text-muted-foreground">Resolved</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "sarcasm" | "bot")} className="mt-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sarcasm" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Sarcasm Queue ({pendingSarcasm})
              </TabsTrigger>
              <TabsTrigger value="bot" className="flex items-center gap-2">
                <Bot className="h-4 w-4" />
                Bot/Spam Queue ({pendingBot})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sarcasm" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-700">
                    <Sparkles className="h-5 w-5" />
                    Sarcastic Reviews
                  </CardTitle>
                  <CardDescription>
                    These reviews contain sarcasm patterns and need human judgment to classify correctly.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sarcasmReviews.map((review) => {
                    const ProductIcon = getProductIcon(review.product)
                    return (
                      <div
                        key={review.id}
                        className={`rounded-lg border p-4 ${
                          review.status === "pending"
                            ? "border-purple-200 bg-purple-50/50"
                            : review.status === "positive"
                            ? "border-green-200 bg-green-50/50"
                            : review.status === "negative"
                            ? "border-red-200 bg-red-50/50"
                            : "border-amber-200 bg-amber-50/50"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <ProductIcon className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm font-medium text-foreground">{review.product}</span>
                              <Badge variant="outline" className="text-xs">{review.lang}</Badge>
                              <span className="text-xs text-muted-foreground">{review.date}</span>
                            </div>
                            <p className="text-foreground italic">&quot;{review.text}&quot;</p>
                            <p className="mt-2 text-sm text-muted-foreground">
                              <span className="font-medium">Detection reason:</span> {review.reason}
                            </p>
                          </div>
                          <div className="flex flex-col gap-2">
                            {review.status === "pending" ? (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-green-300 text-green-700 hover:bg-green-50"
                                  onClick={() => updateReviewStatus(review.id, "positive")}
                                >
                                  <ThumbsUp className="h-4 w-4 mr-1" />
                                  Positive
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-red-300 text-red-700 hover:bg-red-50"
                                  onClick={() => updateReviewStatus(review.id, "negative")}
                                >
                                  <ThumbsDown className="h-4 w-4 mr-1" />
                                  Negative
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-amber-300 text-amber-700 hover:bg-amber-50"
                                  onClick={() => updateReviewStatus(review.id, "ambiguous")}
                                >
                                  <HelpCircle className="h-4 w-4 mr-1" />
                                  Ambiguous
                                </Button>
                              </>
                            ) : (
                              <Badge className={
                                review.status === "positive" ? "bg-green-100 text-green-700 border-green-200" :
                                review.status === "negative" ? "bg-red-100 text-red-700 border-red-200" :
                                "bg-amber-100 text-amber-700 border-amber-200"
                              }>
                                {review.status.toUpperCase()}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bot" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-700">
                    <Bot className="h-5 w-5" />
                    Bot/Spam Suspected Reviews
                  </CardTitle>
                  <CardDescription>
                    These reviews show bot-like patterns. Approve genuine ones or confirm as spam.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {botReviews.map((review) => {
                    const ProductIcon = getProductIcon(review.product)
                    return (
                      <div
                        key={review.id}
                        className={`rounded-lg border p-4 ${
                          review.status === "pending"
                            ? "border-orange-200 bg-orange-50/50"
                            : review.status === "positive"
                            ? "border-green-200 bg-green-50/50"
                            : review.status === "negative"
                            ? "border-red-200 bg-red-50/50"
                            : "border-amber-200 bg-amber-50/50"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <ProductIcon className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm font-medium text-foreground">{review.product}</span>
                              <Badge variant="outline" className="text-xs">{review.lang}</Badge>
                              <span className="text-xs text-muted-foreground">{review.date}</span>
                            </div>
                            <p className="text-foreground italic">&quot;{review.text}&quot;</p>
                            <p className="mt-2 text-sm text-muted-foreground">
                              <span className="font-medium">Detection reason:</span> {review.reason}
                            </p>
                          </div>
                          <div className="flex flex-col gap-2">
                            {review.status === "pending" ? (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-green-300 text-green-700 hover:bg-green-50"
                                  onClick={() => updateReviewStatus(review.id, "positive")}
                                >
                                  <ThumbsUp className="h-4 w-4 mr-1" />
                                  Genuine +
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-red-300 text-red-700 hover:bg-red-50"
                                  onClick={() => updateReviewStatus(review.id, "negative")}
                                >
                                  <ThumbsDown className="h-4 w-4 mr-1" />
                                  Genuine -
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-amber-300 text-amber-700 hover:bg-amber-50"
                                  onClick={() => updateReviewStatus(review.id, "ambiguous")}
                                >
                                  <Bot className="h-4 w-4 mr-1" />
                                  Confirm Bot
                                </Button>
                              </>
                            ) : (
                              <Badge className={
                                review.status === "positive" ? "bg-green-100 text-green-700 border-green-200" :
                                review.status === "negative" ? "bg-red-100 text-red-700 border-red-200" :
                                "bg-amber-100 text-amber-700 border-amber-200"
                              }>
                                {review.status === "ambiguous" ? "CONFIRMED BOT" : review.status.toUpperCase()}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
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
