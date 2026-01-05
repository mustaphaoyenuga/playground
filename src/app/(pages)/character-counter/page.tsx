"use client"

import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import Logo from "./components/Logo";
import StatCard from "./components/StatCard";
import { Progress } from "@/components/ui/progress";

const stats = [
  {
    count: "230",
    label: "Total Characters",
    className: "bg-purple-400"
  },
  {
    count: "99",
    label: "Word Count",
    className: "bg-orange-400/90"
  },
  {
    count: "00",
    label: "Sentence Count",
    className: "bg-red-400/90"
  },
]

export default function CharacterCounter() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground">
        <header className="flex items-center justify-between max-w-5xl mx-auto">
          <Logo />
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="cursor-pointer">{isDarkMode ? <Moon /> : <Sun />}</button>
        </header>
        <main className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold max-w-2xl text-center mx-auto">Analyze your text in real-time</h1>
          <section className="space-y-4">
            <textarea className="w-full h-48 rounded-lg bg-muted p-2 resize-none"></textarea>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <input type="checkbox" />
                <span className="text-sm">Exclude spaces</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" />
                <span className="text-sm">Set character limit</span>
              </div>
              <div className="ml-auto">
                Approx. reading time: <span>0</span>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            {stats.map((stat) => (
              <StatCard key={stat.label} count={stat.count} label={stat.label} className={stat.className} />
            ))}
          </section>

          <section>
            <h2>Letter Density</h2>
            <div className="flex items-center gap-4">
              <span>E</span>
              <Progress value={16.06} className="flex-1" />
              <span>40 (16.06%)</span>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}