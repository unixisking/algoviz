import clsx from 'clsx'

interface ICharNode {
    highlight?: boolean
    isMatched?: boolean
    content: string;
}
export default function CharNode({ isMatched = false, highlight = false, content }: ICharNode) {
    return (
        <div className={clsx("border-2 px-4 py-1.5 rounded-md", { "bg-gray-700 border-gray-700 text-white": highlight, "bg-green-500 border-green-500 text-white": isMatched && !highlight })}>{content}</div>
    )
}
