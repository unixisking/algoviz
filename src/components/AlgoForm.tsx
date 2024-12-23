import { SyntheticEvent, useContext } from 'react'
import { Input } from './ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { AlgoContext, ALGO_KIND } from '@/lib/context'
import { MP } from '@/lib/algos'
import { Button } from './ui/button'

export default function AlgoForm() {
    const { text, setText, kind, setKind, setPattern, pattern, setSteps } = useContext(AlgoContext)


    const handleKindChange = (value: string) => {
        switch (value) {
            case "bf":
                setKind(ALGO_KIND.BF)
                break
            case "mp":
                setKind(ALGO_KIND.MP)
                break
            case "kmp":
                setKind(ALGO_KIND.KMP)
                break
            case "bm":
                setKind(ALGO_KIND.BM)
                break
            case "hp":
                setKind(ALGO_KIND.HP)
                break
        }
    }

    const handleClick = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault()
        const { steps, found } = MP(text, pattern);
        setSteps(steps)
        console.log(steps, found)
    }
    return (
        <form
            onSubmit={handleClick}
            className="max-w-4xl space-y-3">
            <div className="flex gap-4">
                <Input value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="Please add the pattern here" />
                <Select value={kind.toString()} defaultValue={"bf"} onValueChange={handleKindChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select an algorithm" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Select an algorithm</SelectLabel>
                            <SelectItem value="bf">Brute Force</SelectItem>
                            <SelectItem value="mp">Morris Pratt</SelectItem>
                            <SelectItem value="kmp">Knuth Morris Pratt</SelectItem>
                            <SelectItem value="bm">Boyer Moore</SelectItem>
                            <SelectItem value="hp">Horspool</SelectItem>
                            <SelectItem value="qs">Quick Search</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Please add the text here" />
            <Button type="submit">Run</Button>
        </form>
    )
}
