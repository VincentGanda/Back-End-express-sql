const express = require('express')
const mysql = require('mysql')

const app = express()
const port = 1997

const db = mysql.createConnection({
    host: 'localhost',
    user: 'vincent', //usernya ini diambil dari mysql ntr tinggal select * from mysql user. nanti cari yang % dan pilih yang tulisannya y semua
    password: 'abc123',
    database: 'tokoberkah',
    port: 3306
})

//////////////////////////////////////////////////////INI PAGEAWAL LOCALHOST:1997////////////////////////////////////////
app.get('/', (req,res)=>{
    res.status(200).send('<h1>Welcome To Our API</h1>')
})
//////////////////////////////////////////////////////INI BUAT MUNCULIN SEMUA KOTA/////////////////////////////////////
app.get('/getkota', (req,res)=>{
    console.log(req.query)
    console.log(req.query.jerapah)
    var nama = req.query.jerapah;
    if(!req.query.jerapah){
        nama = ''
    }
    var sql = `SELECT * FROM kota WHERE nama LIKE '%${nama}%' ;`; //ini adalah sql nya / query nya
    db.query(sql, (err,results)=>{ //ini cara akses di query nya
        if(err) {
            return res.status(500).send(err) 
        }
        console.log(results)
        res.status(200).send(results)
    })
    // res.status(200).send('<h1>API belom connect ke database say</h1>')
})
//liat di workbench, bagian mysql user. kalo pluginnya masih mysha2,pasti error gabisa ngeget
/////////////////////////////////////////////////INI BUAT MUNCULIN KOTA PER ID//////////////////////////////////////////
app.get('/getkota/:id', (req,res)=>{
    var sql = `SELECT * FROM kota WHERE id=${req.params.id} ;`; 
    db.query(sql, (err,results)=>{ 
        if(err) {
            return res.status(500).send(err)
        }
        console.log(results)
        res.status(200).send(results)
    })
})
///////////////////////////////////////////////INI BUAT MUNCULIN TOKO PER ID/////////////////////////////////////////
app.get('/gettoko/:id', (req,res)=>{
    
    var sql = `SELECT * FROM kota WHERE id=${req.params.id} ;`; 
    db.query(sql, (err,results)=>{ 
        if(err) {
            return res.status(500).send(err) 
        }
        console.log(results)
        res.status(200).send(results)
    })
    
})
////////////////////////////////////////////INI BUAT MUNCULIN SEMUA TOKO KALO DI AWAL/////////////////////////////
app.get('/gettoko/',(req,res)=>{
    var nama = req.query.badak;
    if(!req.query.badak){
        nama = ""
    }
    var sql = `SELECT * FROM toko WHERE nama LIKE "%${nama}%"`;
    db.query(sql, (err,results)=>{
        if(err){
            return res.status(500).send(err)
        }
        console.log(results)
        res.status(200).send(results)
    })
})
//////////////////////////////////////////MUNCULIN SEMUA TOKO - FLEKSIBEL///////////////////////////////////////
app.get('/gettoko', (req,res) => {
    var nama = req.query.nama || '';
    var alamat = req.query.alamat || '';
    
    var sql =`SELECT * FROM toko 
                WHERE nama LIKE '%${nama}%' 
                AND alamat LIKE '%${alamat}%'`;
    
    if(req.query.incmin) {
        sql += ` AND totalIncome >= ${req.query.incmin}`
    }
    if(req.query.incmax) {
        sql += ` AND totalIncome <= ${req.query.incmax}`
    }
    if(req.query.datefrom) {
        sql += ` AND tanggalBerdiri >= '${req.query.datefrom}'`
    }
    if(req.query.dateto) {
        sql += ` AND tanggalBerdiri <= '${req.query.dateto}'`
    }
    if(req.query.kotaid) {
        sql += ` AND kotaId = ${req.query.kotaid}`
    }

    db.query(sql, (err,results) => {
        if(err) {
            // console.log(err)
            return res.status(500).send(err)
        }

        res.status(200).send(results)
    })
})
//////////////////////////////////////////YANG DIBAWAH INI BUAT NGEJALANIN SERVERNYA//////////////////////////////////
app.listen(port, ()=> console.log(`API aktif di port ${port}`))



//liat di workbench, bagian mysql use

//buat nyoba yang atas, nanti bisa tulis gini di browser:
//http://localhost:1997/getkota
//http://localhost:1997/getkota?jerapah=b


// app.get('/getkota', (req,res)=>{
//     var nama = req.query.nama ? req.query.nama : '' ; //ini versi jauh lebih efektif dari yang diatas
//     var sql = `SELECT * FROM kota WHERE nama LIKE '%${nama}%' ;`;
//     db.query(sql, (err,results)=>{ 
//         if(err) {
//             return res.status(500).send(err)   
//         }
//         console.log(results)
//         res.status(200).send(results)
//     })
// })

//penjelasan dari one line if
// var nama = req.query.nama ? req.query.nama : '' ;
// condition ? if true : if false

//contoh iseng
// app.get('/getkota/:idu/test/halo/:hello/:coba', (req,res)=>{
//     console.log(req.params)
//     res.status(200).send('<h1>Halo Bro</h1>')
// })
//localhost:1997/getkota/abc/test/halo/14/keren
//{idu: 'abc', hello: '154', coba: 'keren'} ini nanti pembacaan di terminalnya
//artinya, kalo /: itu isinya bisa kita ganti apa aja

