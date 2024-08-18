'use client'
import Link from 'next/link'
import Image from 'next/image'
import { FileText, GitCompare, Search } from 'lucide-react'

import { SignUpButton, useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

// import RecentComplaintsList from '../components/RecentComplaintsList'

export default function Home() {
  const { isSignedIn } = useUser()

  return (
    <main className="px-16 w-full py-24">
      <section className="py-12 md:py-16 lg:py-20">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div className="space-y-4">
            <h1 className="text-4xl font-light tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Revolutionize Your Consumer Complaint Analysis
            </h1>
            <p className="text-muted-foreground md:text-xl">
              Ruby&apos;s AI-Powered Consumer Complaint Analysis tool unlocks unprecedented insights, empowering you to
              streamline your operations and deliver exceptional customer experiences.
            </p>

            {isSignedIn ? (
              <Link href={"/complaint-form"}>
                <Button className='my-4' size="lg">Try It Now</Button>
              </Link>
            ) : (
              <SignUpButton>
                <Link href={'/sign-in'}>
                  <Button> Get Started </Button>
                </Link>
              </SignUpButton>
            )}

          </div>
          <div className="flex justify-center">
            <Image
              src="/hero.svg"
              width={450}
              height={400}
              alt="Hero Image"
              className="rounded-xl object-cover mix-blend-mode: multiply"
            />
          </div>
        </div>
      </section>

      <section className=" py-56 ">
        <div className="flex gap-24 justify-center items-start  ">

          <div className="flex flex-col w-[24rem]">
            <div className="flex gap-3 mb-2 items-end">
              <FileText className="h-10 w-10 text-primary" />
              <h3 className="text-2xl font-bold tracking-tight text-foreground">Intelligent Categorization</h3>
            </div>
            <p className="text-muted-foreground">
              Our advanced AI algorithms automatically categorize consumer complaints with unparalleled accuracy,
              streamlining your analysis and decision-making processes.
            </p>
          </div>


          <div className="flex flex-col w-[24rem]">
            <div className="flex gap-3 mb-2 items-end">
              <Search className="h-10 w-10 text-primary" />
              <h3 className="text-2xl font-bold tracking-tight text-foreground">Smart Summaries</h3>
            </div>
            <p className="text-muted-foreground">
              Quickly grasp the essence of each complaint with our AI-generated summaries, saving you time and effort
              in understanding the key issues.
            </p>
          </div>


          <div className="flex flex-col w-[24rem]">
            <div className="flex gap-3 mb-2 items-end">
              <GitCompare className="h-10 w-10 text-primary" />
              <h3 className="text-2xl font-bold tracking-tight text-foreground">Related Complaint Retrieval</h3>
            </div>
            <p className="text-muted-foreground">
              Uncover hidden patterns and trends by instantly retrieving related complaints, empowering you to
              identify and address systemic issues.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}