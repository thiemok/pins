CREATE TABLE "routes" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar NOT NULL,
	"owner" varchar NOT NULL,
	"name" varchar NOT NULL,
	"track" geometry(Linestring, 4326) NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "routes_slug_unique" UNIQUE("slug")
);
