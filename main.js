const MiCalculadora = () => {

  let numeroActual = '0';
  let operador = null;
  let operando = null;
  let mensajeError = "";

  const calcularResultado = () => {
    switch ( operador ) {
      case '+':
        numeroActual = ( operando + parseFloat( numeroActual ).toFixed( 2 ) ).toString();
        break;
      case '-':
        numeroActual = ( operando - parseFloat( numeroActual ).toFixed( 2 ).toString() );
        break;
      case '*':
        numeroActual = ( operando * parseFloat( numeroActual ).toFixed( 2 ).toString() );
        break;
      case '/':
        if ( numeroActual === '0' ) {
          mensajeError = "Error: No se puede hacer divisiones por cero"
        }
        numeroActual = ( operando / parseFloat( numeroActual ).toFixed( 2 ).toString() );
        break;
      default:
        break;
    }
    operador = null;
    operando = null;
  };

  const manejarClick = ( valorBoton ) => {

    mensajeError = "";

    switch ( valorBoton ) {
      case '+':
      case '-':
      case '*':
      case '/':

        // if ( operador !== null ) {
        //   calcularResultado();
        // }

        operador !== null && calcularResultado();

        operador = valorBoton;
        operando = parseFloat( numeroActual );
        numeroActual = '0';
        break;
      case '=':
        if ( operador === null || operando === null ) {
          mensajeError = "Error: Operador u operando no definidos";
          return;
        }
        calcularResultado();
        break;
      case 'C':
        numeroActual = '0';
        operador = null;
        operando = null;
        break;
      default:
        // va a permitir que solo ingrese numeros , y que estos solo tengan un punto decimal
        if ( !/^(\\d+\\.?\\d*|\\.\\d+)$/.test( numeroActual + valorBoton ) ) {
          mensajeError = "Error: Entrada invalida";
          return;
        }

        numeroActual += valorBoton;
        break;
    }
    renderizar();
  };

  const renderizar = () => {
    const shadowRoot = this.attachShadow( { mode: 'open' } );
    shadowRoot.innerHTML = `
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
          ${numeroActual}
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

        <div id="mensajeError">
        ${mensajeError}
        </div>
      </div>
    `;

    shadowRoot.querySelectorAll( "button" ).forEach( ( boton ) => {
      boton.addEventListener( 'click', ( evento ) => {
        const valorBoton = evento.target.innerText;
        manejarClick( valorBoton );
      } )
    } )
  };

  renderizar();
};

customElements.define( "mi-calculadora", MiCalculadora);