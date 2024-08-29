import { createSlug } from "./funkce.js"

export class BlogPost {
    constructor(title, author, content, slug = "") {
        this.title = title
        this.author = author
        this.content = content
        if (slug) {
            this.slug = createSlug(slug)
        } else {
            this.slug = createSlug(title)
        }
    }
}