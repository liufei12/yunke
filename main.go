package main

import (
	"github.com/gin-gonic/gin"
	"yunke/router"
	"yunke/tool"
)

func main()  {
	cfg, err := tool.ParseConfig("./config/app.json")

	if err != nil{
		panic(err.Error())
	}

	_, err = tool.OrmEngine(cfg)
	if err != nil {
		//logger.Error(err.Error())  logger  github上不存在
		return
	}

	r := gin.Default();

	//初始化redis配置
	tool.InitRedisStore()

	//集成session  集成redis
	tool.InitSession(r)

	//注册路由
	r = router.RegisterRouter(r)

	r.Run(cfg.AppHost + ":" + cfg.AppPort)
}

