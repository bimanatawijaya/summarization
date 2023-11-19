"use client"

import { AlertDialogTrigger } from '@radix-ui/react-alert-dialog'
import { useEffect, useRef } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import summerazeNews from '~/action'
import { ResultDialog } from '~/components/AlertDialog'
import { TypographyH2 } from '~/components/TypographyH2'
import { TypographyH4 } from '~/components/TypographyH4'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'

export default function Home() {

  const [result, setResult] = useFormState(summerazeNews, {
    title: null, content: null
  })

  useEffect(() => {
    if (result.title && result.content) {
      ref.current?.click()
    }
  }, [result])

  const ref = useRef<HTMLButtonElement>(null)
  return (
    <main>
      <div className='flex min-h-screen flex-col items-center justify-center space-y-8'>
        <ResultDialog
          title={result.title ?? ""}
          result={result.content ?? ""}
        >
          <AlertDialogTrigger ref={ref} className='hidden' />
        </ResultDialog>
        <div className="text-center ">
          <TypographyH2>Rangkuman Berita</TypographyH2>
          <TypographyH4>AI - Powered News Summarization</TypographyH4>
        </div>
        <form action={setResult} className="flex w-full max-w-lg space-x-2">
          <Input type='url' name='url' placeholder='Input url Radar Bogor' required />
          <LoadingSubmit />
        </form>
      </div>
    </main>
  )
}

function LoadingSubmit() {
  const { pending } = useFormStatus();
  return (
    <>
      <Button type='submit' >{pending ? 'Sumarizing...' : 'Sumarize'}</Button >
    </>
  )

}
