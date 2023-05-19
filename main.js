class MyCalculator extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow( { mode: 'open' } );
    this._currentNumber = '0';
    this._operator = null;
    this._operand = null;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    // Creación del HTML
    this._shadowRoot.innerHTML = `
    <style>
    #calculadora {
      @apply bg-blue-500 rounded-lg p-4
    }
    #pantalla {
      @apply bg-white text-right py-2 px-4 mb-2 rounded
    } 
    button {
      @apply bg-blue-200 py-2 px-4 rounded-full m-2
    }
    #mensajeError {
      @apply  bg-white text-red-800 text-right py-2 px-4 mb-2 rounded
    }

    
  </style>

  <div id="calculadora">
    <div id="pantalla">
      ${this._currentNumber}
    </div>

  <button>
  1
  </button>
  <button>
  2
  </button>
  <button>
  3
  </button>
  <button>
  +
  </button>
  <button>
  -
  </button>
  <button>
  =
  </button>

  </div>
    `;

    // Agregar eventos a los botones
    this._shadowRoot.querySelectorAll( 'button' ).forEach( ( button ) => {
      button.addEventListener( 'click', ( event ) => {
        const buttonValue = event.target.innerText;

        switch ( buttonValue ) {
          case '+':
          case '-':
          case '*':
          case '/':
            this._operator = buttonValue;
            this._operand = parseFloat( this._currentNumber );
            this._currentNumber = '0';
            break;
          case '=':
            this.calculateResult();
            break;
          case 'C':
            this._currentNumber = '0';
            this._operator = null;
            this._operand = null;
            break;
          default:
            this._currentNumber += buttonValue;
            break;
        }

        this.render();
      } );
    } );
  }

  calculateResult() {
    switch ( this._operator ) {
      case '+':
        this._currentNumber = this._operand + parseFloat( this._currentNumber );
        break;
      case '-':
        this._currentNumber = this._operand - parseFloat( this._currentNumber );
        break;
      case '*':
        this._currentNumber = this._operand * parseFloat( this._currentNumber );
        break;
      case '/':
        this._currentNumber = this._operand / parseFloat( this._currentNumber );
        break;
      default:
        break;
    }

    this._currentNumber = this._currentNumber.toString();
    this._operator = null;
    this._operand = null;
  }

}

customElements.define( 'my-calculator', MyCalculator );
