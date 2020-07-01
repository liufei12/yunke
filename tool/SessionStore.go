package tool

import (
	"fmt"
	"github.com/gin-contrib/sessions/redis"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func InitSession(engine *gin.Engine)  {
	config := GetConfig().RedisConfig
	store, err := redis.NewStore(10, "tcp", config.Addr + ":" + config.Port, "", []byte("secret"))

	if err != nil {
		fmt.Println(err.Error())
	}

	engine.Use(sessions.Sessions("mysession", store))

}

// set
func SetSess(context *gin.Context, key interface{}, value interface{}) error  {

	session := sessions.Default(context)

	if session == nil {
		return nil
	}
	session.Set(key, value)
	return session.Save()
}

// delete
func DelSess(context *gin.Context, key interface{}) bool {

	session := sessions.Default(context)

	if session == nil {
		return false
	}
	session.Delete(key)
	return  true
}

// get
func GetSess(context *gin.Context, key interface{}) interface{} {
	session := sessions.Default(context)
	return session.Get(key)
}
