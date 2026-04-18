"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Microscope, Calendar, MessageSquare, User, CheckCircle, Languages, Sparkles, Smartphone, Headphones } from "lucide-react"

const productData = {
  smartphone: {
    name: "Smartphone",
    icon: Smartphone,
    feature: "Packaging",
    dateCluster: "Jan 14 – Apr 9, 2026",
    complaintCount: 26,
    confidence: 84,
    coOccurringTerms: ["courier", "rain", "crushed", "seal", "wet", "dented", "outside", "taped"],
    probableCause: "Transit moisture damage during last-mile courier handling. Not a manufacturing or QC defect.",
    escalateTo: "Courier Partner — NOT QC Team",
    action: "Review courier SLA, add weatherproof outer packaging, file damage claim with logistics partner.",
    sampleComplaints: [
      { date: "Feb 14, 2026", text: "outer packaging torn, courier bag ripped", lang: "EN", confidence: 92 },
      { date: "Mar 2, 2026", text: "fragile sticker but box still crushed", lang: "EN", confidence: 88 },
      { date: "Mar 28, 2026", text: "opened seal + dented box", lang: "EN", confidence: 95 },
    ],
    multilingualExamples: [
      { original: "Product bahut acha hai lekin packaging kharab thi", translated: "Product is very good but packaging was bad", lang: "HI", sentiment: "Mixed" },
      { original: "Delivery mein box damage ho gaya", translated: "Box got damaged in delivery", lang: "HI", sentiment: "Negative" },
    ],
    sarcasmCount: 3,
  },
  headphones: {
    name: "Headphones",
    icon: Headphones,
    feature: "Build Quality",
    dateCluster: "Feb 1 – Apr 15, 2026",
    complaintCount: 14,
    confidence: 79,
    coOccurringTerms: ["plastic", "cheap", "crack", "hinge", "flimsy", "break", "month", "fragile"],
    probableCause: "Substandard plastic material in hinge mechanism causing premature failure after 3-4 months of use.",
    escalateTo: "Manufacturing QC Team — Material Sourcing",
    action: "Audit hinge supplier, test alternative ABS plastic grades, extend warranty for affected batch.",
    sampleComplaints: [
      { date: "Feb 20, 2026", text: "headband cracked after 2 months", lang: "EN", confidence: 91 },
      { date: "Mar 8, 2026", text: "plastic feels cheap, already cracking", lang: "EN", confidence: 85 },
      { date: "Apr 1, 2026", text: "hinge broke, very disappointed", lang: "EN", confidence: 93 },
    ],
    multilingualExamples: [
      { original: "Ek mahine mein toot gaya", translated: "Broke in one month", lang: "HI", sentiment: "Negative" },
    ],
    sarcasmCount: 2,
  },
  facecream: {
    name: "Face Cream",
    icon: Sparkles,
    feature: "Expiry & Freshness",
    dateCluster: "Mar 1 – Apr 10, 2026",
    complaintCount: 8,
    confidence: 72,
    coOccurringTerms: ["expiry", "old", "smell", "changed", "color", "batch", "warehouse", "date"],
    probableCause: "Old inventory rotation issue. Some units shipped close to expiry date with changed consistency.",
    escalateTo: "Warehouse Operations — Inventory Management",
    action: "Implement FIFO strictly, add expiry alerts for stock older than 6 months, recall affected batch.",
    sampleComplaints: [
      { date: "Mar 5, 2026", text: "received product expiring in 2 months", lang: "EN", confidence: 88 },
      { date: "Mar 22, 2026", text: "cream smells different, color changed", lang: "EN", confidence: 82 },
      { date: "Apr 8, 2026", text: "too close to expiry date", lang: "EN", confidence: 90 },
    ],
    multilingualExamples: [
      { original: "Purana stock bhej diya", translated: "Sent old stock", lang: "HI", sentiment: "Negative" },
    ],
    sarcasmCount: 1,
  },
}

type ProductKey = keyof typeof productData

export default function AutopsyPage() {
  const [activeProduct, setActiveProduct] = useState<ProductKey>("smartphone")
  const product = productData[activeProduct]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div>
            <Badge className="bg-purple-100 text-purple-600 hover:bg-purple-100 border-purple-200 text-sm px-3 py-1">
              <Microscope className="mr-2 h-4 w-4" />
              AUTOPSY ENGINE
            </Badge>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Explains the <span className="text-purple-600">Probable Root Cause</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              {"Doesn't just say complaints rose. Tells you why — and exactly who to call."}
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
                {/* Root Cause Card */}
                <Card className="border-2 border-purple-200 shadow-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <CardTitle className="text-xl text-purple-700">
                        ROOT CAUSE — {p.feature.toUpperCase()} / {p.name.toUpperCase()}
                      </CardTitle>
                      <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                        {p.confidence}% Confidence
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Meta Info */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex items-center gap-3 rounded-lg bg-purple-50 p-4 border border-purple-100">
                        <Calendar className="h-5 w-5 text-purple-600" />
                        <div>
                          <div className="text-sm text-muted-foreground">Date Cluster</div>
                          <div className="font-semibold text-foreground">{p.dateCluster}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 rounded-lg bg-purple-50 p-4 border border-purple-100">
                        <MessageSquare className="h-5 w-5 text-purple-600" />
                        <div>
                          <div className="text-sm text-muted-foreground">Complaint Count</div>
                          <div className="font-semibold text-foreground">{p.complaintCount} reviews</div>
                        </div>
                      </div>
                    </div>

                    {/* Co-occurring Terms */}
                    <div>
                      <h4 className="mb-3 text-sm font-medium text-muted-foreground">Co-occurring Terms</h4>
                      <div className="flex flex-wrap gap-2">
                        {p.coOccurringTerms.map((term) => (
                          <Badge key={term} className="bg-purple-100 text-purple-700 border-purple-200 font-mono">
                            {term}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Probable Cause */}
                    <div className="rounded-lg border-2 border-purple-200 bg-purple-50 p-4">
                      <h4 className="mb-2 font-semibold text-purple-700">Probable Cause</h4>
                      <p className="text-foreground">{p.probableCause}</p>
                    </div>

                    {/* Escalate To */}
                    <div className="flex items-center gap-4 rounded-lg border-2 border-purple-300 bg-purple-100 p-4">
                      <User className="h-8 w-8 text-purple-700" />
                      <div>
                        <div className="text-sm text-purple-600">Escalate To</div>
                        <div className="text-xl font-bold text-purple-800">{p.escalateTo}</div>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="rounded-lg bg-secondary p-4">
                      <h4 className="mb-2 flex items-center gap-2 font-semibold text-foreground">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Recommended Action
                      </h4>
                      <p className="text-muted-foreground">{p.action}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Sample Complaints */}
                <div className="mt-8">
                  <h2 className="mb-4 text-xl font-bold tracking-tight text-foreground">
                    Sample Complaints with Confidence Scores
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {p.sampleComplaints.map((complaint, i) => (
                      <Card key={i} className="border-purple-100">
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-purple-600">{complaint.date}</span>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">{complaint.lang}</Badge>
                              <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                                {complaint.confidence}%
                              </Badge>
                            </div>
                          </div>
                          <p className="italic text-muted-foreground">&quot;{complaint.text}&quot;</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Multilingual Support */}
                <Card className="mt-8 border-blue-200 bg-blue-50/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-700">
                      <Languages className="h-5 w-5" />
                      Multilingual Review Processing
                    </CardTitle>
                    <CardDescription>Hindi reviews automatically detected and translated</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {p.multilingualExamples.map((example, i) => (
                      <div key={i} className="rounded-lg bg-white border border-blue-100 p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-blue-100 text-blue-700 border-blue-200">{example.lang}</Badge>
                          <Badge variant={example.sentiment === "Negative" ? "destructive" : "secondary"} className="text-xs">
                            {example.sentiment}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground italic">&quot;{example.original}&quot;</p>
                        <p className="text-sm text-foreground mt-1">&rarr; {example.translated}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Sarcasm Detection */}
                <Card className="mt-6 border-amber-200 bg-amber-50">
                  <CardContent className="flex items-start gap-4 pt-6">
                    <Sparkles className="h-6 w-6 shrink-0 text-amber-600" />
                    <div>
                      <h3 className="font-semibold text-amber-700">Sarcasm Detection Active</h3>
                      <p className="mt-1 text-amber-800/80">
                        {p.sarcasmCount} sarcastic reviews detected for {p.name} and auto-classified by our AI Engine.
                        True sentiment determined with 89.2% F1 score accuracy.
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
