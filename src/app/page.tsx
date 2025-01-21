'use client'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#DFE5E4] relative">
      <div className="absolute inset-0 flex justify-center items-center left-[-70px]">
        <Image
          src="/images/community-background.jpg"
          alt="Community illustration"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      <main className="relative z-10 flex flex-col items-center justify-center h-screen text-center">
        <div className="mt-[-300px] space-y-4">
          <h1 className="text-[#2c4547] text-6xl font-bold">Empowering Your</h1>
          <h2 className="text-[#2c4547] text-6xl font-bold">Child&apos;s Future</h2>
        </div>
        <div className="mt-48 space-y-2">
          <h3 className="text-[#2c4547] text-3xl font-bold">A Tool for Upward Mobility</h3>
          <div className="mt-4 space-y-1">
            <p className="text-[#2c4547] text-lg">Discover your community&apos;s opportunities</p>
            <p className="text-[#2c4547] text-lg">Create a personalized action plan</p>
            <p className="text-[#2c4547] text-lg">For your child&apos;s future</p>
          </div>
        </div>
        <button className="bg-[#87A6A8] text-white px-8 py-3 rounded text-lg font-medium hover:bg-[#6B8A8C] mt-12">
          START NOW
        </button>
      </main>
    </div>
  )
}