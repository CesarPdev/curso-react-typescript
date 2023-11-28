import { RandomFox } from "./components/RandomFox"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold underline">My Beautiful Fox</h1>
      <RandomFox />
    </main>
  )
}
