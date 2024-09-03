import express from "express"
import cors from "cors"
import { createSlug } from "./funkce.js"
import { promises as fileSystem } from "fs"
import { BlogPost } from "./blog.js"
const server = express()
const port = 8080


server.use(cors())
server.use(express.json());

server.get("/prispevek", async (req, res) => {
    // 1. přečtu název souboru
    const { slug } = req.query
    // 2. načtu soubor podle názvu
    const soubor = await fileSystem.readFile(`./prispevky/${slug}.json`)
    // 3. pošlu response
    res.send(soubor)
})

server.get("/seznam", async (req, res) => {
    console.log(`příjmám request na portu${port}, "${req.url}"`);

    const seznamSouboru = await fileSystem.readdir("./prispevky")
    console.log(`nalazeno ${seznamSouboru.length} příspěvků`);

    let nactenePrispevky = []
    for (const nazevSouboru of seznamSouboru) {
        console.log(`načítám soubor ${nazevSouboru}`);
        const obsahSouboru = await fileSystem.readFile(`./prispevky/${nazevSouboru}`, { encoding: "utf8" })
        nactenePrispevky.push(JSON.parse(obsahSouboru))
    }
    res.send(nactenePrispevky)
    // res.send(JSON.stringify([]))
})

server.post("/pridejprispevek", async (req, res) => {
    console.log(`příjmám data na portu ${port} na endpointu "${req.url}", data:${JSON.stringify(req.body)}`)

    const { title, author, content, slug } = req.body

    const newPost = new BlogPost(title, author, content, slug)
    await fileSystem.writeFile(`./prispevky/${newPost.slug}.json`, JSON.stringify(newPost), { encoding: "utf8" })
    res.send(newPost)
})

server.post("/vytvorSlug", async (req, res) => {
    res.send({
        slug: createSlug(req.body.nazevProSlug)
    })
})
server.post("/vymazprispevek", async (req, res) => {
    const { slug } = req.query

    console.log("Mazu prispevek")
    const soubory = await fileSystem.readdir("./prispevky")
    console.log(soubory)
    const souborExistuje = soubory.includes(slug + ".json")
    if (souborExistuje) {
        console.log(`Soubor ${slug} existuje`)
        await fileSystem.rm(`./prispevky/${slug}.json`)
        res.status(200).send()
        return
    }
    console.log(`Soubor ${slug} neexistuje`)
    res.status(404).send()
})

server.listen(port, () => {
    console.log("aplikace jede na portu" + port);

})
