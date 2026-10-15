## Code0 usage
I used Code0 (CodeZero extension in VS Code, with GitHub Copilot CLI as the agent) for one feature in this project: the product detail page. The base app (API, authentication, catalog and admin panel) was written before I set up Code0. Git commands were run by me in the terminal.

## AI Development Experience
Task: add a product detail page at /product/:id.

- Component development: Code0 first explored the repo and wrote a plan, which I reviewed and approved. It then created the ProductDetail page, registered the route in App.jsx and wrapped the catalog cards in links.
- API integration: the page fetches GET /api/products/:id through the existing Axios client and shows the image, name, category, color, sizes, price, stock and description.
- Validation: Code0 could not run the build because its command used && in PowerShell, so it reported the task as unverified. I ran npm run build myself (it passed), tested the page in the browser against the running backend, and reviewed the diff before committing.