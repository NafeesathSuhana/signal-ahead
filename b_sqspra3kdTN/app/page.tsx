import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowRight, Zap, Microscope, Radar, Languages, Sparkles, Bot, Shield, BarChart3, ClipboardCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const stats = [
  { value: "210", label: "Reviews Analyzed" },
  { value: "3", label: "Product Categories" },
  { value: "14", label: "Bot Reviews Flagged" },
  { value: "6", label: "Sarcasm Queued" },
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
    description: "Compares your data against competitors to separate internal issues from industry-wide trends.",
    icon: Radar,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    href: "/radar",
  },
  {
    name: "Human Review Queue",
    description: "Review sarcastic and bot-flagged reviews manually. Assign to positive, negative, or ambiguous bins.",
    icon: ClipboardCheck,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
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
    description: "Identify sarcastic reviews and route them to human review queue instead of forcing classification"
  },
  {
    icon: Bot,
    title: "Bot/Spam Filtering",
    description: "Detect and flag fake reviews using pattern analysis and timing anomalies"
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
              <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium">
                AI-Powered Review Intelligence Platform
              </Badge>
              
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Turn Customer Reviews Into
                <br />
                <span className="text-orange-500">Actionable Intelligence</span>
              </h1>
              
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
                {"Don't just read reviews. Predict what's about to break, understand why it happened, and know if it's your problem or the industry's."}
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-6">
                  <Link href="/dashboard">
                    Open War Room Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-6">
                  <Link href="/review-queue">
                    Human Review Queue
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
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* NLP Pipeline Features */}
        <section className="border-y border-border bg-secondary/30 py-20">
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

        {/* CTA Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 via-white to-purple-50 p-10 text-center shadow-sm sm:p-14">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Ready to See It in Action?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Explore the War Room Dashboard with real analysis from 210 reviews across 3 product categories.
              </p>
              <div className="mt-8">
                <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8">
                  <Link href="/dashboard">
                    Enter War Room
                    <ArrowRight className="ml-2 h-4 w-4" />
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
