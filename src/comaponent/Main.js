function Main() {
  return <main className="main">Main</main>;
}

export default Main;

// for fake data to show it is coming from Api we can use a package called json-server and write start server command in package.json file
// "server": "json-server --watch data/questions.json --port 8000" this line will be written in script object
// to run server run terminal command -- npm run server now in browser we can open localhost:8000/questions here forward slash questions is because our array is inside questions: [] like this and now we have our data...
