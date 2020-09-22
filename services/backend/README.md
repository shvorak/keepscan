# About

This is a .Net Core application written on C#

## Make commands

### Migrations

#### Apply migrations to db

```shell
make migrate
```

#### Create migration

```shell
make migrate-add name=WhatItDoingName
```

#### Rollback migrations

Rollback migration to given name migration

```shell
make migrate-down to=MigrationName
```

#### Delete migrations

Removes not executed migrations

```shell
make migrate-rm
```

### Security

#### Generate security key pairs for JWT tokens

Creates new key pairs at place files to `KeepSpy/Security` folder

```shell
make generate-jwt-keys
```

