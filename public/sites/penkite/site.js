const menu = document.querySelector(".menu");
const navigation = document.querySelector("#navigation");
document.body.classList.add("enhanced");
menu.hidden = false;

function setMenu(open) {
  menu.setAttribute("aria-expanded", String(open));
  menu.textContent = open ? "Close" : "Menu";
  navigation.classList.toggle("open", open);
}

menu.addEventListener("click", () =>
  setMenu(menu.getAttribute("aria-expanded") !== "true"),
);
navigation.addEventListener("click", () => setMenu(false));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menu.focus();
  }
});

const dialog = document.querySelector("#reel");
const video = dialog.querySelector("video");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
let lastTrigger;
for (const link of document.querySelectorAll("[data-reel]")) {
  link.addEventListener("click", (event) => {
    if (
      !dialog.showModal ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    event.preventDefault();
    lastTrigger = link;
    dialog.showModal();
    video.currentTime = 0;
    if (motionEnabled()) video.play().catch(() => {});
  });
}
dialog.querySelector(".close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target !== dialog) return;
  const r = dialog.getBoundingClientRect();
  if (
    event.clientX < r.left ||
    event.clientX > r.right ||
    event.clientY < r.top ||
    event.clientY > r.bottom
  )
    dialog.close();
});
dialog.addEventListener("close", () => {
  video.pause();
  lastTrigger?.focus({ preventScroll: true });
});

const stage = document.querySelector(".flight-stage");
const sail = stage.querySelector(".sail");
const canvas = stage.querySelector("canvas");
const brush = canvas.getContext("2d");
const toggle = document.querySelector(".motion-toggle");
const ticker = document.querySelector(".ticker-group");
const duplicate = ticker.cloneNode(true);
duplicate.setAttribute("aria-hidden", "true");
ticker.after(duplicate);

let userPaused = false;
try {
  userPaused = localStorage.getItem("penkite-motion-paused") === "true";
} catch {
  /* Storage may be disabled. */
}

function motionEnabled() {
  return !userPaused && !reducedMotion.matches;
}

let width = 0;
let height = 0;
let sailSize = 0;
let elapsed = motionEnabled() ? 0 : 2;
let frame = 0;
let lastTime = 0;
let visible = true;

// Trace each strip from the moving knot. The wave grows downstream from the sail.
function ribbon(knotX, knotY, phase, color, thickness) {
  const points = [];
  for (let index = 0; index <= 64; index++) {
    const u = index / 64;
    const bend = Math.sin(u * 9 - elapsed * 2.1 + phase);
    const x = knotX - (knotX + width * 0.15) * u;
    const y =
      knotY +
      height *
        (0.07 * u +
          0.11 * Math.sin(u * Math.PI) * bend +
          0.1 * Math.sin(u * 4 + phase) * u);
    const half =
      thickness *
      (0.15 + 0.85 * Math.abs(Math.sin(u * 6 - elapsed + phase))) *
      Math.sin(Math.PI * u);
    points.push({ x, y, half });
  }
  brush.beginPath();
  brush.moveTo(knotX, knotY);
  for (const { x, y, half } of points) brush.lineTo(x, y - half);
  for (let i = points.length - 1; i >= 0; i--) {
    const { x, y, half } = points[i];
    brush.lineTo(x, y + half);
  }
  brush.fillStyle = color;
  brush.fill();
}

function paint() {
  const launch = Math.exp(-3.7 * elapsed);
  const dx = width * (0.082 * Math.sin(elapsed * 0.92) - 0.23 * launch);
  const dy = height * (0.079 * Math.sin(elapsed * 1.35) + 0.45 * launch);
  const angle = -7 + 11 * Math.sin(elapsed * 0.94) + 19 * launch;
  sail.style.transform =
    "translate(-50%, -50%) translate(" +
    dx +
    "px," +
    dy +
    "px) rotate(" +
    angle +
    "deg)";
  if (!brush) return;
  const radians = (angle * Math.PI) / 180;
  const ax = -0.25 * sailSize;
  const ay = 0.43 * sailSize;
  const x = width * 0.52 + dx + ax * Math.cos(radians) - ay * Math.sin(radians);
  const y =
    height * 0.45 + dy + ax * Math.sin(radians) + ay * Math.cos(radians);
  brush.clearRect(0, 0, width, height);
  ribbon(x, y, 1.8, "#ffb5a4", Math.max(2, width * 0.005));
  ribbon(x, y, 0.5, "#ff624c", Math.max(4, width * 0.011));
  ribbon(x, y, 0, "#ffc85b", Math.max(3, width * 0.006));
}

function animate(now) {
  elapsed += lastTime ? Math.min((now - lastTime) / 1000, 0.06) : 0;
  lastTime = now;
  paint();
  frame = requestAnimationFrame(animate);
}

function schedule() {
  cancelAnimationFrame(frame);
  lastTime = 0;
  if (motionEnabled() && visible && !document.hidden && !dialog.open) {
    frame = requestAnimationFrame(animate);
  }
}

function sizeStage() {
  width = stage.clientWidth;
  height = stage.clientHeight;
  sailSize = sail.offsetWidth;
  const ratio = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  brush?.setTransform(ratio, 0, 0, ratio, 0, 0);
  paint();
}

function updateMotion() {
  document.documentElement.dataset.motion = motionEnabled()
    ? "running"
    : "paused";
  if (!motionEnabled()) document.documentElement.classList.remove("animate-title");
  toggle.disabled = reducedMotion.matches;
  toggle.textContent = reducedMotion.matches
    ? "Reduced motion"
    : userPaused
      ? "Play motion"
      : "Pause motion";
  if (!motionEnabled()) video.pause();
  schedule();
}

if (motionEnabled()) document.documentElement.classList.add("animate-title");
toggle.hidden = false;
toggle.addEventListener("click", () => {
  userPaused = !userPaused;
  try {
    localStorage.setItem("penkite-motion-paused", String(userPaused));
  } catch {
    /* The choice still applies on this page. */
  }
  updateMotion();
});

reducedMotion.addEventListener("change", updateMotion);
document.addEventListener("visibilitychange", schedule);
new MutationObserver(schedule).observe(dialog, {
  attributes: true,
  attributeFilter: ["open"],
});
new ResizeObserver(sizeStage).observe(stage);
new IntersectionObserver(([entry]) => {
  visible = entry.isIntersecting;
  schedule();
}).observe(stage);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      entry.target.classList.toggle("in-view", entry.isIntersecting);
      if (entry.isIntersecting) entry.target.classList.add("entered");
    }
  },
  { threshold: 0.09 },
);
document
  .querySelectorAll(
    ".section-head, .work-grid article, .services, .founders, .contact",
  )
  .forEach((section) => sectionObserver.observe(section));

sizeStage();
updateMotion();
