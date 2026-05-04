# Structure Patterns: Six Post Shapes

Pick the shape after you have the claim. The shape is in service of the argument, not the other way round.

If none of these fit cleanly, default to the structure in `SKILL.md` and adjust.

## 1. The opinion essay

The point of view is the spine. Everything else is evidence.

**When to use**: you have a claim you want to defend in public. "Skeleton screens lie", "Most onboarding flows are training wheels for the wrong skill", "Design systems should be smaller than you think".

**Shape**

```
Hook (1 to 3 sentences):
  The moment, image, or quote that prompted the post.

The claim (1 short paragraph):
  State it flat. No hedging.

Why people get this wrong (1 to 2 paragraphs):
  The version of this argument you are pushing back on, taken
  seriously. Steelman it.

Your case (3 to 5 paragraphs):
  Specifics, examples, the work you did or saw. The bulk of the post.

The strongest objection (1 paragraph):
  Where this view breaks down or has limits. Concede honestly.

Land (2 to 4 sentences):
  Where this leaves you. No summary. No call to action.
```

**Length**: 800 to 1,500 words.

## 2. Field notes

Loose, observational. Several small ideas around a theme.

**When to use**: you have noticed three or four related things you want to put down, but no single one is large enough for a full essay. "Notes on quiet interfaces", "Six things I keep telling juniors", "What I noticed shipping our first agent".

**Shape**

```
Brief framing (2 to 4 sentences):
  Why these notes, why now. Set the theme.

Note 1 (short header that is a statement, not a label):
  1 to 3 short paragraphs. One observation, one example.

Note 2:
  Same.

Note 3 to 6:
  Same. Stop when you run out of real material.

Land (optional, 1 to 3 sentences):
  Sometimes the last note is the close. If you need a separate
  closing, keep it brief.
```

**Length**: 600 to 1,400 words depending on how many notes.

**Trap to avoid**: do not pad weak notes to make a round number. Five strong notes beat seven where two are weak.

## 3. The post-mortem (what I learned shipping X)

Story-shaped. Reflection on a specific project.

**When to use**: you shipped or co-shipped a thing, and the lessons are concrete. "What I learned shipping a no-code builder", "Six weeks rebuilding the settings page".

**Shape**

```
The setup (1 to 2 paragraphs):
  What the project was. Who was on the team. What the constraint was.
  Skip the corporate framing. Skip vague stakes. Get to the actual job.

What we tried (2 to 4 paragraphs):
  The first approach. Why we picked it. Where it broke. What we changed.
  Tell it like a story. Use the past tense. Use specifics.

The turn (1 to 2 paragraphs):
  The moment something clicked, or broke, or surprised you. The most
  interesting paragraph in the post. Often this is also the claim.

What I would do differently (1 to 2 paragraphs):
  Concrete. Not "communicate better". Specific moves you would make.

What I would still do the same (1 paragraph, optional):
  Pushes back on the cliché that everything was a mistake. Adds texture.

Land (2 to 4 sentences):
  What you carry forward.
```

**Length**: 1,200 to 2,500 words.

**Trap to avoid**: the "everything happens for a reason" tone. Real post-mortems are uneven. Some calls were good, some were not. Show both.

## 4. The pattern study

A close look at one specific UI pattern across products.

**When to use**: you want to make a craft observation about how something gets built across the industry. "A field guide to AI loading states", "Empty states that work and ones that don't".

**Shape**

```
Hook (1 paragraph):
  The pattern, named. Why you started paying attention to it.

What the pattern is doing (1 to 2 paragraphs):
  The job. What problem the pattern is trying to solve. Be precise.

Examples (3 to 6):
  Each example is its own short subsection. Name the product, describe
  what they do, and say in one sentence what it accomplishes or fails
  to accomplish. Image alt-text style descriptions if you cannot
  embed images.

The taxonomy (optional, 1 paragraph):
  If it helps the reader, group the examples into 2 or 3 kinds.

The common failure (1 paragraph):
  The mistake almost every implementation makes.

What good looks like (1 to 2 paragraphs):
  Your bar. The constraint that separates the working examples from
  the broken ones.

Land (2 to 4 sentences):
  Often: "If you are about to ship one of these, ask yourself X."
```

**Length**: 1,000 to 2,000 words.

## 5. The single-claim short

A short, sharp post built around one observation. The whole piece is the point.

**When to use**: you have one strong thing to say and dressing it up would weaken it. "Confidence is a typographic decision", "The dashboard is dead. Long live the dashboard.".

**Shape**

```
The hook (1 to 2 sentences):
  An image, an observation, a moment.

The claim (1 to 2 sentences):
  Often just the title restated.

Three or four short paragraphs:
  One specific. One example. One implication. One twist or push.

Last line:
  Short. Lands.
```

**Length**: 300 to 700 words.

**Trap to avoid**: stretching it to "blog length". If the claim is a bullet, write a bullet. If the claim is 400 words, write 400.

## 6. The list, but done right

Lists are usually lazy in personal writing. There is one shape that works: lists where every item is its own small idea, written as paragraphs, not as fragments.

**When to use**: you have an actual set of equally-weighted items that benefit from being numbered. "Six rules for designing AI loading states", "Twelve things I tell juniors about Figma files".

**Shape**

```
Brief opener (2 to 4 sentences):
  What the list is. Who it is for. Why now.

Item 1 (one short paragraph, not a fragment):
  The rule, then a short reason. Specifics.

Items 2 through N:
  Same shape. Aim for items that share a level of generality.

Brief close (optional, 1 to 3 sentences):
  Sometimes the last item is the close.
```

**Length**: 600 to 1,500 words depending on the list size.

**Hard rules**:
- Each item is at least one full sentence and ideally three or four.
- Items must not be parallel adjective tricolons. ("Faster, simpler, smarter" is not a list, it is filler.)
- Headers should be statements, not labels. "Pick the smaller surface" beats "Surface area".

**Trap to avoid**: 25-item listicles. Six is plenty. Twelve is a lot.

## How to choose

Roughly:

- One concrete claim worth defending: opinion essay or single-claim short.
- A story you want to tell: post-mortem.
- A bunch of small observations: field notes.
- A craft pattern across the industry: pattern study.
- A genuine numbered set: list-but-done-right.

If you are unsure, start with the post-mortem or the opinion essay. Those are the two strongest shapes for a working designer's blog and they almost always force the writer to a specific claim.

## On length, again

Length is a result, not a target. The shapes above give you ranges so you have a feel for the size of the room. If the post wants to be 400 words, let it be 400 words. The fastest way to write something that reads as machine-made is to pad to a length.
