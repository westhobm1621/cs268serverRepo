const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

let credentials = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
let connection = mysql.createConnection(credentials);
connection.connect();

function rowToObject(row) {
  return {
    option1: row.option1,
    option2: row.option2,
    opt1_reasons: row.opt1_reasons,
    opt2_reasons: row.opt2_reasons,
    numberOfVotes: row.numberOfVotes,
    opt1votes: row.opt1votes,
    opt2votes: row.opt2votes,
  };
}

app.get('/comparisons/:option1/:option2', (request, response) => {
  const query = 'SELECT option1, option2, opt1_reasons, opt2_reasons, numberOfVotes, opt1votes, opt2votes, id FROM comp WHERE is_deleted = 0 AND option1 = ? AND option2 = ? ORDER BY updated_at DESC';
  const params = [request.params.option1, request.params.option2];
  /*console.log(query)*/
  connection.query(query, params, (error, rows) => {
    response.send({
        ok:true,
        comparisons: rows.map(rowToObject),
    });
    /*console.log(rows.map(rowToObject))*/
  });
});

app.post('/comparisons', (request, response) => {
  const query = 'INSERT INTO comp(option1, option2, opt1_reasons, opt2_reasons, numberOfVotes, opt1votes, opt2votes) VALUES (?,?,?,?,?,?,?)';
  const params = [request.body.option1, request.body.option2, request.body.opt1_reasons, request.body.opt2_reasons, request.body.numberOfVotes, request.body.opt1votes, request.body.opt2votes];
  connection.query(query, params, (error, result) => {
    response.send({
        ok:true,
        comparisons: result.insertId,
    });
  });
});

app.patch('/comparisons/:id', (request, response) => {
  const query = 'UPDATE comp SET option1 = ?, option2 = ?, opt1_reasons = ?, opt2_reasons = ?, numberOfVotes = ?, opt1votes = ?, opt2votes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
  const params = [request.body.option1, request.body.option2, request.body.opt1_reasons, request.body.opt2_reasons, request.body.numberOfVotes, request.body.opt1votes, request.body.opt2votes, request.params.id];
  connection.query(query, params, (error, result) => {
    response.send({
        ok: true,
    });
  });
});

app.delete('/comparisons/:id', (request, response) => {
  const query = 'UPDATE comp SET is_deleted = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
  const params = [request.params.id];
  connection.query(query, params, (error, result) => {
    response.send({
        ok: true,
    });
  });
});



const port = 3444;
app.listen(port, () => {
  console.log(`We're live on port ${port}!`);
});
