import React, { useEffect, useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "~/components/ui/alert-dialog"

type ResultDialogProps = {
    title: string,
    result: string,
    children: React.ReactNode
}

export function ResultDialog({ title, result, children }: ResultDialogProps) {
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        setCopied(false)
    }, [result])

    const CopyToClipBoard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
    }

    return (
        <AlertDialog>
            {children}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Summarization of "{title}"</AlertDialogTitle>
                    <AlertDialogDescription>
                        {result}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Close</AlertDialogCancel>
                    <AlertDialogAction disabled={copied} onClick={(e) => {
                        e.preventDefault();
                        CopyToClipBoard(result as string)
                    }}>{copied ? 'Copied' : 'Copy to Clipboard'}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog >
    )

}