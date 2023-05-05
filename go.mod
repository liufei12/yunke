module yunke

go 1.14

replace proto_pub/user => ./proto_pub/user

replace proto_pub/common => ./proto_pub/common

replace service => ./service

replace tool => ./tool

replace router => ./router

replace model => ./model

replace param => ./param

replace dao => ./dao

require (
	dao v0.0.0-00010101000000-000000000000 // indirect
	github.com/gin-contrib/sessions v0.0.3 // indirect
	github.com/gin-gonic/gin v1.9.0
	github.com/go-redis/redis v6.15.8+incompatible // indirect
	github.com/go-xorm/xorm v0.7.9 // indirect
	github.com/gookit/config/v2 v2.0.17 // indirect
	github.com/grpc-ecosystem/grpc-gateway v1.16.0 // indirect
	google.golang.org/genproto v0.0.0-20200526211855-cb27e3aa2013 // indirect
	model v0.0.0-00010101000000-000000000000
	param v0.0.0-00010101000000-000000000000
	proto_pub/common v0.0.0-00010101000000-000000000000 // indirect
	proto_pub/user v0.0.0-00010101000000-000000000000 // indirect
	router v0.0.0-00010101000000-000000000000
	service v0.0.0-00010101000000-000000000000
	tool v0.0.0-00010101000000-000000000000
)
