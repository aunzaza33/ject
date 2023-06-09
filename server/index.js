const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fetch = require("node-fetch");


app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "project",
});

//test
app.post('/repair', (req, res) => {
  const repair_durablearticles_Id = req.body.repair_durablearticles_Id;
  const room = req.body.room;
  const repair_img = req.body.repair_img;
  const repair_detail = req.body.repair_detail;
  const Informer = req.body.Informer;
  const repair_durablearticles_date = req.body.repair_durablearticles_date;
  const durablearticles_Id  = req.body.durablearticles_Id ;
  db.query(
    "INSERT INTO repair_durablearticles (repair_durablearticles_Id, room, repair_img, repair_detail, Informer, repair_durablearticles_date, durablearticles_Id) VALUES(?,?,?,?,?,?,?)",
    [repair_durablearticles_Id, room, repair_img, repair_detail, Informer, repair_durablearticles_date, durablearticles_Id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    });
});

//update
app.put('/stockmaterial/:material_Id', (req, res) => {
  const material_Id = req.body.material_Id;
  const material_remaining = req.body.material_remaining;
  db.query(
    "UPDATE material SET material_remaining = ? WHERE material_Id = ?",
    [material_remaining, material_Id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.put('/statusdurablearticles/:durablearticles_Id', (req, res) => {
  const durablearticles_Id = req.body.durablearticles_Id;
  const durablearticles_status = req.body.durablearticles_status;
  db.query(
    "UPDATE durablearticles SET durablearticles_status = ? WHERE durablearticles_Id = ?",
    [durablearticles_status, durablearticles_Id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

//material
app.get("/material", (req, res) => {
  db.query("SELECT * FROM material", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/material2", (req, res) => {
  db.query("SELECT material_Id, material_name, material_remaining, material_unit FROM material", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post('/creatematerial', (req, res) => {
  const material_Id = req.body.material_Id;
  const material_name = req.body.material_name;
  const material_brand = req.body.material_brand;
  const material_unit = req.body.material_unit;
  const material_price = req.body.material_price;
  const material_remaining = req.body.material_remaining;
  const material_order_date = req.body.material_order_date;
  const material_delivery_date = req.body.material_delivery_date;
  const type_material_Id = req.body.type_material_Id;
  const company_Id = req.body.company_Id;
  db.query(
    "INSERT INTO material (material_Id, material_name, material_brand, material_unit, material_price, material_remaining, material_order_date, material_delivery_date, type_material_Id, company_Id) VALUES(?,?,?,?,?,?,?,?,?,?)",
    [material_Id, material_name, material_brand, material_unit, material_price, material_remaining, material_order_date, material_delivery_date, type_material_Id, company_Id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    });
});

app.put('/updatematerial/:material_Id', (req, res) => {
  const material_Id = req.body.material_Id;
  const material_name = req.body.material_name;
  const material_brand = req.body.material_brand;
  const material_unit = req.body.material_unit;
  const material_price = req.body.material_price;
  const material_remaining = req.body.material_remaining;
  const material_order_date = req.body.material_order_date;
  const material_delivery_date = req.body.material_delivery_date;
  const type_material_Id = req.body.type_material_Id;
  const company_Id = req.body.company_Id;
  db.query(
    "UPDATE material SET material_name = ?, material_brand = ?, material_unit = ?, material_price = ?, material_remaining = ?, material_order_date = ?, material_delivery_date = ?, type_material_Id = ?, company_Id = ? WHERE material_Id = ?",
    [material_name, material_brand, material_unit, material_price, material_remaining, material_order_date, material_delivery_date, type_material_Id, company_Id, material_Id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.delete("/deletematerial/:material_Id", (req, res) => {
  const material_Id = req.params.material_Id;
  db.query("DELETE FROM material WHERE material_Id = ?", material_Id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/getmaterial/:material_Id", (req, res) => {
  const material_Id = req.params.material_Id;
  db.query("SELECT * FROM material WHERE material_Id = ?", material_Id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//stock material
app.post('/stock_material', (req, res) => {
  const stock_material_Id = req.body.stock_material_Id;
  const stock_material_add = req.body.stock_material_add;
  const stock_material_date = req.body.stock_material_date;
  const material_Id = req.body.material_Id;
  const username = req.body.username;
  db.query(
    "INSERT INTO stock_material (stock_material_Id, stock_material_add, stock_material_date, username, material_Id) VALUES(?,?,?,?,?)",
    [stock_material_Id, stock_material_add, stock_material_date, username, material_Id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    });
});

app.get("/stock_material", (req, res) => {
  db.query("SELECT * FROM stock_material", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
})

app.get("/stock_material2", (req, res) => {
  db.query("SELECT * FROM stock_material INNER JOIN material ON stock_material.material_Id = material.material_Id", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
})

//order material
app.post('/order_material', (req, res) => {
  const order_material_Id = req.body.order_material_Id;
  const order_material_quantity = req.body.order_material_quantity;
  const order_material_date = req.body.order_material_date;
  const username = req.body.username;
  const material_Id = req.body.material_Id;
  db.query(
    "INSERT INTO order_material (order_material_Id, order_material_quantity, order_material_date, username, material_Id) VALUES(?,?,?,?,?)",
    [order_material_Id, order_material_quantity, order_material_date, username, material_Id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    });
});

app.get("/order_material", (req, res) => {
  db.query("SELECT * FROM order_material", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
})

app.get("/order_material2", (req, res) => {
  db.query("SELECT order_material.material_Id, material.material_name, order_material.order_material_quantity, order_material.order_material_date, order_material.username, order_material.order_material_status FROM order_material INNER JOIN material ON order_material.material_Id = material.material_Id", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
})

app.get("/order_material3", (req, res) => {
  db.query("SELECT * FROM order_material INNER JOIN material ON order_material.material_Id = material.material_Id", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
})

app.get("/order_material/:order_material_Id", (req, res) => {
  const order_material_Id = req.params.order_material_Id;
  db.query("SELECT *FROM order_material INNER JOIN material ON order_material.material_Id = material.material_Id WHERE order_material.order_material_Id = ?", order_material_Id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put('/order_material/:order_material_Id', (req, res) => {
  const order_material_Id = req.body.order_material_Id;
  const order_material_status = req.body.order_material_status;
  db.query(
    "UPDATE order_material SET order_material_status = ? WHERE order_material_Id = ?",
    [order_material_status, order_material_Id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.delete("/order_material/:order_material_Id", (req, res) => {
  const order_material_Id = req.params.order_material_Id;
  db.query("DELETE FROM order_material WHERE order_material_Id = ?", order_material_Id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//order durablearticles
app.post('/order_durablearticles', (req, res) => {
  const order_durablearticles_Id = req.body.order_durablearticles_Id;
  const order_durablearticles_location = req.body.order_durablearticles_location;
  const order_durablearticles_date = req.body.order_durablearticles_date;
  const username = req.body.username;
  const durablearticles_Id = req.body.durablearticles_Id;
  db.query(
    "INSERT INTO order_durablearticles (order_durablearticles_Id, order_durablearticles_location, order_durablearticles_date, username, durablearticles_Id) VALUES(?,?,?,?,?)",
    [order_durablearticles_Id, order_durablearticles_location, order_durablearticles_date, username, durablearticles_Id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    });
});

app.get("/order_durablearticles", (req, res) => {
  db.query("SELECT * FROM order_durablearticles", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/order_durablearticles2", (req, res) => {
  db.query("SELECT order_durablearticles.durablearticles_Id, durablearticles.durablearticles_name, order_durablearticles.order_durablearticles_date, order_durablearticles.username, order_durablearticles.order_durablearticles_status FROM order_durablearticles INNER JOIN durablearticles ON order_durablearticles.durablearticles_Id = durablearticles.durablearticles_Id", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/order_durablearticles3", (req, res) => {
  db.query("SELECT * FROM order_durablearticles INNER JOIN durablearticles ON order_durablearticles.durablearticles_Id = durablearticles.durablearticles_Id", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/order_durablearticles/:order_durablearticles_Id", (req, res) => {
  const order_durablearticles_Id = req.params.order_durablearticles_Id;
  db.query("DELETE FROM order_durablearticles WHERE order_durablearticles_Id = ?", order_durablearticles_Id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/order_durablearticles/:order_durablearticles_Id", (req, res) => {
  const order_durablearticles_Id = req.params.order_durablearticles_Id;
  db.query("SELECT * FROM order_durablearticles WHERE order_durablearticles_Id = ?", order_durablearticles_Id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put('/order_durablearticles/:order_durablearticles_Id', (req, res) => {
  const order_durablearticles_Id = req.body.order_durablearticles_Id;
  const order_durablearticles_status = req.body.order_durablearticles_status;
  db.query(
    "UPDATE order_durablearticles SET order_durablearticles_status = ? WHERE order_durablearticles_Id = ?",
    [order_durablearticles_status, order_durablearticles_Id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

//return durablearticles
app.post('/return_durablearticles', (req, res) => {
  const return_durablearticles_Id = req.body.return_durablearticles_Id;
  const return_durablearticles_status = req.body.return_durablearticles_status;
  const return_durablearticles_date = req.body.return_durablearticles_date;
  const username = req.body.username;
  const order_durablearticles_Id = req.body.order_durablearticles_Id;
  db.query(
    "INSERT INTO return_durablearticles (return_durablearticles_Id, return_durablearticles_status, return_durablearticles_date, username, order_durablearticles_Id) VALUES(?,?,?,?,?)",
    [return_durablearticles_Id, return_durablearticles_status, return_durablearticles_date, username, order_durablearticles_Id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    });
});

app.get("/return_durablearticles", (req, res) => {
  db.query("SELECT * FROM return_durablearticles", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/return_durablearticles2", (req, res) => {
  db.query("SELECT * FROM return_durablearticles INNER JOIN order_durablearticles ON return_durablearticles.order_durablearticles_Id = order_durablearticles.order_durablearticles_Id INNER JOIN durablearticles ON order_durablearticles.durablearticles_Id = durablearticles.durablearticles_Id", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//durablearticles
app.get("/durablearticles", (req, res) => {
  db.query("SELECT * FROM durablearticles", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post('/createdurablearticles', (req, res) => {
  const durablearticles_Id = req.body.durablearticles_Id;
  const durablearticles_name = req.body.durablearticles_name;
  const durablearticles_brand = req.body.durablearticles_brand;
  const durablearticles_unit = req.body.durablearticles_unit;
  const durablearticles_price = req.body.durablearticles_price;
  const durablearticles_order_date = req.body.durablearticles_order_date;
  const durablearticles_delivery_date = req.body.durablearticles_delivery_date;
  const durablearticles_repair_date = req.body.durablearticles_repair_date;
  const durablearticles_finish_date = req.body.durablearticles_finish_date;
  const type_durablearticles_Id = req.body.type_durablearticles_Id;
  const company_Id = req.body.company_Id;
  const room_Id = req.body.room_Id;
  const durablearticles_status = req.body.durablearticles_status;
  db.query(
    "INSERT INTO durablearticles (durablearticles_Id, durablearticles_name, durablearticles_brand, durablearticles_unit, durablearticles_price, durablearticles_order_date, durablearticles_delivery_date, durablearticles_repair_date, durablearticles_finish_date, type_durablearticles_Id, company_Id, room_Id, durablearticles_status) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [durablearticles_Id, durablearticles_name, durablearticles_brand, durablearticles_unit, durablearticles_price, durablearticles_order_date, durablearticles_delivery_date, durablearticles_repair_date, durablearticles_finish_date, type_durablearticles_Id, company_Id, room_Id, durablearticles_status],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    });
});

app.put('/updatedurablearticles/:durablearticles_Id', (req, res) => {
  const durablearticles_Id = req.body.durablearticles_Id;
  const durablearticles_name = req.body.durablearticles_name;
  const durablearticles_brand = req.body.durablearticles_brand;
  const durablearticles_unit = req.body.durablearticles_unit;
  const durablearticles_price = req.body.durablearticles_price;
  const durablearticles_order_date = req.body.durablearticles_order_date;
  const durablearticles_delivery_date = req.body.durablearticles_delivery_date;
  const durablearticles_repair_date = req.body.durablearticles_repair_date;
  const durablearticles_finish_date = req.body.durablearticles_finish_date;
  const type_durablearticles_Id = req.body.type_durablearticles_Id;
  const company_Id = req.body.company_Id;
  const room_Id = req.body.room_Id;
  const durablearticles_status = req.body.durablearticles_status;
  db.query(
    "UPDATE durablearticles SET durablearticles_name = ?, durablearticles_brand = ?, durablearticles_unit = ?, durablearticles_price = ?, durablearticles_order_date = ?, durablearticles_delivery_date = ?, durablearticles_repair_date = ?, durablearticles_finish_date = ?, type_durablearticles_Id = ?, company_Id = ?, room_Id = ?, durablearticles_status = ? WHERE durablearticles_Id = ?",
    [durablearticles_name, durablearticles_brand, durablearticles_unit, durablearticles_price, durablearticles_order_date, durablearticles_delivery_date, durablearticles_repair_date, durablearticles_finish_date, type_durablearticles_Id, company_Id, room_Id, durablearticles_status, durablearticles_Id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.delete("/deletedurablearticles/:durablearticles_Id", (req, res) => {
  const durablearticles_Id = req.params.durablearticles_Id;
  db.query("DELETE FROM durablearticles WHERE durablearticles_Id = ?", durablearticles_Id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/getdurablearticles/:durablearticles_Id", (req, res) => {
  const durablearticles_Id = req.params.durablearticles_Id;
  db.query("SELECT * FROM durablearticles WHERE durablearticles_Id = ?", durablearticles_Id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//moveroom
app.put('/moveroom/:durablearticles_Id', (req, res) => {
  const durablearticles_Id = req.body.durablearticles_Id;
  const room_Id = req.body.room_Id;
  db.query(
    "UPDATE durablearticles SET room_Id = ? WHERE durablearticles_Id = ?",
    [room_Id, durablearticles_Id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

//repair
app.get("/repair", (req, res) => {
  db.query("SELECT * FROM repair_durablearticles", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
})

app.get("/repair2", (req, res) => {
  db.query("SELECT * FROM repair_durablearticles INNER JOIN durablearticles ON repair_durablearticles.durablearticles_Id = durablearticles.durablearticles_Id", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
})

app.get("/repair/:repair_durablearticles_Id", (req, res) => {
  const repair_durablearticles_Id = req.params.repair_durablearticles_Id;
  db.query("SELECT * FROM repair_durablearticles WHERE repair_durablearticles_Id = ?", repair_durablearticles_Id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put('/repair/:repair_durablearticles_Id', (req, res) => {
  const repair_durablearticles_Id = req.body.repair_durablearticles_Id;
  const repair_status = req.body.repair_status;
  db.query(
    "UPDATE repair_durablearticles SET repair_status = ? WHERE repair_durablearticles_Id = ?",
    [repair_status, repair_durablearticles_Id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

//login
const scopes = 'personel,student,templecturer'; // <----- Scopes for search account type
const token = 'sfDdrmyUDe9mzuNA0APClmJDtI5rh-EF';

app.post('/login', (req, res) => {

  const { username, password } = req.body;


  fetch('https://api.account.kmutnb.ac.th/api/account-api/user-authen', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      scopes: scopes,
      username: username,
      password: password,
    }),
  })

    .then(response => response.json())
    .then(json_data => {
      if (!json_data.hasOwnProperty('api_status')) {
        res.status(500).json({ message: 'API Error' });
      } else if (json_data['api_status'] === 'success') {
        res.json({ userInfo: json_data['userInfo'] });
      } else if (json_data['api_status'] === 'fail') {
        res.status(401).json({ message: json_data['api_message'] });
      } else {
        res.status(500).json({ message: 'Internal Error' });
      }
    })
    .catch(error => {
      console.log('Fetch Error: ' + error);
      res.status(500).json({ message: 'Fetch Error' });
    });

});


//---------------------------------------------------------------------
//moveroom
app.put('/moveroom/:durablearticles_Id', (req, res) => {
  const durablearticles_Id = req.body.durablearticles_Id;
  const room_Id = req.body.room_Id;
  db.query(
    "UPDATE durablearticles SET room_Id = ? WHERE durablearticles_Id = ?",
    [room_Id, durablearticles_Id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});






//changeroom
app.put('/changeroom/:durablearticles_Id', (req, res) => {
  const durablearticles_Id = req.body.durablearticles_Id;
  const room_Id = req.body.room_Id;
  db.query(
    "UPDATE durablearticles SET room_Id = ? WHERE durablearticles_Id = ?",
    [room_Id, durablearticles_Id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

//repair
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});


//upload รูปจากกล้อง
const fs = require('fs');
const { format } = require('date-fns');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './Picture');
  },
  filename: function(req, file, cb) {
    const timestamp = format(new Date(), 'yyyyMMddHHmmss');
    let newFilename = `${timestamp}_${file.originalname}`;
    let i = 1;

    while (fs.existsSync(`./Picture/${newFilename}`)) {
      newFilename = `${timestamp}_${i}_${file.originalname}`;
      i++;
    }

    cb(null, newFilename);
  }
});

const upload = multer({storage: storage});
app.post('/upload', upload.single('photo'), function(req, res, next) {
  const file = req.file;
  const localTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' });
  const { durablearticles_Id, room, repair_detail, Informer } = JSON.parse(req.body.data);

  const repair_status = "รอดำเนินการ";
  const repair_durablearticles_date = localTime;
  const sql = "INSERT INTO repair_durablearticles (durablearticles_Id, room, repair_detail, Informer, repair_status, repair_durablearticles_date,repair_img) VALUES (?, ?, ?, ?, ?, ?,?)";
  const values = [durablearticles_Id, room, repair_detail, Informer, repair_status, repair_durablearticles_date,file.filename ];
  db.query(sql, values, (err, result) => {
    if (err) throw err;
    console.log("New repair record inserted!");
    res.send(`${file.filename} uploaded successfully`);
  });

  if (!file) {
    const error = new Error('Please upload a file');
    error.httpStatusCode = 400;
    return next(error);
  }
});











app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
