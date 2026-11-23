// Marquesina: duplicar la lista para que el bucle sea continuo.
const marquee = document.querySelector("[data-marquee]");
if (marquee && marquee.firstElementChild) {
  const clone = marquee.firstElementChild.cloneNode(true);
  clone.setAttribute("aria-hidden", "true");
  marquee.appendChild(clone);
}

// Pausa las animaciones ambientales cuando salen de pantalla.
const motionSections = document.querySelectorAll(".hero, .marquee");
if ("IntersectionObserver" in window && motionSections.length) {
  const motionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-offscreen", !entry.isIntersecting);
      });
    },
    { rootMargin: "200px 0px" }
  );

  motionSections.forEach((section) => motionObserver.observe(section));
}

// Setlist: cada fila abre su nota. Se usa un solo panel abierto a la vez.
const rows = Array.from(document.querySelectorAll(".track__row"));

function setOpen(row, open) {
  const panel = document.getElementById(row.getAttribute("aria-controls"));
  row.setAttribute("aria-expanded", String(open));
  if (panel) panel.hidden = !open;
}

rows.forEach((row) => {
  row.addEventListener("click", () => {
    const isOpen = row.getAttribute("aria-expanded") === "true";
    rows.forEach((other) => {
      if (other !== row) setOpen(other, false);
    });
    setOpen(row, !isOpen);
  });
});
