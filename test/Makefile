
test-pureftpd: kill-pureftpd
	docker run -d --name ftpd_server -p 21:21 -p 30000-30009:30000-30009 -e "PUBLICHOST=localhost" -e "ADDED_FLAGS=-d -d" stilliard/pure-ftpd:hardened
	docker exec -it ftpd_server sh -c "(echo test; echo test) | pure-pw useradd bob -f /etc/pure-ftpd/passwd/pureftpd.passwd -m -u ftpuser -d /home/ftpusers/bob"
	npm run test

kill-pureftpd:
	-docker kill ftpd_server
	-docker rm ftpd_server
