# Editing Passes: The Multi-Read Playbook

A draft never gets fixed in one pass. Try to do too much at once and you will smooth over real problems while obsessing about commas. Do these in order. Each pass has one job.

If a pass turns up a major problem (no claim, wrong shape), stop and fix that before continuing the lower-level passes. Polish on a broken structure is wasted polish.

## Pass 1: Argument

**The job**: make sure the post is making a point, and that every paragraph is paying its way toward that point.

**Read the whole draft once, end to end. Ask:**

1. What is the claim? Point at the sentence.
2. Could a reader disagree with that claim? If not, sharpen it. "AI changes design" is not a claim. "AI breaks the assumption that designers control the order of UI events" is.
3. What is each paragraph doing? Label each one in your head: setup, claim, evidence, counter, land, throat-clearing, restatement, transition, decoration. Anything labeled throat-clearing, restatement, or decoration is a candidate for cuts.
4. Is the post in the right shape? If it reads like a post-mortem but is structured as an essay, fix the structure before fixing sentences.

**Common cuts at this pass**:

- Opening paragraph that defines a topic before saying anything specific.
- Closing paragraph that summarizes what the reader just read.
- Mid-post transition that explains what is about to happen.
- Paragraphs that hedge in both directions ("on the other hand", "while X, also Y") without resolving.
- Anything that reads as filler to hit a length.

**Rule of thumb**: if you can delete a paragraph without anyone noticing, the paragraph was not earning its space.

## Pass 2: Em-dash and buzzword scrub

**The job**: mechanical search and replace. No judgment calls about voice, just enforce the rules.

**Procedure**:

1. Search for `—` (em-dash). Replace every instance using the methods in `banned-language.md`. Period, comma, parentheses, colon, or rewrite.
2. Search for `–` (en-dash) used as sentence punctuation. Replace.
3. Run through the priority buzzword list from `SKILL.md`:
   - delve, dive into, leverage, utilize, seamless, robust, comprehensive, holistic, unlock, unleash, harness, elevate, empower, streamline, optimize, enhance, revolutionize, transformative, game-changer, cutting-edge, paradigm, navigate (metaphorical), landscape (metaphorical), in today's, in the digital age, it's important to note, it's worth noting, not just X it's Y, not only but also, whether you're X or Y, at the intersection of, at the heart of, the essence of, tapestry, mosaic, ecosystem (metaphorical).
4. Then run through the long list in `references/banned-language.md` for the rest.
5. For each hit: rewrite the sentence with a concrete noun, a strong verb, or by deleting altogether.

**This pass is non-negotiable.** A single em-dash or buzzword undoes the work of the rest of the post.

## Pass 3: Cadence

**The job**: make sure the prose has rhythm a person would write, not the even pulse of generated text.

**Read the post out loud (in your head if you must). Ask:**

1. Are most sentences the same length? If yes, vary them.
2. Are there four medium-length sentences in a row? Break the run with a short one or a fragment.
3. Is there a rhythm of "comma, comma, comma" within a sentence that wants to be three sentences?
4. Are paragraphs all the same length? Some should be one sentence. Some should be eight.
5. Does any sentence have parallel structure for no reason? "Faster, smarter, more elegant" is the canonical tell.
6. Does the post breathe? Are there pauses, asides, places to slow down?

**Tactics**:

- Replace one mid-paragraph period with a fragment. "We tried two more approaches. None worked. Then someone shipped it on Friday afternoon."
- Use parentheses for an aside instead of a comma-and-comma sandwich. "(or at least it felt that way)" is more human than ", or at least it felt that way,".
- If a paragraph has more than three sentences with the same structure, rewrite one.

## Pass 4: Specificity

**The job**: replace abstract nouns with concrete ones, vague adjectives with numbers or names.

**Search for these and ask "is there a more specific version?":**

- "users" (which users? what did they actually do?)
- "stakeholders" (which? you can usually name them)
- "the team" (how many? what roles?)
- "performance issues" (how slow? on what?)
- "challenges" (which? be specific)
- "considerations" (which? almost always cuttable)
- "impact" (what changed? how much?)
- "various", "several", "many" (how many?)
- "significant" (how much?)
- "recently" (when?)
- "a lot of time" (how long?)
- "good results" (what improved? by what?)

**Move the abstraction down by one level.**

> The redesign improved engagement.

becomes

> Time-on-page went from 24 seconds to over a minute. We were not sure if that was good or bad.

The second version is more interesting because it admits the writer is uncertain about the metric. Specifics create the room for honest writing.

**Also at this pass**:

- Quote real people if you have the quote. "A backend engineer told me 'this is fine, it just looks weird'" beats "we got pushback".
- Name the tool, the company, the screen. Not "the design tool", but "Figma".
- Use real numbers. Not "many requests", but "thirty-something requests".

## Pass 5: Opening and closing

**The job**: make sure the post starts with a hook and ends by stopping.

**Opening**

Read the first three sentences. Cut anything that is:

- A definition of the topic ("Designing for AI is...").
- A question to the reader ("Have you ever wondered...").
- A "we've all been there" move.
- A rhetorical "imagine if".
- A throat-clear ("In recent years, there has been growing interest in...").

The post should start in the middle of the thought. The reader will catch up. If the body of the post does not give them enough context, fix that in the body, not in a windup.

**Good opening textures** (for reference):

- A specific moment ("Last quarter I spent three weeks rebuilding...").
- A flat opinion ("Skeleton screens lie.").
- An observation ("The loading state is the only part of an AI feature most people see often enough to form an opinion about.").
- A scene ("It was a Friday at 4pm when the first agent shipped.").

**Closing**

Read the last paragraph. If it summarizes what the reader just read, delete it. The piece should end on its last real point, not on a meta-recap.

If the closing paragraph contains "in conclusion", "to wrap up", "as we've seen", "ultimately", or "by Xing we can Y", delete the whole paragraph. Look at the new last paragraph. That is probably your real ending.

**Good closings**:

- Return to a specific image from the opening, slightly changed.
- A flat statement that follows from the body.
- An open question that is not rhetorical.
- The thing the writer is going to do next, said briefly.

## Pass 6: The AI-smell pass

**The job**: catch the patterns that survived the buzzword scrub but still read as machine-made.

**Things to look for**:

1. **Parallel tricolons**. Three parallel adjectives or three parallel clauses. "Faster, smarter, more elegant." "We can build, we can ship, we can iterate." Cut to one.
2. **The "X is more than just Y" sentence.** Almost always cliché. Rewrite.
3. **The "not just X, it's Y" mirror.** Pick one.
4. **Sentences that hedge in both directions** ("while X, also Y") that do not resolve.
5. **The "we've all been there" move**. Cut.
6. **Imperative bullet lists in personal essay prose**. ("• Embrace ambiguity • Iterate fast • Focus on outcomes"). These are LinkedIn slop. If you have a list, rewrite each item as a real sentence, with a reason.
7. **Sentences that begin with "Look,"** as a forced casual move.
8. **Tricolon adjective stacks before a noun.** "A clean, simple, intuitive design" is three flavors of the same vague compliment.
9. **The summary "by doing X, we Y" closer**.
10. **Anything that sounds like it could be a slide title**. "The Future of Design", "A New Paradigm". If it could be a slide, it should not be in body prose.

**A diagnostic**: does the paragraph still work if you drop the second sentence? If yes, the second sentence was probably restating the first in different words.

## Pass 7: Final read

**The job**: read it like a stranger.

Step away. Read the whole thing again, top to bottom, no notes. Ask:

- Does it sound like a person?
- Is there a sentence I could imagine going viral on Twitter? (Not because the goal is virality, but because that test catches whether any sentence has real teeth.)
- Is there anything I would be embarrassed by if a senior designer in the field read this?
- Is there a real claim, defended with real specifics?
- Does the closing land?

If the answer to any of these is no, fix that one thing and read again.

## A note on resisting overcorrection

It is possible to scrub a draft so hard that the voice goes flat. The goal is not to write the most cautious, sanitized prose possible. The goal is to write like a particular working designer who has opinions and a sense of humor.

If a pass leaves the post feeling colder, undo a change or two. Sometimes a slightly informal phrase, a contraction, a deliberate fragment, or a half-sentence aside is the thing that keeps it human. Do not delete those for the sake of polish.

The tests for "is this human voice?" come down to:

- Would a designer say this in a bar to a friend?
- Would they say it in a Slack DM to a peer?
- Would they say it in a Loom video walking through their work?

If yes to any of those, leave it.
