-- Step 1: Create a Trigger
CREATE TRIGGER backup_trigger
AFTER INSERT OR UPDATE OR DELETE
ON your_table
FOR EACH ROW
EXECUTE FUNCTION perform_backup();

-- Step 2: Create a Function
CREATE OR REPLACE FUNCTION perform_backup()
RETURNS TRIGGER AS $$
BEGIN
  -- Use pg_dump command to create a backup
  EXECUTE 'pg_dump -U your_username -d your_database -t your_table -f /path/on/container/backup.sql';

  -- You can also copy the backup file to a shared volume for persistence
  EXECUTE 'cp /path/on/container/backup.sql /path/on/shared_volume/backup.sql';

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
