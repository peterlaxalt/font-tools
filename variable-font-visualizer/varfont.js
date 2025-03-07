class VariableFontTools {
  constructor() {
    this.dom = {
      wrapper: {
        key: "[data-vf-wrapper]",
        current: null,
      },
      loader: {
        key: "[data-vf-loader]",
        current: null,
      },
      weightProof: {
        key: "[data-vf-weight-proof]",
        current: null
      },
      weightSlider: {
        key: "[data-vf-weight-slider]",
        current: null
      },
      fgColorPicker: {
        key: "[data-vf-fg-color]",
        current: null
      },
      bgColorPicker: {
        key: "[data-vf-bg-color]",
        current: null
      }
    };

    this.mode = {};

    this.cursorConfig = {};

    this.DEBUG_VERBOSE = true;

    this.init();
  }

  updateFont(data) {
    console.log("vf ~ handleFontUpload(e)", data);

    let styleTag = document.createElement("style");
    let fontName = "TestFont";

    let fontDeclaration = `@font-face { font-family: ${fontName}; src: url('${data}')}`;

    styleTag.appendChild(document.createTextNode(fontDeclaration));

    document.head.appendChild(styleTag);
  }

  handleFontUpload(e) {
    console.log("vf ~ handleFontUpload(e)", e);

    let fontData = null;

    let uploadedFiles = e.target.files;
    let uploadedFileFirstChild = uploadedFiles[0];

    let reader = new FileReader();

    const _self = this;

    reader.readAsDataURL(uploadedFileFirstChild);

    function readAndUpdateFont(data) {
      console.log("vf ~ handleFontUpload().readAndUpdateFont()", data);
  
      _self.updateFont(data);
    }

    reader.onloadend = () => readAndUpdateFont(reader.result).bind(this);

    return;
  }

  addLoaderEventListeners(el) {
    console.log("vf ~ addLoaderEventListeners()");

    let _self = this;

    el.addEventListener("change", (e) => _self.handleFontUpload(e).bind(this));
  }

  handleWeightProofSlider(e, parent) {
    console.log("vf ~ handleWeightProofSlider()", e.target.value, parent);

    parent.setAttribute("style", `--fw: ${e.target.value}`)
  }

  addWeightProofEventListeners(el) {
    console.log("vf ~ addWeightProofEventListeners()");

    let _self = this;
    let sliderElement = el.querySelector(this.dom.weightSlider.key);

    if (sliderElement) {
      console.log("vf ~ addWeightProofEventListeners(): sliderElement found", sliderElement);

      // sliderElement.addEventListener("change", (e) => _self.handleWeightProofSlider(e, el).bind(this));

      sliderElement.oninput = (e) => _self.handleWeightProofSlider(e, el)
    }
  }

  handlePaletteUpdate(e, el, type) {
    console.log(`vf ~ handlePaletteUpdate(): ${type}`, e, el);

    let fgDataAttr = "data-vf-fg-color"
    let bgDataAttr = "data-vf-bg-color"

    
    if (type == "bg") {
      document.body.setAttribute(bgDataAttr, e.target.value)
    }
    
    if (type == "fg") {
      document.body.setAttribute(fgDataAttr, e.target.value)
    }
    
    let fgValue = document.body.getAttribute(fgDataAttr)
    let bgValue = document.body.getAttribute(bgDataAttr)
    
    document.body.setAttribute("style", `${bgValue ? `--clr-bg:${bgValue};` : ""} ${fgValue ? `--clr-fg:${fgValue};` : ""}`)
  }

  addPalettePickerEventListeners(fgEl, bgEl) {
    console.log("vf ~ addPalettePickerEventListeners()");

    let _self = this;

    fgEl.oninput = (e) => _self.handlePaletteUpdate(e, fgEl, "fg")
    bgEl.oninput = (e) => _self.handlePaletteUpdate(e, bgEl, "bg")
  }

  createDOM() {
    console.log("vf ~ createDOM()");

    let loaderElement = document.querySelector(this.dom.loader.key);
    let weightProof = document.querySelector(this.dom.weightProof.key);
    let fgColorPicker = document.querySelector(this.dom.fgColorPicker.key);
    let bgColorPicker = document.querySelector(this.dom.bgColorPicker.key);
    

    if (loaderElement) {
      console.log("vf ~ createDOM(): loaderElement detected");
      this.addLoaderEventListeners(loaderElement);
    }

    if (weightProof) {
      console.log("vf ~ createDOM(): weightProof detected");
      this.addWeightProofEventListeners(weightProof);
    }

    if (fgColorPicker && bgColorPicker) {
      console.log("vf ~ createDOM(): fgColorPicker/bgColorPicker detected");
      this.addPalettePickerEventListeners(fgColorPicker, bgColorPicker);
    }

    return;
  }

  log(msg, extras = " ", isError = false) {
    if (!this.DEBUG_VERBOSE) return;

    if (!isError) {
      console.log("vf ~ " + msg, extras);
    } else {
      console.error("vf ~ " + msg, extras);
    }
  }

  init() {
    this.log("init(): initialized");

    this.createDOM();
  }
}

let init = new VariableFontTools();
