ARG configuration=Release

###########################
#
# Build container
#
###########################
FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build

WORKDIR /src

# Project assemblies for layer caching
COPY KeepSpy.sln .
COPY KeepSpy.App/KeepSpy.App.csproj ./KeepSpy.App/
COPY KeepSpy.Shared/KeepSpy.Shared.csproj ./KeepSpy.Shared/
COPY KeepSpy.Models/KeepSpy.Models.csproj ./KeepSpy.Models/
COPY KeepSpy.Domain/KeepSpy.Domain.csproj ./KeepSpy.Domain/
COPY KeepSpy.Storage/KeepSpy.Storage.csproj ./KeepSpy.Storage/
COPY KeepSpy.Tests/KeepSpy.Tests.csproj ./KeepSpy.Tests/

# Restore dependencies (with nuget cache)
RUN dotnet restore --packages /nuget

# Copy all sources
COPY . .

WORKDIR /src/KeepSpy.App

## Publish backend assembly
RUN dotnet publish --output /out --no-restore -v m

###########################
#
# Runtime container build
#
###########################
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-alpine AS runtime

COPY --from=build /out /app

WORKDIR /app

EXPOSE 80

ENTRYPOINT ["dotnet", "KeepSpy.App.dll", "--migrate"]