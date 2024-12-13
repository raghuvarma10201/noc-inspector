import { Redirect, Route, useHistory } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact, useIonViewWillEnter } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import {initdb} from './dataservice';
import { useEffect, useState } from 'react';
import { Capacitor, Plugins } from '@capacitor/core';
import {  SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
const { CapacitorSQLite } = Plugins;
setupIonicReact();

const App: React.FC = () => {
  const [queryResults, setQueryResults] = useState<any>(null);
  const [currentContact, setCurrentContact] = useState<any>(null);
  const mSQLite = new SQLiteConnection(CapacitorSQLite);
  const history = useHistory();
  const now = new Date().getTime() / 1000;
  console.log(now);
  const dataToImport = {
    database: "noc",
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
  useEffect(() => {
    initializeDatabase();
  }, []);
  const checkConnection = async (connectionName: string) => {
    try {
      await mSQLite.deleteOldDatabases();
      // Check if the connection already exists
      const connectionExists = await mSQLite.isConnection(connectionName,true);
      console.log("connectionExists",connectionExists);
      if (connectionExists.result) {
        console.log(`Connection "${connectionName}" is already established.`);
        return true;
      } else {
        console.log(`Connection "${connectionName}" does not exist.`);
        return false;
      }
    } catch (error) {
      console.error('Error checking connection:', error);
      return false;
    }
  };
  const initializeDatabase = async () => {
    const connectionName = 'noc'; // Replace with your database name
  
    try {
      const connectionExists = await checkConnection(connectionName);
      console.log("connectionExists",connectionExists);
      if (connectionExists) {
        // Retrieve the existing connection
        const db: SQLiteDBConnection = await CapacitorSQLite.retrieveConnection(connectionName);
        await db.open();
        console.log('Existing database connection retrieved and opened.');
      } else {
        // Create a new connection
        const db: SQLiteDBConnection = await CapacitorSQLite.createConnection({
          database: connectionName,
          version: 1,
          encrypted: false,
          mode: 'no-encryption',
        });
  
        await db.open();
        console.log('New database connection created and opened.');
        // load the default contacts
        let eee = await mSQLite.importFromJson(JSON.stringify(dataToImport));
        console.log(eee);
        
      }
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}
export default App;
