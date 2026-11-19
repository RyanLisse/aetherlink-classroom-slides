Output "assets/day5-daily-brief-teach/a6-guide.mp4"

Set Shell "zsh"
Set FontSize 18
Set Width 1148
Set Height 780
Set TypingSpeed 18ms

Type "cd ../day5-daily-brief-maarten"
Enter
Sleep 400ms
Type "sed -n '104,116p' SOLO.md"
Enter
Sleep 6s
Type "printf '\nPROOF ACTIONS — run and record the real exit codes:\n  npm run typecheck\n  npm test\n  npm run brief:sample\nA reviewer reruns one command. Unrun checks stay OPEN.\n'"
Enter
Sleep 6s
