package service

import (
	"fmt"
	"math/rand"
	"time"
	"dao"
	"model"
	"param"
	"tool"
)

type MemberService struct {

}

//用户手机号+验证码的登录
func (ms *MemberService) SmsLogin(loginParam param.SmsLoginParams) *model.Member {
	//1 获取到手机号 验证码

	//2 验证手机号 验证码是否正确
	md := dao.MemberDao{tool.DbEngine}
	sms := md.ValidateSmsCode(loginParam.Phone, loginParam.Code)
	if sms.Id == 0 {
		return nil
	}

	//3根据手机号member表中查询记录
	member := md.QueryByPhone(loginParam.Phone)
	fmt.Println(member)
	if member.Id != 0 {
		return member
	}

	//4新创建一个member，并保存
	user := model.Member{}
	user.Phone = loginParam.Phone
	user.UserName = loginParam.Phone
	user.RegisterTime = time.Now().Format("2006-01-02 15:04:05")

	user.Id = md.InsertMemeber(user)

	return &user
}

func (ms *MemberService) UserLogin(name string, password string) *model.Member{
	//1、根据用户名、密码查询存在直接返回 存在
	md := dao.MemberDao{tool.DbEngine}
	member := md.Query(name, password)
	if member.Id != 0 {
		return member
	}
	return nil

	//3、用户不存在，插入新用户  todo::这里是注册功能，先注释，
	/*user := model.Member{}
	user.UserName = name
	user.Password = tool.EncoderSha256(password)
	user.RegisterTime = time.Now().Format("2006-01-02 15:04:05")

	result := md.InsertMemeber(user)
	user.Id = result

	return &user*/
}

func (ms *MemberService) Sendcode(phone string)  bool{

	//1.产生一个验证码
	code := fmt.Sprintf("%04v", rand.New(rand.NewSource(time.Now().UnixNano())).Int31n(10000))

	//2.调用阿里云SDK 完成发送   具体发送就不在
	config := tool.GetConfig().Sms
	fmt.Println(code, config.RegionId, config.RegionId)

	//3.结束返回结果，并且判断发送状态
	//将验证码保存到数据库中
	smsCode := model.SmsCode{Phone: phone, Code: code, BizId: "123", CreateTeme: time.Now().Unix()}
	memberDao := dao.MemberDao{tool.DbEngine}
	result := memberDao.InsertCode(smsCode)
	return result>0

	//return  false
}

func (ms *MemberService) MemberList(params map[string]interface{}) []*model.Member {

	md := dao.MemberDao{tool.DbEngine}


	paramsMap := &model.Member{
		IsActive : 0,
	}

	if _, ok := params["id"]; ok == true {
		id := params["id"].(int64)

		paramsMap = &model.Member{
			Id : id,
		}
	}

	if _, ok := params["name"]; ok == true {
		name := params["name"].(string)
		paramsMap = &model.Member{
			UserName : name,
		}
	}

	if _, ok := params["phone"]; ok == true {
		phone := params["phone"].(string)
		paramsMap = &model.Member{
			Phone : phone,
		}
	}

	//分页
	startRow := 0
	lengthNum := tool.PageLength
	if _, ok := params["startRow"]; ok == true {
		startRow = params["startRow"].(int)
	}
	if _, ok := params["lengthNum"]; ok == true {
		lengthNum = params["lengthNum"].(int)
	}

	members, err := md.QueryList(paramsMap, startRow, lengthNum)
	if err != nil{
		fmt.Println(err)
		return nil
	}
	return members
}

func (ms *MemberService) MemberCount(params map[string]interface{}) int64 {

	//查询条件
	paramsMap := &model.Member{
		IsActive : 0,
	}

	if _, ok := params["id"]; ok == true {
		id := params["id"].(int64)

		paramsMap = &model.Member{
			Id : id,
		}
	}

	if _, ok := params["name"]; ok == true {
		name := params["name"].(string)
		paramsMap = &model.Member{
			UserName : name,
		}
	}

	if _, ok := params["phone"]; ok == true {
		phone := params["phone"].(string)
		paramsMap = &model.Member{
			Phone : phone,
		}
	}

	md := dao.MemberDao{tool.DbEngine}
	total := md.QueryCount(paramsMap)
	return total
}

