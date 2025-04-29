const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Example custom login route (optional)
server.post("/login", (req, res) => {
  const { email, password } = req.body;
  const users = router.db.get("users").value();
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});