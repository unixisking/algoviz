export interface Preset {
  id: string
  name: string
  code: string
}

export const presets: Preset[] = [
  {
    id: 'bf',
    name: 'Brute Force Algorithm',
    code: `#include "limits.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void bruteFS1(const char *text, int n, const char *pattern, int m) {
  for (int i = 0; i <= n - m; i++) {
    int j = 0;
    while (j <= m - 1 && pattern[j] == text[i + j]) {
      j++;
    }
    if (j == m) {
        printf("%d", i);
    }
  }
}

int main(int argc, char *argv[]) {
  const char *text = "GCATCGCAGAGAGTATACAGTACG";
  const char *pattern = "TATA";

  int n = strlen(text);
  int m = strlen(pattern);
  bruteFS1(text, n, pattern, m);
  return 0;
}

    `,
  },
  {
    id: 'mp',
    name: 'Morris-Pratt Algorithm',
    code: `#include "limits.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void preprocessMp(const char *pattern, int m, int *shift_table) {
  int i = 0, j = shift_table[0] = -1;

  while (i < m) {
    while (j > -1 && pattern[i] != pattern[j]) {
      j = shift_table[j];
    }
    shift_table[++i] = ++j;
  }
}

void mp(const char *text, int n, const char *pattern, int m) {
  int i = 0, j = 0, shift_table[m];

  preprocessMp(pattern, m, shift_table);

  while (j < n) {
    while (i >= 0 && pattern[i] != text[j]) {
      i = shift_table[i];
    }
    i++;
    j++;
    if (i == m) {
      printf("%d", j - i);
      i = shift_table[i];
    }
  }
}
int main(int argc, char *argv[]) {
  const char *text = "GCATCGCAGAGAGTATACAGTACG";
  const char *pattern = "TATA";

  int n = strlen(text);
  int m = strlen(pattern);
  mp(text, n, pattern, m);
  return 0;
}
    
    `,
  },
  {
    id: 'kmp',
    name: 'Knuth-Morris-Pratt Algorithm',
    code: `
#include "limits.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void preprocessKmp(const char *pattern, int m, int *shift_table) {
  int i = 0, j = shift_table[0] = -1;

  while (i < m) {
    while (j > -1 && pattern[i] != pattern[j]) {
      j = shift_table[j];
    }
    i++;
    j++;
    if (pattern[i] == pattern[j]) {
      shift_table[i] = shift_table[j];
    } else {
      shift_table[i] = j;
    }
  }
}

void kmp(const char *text, int n, const char *pattern, int m) {
  int i = 0, j = 0, shift_table[m];

  preprocessKmp(pattern, m, shift_table);

  while (j < n) {
    while (i >= 0 && pattern[i] != text[j]) {
      i = shift_table[i];
    }
    i++;
    j++;
    if (i >= m) {
      printf("%d", j - i);
      i = shift_table[i];
    }
  }
}

int main(int argc, char *argv[]) {
  const char *text = "GCATCGCAGAGAGTATACAGTACG";
  const char *pattern = "TATA";

  int n = strlen(text);
  int m = strlen(pattern);
  kmp(text, n, pattern, m);
  return 0;
}
    
    `,
  },
  {
    id: 'bm',
    name: 'Boyer-Moore Algorithm',
    code: `#include "limits.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX(x, y) (((x) > (y)) ? (x) : (y))

void BMBadCharRule(const char *pattern, int m, int badMatchTable[]) {
  for (int i = 0; i < UCHAR_MAX; i++) {
    badMatchTable[i] = m;
  }
  for (int i = 0; i < m - 1; i++) {
    badMatchTable[(int)pattern[i]] = m - i - 1;
  }
}

void BMSuffixes(const char *pattern, int m, int suffixes[]) {
  int f, i;

  suffixes[m - 1] = m;
  int g = m - 1;

  for (i = m - 2; i >= 0; i--) {
    if (i > g && suffixes[i + m - 1 - f] < i - g) {
      suffixes[i] = suffixes[i + m - 1 - f];
    } else {
      if (i < g) {
        g = i;
      }
      f = i;
      // calc of suffix here
      while (g >= 0 && pattern[g] == pattern[g + m - 1 - f]) {
        g--;
      }
      suffixes[i] = f - g;
    }
  }
}

void BMGoodSuffix(const char *pattern, int m, int goodSuffixTable[]) {
  int suffixes[m];

  BMSuffixes(pattern, m, suffixes);

  for (int i = 0; i < m; i++) {
    goodSuffixTable[i] = m;
  }

  for (int i = m - 1; i >= 0; i--) {
    if (suffixes[i] == i + 1) {
      for (int j = 0; j < m - 1 - i; j++) {
        if (goodSuffixTable[j] == m) {
          goodSuffixTable[j] = m - 1 - i;
        }
      }
    }
  }
  for (int i = 0; i <= m - 2; ++i)
    goodSuffixTable[m - 1 - suffixes[i]] = m - 1 - i;
}

void BM(const char *text, int n, const char *pattern, int m) {
  if (m == 0 || n < m) {
    printf("Invalid pattern or text length.");
    return;
  }
  int i, j = m - 1, badCharRuleTable[UCHAR_MAX], goodSuffixTable[m];

  BMBadCharRule(pattern, m, badCharRuleTable);
  BMGoodSuffix(pattern, m, goodSuffixTable);

  while (j < n) {
    i = m - 1;
    while (i >= 0 && pattern[i] == text[j - m + 1 + i]) {
      i--;
    }
    if (i < 0) {
      printf("Found pattern %s in text, ends at index: %d", pattern, j);
      j += goodSuffixTable[0];
    } else {
      j += MAX(goodSuffixTable[i],
               badCharRuleTable[(int)text[j - m + 1 + i]] - m + i + 1);
    }
  }
}

int main(int argc, char *argv[]) {
  const char *text = "GCATCGCAGAGAGTATACAGTACG";
  const char *pattern = "TATA";

  int n = strlen(text);
  int m = strlen(pattern);
  BM(text, n, pattern, m);
  return 0;
}
    `,
  },
  {
    id: 'hp',
    name: 'Horspool Algorithm',
    code: `#include "limits.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void BMBadCharRule(const char *pattern, int m, int badMatchTable[]) {
  for (int i = 0; i < UCHAR_MAX; i++) {
    badMatchTable[i] = m;
  }
  for (int i = 0; i < m - 1; i++) {
    badMatchTable[(int)pattern[i]] = m - i - 1;
  }
}

void horspool(const char *text, int n, const char *pattern, int m) {
  int badCharRuleTable[UCHAR_MAX];

  BMBadCharRule(pattern, m, badCharRuleTable);

  int j = 0;
  while (j <= n - m) {
    char firstChar = text[j + m - 1];
    if (pattern[m - 1] == firstChar && memcmp(pattern, text + j, m - 1) == 0) {
      printf("Found pattern in text at index: %d", j);
    }
    j += badCharRuleTable[(int)firstChar];
  }
}


int main(int argc, char *argv[]) {
  const char *text = "GCATCGCAGAGAGTATACAGTACG";
  const char *pattern = "TATA";

  int n = strlen(text);
  int m = strlen(pattern);
  horspool(text, n, pattern, m);
  return 0;
}
    `,
  },
]
