function app_alert(tekst) {
    const div = document.createElement('div')
    const h1 = document.createElement('h1')
    const button = document.createElement('button')
    div.id = 'alertDiv'
    h1.id = 'alertH1'
    button.id = 'alertButton'
    h1.innerHTML = tekst
    button.innerHTML = 'OK'
    div.appendChild(h1)
    div.appendChild(button)
    document.querySelector('#app').appendChild(div)
    button.addEventListener('click', () => {
        div.remove()
    })
}
async function pobierz({
    adr_end,
    kolumna_gora,
    id_gdzie,
    przyciski,
    dodawanieText,
    usuwanieText,
    pierwszyPlaceholder,
    drugiPlaceholder,
    trzeciPlaceholder,
    wyslijPrzycisk,
    nieprawidloweDodawanie,
    nieprawidloweUsuwanie,
},id = 0) {
    const response = await fetch(`http://localhost:1000/${adr_end}`)
    const res = await response.json()
    const div = document.querySelector(`${id_gdzie}`)
    if(document.querySelector('.dodawanie')) {
        div.classList.remove('dodawanie')
    }
    div.innerHTML = ''
    const tabela = document.createElement('table')
    const kol = document.createElement('tr')
    kol.innerHTML = kolumna_gora
    tabela.appendChild(kol)
 res.forEach(e => {
    const kol = document.createElement('tr')
    kol.addEventListener('click', () => {
        const id_id = e.id
        let klasa = `${id_gdzie}`
        klasa = klasa.replace('#', '') 
        if(document.querySelector(`.${klasa}`)){
            if(kol.className !== (`${klasa}`)){
                document.querySelector(`.${klasa}`).classList.remove(`${klasa}`)
            }
        }
        // if(document.querySelector(`.zaznaczony`)){
        //     if(kol.className !== ('zaznaczony')){
        //         document.querySelector('.zaznaczony').classList.remove('zaznaczony')
        //     }
        // }
        //document.querySelector(`${id_gdzie}>.zaznaczony`)
        kol.classList.toggle(`${klasa}`)
        if(id === id_id){
            id = 0
        }else {
            id = id_id
        }
        if(przyciski === false) {
            if(adr_end === 'klocki') {
                document.querySelector('#counter1').innerHTML = id
            } else if(adr_end === 'zestawy') {
                document.querySelector('#counter2').innerHTML = id
            }
        }
    })
    if(adr_end === 'klocki') {
        kol.innerHTML = `<td>${e.id}</td><td>${e.kod}</td><td>${e.nazwa}</td><td>${e.kolor}</td><td><img src="./zdj/zdj.jpg" /></td>`
    }
    else if(adr_end === 'zestawy') {
        kol.innerHTML = `<td>${e.id}</td><td>${e.kod_zestawu}</td><td>${e.nazwa}</td><td>${e.ilosc_klockow}</td><td><img src="./zdj/zdj.jpg" /></td>`
    }
    tabela.appendChild(kol)
    })
div.appendChild(tabela)
    if(przyciski) {
        const dodawanie = document.createElement('button')
const usuwanie = document.createElement('button')
dodawanie.classList.add('dodus')
usuwanie.classList.add('dodus')
dodawanie.textContent = `${dodawanieText}`
usuwanie.textContent = `${usuwanieText}`
const divdous = document.createElement('div')
divdous.id = 'divdous'
divdous.appendChild(dodawanie)
divdous.appendChild(usuwanie)
div.appendChild(divdous)
dodawanie.addEventListener('click', () => {
    div.innerHTML = ``
    const pierwszy = document.createElement('input')
    const drugi = document.createElement('input')
    const trzeci = document.createElement('input')
    const wyslij = document.createElement('button')
    pierwszy.placeholder = `${pierwszyPlaceholder}`
    drugi.placeholder = `${drugiPlaceholder}`
    trzeci.placeholder = `${trzeciPlaceholder}`
    wyslij.innerHTML = `${wyslijPrzycisk}`
    pierwszy.classList.add('dodawanie')
    drugi.classList.add('dodawanie')
    trzeci.classList.add('dodawanie')
    wyslij.classList.add('dodawanie')
    div.appendChild(pierwszy)
    div.appendChild(drugi)
    div.appendChild(trzeci)
    div.appendChild(wyslij)
    div.classList.add('dodawanie')
    wyslij.addEventListener('click', () => {
        if(pierwszy.value.length !== 0 && drugi.value.length !== 0 && trzeci.value.length !== 0) {
            let czy_dalej = false
            async function wyslij() {
                if(adr_end === 'klocki') {
                    await fetch(`http://localhost:1000/${adr_end}`,{
                        method: "POST",
                        body: JSON.stringify({
                            kod: pierwszy.value,
                            nazwa: drugi.value,
                            kolor: trzeci.value,
                            usunac: false
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                        }).then(res => {
                            if(res.status !== 200) {
                                app_alert(`${nieprawidloweDodawanie}`)
                            } else {
                                czy_dalej = true
                            }       
                        })
                }
                else if(adr_end === 'zestawy') {
                    await fetch(`http://localhost:1000/${adr_end}`,{
                        method: "POST",
                        body: JSON.stringify({
                            kod_zestawu: pierwszy.value,
                            nazwa: drugi.value,
                            ilosc_klockow: trzeci.value,
                            usunac: false
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                        }).then(res => {
                            if(res.status !== 200) {
                                app_alert(`${nieprawidloweDodawanie}`)
                            } else {
                                czy_dalej = true
                            }       
                        })
                }
            }
            wyslij().then(() => {
                if(czy_dalej) {
                    pobierz({
                        adr_end: `${adr_end}`,
                        kolumna_gora: `${kolumna_gora}`,
                        id_gdzie: `${id_gdzie}`,
                        przyciski: przyciski,
                        dodawanieText: `${dodawanieText}`,
                        usuwanieText: `${usuwanieText}`,
                        pierwszyPlaceholder: `${pierwszyPlaceholder}`,
                        drugiPlaceholder: `${drugiPlaceholder}`,
                        trzeciPlaceholder: `${trzeciPlaceholder}`,
                        wyslijPrzycisk: `${wyslijPrzycisk}`,
                        nieprawidloweDodawanie: `${nieprawidloweDodawanie}`,
                        nieprawidloweUsuwanie: `${nieprawidloweUsuwanie}`,  
                    })
                }
            })
        } else {
            app_alert('Prosze wprowadzić do wszystkich pól wartości')
        }
    })
})
usuwanie.addEventListener('click', () => {
    if(id === 0) {
        app_alert('Prosze zaznaczyć pole do usunięcia')
    } else {
        let czy_dalej = false
        async function wyslij() {
            await fetch(`http://localhost:1000/${adr_end}`,{
            method: "POST",
            body: JSON.stringify({
                id: id,
                usunac: true
            }),
            headers: {
                "Content-Type": "application/json"
            }
            }).then(res => {
                if(res.status !== 200) {
                    app_alert(`${nieprawidloweUsuwanie}`)
                } else {
                    czy_dalej = true
                }        
            })
        }
        wyslij().then(() => {
            if(czy_dalej) {
                pobierz({
                    adr_end: `${adr_end}`,
                    kolumna_gora: `${kolumna_gora}`,
                    id_gdzie: `${id_gdzie}`,
                    przyciski: przyciski,
                    dodawanieText: `${dodawanieText}`,
                    usuwanieText: `${usuwanieText}`,
                    pierwszyPlaceholder: `${pierwszyPlaceholder}`,
                    drugiPlaceholder: `${drugiPlaceholder}`,
                    trzeciPlaceholder: `${trzeciPlaceholder}`,
                    wyslijPrzycisk: `${wyslijPrzycisk}`,
                    nieprawidloweDodawanie: `${nieprawidloweDodawanie}`,
                    nieprawidloweUsuwanie: `${nieprawidloweUsuwanie}`,  
                })
            }
        })
    }
})
    }
}
document.querySelector('#klocki').addEventListener('click', () => {
    pobierz({
        adr_end: 'klocki',
        kolumna_gora: '<td>id</td><td>kod</td><td>nazwa</td><td>kolor</td><td>zdjęcie</td>',
        id_gdzie: '#reload',
        przyciski: true,
        dodawanieText: 'Dodawanie Klocka',
        usuwanieText: 'Usuwanie Klocka',
        pierwszyPlaceholder: 'Wprowadzi kod klocka',
        drugiPlaceholder: 'Wprowadzi nazwe klocka',
        trzeciPlaceholder: 'Wprowadzi kolor klocka',
        wyslijPrzycisk: 'Stwórz Klocek',
        nieprawidloweDodawanie: 'Nieprawidłowy kod klocka należy wpisać liczbe',
        nieprawidloweUsuwanie: 'Nie można usunąć klocka który został przypisany do zestawu',
    })
})
document.querySelector('#zestawy').addEventListener('click', () => {
    pobierz({
        adr_end: 'zestawy',
        kolumna_gora: '<td>id</td><td>kod zestawu</td><td>nazwa</td><td>ilość klocków</td><td>zdjęcie</td>',
        id_gdzie: '#reload',
        przyciski: true,
        dodawanieText: 'Dodawanie Zestawu',
        usuwanieText: 'Usuwanie Zestawu',
        pierwszyPlaceholder: 'Wprowadzi kod zestawu',
        drugiPlaceholder: 'Wprowadzi nazwe zestawu',
        trzeciPlaceholder: 'Wprowadzi ilość klocków',
        wyslijPrzycisk: 'Stwórz Zestaw',
        nieprawidloweDodawanie: 'Nieprawidłowy kod zestawu lub ilość klocków należy wpisać liczbe',
        nieprawidloweUsuwanie: 'Nie można usunąć zestawu który został przypisany do klocka',
    })
})
document.querySelector('#polaczenie').addEventListener('click', () => {
    const div = document.querySelector('#reload')
    const glowny = document.createElement('div')
    glowny.id = 'glowny'
    div.innerHTML = ''
    const lewy = document.createElement('div')
    const srodkowy = document.createElement('div')
    const prawy = document.createElement('div')
    const przycisk = document.createElement('button')
    przycisk.addEventListener('click', () => {
        async function pobierz() {
            await fetch('http://localhost:1000/polaczenie', {
                method: "POST",
                body: JSON.stringify({
                    id_klocka: document.querySelector('#counter1').textContent,
                    id_zestawu: document.querySelector('#counter2').textContent,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(res => {
                if(res.status !== 200) {
                    app_alert('Błąd id jest tekstem lub jest równe 0')
                } else {
                    app_alert('Pomyślnie przypisano klocek do zestawu')
                    document.querySelector('#counter1').textContent = 0
                    document.querySelector('#counter2').textContent = 0
                }
            })
        }
        pobierz()
    })
    const p1 = document.createElement('h2')
    const p2 = document.createElement('h2')
    const h1 = document.createElement('h2')
    const h2 = document.createElement('h2')
    h1.innerHTML = 'id klocka'
    h2.innerHTML = 'id zestawu'
    p1.innerHTML = 0
    p2.innerHTML = 0
    przycisk.innerHTML = `Połącz`
    lewy.id = 'lewy'
    srodkowy.id = 'srodkowy'
    prawy.id = 'prawy'
    p1.id = 'counter1'
    p2.id = 'counter2'
    srodkowy.appendChild(h1)
    srodkowy.appendChild(p1)
    srodkowy.appendChild(h2)
    srodkowy.appendChild(p2)
    srodkowy.appendChild(przycisk)
    glowny.appendChild(lewy)
    glowny.appendChild(srodkowy)
    glowny.appendChild(prawy)
    div.appendChild(glowny)
    pobierz({
        adr_end: 'klocki',
        kolumna_gora: '<td>id</td><td>kod</td><td>nazwa</td><td>kolor</td><td>zdjęcie</td>',
        id_gdzie: '#lewy',
        przyciski: false,
        dodawanieText: 'Dodawanie Klocka',
        usuwanieText: 'Usuwanie Klocka',
        pierwszyPlaceholder: 'Wprowadzi kod klocka',
        drugiPlaceholder: 'Wprowadzi nazwe klocka',
        trzeciPlaceholder: 'Wprowadzi kolor klocka',
        wyslijPrzycisk: 'Stwórz Klocek',
        nieprawidloweDodawanie: 'Nieprawidłowy kod klocka należy wpisać liczbe',
        nieprawidloweUsuwanie: 'Nie można usunąć klocka który został przypisany do zestawu',
    })
    pobierz({
        adr_end: 'zestawy',
        kolumna_gora: '<td>id</td><td>kod zestawu</td><td>nazwa</td><td>ilość klocków</td><td>zdjęcie</td>',
        id_gdzie: '#prawy',
        przyciski: false,
        dodawanieText: 'Dodawanie Zestawu',
        usuwanieText: 'Usuwanie Zestawu',
        pierwszyPlaceholder: 'Wprowadzi kod zestawu',
        drugiPlaceholder: 'Wprowadzi nazwe zestawu',
        trzeciPlaceholder: 'Wprowadzi ilość klocków',
        wyslijPrzycisk: 'Stwórz Zestaw',
        nieprawidloweDodawanie: 'Nieprawidłowy kod zestawu lub ilość klocków należy wpisać liczbe',
        nieprawidloweUsuwanie: 'Nie można usunąć zestawu który został przypisany do klocka',
    })
})