package service

import (
	"google.golang.org/grpc"
	"context"
	"log"
	"time"
	"yunke/tool"
	"proto_pub/user"
)

type UserService struct {

}

func (c *UserService) GrpcGetUser(params map[string]interface{})  []*user.Tag {

	proxyRPC := tool.GrpcInit()
	conn, err := grpc.Dial(proxyRPC, grpc.WithInsecure())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()

	//用户proto
	userClient := user.NewTagServiceClient(conn)
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()

	//todo::查询多条获取
	userInfoCondition := &user.GetTagListRequest{}

	if _, ok := params["mobile"]; ok == true {
		userInfoCondition.Mobile = params["mobile"].(string)
	}
	if _, ok := params["name"]; ok == true {
		userInfoCondition.Name = params["name"].(string)
	}

	/*if _, ok := params["userId"]; ok == true {
		userInfoCondition.UserId = params["userId"].(int64)
	}
	if _, ok := params["realName"]; ok == true {
		userInfoCondition.RealName = params["realName"].(string)
	}*/

	r, err := userClient.GetTagList(ctx, userInfoCondition)

	if err != nil{
		log.Printf("请求用户信息时返回的错误: %v", err)
		return nil
	}

	return r.GetList()

}