package tool

import (
	"github.com/go-redis/redis"
	//"github.com/mojocn/base64Captcha"
	"log"
	"time"
)


type RedisStore struct {
	client *redis.Client
}

var RediStore RedisStore

func InitRedisStore() *RedisStore {
	config := GetConfig().RedisConfig

	//db := config.Db
	client := redis.NewClient(&redis.Options{
		Addr: config.Addr + ":" + config.Port,
		Password: config.Password,
		DB:	0,
	})
	RediStore = RedisStore{client: client}
	//base64Captcha.SetCustomStore(&RediStore)
	//base64Captcha.SetCustomStore(&RediStore)

	return &RediStore

}

func (rs *RedisStore) Set(id string, value string)  {
	err := rs.client.Set(id, value, time.Minute*10).Err()
	if err != nil {
		log.Println(err)
	}
}

func (rs *RedisStore) Get(id string, clear bool) string {
	val, err := rs.client.Get(id).Result()
	if err != nil {
		log.Println(err)
		return ""
	}
	if clear {
		err := rs.client.Del(id).Err()
		if err != nil {
			log.Println(err)
			return ""
		}
	}
	return  val
}




