function autocompletar() {
    const inputPalabra = document.querySelector('#tipo-palabra');
    let indexFocus = -1;

    inputPalabra.addEventListener('input', function () {
        const tipoPalabra = this.value;

        if (!tipoPalabra) return false;

        cerrarLista();

        //CREAR LA LISTA DE SUGERENCIAS
        const divList = document.createElement('div');
        divList.setAttribute('id', this.id + '-lista-autocompletar');
        divList.setAttribute('class', 'lista-autocompletar-items');
        this.parentNode.appendChild(divList);

        var jqxhr = $.get("/buscarPalabra", { palabra: tipoPalabra })
            .done(function (data) {
                //console.log(data);
                var arrResp = data.p;
                arrResp.forEach(item => {
                    //console.log(item);
                    if (item.substr(0, tipoPalabra.length) == tipoPalabra) {
                        const elementoLista = document.createElement('div');
                        elementoLista.innerHTML = `<strong>${item.substr(0, tipoPalabra.length)}</strong>${item.substr(tipoPalabra.length)}`;
                        elementoLista.addEventListener('click', function () {
                            inputPalabra.value = this.innerText;
                            cerrarLista();
                            return false;
                        })
                        divList.appendChild(elementoLista);
                    }
                });
            });

    });

    inputPalabra.addEventListener('keydown', function (e) {
        const divList = document.querySelector('#' + this.id + '-lista-autocompletar');
        let items;

        if (divList) {
            items = divList.querySelectorAll('div');

            switch (e.keyCode) {
                case 40: //TECLA DE ABAJO
                    indexFocus++;
                    if (indexFocus > items.length - 1) indexFocus = items.length - 1;
                    break;

                case 38: //TECLA DE ARRIBA
                    indexFocus--;
                    if (indexFocus < 0) indexFocus = 0;
                    break;

                case 13: //TECLA DE ENTER
                    e.preventDefault();
                    items[indexFocus].click();
                    indexFocus = -1;
                    break;

                default:
                    break;
            }

            seleccionar(items, indexFocus);
            return false;
        }
    });

    document.addEventListener('click', function () {
        cerrarLista();
    });
}

function seleccionar(items, indexFocus) {
    if (!items || indexFocus == -1) return false;
    items.forEach(x => { x.classList.remove('autocompletar-active') });
    items[indexFocus].classList.add('autocompletar-active');
}

function cerrarLista() {
    const item = document.querySelectorAll('.lista-autocompletar-items');
    item.forEach(item => {
        item.parentNode.removeChild(item);
    });
    indexFocus = -1;
}

//autocompletar(['perro', 'gato', 'pez', 'paloma', 'conejo']);
autocompletar();