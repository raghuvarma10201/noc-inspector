// SQLITE IMPORTS
import { Plugins } from "@capacitor/core";
import { SQLiteConnection } from "@capacitor-community/sqlite";

// JSON FILE WITH DATA
const now = new Date().getTime() / 1000;
console.log(now);
const dataToImport = {
  database: "testdb",
  version: 1,
  encrypted: false,
  mode: "full",
  tables: [
    {
      name: "contacts",
      schema: [
        { column: "id", value: "INTEGER PRIMARY KEY NOT NULL" },
        { column: "email", value: "TEXT UNIQUE NOT NULL" },
        { column: "first_name", value: "TEXT" },
        { column: "last_name", value: "TEXT" },
        {
          column: "last_modified",
          value: "INTEGER DEFAULT (strftime('%s', 'now'))",
        },
      ],
      // indexes: [{ name: "index_user_on_email", column: "email" }],
      values: [
        [1, "whiteleys@mail.com", "Whiteley", "Smith", now],
        [2, "johnj@mail.com", "John", "jones", now],
        [3, "bill@mail.com", "Bill", "brown", now],
        [4, "newGuy@mail.com", "New", "Guy", now],
      ],
    },
  ],
};
const { CapacitorSQLite } = Plugins;

const mSQLite = new SQLiteConnection(CapacitorSQLite);
let database: any;

/**
 * load from json file initial content
 */
const loadJSON = async () => {
  return 
};

/**
 * initialize database..
 */
export const initdb = async () => {
  try {
    
    database = await mSQLite.createConnection(
      "testdb",
      false,
      "no-encryption",
      1,
      false
    );

    // load the default contacts
    let eee = await mSQLite.importFromJson(JSON.stringify(dataToImport));
    console.log(eee);
    return database;
  } catch (e) {
    console
    return null;
  }
};

/**
 * query all contacts from the database
 */
export const queryAllContacts = async () => {
  // open database
  await database.open();

  // query to get all of the contacts from database
  return database.query("SELECT * from CONTACTS;");
};

/**
 *
 * @param contactId
 */
export const getContactById = async (contactId: any) => {
  return await database.query("SELECT * FROM contacts WHERE id = ?;", [
    contactId + "",
  ]);
};

/**
 *
 * @param contactId
 */
export const deleteContactById = async (contactId: any) => {
  return await database.query("DELETE FROM contacts WHERE id = ?;", [
    contactId + "",
  ]);
};

/**
 *
 * @param contactId
 */
export const updateContactById = async (contactId: any, contactData: any) => {
  const { first_name, last_name, email } = contactData;
  return await database.query(
    "UPDATE contacts SET first_name=?, last_name=?, email=? WHERE id = ?;",
    [first_name, last_name, email, contactId + ""]
  );
};

/**
 *
 * @param contactData
 */
export const createContact = async (contactData: any) => {
  const { first_name, last_name, email } = contactData;
  return await database.run(
    "INSERT INTO contacts (first_name,last_name,email) VALUES(?,?,?)",
    [first_name, last_name, email]
  );
};
