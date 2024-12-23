import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import Highlight from 'react-highlight'


import 'highlight.js/styles/gradient-dark.css'; // Include a nice code theme


export function CodeViewer() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary">View code</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-fit">
                <DialogHeader>
                    <DialogTitle>Horspool Algorithm</DialogTitle>
                    <DialogDescription>
                        This is the code of the selected searching algorithm written in C
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <Highlight className="c">
                        {`void horspool(const char *text, int n, const char *pattern, int m) {
  int badCharRuleTable[UCHAR_MAX];

  BMBadCharRule(pattern, m, badCharRuleTable);

  int j = 0;
  while (j <= n - m) {
    char firstChar = text[j + m - 1];
    if (pattern[m - 1] == firstChar && memcmp(pattern, text + j, m - 1) == 0) {
      if (isDirectExecution == 1) {
        printf("Found pattern in text at index: %d", j);
      }
    }
    j += badCharRuleTable[(int)firstChar];
  }
}`}
                    </Highlight>
                    <div>
                        <p className="text-sm text-muted-foreground">
                            To view the code of the project, please visit the Github repoisitory
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}