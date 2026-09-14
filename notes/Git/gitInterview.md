Difference between Git and GitHub?
Git is a version control system. GitHub is a cloud platform for hosting Git repositories and collaboration.
What is a repository?
A repository is a project along with its complete Git history and configuration.
Why is the staging area needed?
It allows developers to selectively choose which changes become part of the next commit.
What is a commit?
A commit is a snapshot of the project at a specific point in time.
Why use branches?
To develop features independently without affecting the stable codebase.
What is origin?
Origin is the default nickname for a remote repository.
Difference between fetch and pull?
Fetch downloads changes without merging.
Pull downloads and automatically merges.
Why use git push -u origin main only once?
Because -u sets the upstream branch. After that, git push and git pull automatically know which remote branch to use.
Does git clone create the .git folder?
Yes. It copies the repository along with its complete Git history and configures the remote (origin) automatically.
Git Commands Cheat Sheet
# Initialize Git
git init

# Check status
git status

# Stage all files
git add .

# Stage one file
git add filename

# Commit changes
git commit -m "Your message"

# View history
git log

# Add remote
git remote add origin <url>

# View remotes
git remote -v

# First push
git push -u origin main

# Future pushes
git push

# Download repository
git clone <url>

# Download changes only
git fetch

# Download and merge changes
git pull