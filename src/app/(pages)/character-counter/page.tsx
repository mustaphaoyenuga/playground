"use client"

import { Info, Moon, Sun } from "lucide-react";
import { useState } from "react";
import Logo from "./components/Logo";
import StatCard from "./components/StatCard";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const calculateLetterDensity = (text: string) => {
  if (!text) return [];

  const textArray = text.replace(/\s/g, '').toUpperCase().split('');
  const charFrequency = textArray.reduce((acc, char) => {
    acc[char] = (acc[char] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(charFrequency).map(([char, count]) => ({
    char,
    count,
    percentage: ((count / textArray.length) * 100).toFixed(2)
  })) 
}

const calculateReadingTime = (wordCount: number) => {
  const timeInMinutes = wordCount / 200;
  return timeInMinutes < 1 ? "<1 minute" : `~${Math.ceil(timeInMinutes)} mins`
}


export default function CharacterCounter() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [text, setText] = useState("");
  const [excludeSpaces, setExcludeSpaces] = useState(false);
  const [limitIsActive, setLimitIsActive] = useState(false);
  const [characterLimit, setCharacterLimit] = useState(20);


  const characterCount = excludeSpaces ? text.replace(/\s/g, '').length : text.length;
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const sentenceCount = text.trim() === '' ? 0 : text.trim().split(/[!?.]+/).filter(Boolean).length;
  const readingTime = calculateReadingTime(wordCount);
  const letterDensity = calculateLetterDensity(text);
  const limitIsExceeded = limitIsActive && characterCount > characterLimit;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const handleCharacterLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharacterLimit(Number(e.target.value));
  }


  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300 p-4 md:p-6 font-sans">
        <header className="flex items-center justify-between max-w-3xl mx-auto mb-12">
          <Logo />
          <Button size="icon" variant="secondary" onClick={() => setIsDarkMode(!isDarkMode)} className="cursor-pointer">{isDarkMode ? <Moon size={20} /> : <Sun size={20} />}</Button>
        </header>
        <main className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-center mb-10">Analyze your text in real-time</h1>

          <section className="space-y-4">
            <div>
              <Textarea className={`h-48 md:h-52 bg-muted resize-none ${limitIsExceeded ? "bg-red-50 dark:bg-red-800/5 border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20" : ""}`} onChange={handleTextChange} placeholder="Start typing here...(or paste your text)" value={text} />

              <p className={`mt-4 flex items-center gap-2 text-destructive text-sm ${limitIsExceeded ? "visible" : "invisible"}`}>
                <Info size={16} />
                <span>Limit reached! Your text is {characterLimit} characters.</span>
              </p>

            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={excludeSpaces} onChange={() => setExcludeSpaces(!excludeSpaces)} />
                <span className="text-sm">Exclude spaces</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={limitIsActive} onChange={() => setLimitIsActive(!limitIsActive)} />
                <span className="text-sm">Set character limit</span>
              </div>
              {limitIsActive && <input type="number" value={characterLimit} onChange={handleCharacterLimitChange} placeholder="Limit" className="border border-border rounded-lg px-2 py-1 w-24" />}

              <div className="ml-auto text-sm">
                Approx. reading time: <span>{readingTime}</span>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            <StatCard count={characterCount} label="Total Characters" className="bg-purple-400 transition-colors duration-300" />
            <StatCard count={wordCount} label="Word Count" className="bg-orange-400/90 transition-colors duration-300" />
            <StatCard count={sentenceCount} label="Sentence Count" className="bg-red-400/90 transition-colors duration-300" />
          </section>

          <section>
            <h2>Letter Density</h2>
            {letterDensity.length === 0 ? (
              <p>No characters found. Start typing to see letter density.</p>
            ) : (
              <div className="space-y-3">
                {letterDensity.map(({ char, count, percentage }) => (
                  <div key={char} className="flex items-center gap-4">
                    <span>{char}</span>
                    <Progress value={Number(percentage)} className="flex-1" />
                    <span>{count} ({percentage}%)</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}