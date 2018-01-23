mkdir proto
protoc \
--plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
--js_out=import_style=commonjs,binary:./proto \
--ts_out=service=true:./proto \
-I ../protos \
../protos/*.proto
