"use client"

import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import Logo from "./components/Logo";



export default function CharacterCounter() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    return (
        <div className={isDarkMode ? "dark" : ""}>
            <div className="min-h-screen bg-background text-foreground">
                <header className="flex items-center justify-between max-w-5xl mx-auto">
                    <Logo />
                    <button onClick={() => setIsDarkMode(!isDarkMode)}>{isDarkMode ? <Moon /> : <Sun />}</button>
                </header>
                <main className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold max-w-2xl text-center mx-auto">Analyze your text in real-time</h1>
                    <section className="space-y-4">
                        <textarea className="w-full h-48 rounded-lg bg-gray-50 p-2"></textarea>
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
                </main>
            </div>
        </div>
    );
}