export default function handler(request, response) {
  const { name } = request.query;
  response.status(200).send(`<h1>hello ${name}</h1>`);
}
