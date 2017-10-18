let Express;_273‍.w("express",[["default",function(v){Express=v}]]);let BodyParser;_273‍.w("body-parser",[["default",function(v){BodyParser=v}]]);_273‍.w("./Models");let HomeRoute;_273‍.w("./routes/Home",[["default",function(v){HomeRoute=v}]]);let CreateSuggestionRoute;_273‍.w("./routes/CreateSuggestion",[["default",function(v){CreateSuggestionRoute=v}]]);let ErrorRoute;_273‍.w("./routes/Error",[["default",function(v){ErrorRoute=v}]]);


// Initialize database.


// Get routes.




const app = new Express();
const port = process.env.PORT || 8080;

// Express plugins
app.use(BodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Default welcome route. Hello, World!
app.get("/", HomeRoute);

// Endpoint for creating app suggestions
app.post("/snackchan/api/post/create/suggestion", CreateSuggestionRoute);

// Let them know this route sucks.
app.all("*", ErrorRoute);

// Start server.
app.listen(port, () => {
  console.log(`\nServer has been started on port: ${port}\n`);
});
