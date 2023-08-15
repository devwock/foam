---
title: ${TM_FILENAME_BASE/(\w+)|(-)/${1:/pascalcase}${2:+ }/g}
tags:
    - ${TM_DIRECTORY/^.+\\/(.*)$/$1/}
publish: true
---

# ${TM_FILENAME_BASE/(\w+)|(-)/${1:/pascalcase}${2:+ }/g}

