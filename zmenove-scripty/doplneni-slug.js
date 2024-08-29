// načti všechny blogposty
//pro každý blogpost zkontroluj zda má slug
// pokud ne přidáme
// fs = file system

import { promises as fs } from "fs";
import { createSlug } from "../funkce.js";

const nazvySouboru = await fs.readdir("./prispevky")

for (const nazevSouboru of nazvySouboru) {
    const obsahSouboru = await fs.readFile(`./prispevky/${nazevSouboru}`, { encoding: "utf8" })
    const blogPost = JSON.parse(obsahSouboru)
    console.log(blogPost);

    if (blogPost.slug) {
        continue
    } else {
        blogPost.slug = createSlug(blogPost.title)
    }
    console.log(blogPost);
    await fs.writeFile(`./prispevky/${nazevSouboru}`, JSON.stringify(blogPost), { encoding: "utf8" })

}