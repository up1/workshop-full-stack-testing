DROP TABLE IF EXISTS "users" CASCADE;
DROP TABLE IF EXISTS "roles" CASCADE;
DROP TABLE IF EXISTS "user_roles" CASCADE;

CREATE TABLE IF NOT EXISTS "users" ("id"   SERIAL , "username" VARCHAR(255), "email" VARCHAR(255), "password" VARCHAR(255), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("id"));
CREATE TABLE IF NOT EXISTS "roles" ("id" INTEGER , "name" VARCHAR(255), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("id"));
CREATE TABLE IF NOT EXISTS "user_roles" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "roleId" INTEGER  REFERENCES "roles" ("id") ON DELETE CASCADE ON UPDATE CASCADE, "userId" INTEGER  REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("roleId","userId"));