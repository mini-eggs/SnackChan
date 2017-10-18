import Express from "express";
import BodyParser from "body-parser";

// Initialize database.
import "./Models";

// Get routes.
import HomeRoute from "./routes/Home";
import CreateSuggestionRoute from "./routes/CreateSuggestion";
import ErrorRoute from "./routes/Error";

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
