#!/bin/bash
if [ -n "$INPUT_MIGRATIONS" ];
	then INPUT_MIGRATIONS="-v \"$INPUT_MIGRATIONS\":\"/cwd-extra-migrations"
fi

echo "Starting devnet..."

echo "docker run --name=devnet -d --health-cmd='curl --verbose --fail http://localhost:8080/info || exit 1' \
  -v \"/var/run/docker.sock\":\"/var/run/docker.sock\" \
  -v /home/runner/work/_temp:/home/runner/work/_temp \
  $INPUT_MIGRATION \
  -e GITHUB_ENV -e GITHUB_OUTPUT -e GITHUB_PATH -e GITHUB_STATE -e GITHUB_STEP_SUMMARY 	\
  -p 8080:8080 \"kadena/devnet\""

exec docker run --name=devnet -d --health-cmd='curl --verbose --fail http://localhost:8080/info || exit 1' \
  -v "/var/run/docker.sock":"/var/run/docker.sock" \
  -v /home/runner/work/_temp:/home/runner/work/_temp \
  $INPUT_MIGRATION \
  -e GITHUB_ENV -e GITHUB_OUTPUT -e GITHUB_PATH -e GITHUB_STATE -e GITHUB_STEP_SUMMARY 	\
  -p 8080:8080 "kadena/devnet"

echo "Waiting for devnet to be healthy..."
until [ "`docker inspect -f {{.State.Health.Status}} devnet`"=="healthy" ]; do
    sleep 2;

done;
echo "Devnet is healthy!"
