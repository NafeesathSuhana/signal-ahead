import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowRight, Zap, Microscope, Radar, Languages, Sparkles, Bot, Shield, BarChart3, Brain, Smile, Eye, Activity, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const stats = [
  { value: "1,000", label: "Reviews Analyzed" },
  { value: "96.4%", label: "AI Accuracy" },
  { value: "150", label: "Sarcasm Auto-Resolved" },
  { value: "847/min", label: "Processing Speed" },
]

const engines = [
  {
    name: "Velocity Engine",
    description: "Predicts complaint spikes before they peak. Get alerts before issues go viral across all your product categories.",
    icon: Zap,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    href: "/velocity",
  },
  {
    name: "Autopsy Engine",
    description: "Explains probable root causes with clustering and co-occurrence analysis. Know exactly who to escalate to.",
    icon: Microscope,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    href: "/autopsy",
  },
  {
    name: "Radar Engine",
    description: "Samsung vs iPhone deep analysis with detailed recommendations on how to outperform competitors.",
    icon: Radar,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    href: "/radar",
  },
  {
    name: "AI Auto-Decision Engine",
    description: "Zero human intervention classification. Sarcasm detection, emoji analysis, and bot filtering with 96.4% accuracy.",
    icon: Brain,
    color: "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600",
    bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
    borderColor: "border-purple-200",
    href: "/review-queue",
  },
]

const pipelineFeatures = [
  {
    icon: Languages,
    title: "Multilingual Support",
    description: "Process English and Hindi reviews with automatic language detection and translation"
  },
  {
    icon: Sparkles,
    title: "Sarcasm Detection",
    description: "AI automatically identifies sarcastic reviews and determines true sentiment with 89.2% F1 score"
  },
  {
    icon: Bot,
    title: "Bot/Spam Filtering",
    description: "Detect and discard 150 fake reviews using pattern analysis and timing anomalies"
  },
  {
    icon: BarChart3,
    title: "Confidence Scoring",
    description: "Every sentiment prediction comes with a confidence score for transparent decision-making"
  },
  {
    icon: Shield,
    title: "Feature-Level Analysis",
    description: "Extract sentiment for specific features like battery, camera, packaging with per-feature scores"
  },
  {
    icon: Smile,
    title: "Emoji Intelligence",
    description: "Advanced emoji sentiment analysis showing how emojis impact classification by 5-18%"
  },
]

const advancedFeatures = [
  {
    icon: Eye,
    title: "Zero Human Intervention",
    description: "All 1,000 reviews classified automatically without manual review queues"
  },
  {
    icon: Activity,
    title: "Real-Time Processing",
    description: "847 reviews per minute with 127ms average latency and 99.9% uptime"
  },
  {
    icon: Target,
    title: "Competitive Intelligence",
    description: "Samsung vs iPhone comparison with 12 actionable AI-generated recommendations"
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 sm:py-28 gradient-hero">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200">
                AI-Powered Review Intelligence Platform | Zero Human Intervention
              </Badge>
              
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Turn Customer Reviews Into
                <br />
                <span className="text-orange-500">Actionable Intelligence</span>
              </h1>
              
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
                {"Advanced NLP with sarcasm detection, emoji sentiment analysis, and competitor intelligence. All 1,000 reviews classified automatically with 96.4% accuracy."}
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-6">
                  <Link href="/dashboard">
                    Open War Room Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-6 border-purple-300 hover:bg-purple-50">
                  <Link href="/review-queue">
                    <Brain className="mr-2 h-4 w-4" />
                    AI Auto-Decision Engine
                  </Link>
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border bg-card p-6 text-center shadow-sm"
                >
                  <div className="font-mono text-3xl font-bold text-orange-500">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Engine Cards */}
        <section id="features" className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Intelligence Engines
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Each engine serves a distinct purpose in transforming raw reviews into strategic insights.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {engines.map((engine) => (
                <Link key={engine.name} href={engine.href}>
                  <Card className={`group h-full cursor-pointer border-2 ${engine.borderColor} transition-all hover:shadow-lg hover:-translate-y-1`}>
                    <CardHeader>
                      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${engine.bgColor}`}>
                        <engine.icon className={`h-6 w-6 ${engine.color}`} />
                      </div>
                      <CardTitle className={`text-lg ${engine.color}`}>
                        {engine.name}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground leading-relaxed text-sm">
                        {engine.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className={`flex items-center text-sm font-medium ${engine.color}`}>
                        Explore
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Advanced AI Features */}
        <section className="py-16 bg-gradient-to-br from-purple-50 via-white to-pink-50 border-y border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
                NEW
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Advanced AI Capabilities
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Enterprise-grade features for high-end real-time sentiment analysis.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {advancedFeatures.map((feature) => (
                <Card key={feature.title} className="bg-white border-2 border-purple-100 shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{feature.title}</h3>
                        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* NLP Pipeline Features */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Advanced NLP Pipeline
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Every review goes through a sophisticated preprocessing pipeline before analysis.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pipelineFeatures.map((feature) => (
                <Card key={feature.title} className="bg-card">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50">
                        <feature.icon className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{feature.title}</h3>
                        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Samsung vs iPhone CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-gray-50 border-y border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Samsung vs iPhone Deep Analysis
                </h2>
                <p className="mt-2 text-muted-foreground max-w-xl">
                  Feature-by-feature comparison with 12 AI-generated recommendations on how to outperform your competition.
                </p>
              </div>
              <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8 shrink-0">
                <Link href="/radar">
                  <Radar className="mr-2 h-4 w-4" />
                  View Radar Analysis
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 via-white to-purple-50 p-10 text-center shadow-sm sm:p-14">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Ready to See It in Action?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Explore the War Room Dashboard with real analysis from 1,000 reviews comparing Samsung vs iPhone with zero human intervention.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8">
                  <Link href="/dashboard">
                    Enter War Room
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-8">
                  <Link href="/review-queue">
                    See AI in Action
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
