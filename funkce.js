
/**
 * 
 * @param {String} text 
 */

export function createSlug(text) {
    let slug = text
    slug = slug.toLowerCase()
    slug = removeDiacritics(slug)
    slug = replaceSpaces(slug)
    return slug
}

/**
 * Odstraňuje diakritiku z textu
 * @param {string} text text pro odstranění diakritiky
*/
function removeDiacritics(text) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
}

/**
 * nahradí mezery pomlčkami 
 * @param {string} text text k nahrazení
*/
function replaceSpaces(text, nahrazovac = "-") {
    return text.replace(/ /g, nahrazovac)

}