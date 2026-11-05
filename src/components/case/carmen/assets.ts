import type { ImgSrc } from "../blocks";

/**
 * Carmen images. 1x captures from the handoff (waande-case-handoff/assets): the
 * 2x re-export from Figma file vwDdZdo2eN64qSr1aHooSH is still to do (the
 * Figma API was rate-limited, 2026-11-05). When it lands, add `hi: 2`.
 */
const dir = "/work/carmen-ai";

/** fa_left: the onboarding frames' fixed left panel. */
export const ONBOARDING_LEFT: ImgSrc = { src: `${dir}/fa-left`, w: 520, h: 1157 };
/** fa_av: Carmen's avatar. */
export const AVATAR: ImgSrc = { src: `${dir}/fa-av`, w: 80, h: 80 };
/** fa_logo: the sample partner's logo. */
export const PARTNER_LOGO: ImgSrc = { src: `${dir}/fa-logo`, w: 100, h: 100 };
/** cs_command: the full command center screen. */
export const COMMAND_CENTER: ImgSrc = { src: `${dir}/cs-command`, w: 1240, h: 2440 };
export const STAT_CARDS: ImgSrc = { src: `${dir}/cs-stats`, w: 514, h: 148 };
export const TIMELINE: ImgSrc = { src: `${dir}/cs-timeline`, w: 383, h: 284 };
export const RUNNING_TOAST: ImgSrc = { src: `${dir}/cs-toast`, w: 272, h: 70 };
export const CAMPAIGN_HEAD: ImgSrc = { src: `${dir}/cs-head`, w: 232, h: 56 };
