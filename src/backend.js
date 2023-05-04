const sql = require('mysql')
const express = require('express')
const cors = require('cors')
const app = express()
const con = sql.createConnection({
  host: 'localhost',
  port: 3306, 
  user: 'root',
  password: '',
  database: 'lego'
})
// Połączenie z bazą danych
con.connect( (err) => {
  if(err) throw err
})
// Obsługa polityki wysyłana plików
app.use(cors())
// Obsługa json przez express
app.use(express.json())
// Uruchomienie serwera na porcie 1000
app.listen(1000)
// Obsługa działania w przeglądarce i zwrócenie przeglądarce plików css i js do prawidłowego funkcjonowania
app.get('/', (req,res) => {
  res.sendFile(__dirname + '/index.html', () => {
    res.end()
  })
})
app.get('/index.css', (req,res) => {
  res.sendFile(__dirname + '/index.css', () => {
    res.end()
  })
})
app.get('/script.js', (req,res) => {
  res.sendFile(__dirname + '/script.js', () => {
    res.end()
  })
})
// Klocki zwracaja wszystkie rekordy w bazie danych w tabeli klocki
app.get('/klocki', (req,res) => {
  con.query('SELECT * FROM klocki',(err,result)=>{
    if(err) throw err
    res.send(result).end()
  })
})
// Dodawanie Usuwanie Klocków
app.post('/klocki', (req,res) => {
    // Dodawanie
    if(req.body.usunac === false) {
      if(parseInt(req.body.kod)){
        con.query(`INSERT INTO klocki (id, kod, nazwa, kolor) VALUES (NULL, ${req.body.kod}, '${req.body.nazwa}', '${req.body.kolor}')`, (err) => {
          if(err) throw err
          res.status(200).end()
        }) 
      } else {
        res.status(204).end()
      }
    }
    // Usuwanie
    if(req.body.usunac === true) {
      con.query(`SELECT COUNT(id_klocka) FROM przynaleznosc WHERE id_klocka = ${req.body.id}`, (err,result) => {
        if(err) throw err
        const resu = Object.values(JSON.parse(JSON.stringify(result[0])))
        if(resu[0] === 0) {
          con.query(`DELETE FROM klocki where id = ${req.body.id}`, (err) => {
            if(err) throw err
            res.status(200).end()
          })
        } else {
          res.status(204).end()
        }
      })
    }
})
// Zestawy zwracaja wszystkie rekordy w bazie danych w tabeli zestawy
app.get('/zestawy', (req,res) => {
  con.query('SELECT * FROM zestawy',(err,result)=>{
    if(err) throw err
    res.send(result).end()
  })
})
// Dodawanie Usuwanie Zestawów
app.post('/zestawy', (req,res) => {
   // Dodawanie
   if(req.body.usunac === false) {
    if(parseInt(req.body.kod_zestawu) && parseInt(req.body.ilosc_klockow)){
      con.query(`INSERT INTO zestawy (id, kod_zestawu, nazwa, ilosc_klockow) VALUES (NULL, ${req.body.kod_zestawu}, '${req.body.nazwa}', ${req.body.ilosc_klockow})`, (err) => {
        if(err) throw err
        res.status(200).end()
      }) 
    } else {
      res.status(204).end()
    }
  }
  // Usuwanie
  if(req.body.usunac === true) {
    con.query(`SELECT COUNT(id_zestawu) FROM przynaleznosc WHERE id_zestawu = ${req.body.id}`, (err,result) => {
      if(err) throw err
      const resu = Object.values(JSON.parse(JSON.stringify(result[0])))
      if(resu[0] === 0) {
        con.query(`DELETE FROM zestawy where id = ${req.body.id}`, (err) => {
          if(err) throw err
          res.status(200).end()
        })
      } else {
        res.status(204).end()
      }
    })
  }
})
app.post('/polaczenie', (req,res) => {
    if(parseInt(req.body.id_klocka) && parseInt(req.body.id_zestawu) && parseInt(req.body.id_klocka) !== 0 && parseInt(req.body.id_zestawu) !== 0) {
      con.query(`INSERT INTO przynaleznosc (id, id_klocka, id_zestawu) VALUES (NULL, ${parseInt(req.body.id_klocka)}, ${parseInt(req.body.id_zestawu)})`, (err) => {
        if(err) throw err
        res.status(200).end()
      })
    } else {
      res.status(204).end()
    }
})
app.get('/zdj/zdj.jpg', (req,res) => {
  res.sendFile(__dirname + '/zdj/zdj.jpg')
})
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    // eslint-disable-line global-require
    con.end()
    app.quit()
  }
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      con.end()
      app.quit()
    }
  })