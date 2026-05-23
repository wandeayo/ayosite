import { CaseFigure } from "@/components/case-study/case-figure";
import { CaseHero } from "@/components/case-study/case-hero";
import { CaseSection } from "@/components/case-study/case-section";

/**
 * Arctic Edge: UI case study.
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
          { label: "Status", value: "Delivered", highlight: true },
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
            Arctic Edge makes smart ice baths. Their existing companion app worked, but read as
            cluttered. Competing surfaces, decorative colour, and a temperature display that was
            hard to read at a glance. The brief was a redesign so the people using the tub could
            operate it without thinking about the app.
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
          Arctic Edge ships smart cooling tubs with a companion mobile app. The app runs inside
          the Tuya smart-device platform, so an operator pairs the unit, opens the app, and lands
          on the control surface for that specific tub. The redesign covered everything inside
          that device screen.
        </p>
        <p className="text-ink">
          The platform constraint was Tuya. The app account, the device pairing flow, the
          back-to-list navigation: all inherited from Tuya&rsquo;s smart-home stack and not mine
          to touch. Anything past the device screen, I owned.
        </p>
        <p className="text-ink-dim">
          I worked with the Arctic Edge product team on scope and screen inventory. The hardware
          team set the operator controls (ozone, deviation, fan speed) that the settings screen
          needed to expose.
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
            <strong className="font-medium">Casing varied screen to screen.</strong> SET TEMP,
            Current Temp, Factory setting, USER SETTING. Four conventions on one screen.
          </li>
        </ul>
        <p className="text-ink-dim">
          From the audit, two things had to be fixed first. The temperature needed to be
          unmissable. The system state needed to be visible without tapping. Everything else
          followed.
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
          reachable without scrolling, organised into three visible tiers:
        </p>
        <ol className="space-y-3 text-[17px] leading-[1.55]">
          <li>
            <strong className="font-medium">Temperature dial.</strong> The current reading sits in
            display weight at the centre of a circular ring, with the unit underneath in a quiet
            sans. The ring carries the state colour and a thin tick at the target. Scale marks
            (0° and 42°) sit on the arc as a quiet reference.
          </li>
          <li>
            <strong className="font-medium">Settings rows.</strong> Set Temperature and Session
            Timer collapse into chevron rows under the dial. Common shape, common interaction;
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
          for active power and verified states (connection, optimal flow). A small palette,
          applied to state and never as chrome.
        </p>
        <p className="text-ink-dim">
          Typography is restrained. One sans family does most of the work, and the display weight
          is reserved for the temperature itself, which makes the number read as the primary
          object on the screen.
        </p>
      </CaseSection>

      <CaseFigure
        images={[
          {
            src: "/work/arctic-edge/Heating.png",
            alt: "Home screen, heating state with red dial ring",
          },
          {
            src: "/work/arctic-edge/System on.png",
            alt: "Home screen, system off state, power toggle in off position",
          },
          {
            src: "/work/arctic-edge/System on-2.png",
            alt: "Home screen, no connection state with red status badge",
          },
          {
            src: "/work/arctic-edge/Locked indicator in interface.png",
            alt: "Home screen, locked state with active red lock indicator",
          },
        ]}
        kicker="STATE COVERAGE"
        caption="Heating, off, disconnected, locked. Same surface, four readings of state."
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
          Five different bottom sheets share the same anatomy: lock, force start, system off,
          connection lost, and session resume. Each is built from four elements:
        </p>
        <ul className="space-y-3 text-[17px] leading-[1.55]">
          <li>
            <strong className="font-medium">An iconographic mark</strong> (lock, exclamation,
            shield, slash), sized to read as a state and not a decoration.
          </li>
          <li>
            <strong className="font-medium">A short title</strong> that names the action being
            confirmed.
          </li>
          <li>
            <strong className="font-medium">A one-sentence consequence statement.</strong>
          </li>
          <li>
            <strong className="font-medium">Two actions, never one.</strong> Cancel and the
            committed action, or Get Help and Try Again.
          </li>
        </ul>
        <p className="text-ink">
          Force Start is the most aggressive sheet in the system. Bright red exclamation, a
          dedicated Safety Notice callout, and Pause / Force Start in opposite weights. The
          warning glyph is the loudest red in the app, but the committed Force Start button stays
          a neutral white so the visual weight sits on Pause, not on the destructive action.
        </p>
        <p className="text-ink-dim">
          Connection Lost replaces the cooling animation with a numbered troubleshoot checklist:
          power, Wi-Fi, Bluetooth, network, restart. The recovery flow has no spinner, only the
          checklist and the two recovery actions.
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
        caption="Lock, connection lost, force start. Same shape, different stakes."
      />

      <CaseSection
        step="05 / Setting the temperature"
        title={
          <>
            One dial,
            <br />
            two zones.
          </>
        }
      >
        <p className="text-ink">
          Set Temperature opens a sheet that mirrors the home dial. Below 25°C the gradient sits
          cold (blue into magenta, snowflake glyph, blue tint on the zone card). Above 25°C it
          warms (orange into red, wave glyph, amber tint). The dial, the plus and minus, the
          slider, the Set Temp action: all the same. Only the colour and the zone-card content
          change with the value.
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
        caption="Cold zone (under 25°C), warm zone (25°C and above)"
      />

      <CaseSection
        step="06 / Schedule and session"
        title={
          <>
            Two recurring
            <br />
            flows, two surfaces.
          </>
        }
      >
        <p className="text-ink">
          <strong className="font-medium">Cooling Schedule</strong> is a vertical stack of timer
          cards. Each card carries a coloured left edge (red for Power OFF, green for Power ON),
          so the list reads as state without parsing. Add a schedule, pick the time, pick the
          action, pick the repeat pattern, add an optional note, confirm. Five fields on one
          bottom sheet, no nesting.
        </p>
        <p className="text-ink-dim">
          <strong className="font-medium">Session Timer</strong> is a different surface. Once a
          session is running, the temperature dial recedes and a green circular timer takes the
          centre. A single line of guidance copy holds the bottom (&ldquo;Stay calm and
          controlled.&rdquo;), and the only actions are Pause and End. The post-session summary
          returns total time, water temperature, and goal completion.
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
            alt: "Add new schedule sheet, Power ON selected",
          },
          {
            src: "/work/arctic-edge/Timing sessions-7.png",
            alt: "Add new schedule sheet, Power OFF selected",
          },
          {
            src: "/work/arctic-edge/Session added.png",
            alt: "Schedule added confirmation with shield mark and next-trigger summary",
          },
        ]}
        kicker="SCHEDULE FLOW"
        caption="List, add (ON), add (OFF), confirmation"
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
        caption="Set, active, complete"
      />

      <CaseSection
        step="07 / Operator settings"
        title={
          <>
            The screen
            <br />
            behind the menu.
          </>
        }
      >
        <p className="text-ink">
          A separate Settings screen sits behind the kebab menu, not on the home. Three operator
          controls (ozone cleaning cycle, deviation tolerance, and fan speed) each render as a
          labelled slider with min and max anchors. Force Start sits at the bottom, behind the
          same two-step warning pattern. This screen is built to be findable on demand, not to
          take attention by default.
        </p>
      </CaseSection>

      <CaseFigure
        images={[
          {
            src: "/work/arctic-edge/Timing sessions-1.png",
            alt: "Settings screen with ozone clean, deviation tolerance, and fan speed sliders",
          },
        ]}
        caption="Operator settings, behind the kebab menu"
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
          The system works because the home screen does. Once the current temperature and the
          system state are answered on one surface, every other screen gets easier to design
          against.
        </p>
        <p className="text-ink-dim">
          What I&rsquo;d change. The home dock has three pill controls and none of them are
          labelled. I suspect a first-time user finds the lock slower than the temperature, and
          quiet labels under each control (or a one-second reveal on first launch) would close
          that gap. The Tuya pairing flow that wraps the app is also a different visual world
          from the Arctic Edge surface inside it. A future version would move more of the entry
          experience into a fully owned wrapper, so the visual language does not shift between
          pairing and use.
        </p>
      </CaseSection>
    </>
  );
}
