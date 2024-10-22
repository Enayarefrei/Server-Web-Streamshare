import { Contents, Content_DB_Type} from "./fake-db";
import { content_type, content_table_name } from "./Schemas/content_schema";
import { query } from "./db-connector";
import { QueryResult } from "pg";



export async function get_content_by_id(content_id: content_type["id"]) {
    try {
        const results: QueryResult<content_type> = await query(
            `SELECT * FROM ${content_table_name}
            WHERE id='${content_id}'`); //Requête

        return (results.rowCount && results.rowCount > 0)? results.rows[0] : null;

    } catch (db_error) {
        // Log l'erreur
        console.log("DB ERROR:", db_error)
        return null
    }
    // return Contents.find((content) => content.id === content_id);
}

export async function search_trends() {
    try {
        const results: QueryResult<content_type> = await query(
            `SELECT * FROM ${content_table_name}
            ORDER BY note DESC, release_date DESC
            LIMIT 10;`); //Requête

        return (results.rowCount && results.rowCount > 0)? results.rows : null;
        
    } catch (db_error) {
        // Log l'erreur
        console.log("DB ERROR:", db_error)
        return null
    }
    // return Contents.slice(0, 10);
}

export async function search_content(fulfil_name: string = "", genres: content_type["categories"] = [], tags: content_type["tags"] = []) {
    let results : Array<Content_DB_Type> = Array(); // Liste contenant les contenus proposés par la BDD
    console.log(fulfil_name)
    console.log(genres)
    console.log(tags)

    // Meilleures Correspondances !
    results.push(...Contents.filter(raw => 
        raw.name.startsWith(fulfil_name) && 
        genres.every(element => raw.genres.includes(element)) && 
        tags.every(element => raw.tags.includes(element))
    ));
    // console.log(results.length)

    // // Classiques
    // /// (par nom)
    // results.push(...Contents.filter( raw => {
    //     raw.name.startsWith(fulfil_name) && ! results.includes(raw)
    // }));
    // console.log(results.length)

    // /// (par genres)
    // results.push(...Contents.filter( raw => {
    //     genres.every(element => raw.genres.includes(element)) && ! results.includes(raw)
    // }));
    // console.log(results.length)

    // /// (par tags)
    // results.push(...Contents.filter( raw => {
    //     tags.every(element => raw.tags.includes(element)) && ! results.includes(raw)
    // }));
    // console.log(results.length)

    return results;
}