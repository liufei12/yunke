module yunke

go 1.14

replace proto_pub/user => ./proto_pub/user

replace proto_pub/common => ./proto_pub/common

require (
	github.com/gin-contrib/sessions v0.0.3
	github.com/gin-gonic/gin v1.6.3
	github.com/go-redis/redis v6.15.8+incompatible
	github.com/go-sql-driver/mysql v1.4.1
	github.com/go-xorm/xorm v0.7.9
	github.com/gookit/config/v2 v2.0.17
	github.com/grpc-ecosystem/grpc-gateway v1.16.0 // indirect
	github.com/mailru/easyjson v0.7.1 // indirect
	github.com/mojocn/base64Captcha v1.3.1
	github.com/olivere/elastic v6.2.34+incompatible // indirect
	google.golang.org/grpc v1.33.1
	google.golang.org/protobuf v1.25.0 // indirect
	gopkg.in/olivere/elastic.v6 v6.2.34
	proto_pub/common v0.0.0-00010101000000-000000000000
	proto_pub/user v0.0.0-00010101000000-000000000000
)
