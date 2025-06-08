import { Pure } from "@design-express/fabrica";
import { PGlite } from "@electric-sql/pglite";
import { pgDump } from "@electric-sql/pglite-tools/pg_dump";
// import { drizzle } from "drizzle-orm/pglite";
// import { sql } from "drizzle-orm";

// In-memory Postgres

export class pg_dump extends Pure {
  static path = "Postgresql";
  static title = "pgDump";
  static description = "Dump Database";

  constructor() {
    super();

    this.addInput("database", "postgres::database");
    this.addInput("arguments", "");
    this.addInput("filename", "");

    this.addOutput("result", "");
  }

  async onExecute() {
    const pg = await PGlite.create("idb://my-database");
//     console.log(
//       await pg.exec(`DO $$
// <<fb>>
// BEGIN

// DROP TABLE IF EXISTS coloring CASCADE;
// DROP TABLE IF EXISTS coloring_components CASCADE;
// DROP TABLE IF EXISTS comment CASCADE;
// DROP TABLE IF EXISTS comment_event CASCADE;
// DROP TABLE IF EXISTS document CASCADE;
// DROP TABLE IF EXISTS document_reference CASCADE;
// DROP TABLE IF EXISTS entity CASCADE;
// DROP TABLE IF EXISTS file CASCADE;
// DROP TABLE IF EXISTS fragment CASCADE;
// DROP TABLE IF EXISTS geometry CASCADE;
// DROP TABLE IF EXISTS ifc_project CASCADE;
// DROP TABLE IF EXISTS permission CASCADE;
// DROP TABLE IF EXISTS project CASCADE;
// DROP TABLE IF EXISTS related_topic CASCADE;
// DROP TABLE IF EXISTS relation CASCADE;
// DROP TABLE IF EXISTS selection CASCADE;
// DROP TABLE IF EXISTS topic CASCADE;
// DROP TABLE IF EXISTS topic_event CASCADE;
// DROP TABLE IF EXISTS topic_permission CASCADE;
// DROP TABLE IF EXISTS test_user CASCADE;
// DROP TABLE IF EXISTS viewpoint CASCADE;
// DROP TABLE IF EXISTS bitmap CASCADE;
// DROP TABLE IF EXISTS visibility CASCADE;
// DROP TABLE IF EXISTS visibility_exceptions CASCADE;
// DROP TABLE IF EXISTS queryset CASCADE;
// DROP TABLE IF EXISTS rule CASCADE;
// DROP TABLE IF EXISTS rel_rule_queryset CASCADE;

// CREATE TABLE bitmap
// (
//   id             uuid  NOT NULL DEFAULT gen_random_uuid() UNIQUE,
//   viewpoint_guid uuid  NOT NULL,
//   bitmap_type    text ,
//   bitmap_data    text  NOT NULL,
//   meta           jsonb,
//   PRIMARY KEY (id)
// );

// COMMENT ON COLUMN bitmap.bitmap_type IS 'png or jpg';

// CREATE TABLE coloring
// (
//   id             bigint     NOT NULL GENERATED ALWAYS AS IDENTITY UNIQUE,
//   viewpoint_guid uuid       NOT NULL DEFAULT gen_random_uuid(),
//   color          varchar(7) NOT NULL,
//   PRIMARY KEY (id)
// );

// COMMENT ON TABLE coloring IS 'components.coloring';

// CREATE TABLE coloring_components
// (
//   id          bigint NOT NULL GENERATED ALWAYS AS IDENTITY UNIQUE,
//   coloring_id bigint NOT NULL,
//   ifc_guid    text   NOT NULL,
//   PRIMARY KEY (id)
// );

// COMMENT ON COLUMN coloring_components.ifc_guid IS 'globalId';

// CREATE TABLE comment
// (
//   id             uuid        NOT NULL DEFAULT gen_random_uuid() UNIQUE,
//   topic_id       uuid        NOT NULL DEFAULT gen_random_uuid(),
//   author         text        NOT NULL DEFAULT gen_random_uuid(),
//   viewpoint_guid uuid        ,
//   date           timestamptz NOT NULL DEFAULT current_timestamp,
//   comment        text        NOT NULL,
//   PRIMARY KEY (id)
// );

// CREATE TABLE comment_event
// (
//   id           bigint      NOT NULL GENERATED ALWAYS AS IDENTITY UNIQUE,
//   comment_id   uuid        NOT NULL DEFAULT gen_random_uuid(),
//   date         timestamptz NOT NULL DEFAULT current_timestamp,
//   events_type  smallserial NOT NULL,
//   events_value text       ,
//   PRIMARY KEY (id)
// );

// CREATE TABLE document
// (
//   id         uuid NOT NULL DEFAULT gen_random_uuid() UNIQUE,
//   project_id uuid NOT NULL DEFAULT gen_random_uuid(),
//   filename   text,
//   filepath   text NOT NULL,
//   PRIMARY KEY (id)
// );

// COMMENT ON COLUMN document.filename IS 'file_path';

// CREATE TABLE document_reference
// (
//   id            uuid NOT NULL DEFAULT gen_random_uuid() UNIQUE,
//   document_guid uuid,
//   topic_guid    uuid NOT NULL DEFAULT gen_random_uuid(),
//   url           text,
//   description   text,
//   PRIMARY KEY (id)
// );

// COMMENT ON COLUMN document_reference.url IS 'file_path';

// CREATE TABLE entity
// (
//   id         text      NOT NULL UNIQUE,
//   type       bigserial NOT NULL,
//   express_id bigserial,
//   property   jsonb    ,
//   quantity   jsonb    ,
//   attribute  jsonb    ,
//   associate  jsonb    ,
//   assignment jsonb    ,
//   container  jsonb    ,
//   PRIMARY KEY (id)
// );

// COMMENT ON COLUMN entity.id IS 'globalId';

// COMMENT ON COLUMN entity.property IS 'property_set';

// COMMENT ON COLUMN entity.quantity IS 'quantity_set';

// CREATE TABLE file
// (
//   id          bigint NOT NULL GENERATED ALWAYS AS IDENTITY UNIQUE,
//   topic_id    uuid   NOT NULL DEFAULT gen_random_uuid(),
//   ifc_project text   NOT NULL,
//   info        jsonb  ,
//   PRIMARY KEY (id)
// );

// COMMENT ON TABLE file IS 'ifc파일 같은 파일/ Documents는 모든 파일';

// COMMENT ON COLUMN file.ifc_project IS 'project_id';

// CREATE TABLE fragment
// (
//   id          bigint             NOT NULL GENERATED ALWAYS AS IDENTITY UNIQUE,
//   entity_id   text               NOT NULL,
//   geometry_id text               NOT NULL,
//   transform   double precision[],
//   color       serial            ,
//   opacity     smallint          ,
//   PRIMARY KEY (id)
// );

// COMMENT ON TABLE fragment IS '3d model';

// COMMENT ON COLUMN fragment.entity_id IS 'globalId';

// COMMENT ON COLUMN fragment.geometry_id IS 'entity/express_id';

// CREATE TABLE geometry
// (
//   id        text     NOT NULL UNIQUE,
//   entity_id text     NOT NULL,
//   position  real[]  ,
//   index     bigint[],
//   normal    real[]  ,
//   PRIMARY KEY (id)
// );

// COMMENT ON COLUMN geometry.id IS 'entity/express_id';

// COMMENT ON COLUMN geometry.entity_id IS 'globalId';

// CREATE TABLE ifc_project
// (
//   id        text NOT NULL,
//   filename  text NOT NULL,
//   reference text NOT NULL,
//   PRIMARY KEY (id)
// );

// COMMENT ON COLUMN ifc_project.id IS 'project_id';

// CREATE TABLE permission
// (
//   id               bigint NOT NULL UNIQUE,
//   user_id          text   NOT NULL,
//   project_id       uuid   NOT NULL,
//   permission       jsonb  NOT NULL,
//   super_permission bool   NOT NULL DEFAULT false
// );

// COMMENT ON COLUMN permission.id IS 'user_id + project_id';

// CREATE TABLE project
// (
//   id   uuid NOT NULL DEFAULT gen_random_uuid() UNIQUE,
//   name text,
//   PRIMARY KEY (id)
// );

// COMMENT ON TABLE project IS 'related to ifc_db';

// CREATE TABLE related_topic
// (
//   id     bigint NOT NULL GENERATED ALWAYS AS IDENTITY UNIQUE,
//   parent uuid   NOT NULL DEFAULT gen_random_uuid(),
//   child  uuid   NOT NULL DEFAULT gen_random_uuid(),
//   PRIMARY KEY (id)
// );

// CREATE TABLE relation
// (
//   id   bigint    NOT NULL GENERATED ALWAYS AS IDENTITY UNIQUE,
//   gid  text      NOT NULL,
//   type bigserial NOT NULL,
//   el   text      NOT NULL,
//   lt   text     ,
//   rt   text     ,
//   PRIMARY KEY (id)
// );

// COMMENT ON COLUMN relation.gid IS 'rel_global_id';

// COMMENT ON COLUMN relation.type IS 'rel_type';

// COMMENT ON COLUMN relation.el IS 'globalId';

// COMMENT ON COLUMN relation.lt IS 'globalId';

// COMMENT ON COLUMN relation.rt IS 'globalId';

// CREATE TABLE selection
// (
//   id                 bigint NOT NULL GENERATED ALWAYS AS IDENTITY UNIQUE,
//   viewpoint_guid     uuid   NOT NULL DEFAULT gen_random_uuid(),
//   ifc_guid           text  ,
//   authoring_tool_id  text  ,
//   originating_system text  ,
//   PRIMARY KEY (id)
// );

// COMMENT ON TABLE selection IS 'components.selection';

// COMMENT ON COLUMN selection.ifc_guid IS 'globalId';

// CREATE TABLE test_user
// (
//   id       text NOT NULL UNIQUE,
//   username text NOT NULL,
//   password text NOT NULL,
//   PRIMARY KEY (id)
// );

// COMMENT ON TABLE test_user IS 'for_test_only(Replace with Auth server)';

// COMMENT ON COLUMN test_user.id IS 'email';

// CREATE TABLE topic
// (
//   id                 uuid        NOT NULL DEFAULT gen_random_uuid() UNIQUE,
//   server_assigned_id bigint      NOT NULL GENERATED ALWAYS AS IDENTITY UNIQUE,
//   project_id         uuid        NOT NULL,
//   creation_author    text        NOT NULL DEFAULT gen_random_uuid(),
//   modified_author    text       ,
//   assigned_to        text       ,
//   creation_date      timestamptz NOT NULL DEFAULT current_timestamp,
//   modified_date      timestamptz,
//   title              text       ,
//   description        text       ,
//   due_date           timestamptz,
//   topic_type         smallserial,
//   topic_status       smallserial,
//   priority           smallserial,
//   labels             text[]     ,
//   bim_snippet        jsonb      ,
//   reference_links    text[]     ,
//   PRIMARY KEY (id)
// );

// COMMENT ON COLUMN topic.server_assigned_id IS 'human-friendly id';

// COMMENT ON COLUMN topic.bim_snippet IS 'snippet_type, is_external, reference, reference_schema';

// CREATE TABLE topic_event
// (
//   id           bigint      NOT NULL GENERATED ALWAYS AS IDENTITY UNIQUE,
//   topic_guid   uuid        NOT NULL DEFAULT gen_random_uuid(),
//   date         timestamptz NOT NULL DEFAULT current_timestamp,
//   events_type  smallserial NOT NULL,
//   events_value text       ,
//   PRIMARY KEY (id)
// );

// CREATE TABLE topic_permission
// (
//   id         bigint NOT NULL GENERATED ALWAYS AS IDENTITY UNIQUE,
//   user_id    text   NOT NULL DEFAULT gen_random_uuid(),
//   topic_guid uuid   NOT NULL DEFAULT gen_random_uuid(),
//   permission jsonb  NOT NULL,
//   PRIMARY KEY (id)
// );

// COMMENT ON TABLE topic_permission IS 'override the default permission';

// CREATE TABLE viewpoint
// (
//   id              uuid  NOT NULL DEFAULT gen_random_uuid() UNIQUE,
//   topic_guid      uuid  NOT NULL DEFAULT gen_random_uuid(),
//   camera          jsonb NOT NULL,
//   lines           jsonb,
//   clipping_planes jsonb,
//   snapshot        text ,
//   PRIMARY KEY (id)
// );

// COMMENT ON COLUMN viewpoint.camera IS './camera.json';

// COMMENT ON COLUMN viewpoint.snapshot IS 'file_path';

// CREATE TABLE visibility
// (
//   id                 bigint NOT NULL GENERATED ALWAYS AS IDENTITY UNIQUE,
//   viewpoint_guid     uuid   NOT NULL DEFAULT gen_random_uuid(),
//   default_visibility bool   NOT NULL DEFAULT true,
//   view_setup_hints   jsonb ,
//   PRIMARY KEY (id)
// );

// CREATE TABLE visibility_exceptions
// (
//   id                 bigint NOT NULL GENERATED ALWAYS AS IDENTITY UNIQUE,
//   visibility_id      bigint NOT NULL,
//   ifc_guid           text   NOT NULL,
//   authoring_tool_id  text  ,
//   originating_system text  ,
//   PRIMARY KEY (id)
// );

// COMMENT ON COLUMN visibility_exceptions.ifc_guid IS 'globalId';

// CREATE TABLE queryset
// (
//   id    uuid NOT NULL DEFAULT gen_random_uuid() UNIQUE,
//   query text NOT NULL,
//   PRIMARY KEY (id)
// );

// COMMENT ON TABLE queryset IS 'rule에 필요한 객체 선택 쿼리';

// CREATE TABLE rule
// (
//   id   text  NOT NULL UNIQUE,
//   body text ,
//   meta jsonb,
//   PRIMARY KEY (id)
// );

// COMMENT ON TABLE rule IS 'rule 근거';

// CREATE TABLE rel_rule_queryset
// (
//   id          uuid NOT NULL DEFAULT gen_random_uuid(),
//   rule_id     text NOT NULL,
//   queryset_id uuid NOT NULL,
//   PRIMARY KEY (id)
// );

// COMMENT ON TABLE rel_rule_queryset IS 'm2m';

// ALTER TABLE permission
//   ADD CONSTRAINT FK_test_user_TO_permission
//     FOREIGN KEY (user_id)
//     REFERENCES test_user (id);

// ALTER TABLE permission
//   ADD CONSTRAINT FK_project_TO_permission
//     FOREIGN KEY (project_id)
//     REFERENCES project (id);

// ALTER TABLE topic
//   ADD CONSTRAINT FK_project_TO_topic
//     FOREIGN KEY (project_id)
//     REFERENCES project (id);

// ALTER TABLE topic
//   ADD CONSTRAINT FK_test_user_TO_topic
//     FOREIGN KEY (assigned_to)
//     REFERENCES test_user (id);

// ALTER TABLE comment
//   ADD CONSTRAINT FK_topic_TO_comment
//     FOREIGN KEY (topic_id)
//     REFERENCES topic (id);

// ALTER TABLE topic
//   ADD CONSTRAINT FK_test_user_TO_topic1
//     FOREIGN KEY (creation_author)
//     REFERENCES test_user (id);

// ALTER TABLE topic
//   ADD CONSTRAINT FK_test_user_TO_topic2
//     FOREIGN KEY (modified_author)
//     REFERENCES test_user (id);

// ALTER TABLE file
//   ADD CONSTRAINT FK_topic_TO_file
//     FOREIGN KEY (topic_id)
//     REFERENCES topic (id);

// ALTER TABLE comment
//   ADD CONSTRAINT FK_test_user_TO_comment
//     FOREIGN KEY (author)
//     REFERENCES test_user (id);

// ALTER TABLE related_topic
//   ADD CONSTRAINT FK_topic_TO_related_topic
//     FOREIGN KEY (parent)
//     REFERENCES topic (id)
//     ON DELETE CASCADE;

// ALTER TABLE related_topic
//   ADD CONSTRAINT FK_topic_TO_related_topic1
//     FOREIGN KEY (child)
//     REFERENCES topic (id)
//     ON DELETE CASCADE;

// ALTER TABLE related_topic
//   ADD CONSTRAINT unique_child_parent_pair
//     UNIQUE (child, parent);

// ALTER TABLE document
//   ADD CONSTRAINT FK_project_TO_document
//     FOREIGN KEY (project_id)
//     REFERENCES project (id);

// ALTER TABLE document_reference
//   ADD CONSTRAINT FK_document_TO_document_reference
//     FOREIGN KEY (document_guid)
//     REFERENCES document (id);

// ALTER TABLE document_reference
//   ADD CONSTRAINT FK_topic_TO_document_reference
//     FOREIGN KEY (topic_guid)
//     REFERENCES topic (id);

// ALTER TABLE comment
//   ADD CONSTRAINT FK_viewpoint_TO_comment
//     FOREIGN KEY (viewpoint_guid)
//     REFERENCES viewpoint (id);

// ALTER TABLE viewpoint
//   ADD CONSTRAINT FK_topic_TO_viewpoint
//     FOREIGN KEY (topic_guid)
//     REFERENCES topic (id);

// ALTER TABLE comment_event
//   ADD CONSTRAINT FK_comment_TO_comment_event
//     FOREIGN KEY (comment_id)
//     REFERENCES comment (id)
//     ON DELETE CASCADE;

// ALTER TABLE topic_event
//   ADD CONSTRAINT FK_topic_TO_topic_event
//     FOREIGN KEY (topic_guid)
//     REFERENCES topic (id)
//     ON DELETE CASCADE;

// ALTER TABLE relation
//   ADD CONSTRAINT FK_entity_TO_relation
//     FOREIGN KEY (el)
//     REFERENCES entity (id);

// ALTER TABLE relation
//   ADD CONSTRAINT FK_entity_TO_relation1
//     FOREIGN KEY (lt)
//     REFERENCES entity (id);

// ALTER TABLE relation
//   ADD CONSTRAINT FK_entity_TO_relation2
//     FOREIGN KEY (rt)
//     REFERENCES entity (id);

// ALTER TABLE fragment
//   ADD CONSTRAINT FK_entity_TO_fragment
//     FOREIGN KEY (entity_id)
//     REFERENCES entity (id);

// ALTER TABLE geometry
//   ADD CONSTRAINT FK_entity_TO_geometry
//     FOREIGN KEY (entity_id)
//     REFERENCES entity (id);

// ALTER TABLE selection
//   ADD CONSTRAINT FK_viewpoint_TO_selection
//     FOREIGN KEY (viewpoint_guid)
//     REFERENCES viewpoint (id)
//     ON DELETE CASCADE;

// ALTER TABLE coloring_components
//   ADD CONSTRAINT FK_coloring_TO_coloring_components
//     FOREIGN KEY (coloring_id)
//     REFERENCES coloring (id)
//     ON DELETE CASCADE;

// ALTER TABLE coloring
//   ADD CONSTRAINT FK_viewpoint_TO_coloring
//     FOREIGN KEY (viewpoint_guid)
//     REFERENCES viewpoint (id)
//     ON DELETE CASCADE;

// ALTER TABLE ifc_project
//   ADD CONSTRAINT FK_entity_TO_ifc_project
//     FOREIGN KEY (id)
//     REFERENCES entity (id);

// ALTER TABLE file
//   ADD CONSTRAINT FK_ifc_project_TO_file
//     FOREIGN KEY (ifc_project)
//     REFERENCES ifc_project (id);

// ALTER TABLE topic_permission
//   ADD CONSTRAINT FK_test_user_TO_topic_permission
//     FOREIGN KEY (user_id)
//     REFERENCES test_user (id);

// ALTER TABLE topic_permission
//   ADD CONSTRAINT FK_topic_TO_topic_permission
//     FOREIGN KEY (topic_guid)
//     REFERENCES topic (id);

// ALTER TABLE fragment
//   ADD CONSTRAINT FK_geometry_TO_fragment
//     FOREIGN KEY (geometry_id)
//     REFERENCES geometry (id);

// ALTER TABLE coloring_components
//   ADD CONSTRAINT FK_entity_TO_coloring_components
//     FOREIGN KEY (ifc_guid)
//     REFERENCES entity (id);

// ALTER TABLE selection
//   ADD CONSTRAINT FK_entity_TO_selection
//     FOREIGN KEY (ifc_guid)
//     REFERENCES entity (id);

// ALTER TABLE visibility
//   ADD CONSTRAINT FK_viewpoint_TO_visibility
//     FOREIGN KEY (viewpoint_guid)
//     REFERENCES viewpoint (id)
//     ON DELETE CASCADE;

// ALTER TABLE visibility_exceptions
//   ADD CONSTRAINT FK_visibility_TO_visibility_exceptions
//     FOREIGN KEY (visibility_id)
//     REFERENCES visibility (id)
//     ON DELETE CASCADE;

// ALTER TABLE visibility_exceptions
//   ADD CONSTRAINT FK_entity_TO_visibility_exceptions
//     FOREIGN KEY (ifc_guid)
//     REFERENCES entity (id);

// ALTER TABLE bitmap
//   ADD CONSTRAINT FK_viewpoint_TO_bitmap
//     FOREIGN KEY (viewpoint_guid)
//     REFERENCES viewpoint (id)
//     ON DELETE CASCADE;

// ALTER TABLE rel_rule_queryset
//   ADD CONSTRAINT FK_rule_TO_rel_rule_queryset
//     FOREIGN KEY (rule_id)
//     REFERENCES rule (id);

// ALTER TABLE rel_rule_queryset
//   ADD CONSTRAINT FK_queryset_TO_rel_rule_queryset
//     FOREIGN KEY (queryset_id)
//     REFERENCES queryset (id);

// END fb $$;

// `)
//     );
    const args = this.getInputData(2) ?? ["-s", "-E UTF-8"];
    const fileName = this.getInputData(3) ?? "dump.sql";
    console.log(await pgDump({ pg, args, fileName }));
    // await db.
  }
}
