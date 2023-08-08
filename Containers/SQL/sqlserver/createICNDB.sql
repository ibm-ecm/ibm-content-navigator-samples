-- create IBM CONTENT NAVIGATOR database
CREATE DATABASE ${icn_name}
GO
ALTER DATABASE ${icn_name} SET READ_COMMITTED_SNAPSHOT ON
GO

-- create a SQL Server login account for the database user of each of the databases and update the master database to grant permission for XA transactions for the login account
USE MASTER
GO
-- when using SQL authentication
CREATE LOGIN ${youruser1} WITH PASSWORD='${yourpassword}'
-- when using Windows authentication:
-- CREATE LOGIN [domain\user] FROM WINDOWS
GO
CREATE USER ${youruser1} FOR LOGIN ${youruser1} WITH DEFAULT_SCHEMA=${youruser1}
GO
EXEC sp_addrolemember N'SqlJDBCXAUser', N'${youruser1}';
GO

-- Creating users and schemas for IBM CONTENT NAVIGATOR database
USE ${icn_name}
GO
CREATE USER ${youruser1} FOR LOGIN ${youruser1} WITH DEFAULT_SCHEMA=ICNDB
GO
CREATE SCHEMA ICNDB AUTHORIZATION ${youruser1}
GO
EXEC sp_addrolemember 'db_ddladmin', ${youruser1};
GO
EXEC sp_addrolemember 'db_datareader', ${youruser1};
GO
EXEC sp_addrolemember 'db_datawriter', ${youruser1};
GO
