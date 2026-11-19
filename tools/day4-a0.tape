Output "assets/day4-final-teach/a0-verify.mp4"

Set Shell "zsh"
Set FontSize 17
Set Width 1148
Set Height 780
Set TypingSpeed 20ms

Type "cd day4-workshop"
Enter
Sleep 400ms
Type "set -o pipefail; npm run verify 2>&1 | tee /tmp/day4-a0-verify.log"
Enter
Sleep 6s
Type "grep -E 'tests 24|pass 24|fail 0|MCP smoke|dry run' /tmp/day4-a0-verify.log"
Enter
Sleep 4s
