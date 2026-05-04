# Post Scaffolding

A bare scaffold for starting a new post. Fill in, then delete the prompts. The frontmatter matches the `Post` interface in `src/lib/posts.ts` so the post can drop straight into the writing index.

```yaml
---
slug: short-kebab-case-title
date: MM / YYYY
title: A title that makes a claim, not one that names a topic
readTime: X min
topic: Two words separated by · (e.g. "AI · Trust", "Type · Systems")
---
```

## Working notes (delete before publishing)

- **The claim**: one sentence. The thing the post is arguing. If you cannot fill this in, do not draft yet.
- **Who is this for**: designers? engineers? PMs? other?
- **What prompted it**: the meeting, the bug, the moment, the conversation.
- **The shape**: opinion essay / field notes / post-mortem / pattern study / single-claim short / list-but-done-right.
- **Three concrete details I want in here**: a number, a tool, a quote, a name, a date, a screen size.
- **The strongest objection**: how would a smart skeptic push back? Plan to address it.

## Draft

[Open with a specific moment, image, or flat opinion. Not a definition. Not a question to the reader. Not "in today's".]

[Setup paragraph or two. The situation, briefly. Get to the point fast.]

[The turn. Where you say what you think.]

[Evidence. Specifics. Examples. The thing that happened. Numbers, quotes, screenshots described in words.]

[The strongest objection, taken seriously.]

[Land. Two to four sentences. Stop. Do not summarize.]

## Pre-publish checklist

Before posting, run through these. Do not skip any.

- [ ] No em-dashes (`—`) anywhere in the file.
- [ ] No en-dashes used as sentence punctuation.
- [ ] Ran the priority buzzword search (delve, leverage, seamless, robust, comprehensive, holistic, unlock, harness, elevate, empower, streamline, optimize, enhance, revolutionize, transformative, game-changer, cutting-edge, navigate, landscape, in today's, it's important to note, not just X it's Y, whether you're X or Y, at the intersection of, tapestry, ecosystem).
- [ ] Ran the long ban list in `references/banned-language.md`.
- [ ] There is one sentence I can point to as the claim.
- [ ] At least three concrete details (tool, number, name, quote, date).
- [ ] Opening does not start with a definition, a question, or "imagine".
- [ ] Closing does not summarize. No "in conclusion", no "by Xing we can Y".
- [ ] Sentence lengths vary. There is at least one fragment. There are no four-mediums-in-a-row runs.
- [ ] No parallel adjective tricolons.
- [ ] No "not just X, it's Y" mirrors.
- [ ] No "we've all been there" or reader-implication moves.
- [ ] If I read it out loud, it sounds like a person, not a press release.
