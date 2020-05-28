CREATE TRIGGER IF NOT EXISTS update_thread_when_post_is_inserted
   BEFORE INSERT ON post
BEGIN
   UPDATE thread
      SET updated_at = CURRENT_TIMESTAMP
      WHERE id = NEW.thread_id;
END;