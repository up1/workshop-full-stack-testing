INSERT INTO "roles" ("id","name","createdAt","updatedAt") 
VALUES (1, 'user', NOW(), NOW());
INSERT INTO "roles" ("id","name","createdAt","updatedAt") 
VALUES (2, 'moderator', NOW(), NOW());
INSERT INTO "roles" ("id","name","createdAt","updatedAt") 
VALUES (3, 'admin', NOW(), NOW());

INSERT INTO "users" ("id","username","email","password","createdAt","updatedAt") 
VALUES (1,'user01','user01@gmail.com','$2b$08$RhCAKf1eYKEGSKPEWpIrYOCum3ZQyG.xkEayEne3V6ySy/I2xIbVO',NOW(),NOW());

INSERT INTO "user_roles" ("createdAt","updatedAt","roleId","userId")
VALUES (NOW(), NOW(), 1, 1);