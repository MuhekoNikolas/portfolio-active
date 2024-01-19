


Database = require("better-sqlite3")
fs = require("fs")


class DBPool{
    constructor(dbFile, dbPoolSize){
        this.dbFile = dbFile
        this.dbPoolSize = dbPoolSize
        this.DBs = []

        for(var _x=0; _x<dbPoolSize; _x++){
            this.addNewDb()
        }

    }

    getRandomDB(){
        if(this.DBs.length > 0){
            var choosenDB = this.DBs[Math.floor(Math.random(0)*this.DBs.length)]
            this.DBs.splice(this.DBs.indexOf(choosenDB), 1)
            this.addNewDb()
            return choosenDB
        } else {
            this.addNewDb()
            this.addNewDb()
            var choosenDB = this.DBs[Math.floor(Math.random(0)*this.DBs.length)]
            this.DBs.splice(this.DBs.indexOf(choosenDB), 1)
            return choosenDB
        }
    }

    commit(){
        this.prepare("COMMIT").run()
    }

    addNewDb(){
        var _DBPoolLength = this.DBs.length
        var _newDB = new Database(this.dbFile, {})
        // _newDB.runWithCommit = (sql, options=[], cb=()=>{})=>{
        //     _newDB.run(sql, options, (err, data)=>{cb(err, data); this.commit.bind(_newDB); return});
        // }
        this.DBs.push(_newDB)
    }
}


class SqliteDB{
    constructor(dbFile, dbPoolSize){
        this.dbFile = dbFile
        this.dbPoolSize = dbPoolSize

        this.createDBPool()

        this.createTables()

        //this.run_Commit_Close()
    }

    createDBPool(){
        this.DBPool = new DBPool(this.dbFile, this.dbPoolSize)
    }


    createTables(){
        var _DB = this.DBPool.getRandomDB()
        _DB.prepare(`CREATE TABLE IF NOT EXISTS users( id UNSIGNED NOT NULL PRIMARY KEY, fullName VARCHAR(20) NOT NULL DEFAULT 'John Doe', profilePicture UNSIGNED NOT NULL DEFAULT 'http://localhost:2000/images/pfp.jpg', email VARCHAR(255) UNIQUE DEFAULT NULL, is_editor INTEGER DEFAULT 1,  google_id VARCHAR(255) UNIQUE DEFAULT NULL,  facebook_id VARCHAR(255) UNIQUE DEFAULT NULL, twitter_id VARCHAR(255) UNIQUE DEFAULT NULL, github_id VARCHAR(255) UNIQUE DEFAULT NULL, discord_id VARCHAR(255) UNIQUE DEFAULT NULL);`).run()
        _DB.prepare(`CREATE TABLE IF NOT EXISTS drafts( id UNSIGNED NOT NULL PRIMARY KEY, author_id UNSIGNED NOT NULL, content TEXT NOT NULL DEFAULT '');`).run()
        _DB.prepare(`CREATE TABLE IF NOT EXISTS blogs(id UNSIGNED NOT NULL PRIMARY KEY, blog_url_id TEXT NOT NULL, author_id UNSIGNED NOT NULL, title TEXT NOT NULL, description TEXT NOT NULL, banner TEXT NOT NULL, content TEXT NOT NULL, readingTime UNSIGNED NOT NULL DEFAULT '0', created_at UNSIGNED NOT NULL, last_edited_at UNSIGNED NOT NULL);`).run()
        _DB.prepare(`CREATE TABLE IF NOT EXISTS article_drafts(id UNSIGNED NOT NULL PRIMARY KEY, blog_url_id TEXT NOT NULL, author_id UNSIGNED NOT NULL, title TEXT NOT NULL, description TEXT NOT NULL, banner TEXT NOT NULL, content TEXT NOT NULL, readingTime UNSIGNED NOT NULL DEFAULT '0', created_at UNSIGNED NOT NULL, last_edited_at UNSIGNED NOT NULL);`).run()
        _DB.prepare(`CREATE TABLE IF NOT EXISTS comments( id UNSIGNED NOT NULL PRIMARY KEY, author_id UNSIGNED NOT NULL, blog_id UNSIGNED NOT NULL, content TEXT NOT NULL, postedAt UNSIGNED NOT NULL);`).run()
        this.closeDB(_DB)
    }

    commit(_DB){
        _DB.prepare("COMMIT").run()
    }

    closeDB(_DB){
        _DB.close()
    }
}


module.exports = new SqliteDB(`${__dirname}/Blogs.sqlite`, 10)