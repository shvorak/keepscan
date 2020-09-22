project = keepspy
solution = KeepSpy

export ASPNETCORE_ENVIRONMENT = Development

rm-dev-db: stop-db
	@docker rm $(project)-db

stop-dev-db:
	@docker stop $(project)-db

start-dev-db:
	@docker start $(project)-db

create-dev-db:
	@docker run -d \
	-p 54328:5432 \
	--name=$(project)-db \
	--restart=always \
	-e POSTGRES_DB=$(project) \
	-e POSTGRES_USER=$(project) \
	-e POSTGRES_PASSWORD=$(project) \
	postgres:alpine

migrate:
	@dotnet ef database update -s ./$(solution).App/ -p ./$(solution).Storage/

migrate-add: 
	@dotnet ef migrations add $(name) -s ./$(solution).App/ -p ./$(solution).Storage/

migrate-down: 
	@dotnet ef database update $(name) -s ./$(solution).App/ -p ./$(solution).Storage/

migrate-rm:
	@dotnet ef migrations remove -s ./$(solution).App/ -p ./$(solution).Storage/

generate-jwt-keys:
	@mkdir Security
	@ssh-keygen -t rsa -b 4096 -m PEM -f $(solution).App/Security/jwt.key -N ""
	@openssl rsa -in $(solution).App/Security/jwt.key -pubout -outform PEM -out $(solution).Api/Security/jwt.key.pub