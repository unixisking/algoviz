'use client'

import Editor from '@monaco-editor/react'

export default function IDE() {
  const handleSubmit = async () => {}

  return (
    <form action="#" onSubmit={handleSubmit}>
      <div className="">
        <label htmlFor="comment" className="sr-only">
          Add your code
        </label>
        <Editor
          height="50vh"
          defaultLanguage="c"
          defaultValue='int main() { printf("Hello, World!"); return 0;}'
        />
      </div>
    </form>
  )
}
