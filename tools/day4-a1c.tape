Output "assets/day4-final-teach/a1c-restore.mp4"
Set Shell "zsh"
Set FontSize 20
Set Width 1148
Set Height 780
Set TypingSpeed 20ms
Type "cd day4-solution"
Enter
Type "git diff --quiet && echo 'Accepted policy restored: clean diff'"
Enter
Type "npm run check:1"
Enter
Sleep 8s
