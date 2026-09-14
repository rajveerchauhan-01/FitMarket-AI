Git Basics

GitHub

Branching

Merge

Rebase

Cherry Pick

Conflict Resolution

Deployment

Git & GitHub Complete Notes

1. What is Version Control?
   Imagine you're writing a college assignment.
   You save files like:
   Assignment.docx
   Assignment_Final.docx
   Assignment_Final_2.docx
   Assignment_Final_Last.docx
   Assignment_Final_Last_Real.docx
   Eventually you have no idea which file is the latest.
   Version Control solves this problem.
   It keeps the history of every change so you can:
   Go back to older versions
   See who changed what
   Work with multiple developers
   Merge everyone's work safely
2. What is Git?
   Git is a Distributed Version Control System (DVCS).
   It tracks changes made to files in your project.
   Git runs locally on your computer.
   It stores the entire history of the project.
   Git is not GitHub.
3. What is GitHub?
   GitHub is a cloud platform that stores Git repositories online.
   GitHub allows:
   Backup
   Collaboration
   Sharing code
   Pull Requests
   Code Reviews
   CI/CD
   Open Source Contributions
   Simple difference:
   Git
   ↓
   Tracks project history locally

GitHub
↓
Stores Git repositories online 4. Git vs GitHub
Git GitHub
Software Website/Cloud Platform
Installed on PC Accessed online
Tracks code history Hosts repositories
Works offline Requires internet for syncing
Version Control Collaboration Platform

5. Repository (Repo)
   A repository is the project being tracked by Git.
   It contains:
   Project Files
   Git History
   Commits
   Branches
   Configuration
6. Local Repository
   Lives on your computer.
   Contains:
   Project Files

-

.git folder
Everything happens here first. 7. Remote Repository
Lives online (GitHub).
Purpose:
Backup
Collaboration
Sharing 8. What is the .git Folder?
When you run:
git init
Git creates
.git/
This hidden folder contains:
Commit history
Branches
HEAD pointer
Configuration
Objects
References
Without .git, Git has no memory.
Never delete it unless you want to remove Git from the project. 9. git init
Initializes Git inside a project.
Command:
git init
Creates:
.git/
Interview:
git init tells Git to start tracking this project.

10. Working Directory
    Your actual project files.
    Example:
    backend/
    frontend/
    README.md
    Whenever you edit a file, it changes here first.
11. Staging Area (Index)
    Acts like a waiting room.
    Flow:
    Working Directory
    ↓

Staging Area

↓

Repository
You choose which files are ready for the next commit.
Why does the Staging Area exist?
Without it, every small edit would immediately become part of the next commit.
Instead, Git lets us choose exactly what goes into each commit.
Example:
Modified:
login.js
profile.js
README.md
Need only login changes?
git add login.js
Only login.js gets committed. 12. git add
Moves files from Working Directory to Staging Area.
Single file
git add app.js
All files
git add . 13. Commit
A commit is a snapshot of your project.
Think of it like saving a checkpoint in a game.
Commit 1

↓

Commit 2

↓

Commit 3
You can always go back. 14. git commit
Creates a snapshot.
Example
git commit -m "Add user authentication"
Good Commit Messages
Good
Add login API

Fix cart bug

Create navbar

Implement JWT authentication
Bad
Update

Changes

Done

asdf
Commit messages should describe what changed. 15. git status
Shows:
Modified files
Staged files
Untracked files
One of the most frequently used commands. 16. git log
Shows commit history.
Example
git log
Displays
Commit ID
Author
Date
Message 17. Snapshot
Every commit is a snapshot.
Git doesn't simply save files one after another.
It remembers the project state at that moment. 18. Branch
A branch is an independent line of development.
Default branch:
main
Example:
main
\
 login-feature
Develop features without breaking the main project.
Why do companies use branches?
Developer A
Payment Feature
Developer B
Profile Feature
Developer C
Admin Dashboard
Everyone works independently.
After testing:
Merge into
main 19. Remote
A remote connects your local repository to an online repository. 20. origin
Many beginners think origin is GitHub.
Wrong.
Origin is simply a nickname.
Example
origin

↓

https://github.com/username/project.git
You could rename it.
production

office

backup
Origin is just the default name. 21. git remote add origin
Connect local repository with GitHub.
Example
git remote add origin https://github.com/username/project.git 22. git remote -v
Shows connected remotes.
Example
origin
(fetch)

origin
(push) 23. Push
Uploads commits from Local Repository to GitHub.
Command
git push 24. First Push
First push:
git push -u origin main
Meaning:
Push
↓
main branch
↓
to origin
↓
and remember this connection. 25. What does -u mean?
-u means
--set-upstream
Git remembers:
main

↓

origin/main
After that
Only
git push
is enough. 26. Clone
Downloads an existing repository.
Command
git clone <repository-url>
Clone copies:
Project files

Entire Git history

.git folder
After cloning, you DO NOT run
git init
because Git is already initialized. 27. Does clone create origin?
Yes.
Git automatically connects
origin

↓

GitHub repository
You can verify:
git remote -v 28. Fetch
Downloads latest changes.
Does NOT merge.
Command
git fetch
Safe command.
Lets you inspect changes before merging. 29. Pull
Downloads

Automatically merges.
git pull

=

git fetch

-

git merge
When should we use fetch?
Large company.
Many developers.
You want to inspect changes before merging.
When should we use pull?
Small team.
Personal project.
Need latest changes immediately. 30. app.js vs server.js
Good backend architecture separates responsibilities.
app.js
Responsible for:
Express app
Middleware
Routes
Error handling
server.js
Responsible for:
Database connection
Port
app.listen()
Reason:
Single Responsibility Principle. 31. Why Express instead of Node HTTP?
Node HTTP:
Low level
More boilerplate
Manual routing
Express:
Easy routing
Middleware
Cleaner APIs
Faster development
Express does not replace Node.js.
It is built on top of Node.js. 32. Who actually starts the server?
Many beginners say Express.
Correct answer:
Node.js.
When we write:
app.listen(5000);
Express internally uses Node's HTTP server.
Simplified:
const http = require("http");

const server = http.createServer(app);

server.listen(5000);
Node opens the port.
Express makes the process easier.
Git Workflow
Create Project

↓

git init

↓

Modify Files

↓

git add .

↓

git commit

↓

git push
Team Workflow
Clone

↓

Code

↓

git add

↓

git commit

↓

git push

↓

Pull Request

↓

Merge
