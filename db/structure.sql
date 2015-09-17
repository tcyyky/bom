CREATE TABLE "schema_migrations" ("version" varchar NOT NULL);
CREATE UNIQUE INDEX "unique_schema_migrations" ON "schema_migrations" ("version");
CREATE TABLE "users" ("id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL);
CREATE TABLE "comments" ("id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, "username_id" integer, "body" text, "board_id" integer, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL);
CREATE INDEX "index_comments_on_username_id" ON "comments" ("username_id");
CREATE INDEX "index_comments_on_board_id" ON "comments" ("board_id");
CREATE TABLE "boards" ("id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, "image" varchar, "caption" text, "latitude" float, "longitude" float, "good" integer, "bad" integer, "username_id" integer, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL, "back_type" integer);
CREATE INDEX "index_boards_on_username_id" ON "boards" ("username_id");
INSERT INTO schema_migrations (version) VALUES ('20150916120019');

INSERT INTO schema_migrations (version) VALUES ('20150916120312');

INSERT INTO schema_migrations (version) VALUES ('20150916120715');

INSERT INTO schema_migrations (version) VALUES ('20150917031223');

INSERT INTO schema_migrations (version) VALUES ('20150917031332');

