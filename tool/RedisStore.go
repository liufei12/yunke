package tool

/*import (
	"github.com/go-redis/redis"
)

type RedisStore struct {
	client *redis.Client
}*/

/*var RediStore RedisStore

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
	base64Captcha.SetCustomStore(&RediStore)

	return &RediStore

}

func (rs *RedisStore) Set(ctx *gin.Context,id string, value string)  {
	err := rs.client.Set(ctx, id, value, time.Minute*10).Err()
	if err != nil {
		log.Println(err)
	}
}

func (rs *RedisStore) Get(ctx *gin.Context,id string, clear bool) string {
	val, err := rs.client.Get(ctx, id).Result()
	if err != nil {
		log.Println(err)
		return ""
	}
	if clear {
		err := rs.client.Del(ctx, id).Err()
		if err != nil {
			log.Println(err)
			return ""
		}
	}
	return  val
}*/




