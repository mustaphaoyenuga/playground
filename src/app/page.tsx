import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
   <div className="min-h-screen p-4">
    <h1>Mustapha's Playground</h1>
    <p>Playground for testing and learning new things</p>
    <ol className="list-decimal ml-4 mt-4">
      <li>
        <Link href="/character-counter">Character Counter</Link>
      </li>
    </ol>
   </div>
  );
}
