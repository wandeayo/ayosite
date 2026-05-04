# Voice: Extended Notes with Examples

The voice is a working senior product designer writing for other designers, engineers, and PMs. The texture is conversational without being chummy, opinionated without being preachy, specific without being self-indulgent.

This reference goes deeper than the SKILL.md sketch. Use it when you want to calibrate a paragraph against a clear example, or when an early draft feels close but off.

## Five voice traits, each with examples

### 1. Practitioner, not pundit

The author is in the work, not above it. They report from a desk, not from a stage.

**Right**

> Last quarter I spent three weeks rebuilding our settings page. Halfway through I realized the whole thing only existed because two PMs wanted different defaults and nobody had said no.

**Wrong**

> In modern SaaS products, settings pages have become an increasingly important surface for managing user preferences and configurations.

The first reports a thing that happened. The second is a generic claim about an industry the author is allegedly in.

### 2. Specifics first, abstractions only when earned

Concrete nouns and named things carry the weight. Abstractions are allowed once the specifics have done the work to back them up.

**Right**

> The model was returning answers in 800 milliseconds, but the spinner sat there for two and a half seconds because we were waiting on three sequential calls before showing anything.

**Wrong**

> The system was experiencing performance issues that impacted the user experience in significant ways.

If the writing has zero numbers, zero names, and zero concrete objects, it is not done.

### 3. A claim, taken seriously

Every post has at least one sentence that someone could disagree with. The post exists to make and defend that claim.

**Right**

> Most "AI thinking" indicators are dishonest. They imitate human deliberation to mask the fact that the answer is already arriving.

**Wrong**

> AI loading states are an interesting design challenge with many considerations.

If you cannot point at the claim sentence, the post has no spine.

### 4. Wry, never snarky

The humor is at the author's own expense, or at the situation. Never at a person, a competitor, or a class of users.

**Right**

> I have shipped four versions of this navigation. The fourth one is closer to the first one than I would like to admit.

**Wrong**

> Let's be honest: most designers shipping nav components have no idea what they're doing.

### 5. Comfortable changing one's mind

A recurring move in good design writing: "I used to think X. After Y happened, I think something different."

**Right**

> For years I told juniors that the design system was a contract. I still believe most of that, but I have started to think the contract was always with our future selves, not with the rest of the org.

**Wrong**

> Design systems are a contract. Period.

Strong claims are good. Stiff claims are not.

## Sentence textures to repeat

Once you have a feel for the voice, these are the textures that make it sound like a person.

### Aside in parentheses

> The redesign took six weeks (or eight, depending on which Monday you start counting from).

Parentheses do the job of em-dashes without being a tell.

### Concrete mid-sentence pivot

> We had three loading states, and exactly one of them ever fired in production.

The pivot is the specific. The reader trusts the writer because the writer trusts the detail.

### Fragment, used sparingly

> The whole system rests on one assumption. That the model knows when it does not know.

Fragments are powerful when rare. If the post has more than two of them, cut one.

### Naming the move

> This is the "cute empty state" move. It cost us three weeks.

Putting a label on a thing the writer or someone else did, and then reporting the cost, is a move that reads as written by a person with scars.

### Inline qualifier that is also a joke

> The stakeholder review went well, by which I mean nobody yelled.

Light, self-aware, lands in the same line.

### Opinion stated flatly

> I do not believe in skeleton screens.

Short. No hedging. No "I sometimes wonder if". The flat statement opens the door for the rest of the paragraph to defend or complicate it.

## Sentence textures to avoid

These are AI textures that often slip past the buzzword check because they do not contain banned words.

### The "balanced thesis" sentence

> While AI can speed up our work, it can also introduce new failure modes that designers must consider.

Reads as careful and even-handed. It is also empty. The reader cannot disagree because nothing has been said. Replace with a real claim.

### The summarizing transition

> Now that we've established the problem, let's look at the solution.

Cut. The reader is already moving.

### The reader-implication move

> We've all been there.

> If you've ever shipped a product, you know the feeling.

Cut. Always cut.

### The thesis-statement opener

> Designing for AI agents requires a new approach to interaction patterns.

Replace with a specific moment, an opinion, or a number. Not a topic sentence.

### The triple

> Faster, smarter, more elegant.

Three parallel adjectives are an LLM tic. Pick the one that matters.

## Calibration: rewrite drills

These are the kinds of fixes you should be making on every pass.

### Drill 1

**Before**

> In today's fast-paced AI landscape, designers must navigate a complex set of considerations to deliver seamless experiences for their users.

**After**

> Most AI features I have shipped this year were broken in the same way: the model worked, the loading state did not.

### Drill 2

**Before**

> Leveraging AI agents enables teams to streamline workflows and unlock new productivity gains across the organization.

**After**

> An agent that drafts five PRs while you sleep is not faster than an engineer. It is louder. There is a real difference, and the design has to know which one it is selling.

### Drill 3

**Before**

> It's important to note that loading states play a crucial role in the overall user experience of AI-powered applications.

**After**

> The loading state is the only part of an AI feature most people see often enough to form an opinion about.

### Drill 4

**Before**

> By thoughtfully designing for these constraints, we can build experiences that truly serve our users.

**After**

> (Just delete this whole sentence. The post is over.)

## Cultural register

A few notes on what fits and what does not.

- **References to specific tools are fine.** Figma, Linear, Cursor, Notion, Loom, Maze. They date a piece in a useful way.
- **References to specific companies are fine** when they make a claim concrete. "At a fintech where I shipped onboarding" is fine; gratuitous name-dropping is not.
- **Self-deprecation is fine in small doses.** "I lost a week to this" lands. "I'm just a humble designer who" does not.
- **Industry shibboleths are fine sparingly.** "We did a Crazy Eight". "I built it in FigJam first." Use them when they say something. Avoid them as decoration.
- **Avoid moralizing.** "Designers must remember that..." reads as a lecture. Show, do not tell.
- **Avoid the "we" of authority** when you mean "I". If only the author did the thing, say "I". "We" should mean a real team.

## A short voice rubric (for self-checking)

Before declaring a draft done, run through these:

1. Is there a sentence I can point to as the claim?
2. Are there at least three concrete details (a tool, a number, a name, a quote, a date, a screen size)?
3. Have I said one thing the reader could disagree with?
4. Does the opening start in the middle of a thought, not with a topic statement?
5. Does the closing stop instead of summarizing?
6. Have I avoided the parallel tricolon and the "not just X, it's Y" mirror?
7. Would a senior designer reading this nod, push back, or roll their eyes? The first two are good. The third means rewrite.
