# Git reference for this project

Git is two ideas:

1. **A photo album for your code.** Each "commit" is a snapshot. You can return
   to any snapshot at any time. Nothing is ever truly lost.
2. **A protocol for sharing those snapshots** with other places (like GitHub).

That's it. Everything else is vocabulary on top of those two ideas.

---

## First-time setup (do once per machine)

```sh
# tell git who you are — shows up in commit history
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# make 'main' the default branch name for new repos
git config --global init.defaultBranch main
```

---

## Setting up this project

Open a terminal, navigate to the `stellar-atlas` folder, then:

```sh
git init                                      # turn this folder into a git repo
git add .                                     # stage every file
git commit -m "Initial commit: Stellar Atlas v1"
git tag v1.0                                  # bookmark this exact state
```

**You now have a permanent snapshot of v1.** Even after years of changes, you
can return to this state with `git checkout v1.0`. Goal #2 (retain previous
information) is solved.

---

## Daily workflow

After making changes:

```sh
git status              # what files did I change?
git diff                # show me the actual line-by-line changes
git add .               # stage everything (or: git add src/data.js for one file)
git commit -m "Add release year + studio to S-tier games"
```

Good commit messages are short, present-tense, describe the *what* not the *how*.
Bad: "fixed stuff", "updates", "wip". Good: "Add binary-system badge to catalog
cards", "Move Elden Ring 80px right to clear nebula edge".

---

## Looking at history

```sh
git log                       # full history
git log --oneline             # compact view
git log --oneline -10         # last 10 commits
git show v1.0                 # what was the v1.0 snapshot?
git show HEAD~3               # what did I commit 3 commits ago?
```

---

## Going back (the safety net)

```sh
# discard uncommitted changes to one file
git checkout -- src/data.js

# discard ALL uncommitted changes (careful!)
git checkout -- .

# look at v1.0 without changing your working state
git checkout v1.0
# (now your editor shows the v1.0 files; this is "detached HEAD" mode)
git checkout main             # back to latest

# I committed something I regret. Undo the last commit but keep the changes:
git reset --soft HEAD~1
# or undo last commit AND discard changes:
git reset --hard HEAD~1
```

---

## Tags = bookmarked versions

Tags are how you mark milestones. Use them when you reach a state worth
preserving by name.

```sh
git tag v1.0                  # mark current commit as v1.0
git tag v1.1 -m "add objective fields"
git tag                       # list all tags
git checkout v1.0             # look at the v1.0 state
```

Suggested tagging cadence: `v1.0` for current state, `v1.1` when you finish
adding objective fields, `v1.2` when you finish subjective reviews, etc.

---

## Pushing to GitHub (optional but recommended)

GitHub is a hosting service for git repositories. Free for personal projects.
Two things it gives you:

1. **Off-site backup.** If your laptop dies, your project is still safe.
2. **A public link** to share the project.

### Setup

1. Make an account at github.com.
2. Click the **+** in the top right → **New repository**.
3. Name it `stellar-atlas`. Leave it **empty** (no README, no .gitignore, no
   license — you have those already). Set it to public or private.
4. GitHub shows you a setup screen. The two commands you need are at the bottom
   of "…or push an existing repository". They look like:

```sh
git remote add origin git@github.com:yourname/stellar-atlas.git
git branch -M main
git push -u origin main
git push --tags                 # also push your v1.0 tag
```

After that, every time you commit locally, push to GitHub with:

```sh
git push
```

If GitHub asks for authentication, the modern way is to install the
[GitHub CLI](https://cli.github.com) and run `gh auth login` once.

---

## What does each git command actually do?

| Command            | Plain English                                              |
|--------------------|------------------------------------------------------------|
| `git init`         | Turn this folder into a tracked project                    |
| `git status`       | What files have I changed since the last commit?           |
| `git diff`         | Show me the line-by-line changes                           |
| `git add <file>`   | Stage a file (mark it for inclusion in the next commit)    |
| `git add .`        | Stage every changed file                                   |
| `git commit -m`    | Take a snapshot of all staged files, with a message        |
| `git log`          | Show the history of commits                                |
| `git tag NAME`     | Bookmark this commit as NAME                               |
| `git checkout X`   | Make my files match state X (a tag, a commit, a branch)    |
| `git push`         | Send my commits to GitHub                                  |
| `git pull`         | Get any commits from GitHub I don't have yet               |

---

## A simple mental model

- **Working directory**: the files you see in your editor right now.
- **Staging area**: a holding pen for "what I want in my next snapshot".
  `git add` moves things here.
- **Repository**: the full timeline of all snapshots. `git commit` adds to it.

Every git command moves things between these three places. Once you internalize
that, the vocabulary makes sense.

---

## When you're stuck

`git status` always tells you what to do next. It lists the files in each state
and suggests the next command. Read it. It's surprisingly chatty in a good way.
