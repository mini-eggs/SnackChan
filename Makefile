# Server 

build_server:
	cd server && jbuilder build main.exe

run_server: build_server
	./server/_build/default/main.exe

clean_server:
	rm -rf server/_build

# Client

run_client: 
	cd client && yarn ios && yarn start & cd client && yarn watch