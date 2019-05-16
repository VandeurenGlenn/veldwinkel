const displayModal = {
  name: String,
  price: Number,
  public: Boolean
};

const offerModal = {
  description: String,
  name: String,
  image: Array,
  stock: Number
};

const compose = (modal, object, target) => {
  let templateString = `
  <style>
    :host {
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }
    .column {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  </style>
  <custom-container>
  <header>
    <span class="flex"></span>
    <custom-svg-icon icon="delete"></custom-svg-icon>
  </header>

  <image-nails></image-nails>
  `;
  for (let i = 0; i < Object.keys(modal); i++) {
    // typecheck & only use modal properties
    if (modal[i] && object[i] instanceof modal[i]) {
      if (i === 'image') {
        if (typeof val === 'object') val = [...Object.entries(val)];
        if (!Array.isArray(val)) val = [val];
        val.forEach(([key, src]) => {
          console.log(key, src);
          target.nails.add({ key, src });
        });
      } else if (i === 'stock') {
        `<span class="column">
          <h4><translated-string>${i}</translated-string></h4>
          <span name="${i}">${object[i]}</span>
        </span>`;
      } else {
        templateString += `
        <span class="column">
          <h4><translated-string>${i}</translated-string></h4>
          <custom-input name="${i}" type="text" value="${object[i]}"></custom-input>
        </span>
        `;
      }
    }
  }

  templateString += `</custom-container>`;
  return templateString;
};
export { offerModal, displayModal, compose };
