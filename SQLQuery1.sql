USE [master]

IF db_id('Tabloid') IS NULl
  CREATE DATABASE [Tabloid]
GO

USE [Tabloid]
GO

DROP TABLE IF EXISTS [UserStatus];
GO

CREATE TABLE [UserStatus] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Status] nvarchar(20) NOT NULL
)
set identity_insert [Reaction] on
INSERT into UserStatus (Id, status) 
		VALUES(1, 'Active')
set identity_insert [Reaction] off

ALTER TABLE [UserProfile]
ADD [UserStatusId] integer DEFAULT 1 NOT NULL

CONSTRAINT [FK_User_UserStatus] FOREIGN KEY ([UserStatusId]) REFERENCES [UserStatus] ([Id])

GO