import { ArcticThumb } from "@/components/landing/thumbs/thumbs";

import { StateSwitcher, ZoneToggle } from "../arctic/state-controls";
import { Body, Closing, Fig, type ImgSrc, Impact, PhoneStrip, Problems, Section } from "../blocks";
import { CaseLayout, HeroFigure } from "../case-layout";
import { CASES } from "../cases";

/** Arctic Edge screens, built by scripts/export-case-images.mjs (1x 396×869 + 2x). */
const ae = (name: string): ImgSrc => ({ src: `/work/arctic-edge/${name}`, w: 396, h: 869, hi: 2 });

/** Copy verbatim from waande-case-handoff/reference/arctic.html. */
export function ArcticEdgeCase() {
  return (
    <CaseLayout meta={CASES["arctic-edge"]}>
      <HeroFigure thumb={<ArcticThumb />} caption="Switching between cooling and heating. Hover to inspect." />

      <Impact
        label="Scope"
        items={[
          ["1", "home screen carries every recurring control"],
          ["5", "system states readable without a tap"],
          ["5", "safety sheets sharing one anatomy"],
          ["18", "screens across schedule, session and settings"],
        ]}
      />

      <Body
        toc={[
          { id: "context", label: "Context" },
          { id: "audit", label: "The audit" },
          { id: "system", label: "The system" },
          { id: "safety", label: "Safety surfaces" },
          { id: "temperature", label: "Temperature" },
          { id: "flows", label: "Schedule and session" },
          { id: "closing", label: "In closing" },
        ]}
      >
        <Section id="context" label="01 · Context" title="A hardware app inside a third-party shell.">
          <p>
            The app runs inside Tuya’s smart-device platform, so pairing, the account and back-to-list navigation were
            inherited and not mine to touch. Everything inside the device screen was.
          </p>
          <p>
            I worked with the product team on scope and screen inventory, and with the hardware team on the operator
            controls (ozone, deviation, fan speed) the settings needed to expose.
          </p>
        </Section>

        <Section id="audit" label="02 · The audit" title="What the legacy app got wrong.">
          <p>Reading the old home screen as a UI artefact, two problems outweighed the rest.</p>
          <Problems
            items={[
              ["The temperature was hard to read", "The most important number sat inside a textured 3D ice sphere. The texture fought the digits."],
              ["There was no system state", "No connection indicator, no cooling or heating badge. The only “off” cue was a button label."],
              [
                "Everything weighed the same",
                "A timing pill, a lock, an OFF circle and a power button all carried equal weight, and the colour was decorative, not functional.",
              ],
            ]}
          />
        </Section>

        <Section id="system" label="03 · The system" title="One home screen, three levels of hierarchy.">
          <p>
            The temperature sits in display weight inside a ring that carries the state colour. Set Temperature and Session
            Timer collapse into rows beneath it, and a dock holds schedule, power and lock. Power gets the bright accent
            because it is the only action that is both primary and immediate.
          </p>
          <p>Colour does work, never decoration: blue for cooling, red for heating, grey when off, green for power and verified states.</p>
        </Section>
      </Body>

      <Fig n={2} caption="Pick a state, or let it cycle. The surface never moves; only the reading changes.">
        <StateSwitcher
          heading="One home screen, five readings of state"
          states={[
            { img: ae("cooling"), alt: "Arctic Edge home screen, cooling state", title: "Cooling", line: "Blue ring, live flow rate, power on." },
            { img: ae("heating"), alt: "Arctic Edge home screen, heating state", title: "Heating", line: "Same surface, the ring turns red." },
            {
              img: ae("system-off"),
              alt: "Arctic Edge home screen, system off state",
              title: "System off",
              line: "Ring dims, flow drops to zero, the power toggle reads OFF.",
            },
            {
              img: ae("no-connection"),
              alt: "Arctic Edge home screen, no connection state",
              title: "No connection",
              line: "A red status badge replaces Connected, before anything else fails.",
            },
            {
              img: ae("locked"),
              alt: "Arctic Edge home screen, locked state",
              title: "Locked",
              line: "The lock in the dock turns red, so the state is visible without opening anything.",
            },
          ]}
        />
      </Fig>

      <Body>
        <Section id="safety" label="04 · Safety surfaces" title="Every irreversible action wears the same shape.">
          <p>
            Lock, connection lost, force start, system off and session resume share one anatomy: a mark that reads as a
            state, a short title, a one-sentence consequence, and always two actions.
          </p>
          <p>
            Force Start is the loudest sheet in the app, but the committed button stays neutral white so the visual weight
            sits on Pause, not on the destructive action. Connection Lost swaps the spinner for a numbered checklist people
            can actually follow.
          </p>
        </Section>
      </Body>

      <Fig n={3} caption="Same shape, different stakes: lock, connection lost, force start.">
        <PhoneStrip
          tile="arctic"
          phones={[
            { img: ae("lock-sheet"), alt: "Lock interface sheet with a three-point safety checklist", label: "Lock" },
            { img: ae("connection-lost"), alt: "Connection lost sheet with five troubleshooting steps", label: "Connection lost" },
            { img: ae("force-start"), alt: "Force start sheet with a safety notice", label: "Force start" },
          ]}
        />
      </Fig>

      <Body>
        <Section id="temperature" label="05 · Temperature" title="One dial, two zones.">
          <p>
            Set Temperature mirrors the home dial. Below 25°C the gradient sits cold with a snowflake and a blue zone card;
            above it warms to amber with a wave. The plus, minus, slider and Set Temp action never move.
          </p>
        </Section>
      </Body>

      <Fig n={4} caption="One dial, two zones. Below 25°C it reads cold; at 25°C and above it warms. The controls never change.">
        <ZoneToggle
          zones={[
            { label: "❄ Cold zone · 17°C", img: ae("temp-cold"), alt: "Set temperature sheet in the cold zone" },
            { label: "≋ Warm zone · 28°C", img: ae("temp-warm"), alt: "Set temperature sheet in the warm zone" },
          ]}
        />
      </Fig>

      <Body>
        <Section id="flows" label="06 · Schedule and session" title="Two recurring flows, two surfaces.">
          <p>
            Cooling schedules are timer cards with a coloured left edge, green for power on and red for power off, so the
            list reads as state without parsing. Adding one is five fields on a single sheet, no nesting.
          </p>
          <p>
            Once a session runs, the dial recedes and a green countdown takes the centre. One line of guidance, two actions,
            and a summary at the end.
          </p>
        </Section>
      </Body>

      <Fig n={5} caption="Schedule flow: list, add, confirm.">
        <PhoneStrip
          tile="arctic"
          phones={[
            { img: ae("schedules"), alt: "Cooling schedule list with coloured left edges", label: "Schedules" },
            { img: ae("add-power-on"), alt: "Add schedule sheet with Power ON selected", label: "Add · power on" },
            { img: ae("add-power-off"), alt: "Add schedule sheet with Power OFF selected", label: "Add · power off" },
            { img: ae("schedule-added"), alt: "Schedule added confirmation", label: "Confirmed" },
          ]}
        />
      </Fig>

      <Fig n={6} caption="Session flow, plus the operator settings kept behind the menu.">
        <PhoneStrip
          tile="arctic"
          phones={[
            { img: ae("session-set"), alt: "Session timer setup with presets and a safety reminder", label: "Set" },
            { img: ae("session-active"), alt: "Active ice bath session with a green countdown", label: "Active" },
            { img: ae("session-complete"), alt: "Session complete summary", label: "Complete" },
            { img: ae("settings"), alt: "Operator settings with ozone, deviation and fan speed sliders", label: "Settings" },
          ]}
        />
      </Fig>

      <Body>
        <Closing>
          Arctic Edge went from a cluttered companion app to one home screen that answers the two questions that matter, how
          cold it is and what state it’s in, at a glance. Around it sits a consistent set of safety sheets, a single dial for
          temperature, and schedule and session flows that read without thinking.
        </Closing>
      </Body>
    </CaseLayout>
  );
}
