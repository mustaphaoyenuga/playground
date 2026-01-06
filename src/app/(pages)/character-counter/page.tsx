"use client"

import { Info, Moon, Sun } from "lucide-react";
import { useState } from "react";
import Logo from "./components/Logo";
import StatCard from "./components/StatCard";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertTitle } from "@/components/ui/alert";


export default function CharacterCounter() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [text, setText] = useState("");
  const [excludeSpaces, setExcludeSpaces] = useState(false);
  const [limitIsActive, setLimitIsActive] = useState(false);
  const [characterLimit, setCharacterLimit] = useState(20);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    if (!limitIsActive) {
      setText(value);
    } else {
      const slicedText = value.slice(0, characterLimit);
      setText(slicedText);
    }
  }

  const totalCharacters = excludeSpaces ? text.replace(/\s/g, '').length : text.length;
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const sentenceCount = text.trim() === '' ? 0 : text.trim().split(/[!?.]+/).filter(Boolean).length;

  const handleCharacterLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharacterLimit(Number(e.target.value));
  }

  const limitIsExceeded = limitIsActive ? totalCharacters >= characterLimit : false;


  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground">
        <header className="flex items-center justify-between max-w-5xl mx-auto">
          <Logo />
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="cursor-pointer">{isDarkMode ? <Moon /> : <Sun />}</button>
        </header>
        <main className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold max-w-2xl text-center mx-auto">Analyze your text in real-time</h1>
          <section className="space-y-4">
            <div>
              <textarea onChange={handleTextChange} placeholder="Start typing here...(or paste your text)" value={text} className={`w-full h-48 border-2 border-border rounded-lg p-2 resize-none ${limitIsExceeded ? "bg-red-50 border-red-500 outline-red-500" : "bg-muted"}`}></textarea>
              {limitIsExceeded && (
                <Alert variant="destructive" className="mt-1">
                  <Info />
                  <AlertTitle>Limit reached! Your text is {characterLimit} characters.</AlertTitle>
                </Alert>
                )}
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

              <div className="ml-auto">
                Approx. reading time: <span>0</span>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            <StatCard count={String(totalCharacters).padStart(2, '0')} label="Total Characters" className="bg-purple-400" />
            <StatCard count={String(wordCount).padStart(2, '0')} label="Word Count" className="bg-orange-400/90" />
            <StatCard count={String(sentenceCount).padStart(2, '0')} label="Sentence Count" className="bg-red-400/90" />
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