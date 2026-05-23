# Git / GitHub — cheatsheet

## When to reach for it

- **Any code you write.** Git is the universal source-control system; no serious team works without it.
- **Reviewing changes** — `git diff`, `git blame`, GitHub PRs.
- **Collaboration & CI/CD** — feature branches → PR → review → merge → GitHub Actions deploys.

## Mental model

Git is a **content-addressable filesystem** + a small set of pointers. Every blob, tree, and commit is stored as an object keyed by SHA-1 of its content. **Branches are just pointers** to commits; **HEAD** is a pointer to your current branch. Operations like `merge`, `rebase`, `cherry-pick` just walk and rewrite parent links. Once you internalise *"commits = snapshots in a DAG"* almost every weird Git behaviour starts making sense.

## Key concepts

| Concept | One-line meaning |
|---|---|
| **Working tree / index / HEAD** | Your files / staged changes / last commit. |
| **Commit** | Snapshot of the tree + parent(s) + author + message → SHA. |
| **Branch** | Movable pointer to a commit. |
| **HEAD** | Pointer to your current branch (or directly to a commit = detached). |
| **Remote** | A named URL (default `origin`) for fetching/pushing. |
| **`fetch` vs `pull`** | Fetch downloads; pull = fetch + merge (or rebase). |
| **`merge` vs `rebase`** | Preserve history with a merge commit vs replay commits linearly. |
| **`cherry-pick`** | Apply a single commit from one branch onto another. |
| **`stash`** | Temporarily set aside uncommitted changes. |
| **`reflog`** | Local 30-day journal of HEAD moves — recovery superpower. |
| **`reset` vs `revert`** | Rewrite local history vs add a new "undo" commit (safe for shared branches). |
| **Pull Request (GitHub)** | Hosted review + discussion + CI gate before merge. |

## Minimum example

```bash
# Daily flow on a feature branch.
git switch -c feat/login-redirect           # new branch
# ... edit files ...
git add -p                                  # stage hunks selectively
git commit -m "Redirect to dashboard on login"

git fetch origin                            # latest from remote
git rebase origin/main                      # replay your commits on top of main

git push -u origin feat/login-redirect      # publish + track

# Then open a Pull Request on GitHub for review.

# Recover from a bad `git reset --hard`:
git reflog                                  # find the SHA you nuked
git switch -c rescue <sha>                  # bring it back

# Undo a pushed commit safely (without rewriting history):
git revert <sha>
git push
```

## Common pitfalls

- **Rebasing already-pushed shared branches** → rewrites SHAs, breaks everyone's clone. Rule: never rebase what you've already shared.
- **`git pull` with local changes** → conflicts or unexpected merge commits. `git pull --rebase` (or set globally: `git config --global pull.rebase true`) is usually cleaner.
- **Committing secrets** — once pushed, **assume the secret is leaked**. Rotate it; then use `git filter-repo` / BFG to scrub history.
- **Merging without reviewing the diff** — `git diff main...HEAD` before opening a PR.
- **`git push --force` on a shared branch** → wipes others' commits. Prefer `--force-with-lease`.
- **Bloated `.git` from huge binaries** — use **Git LFS** for media/models/large assets.

## What to learn next

- **`git rebase -i`** for cleaning up local commits before push (squash, reword, reorder)
- **`git bisect`** to binary-search for the commit that introduced a bug
- **GitHub Actions** for CI/CD (lint+test on every PR, deploy on tag)
- **Conventional Commits + semantic-release** for automated changelogs
- **Git hooks** (pre-commit, pre-push) — and the `pre-commit` tool for managing them
- **Worktrees** (`git worktree add ../alt main`) for parallel checkouts without re-cloning

> **Personal note:** _<TODO: which workflow you use day-to-day and your favourite Git trick.>_

## Sources

- [Pro Git Book (free)](https://git-scm.com/book/)
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Docs](https://docs.github.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)
