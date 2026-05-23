import { CaseFigure } from "@/components/case-study/case-figure";
import { CaseHero } from "@/components/case-study/case-hero";
import { CaseSection } from "@/components/case-study/case-section";

/**
 * Arctic Edge — UI case study.
 *
 * Template type: UI. Use this as the reference for visual-craft case studies
 * (system audit, before/after, state coverage, modal vocabulary, flow grids).
 * See CarmenAICase for the UX-leaning template (problem framing, process,
 * outcome metrics).
 */
export function ArcticEdgeCase() {
  return (
    <>
      <CaseHero
        meta={[
          { label: "Client", value: "Arctic Edge · 2024" },
          { label: "Role", value: "UI Designer" },
          { label: "Scope", value: "Mobile app redesign" },
          { label: "Status", value: "Shipped to production", highlight: true },
        ]}
        title={
          <>
            Arctic Edge:
            <br />
            redesigning the
            <br />
            smart ice bath app.
          </>
        }
        lede={
          <>
            Arctic Edge makes smart ice baths for hotels, gyms, and home users. The companion app
            worked, but read as cluttered — competing surfaces, decorative colour, and a
            temperature display that was hard to read at a glance. The brief was a redesign so
            anyone, untrained, could operate the machine on the first try.
          </>
        }
        cta={{ label: "Visit Arctic Edge", href: "https://www.arcticedge.me/" }}
      />

      <CaseFigure
        priority
        images={[
          {
            src: "/work/arctic-edge/Cooling.png",
            alt: "Arctic Edge home screen in active cooling state",
          },
        ]}
        caption="Home screen · cooling state · system on"
      />

      <CaseSection
        step="01 / Context"
        title={
          <>
            A hardware app
            <br />
            inside a third-party
            <br />
            shell.
          </>
        }
      >
        <p className="text-ink">
          Arctic Edge manufactures smart cooling tubs sold to hotels, gyms, and home users. The
          hardware ships with a companion mobile app that runs inside the Tuya smart-device
          platform — the operator pairs the unit, opens the app, and lands on the control surface
          for that specific tub.
        </p>
        <p className="text-ink-dim">
          I owned the full visual system and every screen of the in-app experience after pairing.
          The account, device list, and pairing flow stayed native Tuya, untouched. The work was
          contained but the surface was load-bearing — this screen is what an Arctic Edge customer
          sees every time they use the product.
        </p>
      </CaseSection>

      <CaseSection
        step="02 / The audit"
        title={
          <>
            What the legacy
            <br />
            app got wrong.
          </>
        }
      >
        <p className="text-ink">
          Reading the existing home screen as a UI artifact, six issues stood out:
        </p>
        <ul className="space-y-3 border-l border-line pl-6 text-[17px] leading-[1.55]">
          <li>
            <strong className="font-medium">The temperature was the most important number on
            screen, set inside a 3D ice-sphere graphic.</strong> The texture fought the digits. You
            had to look twice to read a value you should read in a glance.
          </li>
          <li>
            <strong className="font-medium">There was no system state.</strong> No connection
            indicator, no cooling-or-heating mode badge. The only &ldquo;OFF&rdquo; cue was a
            button label.
          </li>
          <li>
            <strong className="font-medium">Flow rate was a bare value.</strong> A number with no
            visual reference for whether it was healthy or degraded.
          </li>
          <li>
            <strong className="font-medium">Hierarchy was flat.</strong> A white timing-control
            pill, a lock icon, an OFF circle, and a power button all carried similar visual
            weight. Nothing said which action was primary.
          </li>
          <li>
            <strong className="font-medium">Colour was decorative, not functional.</strong> A teal
            gradient sat unchanged across every state.
          </li>
          <li>
            <strong className="font-medium">Casing varied screen to screen</strong> — SET TEMP,
            Current Temp, Factory setting, USER SETTING. Four conventions on one screen.
          </li>
        </ul>
        <p className="text-ink-dim">
          The redesign needed to be one screen that answered three questions at a glance: what is
          the current temperature, what state is the machine in, and can I trust the system right
          now.
        </p>
      </CaseSection>

      <CaseSection
        step="03 / The system"
        title={
          <>
            One home screen.
            <br />
            Three levels of
            <br />
            hierarchy.
          </>
        }
      >
        <p className="text-ink">
          The home screen carries the entire active experience. Every recurring control is
          reachable without scrolling, organised into three tiers:
        </p>
        <ol className="space-y-3 text-[17px] leading-[1.55]">
          <li>
            <strong className="font-medium">Temperature dial.</strong> The current reading is set
            in display weight at the centre of a circular ring, with the unit underneath in a
            quiet sans. The ring carries the state colour and a thin tick at the target. Scale
            marks (0° and 42°) sit on the arc as a quiet reference.
          </li>
          <li>
            <strong className="font-medium">Settings rows.</strong> Set Temperature and Session
            Timer collapse into chevron rows under the dial. Common shape, common interaction —
            each row opens a bottom sheet.
          </li>
          <li>
            <strong className="font-medium">System dock.</strong> Bottom row: schedule, the power
            toggle as the visual centre, and the lock. Same pill shape, equal weight. Power gets
            the bright accent because it is the only action that is both primary and immediate.
          </li>
        </ol>
        <p className="text-ink">
          Colour does work. Blue ring for cooling, red ring for heating, dim grey when off, green
          for active power and verified states (connection, optimal flow), red for warnings and
          connection loss. Five state colours used consistently, one accent green that means
          &ldquo;active, working, all good.&rdquo;
        </p>
        <p className="text-ink-dim">
          Typography is one family in three weights. The temperature number is the only
          display-weight glyph in the product.
        </p>
      </CaseSection>

      <CaseFigure
        images={[
          {
            src: "/work/arctic-edge/Heating.png",
            alt: "Home screen — heating state with red dial ring",
          },
          {
            src: "/work/arctic-edge/System on.png",
            alt: "Home screen — system off state, power toggle in off position",
          },
          {
            src: "/work/arctic-edge/System on-2.png",
            alt: "Home screen — no connection state with red status badge",
          },
          {
            src: "/work/arctic-edge/Locked indicator in interface.png",
            alt: "Home screen — locked state with active red lock indicator",
          },
        ]}
        kicker="STATE COVERAGE"
        caption="Heating · off · disconnected · locked — the same surface, four readings of state"
      />

      <CaseSection
        step="04 / Modal vocabulary"
        title={
          <>
            Every irreversible
            <br />
            action wears the
            <br />
            same shape.
          </>
        }
      >
        <p className="text-ink">
          Destructive, irreversible, or recoverable actions all share a confirmation sheet built
          from four elements:
        </p>
        <ul className="space-y-3 text-[17px] leading-[1.55]">
          <li>
            <strong className="font-medium">An iconographic mark</strong> — lock, exclamation,
            shield, slash — sized big enough to read as a state rather than a decoration.
          </li>
          <li>
            <strong className="font-medium">A short title</strong> that names the action being
            confirmed.
          </li>
          <li>
            <strong className="font-medium">A one-sentence consequence statement.</strong>
          </li>
          <li>
            <strong className="font-medium">Two actions, never one</strong> — Cancel and the
            committed action, or Get Help and Try Again.
          </li>
        </ul>
        <p className="text-ink">
          Force Start is the most aggressive sheet in the system: bright red exclamation, a
          dedicated Safety Notice callout, and Pause / Force Start in opposite weights. It is the
          only place in the app where the committed action shares the colour of the warning glyph.
        </p>
        <p className="text-ink-dim">
          Connection Lost replaces the cooling animation with a numbered troubleshoot checklist —
          power, Wi-Fi, Bluetooth, network, restart. The app refuses to show a spinner.
        </p>
      </CaseSection>

      <CaseFigure
        images={[
          {
            src: "/work/arctic-edge/Lock confirmation modal.png",
            alt: "Lock interface confirmation sheet with three-point safety checklist",
          },
          {
            src: "/work/arctic-edge/System on-3.png",
            alt: "Connection lost sheet with five-step troubleshoot checklist",
          },
          {
            src: "/work/arctic-edge/Force start.png",
            alt: "Force start safety sheet with red exclamation and safety notice",
          },
        ]}
        kicker="SAFETY SURFACES"
        caption="Lock · connection lost · force start — same shape, different stakes"
      />

      <CaseSection
        step="05 / Set temperature"
        title={
          <>
            Two zones,
            <br />
            one dial.
          </>
        }
      >
        <p className="text-ink">
          Set Temperature opens a sheet that mirrors the home dial. Below 25°C the dial reads as a
          cold zone (blue → magenta gradient, snowflake glyph, blue tint on the zone card); above
          25°C it switches to a warm zone (orange → red, wave glyph, amber tint). The same dial,
          the same plus / minus / slider controls, the same Set Temp action — only the colour and
          the zone-card content change. One control vocabulary, two emotional contexts.
        </p>
      </CaseSection>

      <CaseFigure
        images={[
          {
            src: "/work/arctic-edge/Set temperature.png",
            alt: "Set temperature sheet in cold zone with blue dial gradient",
          },
          {
            src: "/work/arctic-edge/Set temperature-1.png",
            alt: "Set temperature sheet in warm zone with red dial gradient",
          },
        ]}
        caption="Cold zone (under 25°C) · warm zone (25°C and above)"
      />

      <CaseSection
        step="06 / Schedule and session"
        title={
          <>
            Repeating
            <br />
            behaviours,
            <br />
            different surfaces.
          </>
        }
      >
        <p className="text-ink">
          Two recurring user behaviours got their own purpose-built surfaces.
        </p>
        <p className="text-ink">
          <strong className="font-medium">Cooling Schedule</strong> is a vertical stack of timer
          cards, each carrying a coloured left edge — red for Power OFF, green for Power ON — so
          the list reads as state without parsing. Add → time picker → action toggle (ON glows
          green, OFF glows red) → repeat → optional note → confirmation. Five fields, one
          bottom-sheet, no nesting.
        </p>
        <p className="text-ink-dim">
          <strong className="font-medium">Session Timer</strong> is a different surface
          altogether. Once a session is running, the temperature dial recedes and a green circular
          timer takes the centre. A single line of guidance copy holds the bottom (&ldquo;Stay
          calm and controlled.&rdquo;), and the only actions are Pause and End. The post-session
          summary returns total time, water temperature, and goal completion — no marketing
          prompt at the end.
        </p>
      </CaseSection>

      <CaseFigure
        images={[
          {
            src: "/work/arctic-edge/Timing sessions.png",
            alt: "Cooling schedule list with coloured left edges per timer",
          },
          {
            src: "/work/arctic-edge/Timing sessions-6.png",
            alt: "Add new schedule sheet — Power ON selected",
          },
          {
            src: "/work/arctic-edge/Timing sessions-7.png",
            alt: "Add new schedule sheet — Power OFF selected",
          },
          {
            src: "/work/arctic-edge/Session added.png",
            alt: "Schedule added confirmation with shield mark and next-trigger summary",
          },
        ]}
        kicker="SCHEDULE FLOW"
        caption="List · add (ON) · add (OFF) · confirmation"
      />

      <CaseFigure
        images={[
          {
            src: "/work/arctic-edge/Session timer.png",
            alt: "Session timer setup with preset durations and safety reminder",
          },
          {
            src: "/work/arctic-edge/Session timer-2.png",
            alt: "Active ice bath session with green countdown and breathing guidance",
          },
          {
            src: "/work/arctic-edge/Session timer-1.png",
            alt: "Session complete summary with total time, water temperature, and goal completion",
          },
        ]}
        kicker="SESSION FLOW"
        caption="Set · active · complete"
      />

      <CaseSection
        step="07 / Operator surface"
        title={
          <>
            The screen
            <br />
            a manager opens
            <br />
            once a month.
          </>
        }
      >
        <p className="text-ink">
          A separate Settings screen sits behind the kebab menu, not on the home. Three operator
          controls — ozone cleaning cycle, deviation tolerance, and fan speed — each rendered as a
          labelled slider with min/max anchors. Force Start sits at the bottom, behind the same
          two-step warning pattern. This is the screen a wellness manager opens once a month. It
          needs to be findable, not present.
        </p>
      </CaseSection>

      <CaseFigure
        images={[
          {
            src: "/work/arctic-edge/Timing sessions-1.png",
            alt: "Settings screen with ozone clean, deviation tolerance, and fan speed sliders",
          },
        ]}
        caption="Operator settings · behind the kebab menu"
      />

      <CaseSection
        step="08 / Reflection"
        title={
          <>
            What I&rsquo;d
            <br />
            revisit.
          </>
        }
      >
        <p className="text-ink">
          The system works because the home screen does. Once &ldquo;what is the temperature,
          what is the machine doing, can I trust it&rdquo; is answered on one surface, every
          other screen gets easier to design.
        </p>
        <p className="text-ink-dim">
          What I&rsquo;d change: the home dock has three pill controls and the dock is not
          labelled. A first-time user reads the temperature in a second but takes longer to find
          the lock. Quiet labels under each control — or a one-second reveal on first launch —
          would close that gap without adding visual weight. The Tuya pairing flow that wraps the
          app is also a different visual world from the Arctic Edge surface inside it. A future
          version would move more of the entry experience into a fully owned wrapper so the
          language is consistent from first tap to last.
        </p>
      </CaseSection>
    </>
  );
}
