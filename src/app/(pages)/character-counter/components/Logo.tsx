export default function Logo() {
    return (
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 0C8.954 0 0 8.954 0 20s8.954 20 20 20 20-8.954 20-20S31.046 0 20 0zm0 36c-8.837 0-16-7.163-16-16S11.163 4 20 4s16 7.163 16 16-7.163 16-16 16z" fill="currentColor" className="text-purple-400" />
                    <path d="M12 12h16v16H12z" fill="currentColor" className="text-purple-200 opacity-50" />
                    <path d="M20 10v20M10 20h20" stroke="currentColor" strokeWidth="4" className="text-white" />
                </svg>
            </div>
            <span className="font-bold">Character Count</span>
        </div>
    );
}