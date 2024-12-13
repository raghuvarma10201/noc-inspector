const now = parseInt(new Date().getTime() / 1000);
console.log(now);

export default dataToImport;

//CREATE TRIGGER contacts_trigger_last_modified AFTER UPDATE ON contacts FOR EACH ROW WHEN NEW.last_modified <= OLD.last_modified BEGIN UPDATE contacts SET last_modified = (strftime('%s','now')) WHERE id=OLD.id; END;
