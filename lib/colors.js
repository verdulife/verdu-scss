const cardTemplate = (v, l) => /*html*/ `
  <li>
    <div class="card col">
      <div
        class="color-box xfill"
        style="background: ${v}"
      ></div>
      <code>${l}</code>
    </div>
  </li>
`;

function shadeColor(color, percent) {
  var R = parseInt(color.substring(1, 3), 16);
  var G = parseInt(color.substring(3, 5), 16);
  var B = parseInt(color.substring(5, 7), 16);

  R = parseInt((R * (100 + percent)) / 100);
  G = parseInt((G * (100 + percent)) / 100);
  B = parseInt((B * (100 + percent)) / 100);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  var RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
  var GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
  var BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

  return "#" + RR + GG + BB;
}

export function createPalette(label, color) {
  const wrapper = document.createElement("div");
  const title = document.createElement("h3");
  const list = document.createElement("ul");

  wrapper.classList.add("col");
  wrapper.style.marginBottom = "60px";
  wrapper.style.gap = "10px";
  title.innerHTML = `${label} <small>(${color})</small>`;
  title.style.textTransform = "capitalize";
  list.classList.add("row");

  const varName = label.substring(0, 3);

  for (let i = 3; i > 0; i--) {
    let v = shadeColor(color, i * 15);
    const l = `var(--${varName}-${3 - i + 1}00)`;
    list.insertAdjacentHTML("beforeend", cardTemplate(v, l));
  }

  list.insertAdjacentHTML(
    "beforeend",
    cardTemplate(color, `var(--${varName})`)
  );

  for (let i = 0; i < 3; i++) {
    let v = shadeColor(color, (i + 1) * -25);
    const l = `var(--${varName}-${i + 4}00)`;
    list.insertAdjacentHTML("beforeend", cardTemplate(v, l));
  }

  wrapper.appendChild(title);
  wrapper.appendChild(list);
  document.body.appendChild(wrapper);
}

export function neutralPalette(label) {
  const white = "#ffffff";
  const wrapper = document.createElement("div");
  const title = document.createElement("h3");
  const list = document.createElement("ul");

  wrapper.classList.add("col");
  wrapper.style.marginBottom = "60px";
  wrapper.style.gap = "10px";
  title.innerHTML = label;
  title.style.textTransform = "capitalize";
  list.classList.add("row");

  const varName = label.substring(0, 3);

  for (let i = 0; i < 7; i++) {
    let v = shadeColor(white, i * -16.7);
    const l = `var(--${varName}-${i + 1}00)`;
    list.insertAdjacentHTML("beforeend", cardTemplate(v, l));
  }

  wrapper.appendChild(title);
  wrapper.appendChild(list);
  document.body.appendChild(wrapper);
}

export function customPalette(label, colors) {
  const wrapper = document.createElement("div");
  const title = document.createElement("h3");
  const list = document.createElement("ul");

  wrapper.classList.add("col");
  wrapper.style.marginBottom = "60px";
  wrapper.style.gap = "10px";
  title.innerHTML = label;
  title.style.textTransform = "capitalize";
  list.classList.add("row");

  const varName = label.substring(0, 1);

  for (let color in colors) {
    const v = colors[color];
    const l = `var(--${varName}-${color})`;
    list.insertAdjacentHTML("beforeend", cardTemplate(v, l));
  }

  wrapper.appendChild(title);
  wrapper.appendChild(list);
  document.body.appendChild(wrapper);
}
